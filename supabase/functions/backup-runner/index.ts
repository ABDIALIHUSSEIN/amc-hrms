/**
 * AMC HRMS — Backup Runner Edge Function
 * Triggers: Supabase cron (25th of month, 02:00) + manual POST from admin panel
 * Exports all tables → Supabase Storage (hrm-backups/YYYY/MM-Month/) → email via Resend
 * Secrets required: SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, BACKUP_EMAIL_TO, BACKUP_ADMIN_SECRET
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const TABLES = [
  "employees", "payroll", "kpis", "kpi_reviews", "kpi_comments",
  "tasks", "projects", "departments", "attendance", "leave_requests",
  "leave_balances", "loans", "salary_advances", "bonuses", "requisitions",
  "candidates", "trainings", "disciplinary_cases", "succession_plans",
  "settings", "bonus_rules", "guarantors", "hrms_users", "audit_logs",
  "notices", "appraisal_cycles",
];

const BUCKET = "hrm-backups";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });

  const isCron = req.headers.get("X-Trigger") === "cron";
  const authHeader = req.headers.get("Authorization") || "";

  if (!isCron) {
    const secret = Deno.env.get("BACKUP_ADMIN_SECRET") || "";
    const isSecretCall = secret && authHeader === `Bearer ${secret}`;

    if (!isSecretCall) {
      const userClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        { global: { headers: { Authorization: authHeader } } }
      );
      const { data: { user }, error } = await userClient.auth.getUser();
      if (error || !user) return json({ error: "Unauthorized" }, 401);

      const { data: hrUser } = await userClient
        .from("hrms_users")
        .select("role")
        .eq("email", user.email)
        .single();

      const adminRoles = ["super_admin", "corporate_admin", "hr_director"];
      if (!hrUser || !adminRoles.includes(hrUser.role)) {
        return json({ error: "Admin access required" }, 403);
      }
    }
  }

  const triggeredBy = isCron ? "cron" : "manual";
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const runId = crypto.randomUUID();
  const date = new Date().toISOString().slice(0, 10);
  const filename = `HRM_BACKUP_${date}.json`;

  await supabase.from("backup_logs").insert({
    id: runId,
    backup_date: date,
    filename,
    status: "running",
    triggered_by: triggeredBy,
  });

  // 1. Fetch all tables
  const data: Record<string, unknown[]> = {};
  const errors: string[] = [];

  for (const table of TABLES) {
    const { data: rows, error } = await supabase.from(table).select("*");
    if (error) {
      errors.push(`${table}: ${error.message}`);
    } else {
      data[table] = rows || [];
    }
  }

  // 2. Integrity validation
  const warnings: string[] = [];

  const empIds = new Set((data.employees as any[] || []).map((e) => e.id));
  const orphanPayroll = (data.payroll as any[] || []).filter((p) => !empIds.has(p.employee_id));
  if (orphanPayroll.length)
    warnings.push(`${orphanPayroll.length} payroll rows with unknown employee_id`);

  const payKeys = (data.payroll as any[] || []).map((p) => `${p.employee_id}|${p.month}`);
  const dupPay = payKeys.filter((k, i) => payKeys.indexOf(k) !== i);
  if (dupPay.length) warnings.push(`${dupPay.length} duplicate payroll entries`);

  const badKpis = (data.kpis as any[] || []).filter((k) => k.target == null || k.actual == null);
  if (badKpis.length) warnings.push(`${badKpis.length} KPIs with null target or actual`);

  if (errors.length > 3) {
    await supabase.from("backup_logs").update({ status: "failed", errors, warnings }).eq("id", runId);
    await sendEmail(
      `HRM Backup FAILED — ${date}`,
      `<h2>Backup aborted</h2><p><b>Critical errors (${errors.length}):</b><br>${errors.join("<br>")}</p>`
    );
    return json({ status: "failed", errors, warnings });
  }

  const recordCount = Object.values(data).reduce((s, t) => s + (t?.length || 0), 0);
  const payload = JSON.stringify(
    { exportDate: date, exportTime: new Date().toISOString(), tables: data, warnings, errors },
    null,
    2
  );

  // 3. Upload to Supabase Storage
  const year = new Date().getFullYear().toString();
  const monthNum = String(new Date().getMonth() + 1).padStart(2, "0");
  const monthName = new Date().toLocaleString("en-US", { month: "long" });
  const storagePath = `${year}/${monthNum}-${monthName}/${filename}`;

  let storageLink: string | null = null;
  let storageError: string | null = null;

  try {
    // Create bucket if it doesn't exist yet
    await supabase.storage.createBucket(BUCKET, { public: false });
    // (ignore "already exists" error — createBucket is idempotent in effect)

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, payload, { contentType: "application/json", upsert: true });
    if (uploadError) throw new Error(uploadError.message);

    // Signed URL valid for 90 days
    const { data: signed, error: signError } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(storagePath, 60 * 60 * 24 * 90);
    if (signError) throw new Error(signError.message);
    storageLink = signed.signedUrl;
  } catch (e: any) {
    storageError = e.message;
    console.error("Storage upload failed:", e.message);
  }

  // 4. Send email
  const emailSubject = storageError
    ? `HRM Backup PARTIAL — ${date}`
    : `HRM Backup SUCCESS — ${date}`;

  const emailHtml = `
    <div style="font-family:sans-serif;max-width:600px">
      <h2 style="color:#001B44">AMC HRMS — Backup Report</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px 12px;font-weight:600;color:#374151">Date</td><td>${date}</td></tr>
        <tr style="background:#f9fafb"><td style="padding:6px 12px;font-weight:600;color:#374151">Status</td>
          <td>${storageError ? "⚠️ Storage upload failed" : "✅ Success"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600;color:#374151">Triggered by</td><td>${triggeredBy}</td></tr>
        <tr style="background:#f9fafb"><td style="padding:6px 12px;font-weight:600;color:#374151">Tables</td><td>${TABLES.length - errors.length} / ${TABLES.length}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600;color:#374151">Total records</td><td>${recordCount.toLocaleString()}</td></tr>
        ${storageLink ? `<tr style="background:#f9fafb"><td style="padding:6px 12px;font-weight:600;color:#374151">Download</td><td><a href="${storageLink}" style="color:#2563EB">${filename}</a></td></tr>` : ""}
      </table>
      ${warnings.length ? `<div style="margin-top:16px;padding:12px;background:#FEF3C7;border-radius:6px"><strong>Warnings:</strong><br>${warnings.join("<br>")}</div>` : ""}
      ${errors.length ? `<div style="margin-top:12px;padding:12px;background:#FEE2E2;border-radius:6px"><strong>Errors:</strong><br>${errors.join("<br>")}</div>` : ""}
      ${storageError ? `<div style="margin-top:12px;padding:12px;background:#FEE2E2;border-radius:6px"><strong>Storage Error:</strong> ${storageError}</div>` : ""}
    </div>
  `;

  const emailSent = await sendEmail(emailSubject, emailHtml);

  // 5. Update backup_logs
  const finalStatus = errors.length > 0 || storageError ? "partial" : "success";
  await supabase.from("backup_logs").update({
    status: finalStatus,
    drive_file_id: storagePath,
    drive_link: storageLink,
    drive_error: storageError,
    table_count: TABLES.length,
    record_count: recordCount,
    warnings,
    errors,
    email_sent: emailSent,
  }).eq("id", runId);

  return json({
    id: runId,
    status: finalStatus,
    backup_date: date,
    filename,
    storage_link: storageLink,
    record_count: recordCount,
    table_count: TABLES.length,
    warnings,
    errors,
    email_sent: emailSent,
  });
});

// ── Send email via Resend ──
async function sendEmail(subject: string, html: string): Promise<boolean> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("BACKUP_EMAIL_TO");
  if (!apiKey || !to) return false;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "AMC HRMS Backup <noreply@asalmediacorp.com>",
        to: [to],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`Resend error ${res.status}:`, body);
    }
    return res.ok;
  } catch (e: any) {
    console.error("Resend exception:", e.message);
    return false;
  }
}

/**
 * AMC HRMS — Backup Runner Edge Function
 * Triggers: Supabase cron (25th of month, 02:00) + manual POST from admin panel
 * Exports all tables → Google Drive (HRM_BACKUPS/YYYY/MM-Month/) → email via Resend
 * Secrets required: SUPABASE_SERVICE_ROLE_KEY, GOOGLE_SERVICE_ACCOUNT_JSON,
 *                   RESEND_API_KEY, BACKUP_EMAIL_TO, BACKUP_ADMIN_SECRET
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

  // Auth: Supabase scheduler sends X-Trigger: cron.
  // Manual calls from the admin panel carry the user's Supabase JWT — we
  // validate the caller is admin by checking their role via the service client.
  const isCron = req.headers.get("X-Trigger") === "cron";
  const authHeader = req.headers.get("Authorization") || "";

  if (!isCron) {
    // Allow calls with the explicit admin secret (CLI / testing)
    const secret = Deno.env.get("BACKUP_ADMIN_SECRET") || "";
    const isSecretCall = secret && authHeader === `Bearer ${secret}`;

    if (!isSecretCall) {
      // Validate user JWT — must be admin role
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

  // Insert running entry so dashboard shows live status
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

  // Payroll: orphan rows (no matching employee)
  const empIds = new Set((data.employees as any[] || []).map((e) => e.id));
  const orphanPayroll = (data.payroll as any[] || []).filter(
    (p) => !empIds.has(p.employee_id)
  );
  if (orphanPayroll.length)
    warnings.push(`${orphanPayroll.length} payroll rows with unknown employee_id`);

  // Payroll: duplicate (employee_id + month)
  const payKeys = (data.payroll as any[] || []).map((p) => `${p.employee_id}|${p.month}`);
  const dupPay = payKeys.filter((k, i) => payKeys.indexOf(k) !== i);
  if (dupPay.length) warnings.push(`${dupPay.length} duplicate payroll entries`);

  // KPIs: missing target/actual
  const badKpis = (data.kpis as any[] || []).filter(
    (k) => k.target == null || k.actual == null
  );
  if (badKpis.length) warnings.push(`${badKpis.length} KPIs with null target or actual`);

  // Abort on critical errors (any table completely failed)
  if (errors.length > 3) {
    await supabase.from("backup_logs").update({
      status: "failed",
      errors,
      warnings,
    }).eq("id", runId);
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

  // 3. Upload to Google Drive
  let driveFileId: string | null = null;
  let driveLink: string | null = null;
  let driveError: string | null = null;

  try {
    const serviceAccount = JSON.parse(Deno.env.get("GOOGLE_SERVICE_ACCOUNT_JSON") || "{}");
    if (!serviceAccount.client_email) throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON not set");

    const token = await getGoogleToken(serviceAccount);

    const year = new Date().getFullYear().toString();
    const monthNum = String(new Date().getMonth() + 1).padStart(2, "0");
    const monthName = new Date().toLocaleString("en-US", { month: "long" });

    const rootId = await findOrCreateFolder(token, "HRM_BACKUPS", null);
    const yearId = await findOrCreateFolder(token, year, rootId);
    const monthId = await findOrCreateFolder(token, `${monthNum}-${monthName}`, yearId);

    const boundary = "backup_multipart_boundary";
    const multipart = [
      `--${boundary}`,
      "Content-Type: application/json; charset=UTF-8",
      "",
      JSON.stringify({ name: filename, parents: [monthId] }),
      `--${boundary}`,
      "Content-Type: application/json; charset=UTF-8",
      "",
      payload,
      `--${boundary}--`,
    ].join("\r\n");

    const uploadRes = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/related; boundary=${boundary}`,
        },
        body: multipart,
      }
    );
    const uploadData = await uploadRes.json();
    if (!uploadData.id) throw new Error(JSON.stringify(uploadData));
    driveFileId = uploadData.id;
    driveLink = `https://drive.google.com/file/d/${driveFileId}/view`;
  } catch (e: any) {
    driveError = e.message;
    console.error("Drive upload failed:", e.message);
  }

  // 4. Send email
  const emailSubject = driveError
    ? `HRM Backup PARTIAL — ${date}`
    : `HRM Backup SUCCESS — ${date}`;

  const emailHtml = `
    <div style="font-family:sans-serif;max-width:600px">
      <h2 style="color:#001B44">AMC HRMS — Backup Report</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px 12px;font-weight:600;color:#374151">Date</td><td>${date}</td></tr>
        <tr style="background:#f9fafb"><td style="padding:6px 12px;font-weight:600;color:#374151">Status</td>
          <td>${driveError ? "⚠️ Drive upload failed" : "✅ Success"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600;color:#374151">Triggered by</td><td>${triggeredBy}</td></tr>
        <tr style="background:#f9fafb"><td style="padding:6px 12px;font-weight:600;color:#374151">Tables</td><td>${TABLES.length - errors.length} / ${TABLES.length}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600;color:#374151">Total records</td><td>${recordCount.toLocaleString()}</td></tr>
        ${driveLink ? `<tr style="background:#f9fafb"><td style="padding:6px 12px;font-weight:600;color:#374151">Download</td><td><a href="${driveLink}" style="color:#2563EB">${filename}</a></td></tr>` : ""}
      </table>
      ${warnings.length ? `<div style="margin-top:16px;padding:12px;background:#FEF3C7;border-radius:6px"><strong>Warnings:</strong><br>${warnings.join("<br>")}</div>` : ""}
      ${errors.length ? `<div style="margin-top:12px;padding:12px;background:#FEE2E2;border-radius:6px"><strong>Errors:</strong><br>${errors.join("<br>")}</div>` : ""}
      ${driveError ? `<div style="margin-top:12px;padding:12px;background:#FEE2E2;border-radius:6px"><strong>Drive Error:</strong> ${driveError}</div>` : ""}
    </div>
  `;

  const emailSent = await sendEmail(emailSubject, emailHtml);

  // 5. Update backup_logs
  const finalStatus = errors.length > 0 ? "partial" : driveError ? "partial" : "success";
  await supabase.from("backup_logs").update({
    status: finalStatus,
    drive_file_id: driveFileId,
    drive_link: driveLink,
    drive_error: driveError,
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
    drive_link: driveLink,
    record_count: recordCount,
    table_count: TABLES.length,
    warnings,
    errors,
    email_sent: emailSent,
  });
});

// ── Google OAuth2 via service account JWT ──
async function getGoogleToken(sa: any): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const b64url = (s: string) =>
    btoa(s).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/drive.file",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    })
  );

  const toSign = `${header}.${claim}`;
  const pemKey = sa.private_key.replace(/\\n/g, "\n");
  const keyDer = Uint8Array.from(
    atob(
      pemKey
        .replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\n/g, "")
    ),
    (c) => c.charCodeAt(0)
  );

  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    keyDer.buffer,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    new TextEncoder().encode(toSign)
  );
  const signature = btoa(String.fromCharCode(...new Uint8Array(sig)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${toSign}.${signature}`,
  });
  const data = await res.json();
  if (!data.access_token) throw new Error(`OAuth token error: ${JSON.stringify(data)}`);
  return data.access_token;
}

// ── Find or create a Drive folder by name under a parent ──
async function findOrCreateFolder(
  token: string,
  name: string,
  parentId: string | null
): Promise<string> {
  const q = [
    `name='${name}'`,
    `mimeType='application/vnd.google-apps.folder'`,
    `trashed=false`,
    parentId ? `'${parentId}' in parents` : "",
  ]
    .filter(Boolean)
    .join(" and ");

  const search = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id)`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  const sd = await search.json();
  if (sd.files?.length) return sd.files[0].id;

  const create = await fetch("https://www.googleapis.com/drive/v3/files", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      mimeType: "application/vnd.google-apps.folder",
      ...(parentId ? { parents: [parentId] } : {}),
    }),
  });
  const cd = await create.json();
  if (!cd.id) throw new Error(`Failed to create Drive folder "${name}": ${JSON.stringify(cd)}`);
  return cd.id;
}

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
    return res.ok;
  } catch {
    return false;
  }
}

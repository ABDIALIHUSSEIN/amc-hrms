// AMC HRMS — admin-only user creation. Creates a real, confirmed Supabase Auth
// login + a hrms_users directory row. The service-role key lives only here
// (server side), never in the browser. Caller must be an authenticated admin.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const ADMIN_ROLES = ["super_admin", "corporate_admin", "hr_director", "hr_manager"];
const MASTER_EMAILS = ["admin@asalmedia.so", "superadmin@asalmedia.so"];

function json(obj: unknown, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { ...cors, "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

    // Verify the caller is a signed-in admin.
    const jwt = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    if (!jwt) return json({ error: "Not authenticated" }, 401);
    const { data: callerData, error: callerErr } = await admin.auth.getUser(jwt);
    const callerEmail = callerData?.user?.email?.toLowerCase();
    if (callerErr || !callerEmail) return json({ error: "Invalid session" }, 401);
    const { data: callerRow } = await admin.from("hrms_users").select("role").ilike("email", callerEmail).maybeSingle();
    const callerRole = callerRow?.role || (MASTER_EMAILS.includes(callerEmail) ? "super_admin" : null);
    if (!callerRole || !ADMIN_ROLES.includes(callerRole)) return json({ error: "You are not authorized to create users" }, 403);

    const body = await req.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const role = String(body.role || "employee");
    const username = String(body.username || email.split("@")[0] || "").trim();
    const empId = body.empId ? String(body.empId) : null;
    const status = String(body.status || "Active");
    const reqId = body.id ? String(body.id) : null;

    if (!email || !password) return json({ error: "Email and password are required" }, 400);
    if (password.length < 8) return json({ error: "Password must be at least 8 characters" }, 400);
    if (role === "super_admin" && callerRole !== "super_admin") return json({ error: "Only a super admin can create super admins" }, 403);

    // Create the confirmed login.
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email, password, email_confirm: true, user_metadata: { username, role },
    });
    if (createErr || !created?.user) return json({ error: createErr?.message || "Could not create login" }, 400);

    // Directory row (replace any stale row for this email).
    await admin.from("hrms_users").delete().ilike("email", email);
    const id = reqId || ("USR_" + created.user.id.replace(/-/g, "").slice(0, 10));
    const { error: rowErr } = await admin.from("hrms_users").insert({ id, username, email, emp_id: empId, role, status });
    if (rowErr) return json({ error: "Login created, but directory row failed: " + rowErr.message }, 207);

    return json({ ok: true, id, email, username, role });
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});

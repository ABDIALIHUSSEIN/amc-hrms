// AMC HRMS — WhatsApp Cloud API gateway. The Meta access token is stored in the
// RLS-locked integration_config table and only ever read here (server side); it
// is never sent to the browser. All sending happens server-side (no CORS, no
// token exposure). Admin-only.
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
function normalizePhone(raw: string) {
  let num = (raw || "").replace(/\D/g, "");
  if (num.startsWith("0")) num = "252" + num.slice(1);
  if (num.length === 9) num = "252" + num;
  if (!num.startsWith("252") && num.length < 12) num = "252" + num;
  return num;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });

    // Admin-only.
    const jwt = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
    if (!jwt) return json({ error: "Not authenticated" }, 401);
    const { data: callerData, error: callerErr } = await admin.auth.getUser(jwt);
    const callerEmail = callerData?.user?.email?.toLowerCase();
    if (callerErr || !callerEmail) return json({ error: "Invalid session" }, 401);
    const { data: callerRow } = await admin.from("hrms_users").select("role").ilike("email", callerEmail).maybeSingle();
    const callerRole = callerRow?.role || (MASTER_EMAILS.includes(callerEmail) ? "super_admin" : null);
    if (!callerRole || !ADMIN_ROLES.includes(callerRole)) return json({ error: "You are not authorized for WhatsApp settings" }, 403);

    const body = await req.json().catch(() => ({}));
    const action = String(body.action || "status");

    // Save credentials (stored server-side only).
    if (action === "save_config") {
      const token = String(body.token || "").trim();
      const phoneId = String(body.phoneId || "").trim();
      const displayNum = String(body.displayNum || "").trim();
      if (!token || !phoneId) return json({ error: "Access token and Phone Number ID are required" }, 400);
      const { error } = await admin.from("integration_config").upsert({
        key: "whatsapp", value: { token, phoneId, displayNum }, updated_at: new Date().toISOString(),
      });
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true, configured: true, phoneId, displayNum });
    }

    // Connection status — never returns the token.
    if (action === "status") {
      const { data } = await admin.from("integration_config").select("value").eq("key", "whatsapp").maybeSingle();
      const v = (data?.value || {}) as Record<string, string>;
      return json({ configured: !!(v.token && v.phoneId), phoneId: v.phoneId || "", displayNum: v.displayNum || "" });
    }

    // Send a text message. Inline token/phoneId allowed for a pre-save test.
    if (action === "send" || action === "test") {
      const to = normalizePhone(String(body.to || ""));
      const message = String(body.message || "").trim();
      if (!to || !message) return json({ error: "Recipient number and message are required" }, 400);
      let token = String(body.token || "").trim();
      let phoneId = String(body.phoneId || "").trim();
      if (!token || !phoneId) {
        const { data } = await admin.from("integration_config").select("value").eq("key", "whatsapp").maybeSingle();
        const v = (data?.value || {}) as Record<string, string>;
        token = v.token || ""; phoneId = v.phoneId || "";
      }
      if (!token || !phoneId) return json({ error: "WhatsApp is not configured yet" }, 400);

      const waRes = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ messaging_product: "whatsapp", to, type: "text", text: { preview_url: false, body: message } }),
      });
      const waData = await waRes.json().catch(() => ({}));
      if (!waRes.ok) return json({ error: waData?.error?.message || `WhatsApp API error ${waRes.status}` }, 400);
      return json({ ok: true, to, id: waData?.messages?.[0]?.id || null });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 500);
  }
});

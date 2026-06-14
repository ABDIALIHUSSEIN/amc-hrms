// AMC HRMS — Tabaarak SMS gateway. Creds (user/pass) stored in RLS-locked
// integration_config, never in the browser. Sends server-side. Admin-only.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const ADMIN_ROLES = ["super_admin","corporate_admin","hr_director","hr_manager"];
const MASTER_EMAILS = ["admin@asalmedia.so","superadmin@asalmedia.so"];
function json(o: unknown, s = 200){ return new Response(JSON.stringify(o), { status:s, headers:{...cors,"Content-Type":"application/json"} }); }

// Local Somali format the gateway wants: digits only, no +, no 252, no leading 0.
function localNum(raw: string){
  let n = (raw||"").replace(/\D/g,"");
  if (n.startsWith("252")) n = n.slice(3);
  if (n.startsWith("0")) n = n.slice(1);
  return n;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error:"Method not allowed" }, 405);
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const admin = createClient(url, serviceKey, { auth:{ persistSession:false, autoRefreshToken:false } });

    const jwt = (req.headers.get("Authorization")||"").replace(/^Bearer\s+/i,"");
    if (!jwt) return json({ error:"Not authenticated" }, 401);
    const { data: cd, error: ce } = await admin.auth.getUser(jwt);
    const email = cd?.user?.email?.toLowerCase();
    if (ce || !email) return json({ error:"Invalid session" }, 401);
    const { data: row } = await admin.from("hrms_users").select("role").ilike("email", email).maybeSingle();
    const role = row?.role || (MASTER_EMAILS.includes(email) ? "super_admin" : null);
    if (!role || !ADMIN_ROLES.includes(role)) return json({ error:"Not authorized for SMS settings" }, 403);

    const body = await req.json().catch(()=>({}));
    const action = String(body.action || "status");

    if (action === "save_config") {
      const u = String(body.user||"").trim(), p = String(body.pass||"").trim();
      if (!u || !p) return json({ error:"Gateway username and password are required" }, 400);
      const { error } = await admin.from("integration_config").upsert({ key:"sms", value:{ user:u, pass:p }, updated_at:new Date().toISOString() });
      if (error) return json({ error:error.message }, 500);
      return json({ ok:true, configured:true });
    }
    if (action === "status") {
      const { data } = await admin.from("integration_config").select("value").eq("key","sms").maybeSingle();
      const v = (data?.value||{}) as Record<string,string>;
      return json({ configured: !!(v.user && v.pass) });
    }
    if (action === "send" || action === "test") {
      const rec = localNum(String(body.to||""));
      const msg = String(body.message||"").trim();
      if (!rec || !msg) return json({ error:"Recipient number and message are required" }, 400);
      let u = String(body.user||"").trim(), p = String(body.pass||"").trim();
      if (!u || !p) {
        const { data } = await admin.from("integration_config").select("value").eq("key","sms").maybeSingle();
        const v = (data?.value||{}) as Record<string,string>; u = v.user||""; p = v.pass||"";
      }
      if (!u || !p) return json({ error:"SMS is not configured yet" }, 400);
      const q = `https://tabaarakict.so/SendSMS.aspx?user=${encodeURIComponent(u)}&pass=${encodeURIComponent(p)}&cont=${encodeURIComponent(msg)}&rec=${encodeURIComponent(rec)}&waitMsgId=1`;
      const res = await fetch(q);
      const txt = await res.text();
      let ok = false, info: any = txt;
      try { const j = JSON.parse(txt); info = j; ok = !!(j?.Result?.AcceptedForDelivery); } catch { ok = res.ok && /success/i.test(txt); }
      if (!ok) return json({ error: (typeof info==="object" ? (info?.Result?.Message||JSON.stringify(info)) : String(info)) || "SMS gateway rejected", raw: info }, 400);
      return json({ ok:true, to:rec, result:info });
    }
    return json({ error:"Unknown action" }, 400);
  } catch(e){ return json({ error:String((e as Error)?.message||e) }, 500); }
});

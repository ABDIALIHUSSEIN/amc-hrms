# AMC HRMS — Production Deployment Checklist

Status after audit (2026-06-11): **⚠️ Front-end fixes applied; NOT yet production-safe for real HR data.**
The fixes below closed several critical issues, but the core blocker — no server-enforced
authentication/authorization — requires a backend and is **not** solved by this front-end.

---

## ✅ Done in this pass (verified live)
- [x] Payroll Excel export: blank `Base Salary / Allowance / Gratuity / Status` columns fixed.
- [x] Added Loan, Advance, and Annual Bonus Excel reports (were missing).
- [x] Stored XSS closed: `esc()` render-escaping at proven sinks + `sanitizeText()` on HR free-text inputs. Verified an `<img onerror>` payload no longer executes.
- [x] Management PAT removed from committed `.mcp.json` → now `${SUPABASE_ACCESS_TOKEN}` env ref; added `.gitignore`, `.mcp.json.example`, `.env.example`.
- [x] Corrected `supabase_schema.sql` (matches app columns) + production authenticated-RLS template appended.

## 🔴 MUST do before any real deployment (blockers)
- [ ] **Rotate the exposed `sbp_...` management token NOW.** It was committed in plaintext. Supabase Dashboard → Account → Access Tokens → revoke the old one, issue a new one, `export SUPABASE_ACCESS_TOKEN=...`.
- [ ] **Replace fake auth with real auth.** Today any of `admin123 / password / admin / amc2026` logs in as anyone; role is read client-side. Use Supabase Auth (per-user JWT) or a backend API holding the `service_role` key. Until then, RBAC is cosmetic.
- [ ] **Hash passwords** server-side (bcrypt/argon2). No plaintext, no shared demo passwords.
- [ ] **Enable authenticated RLS** (template in `supabase_schema.sql`). The current `anon all` policies let anyone with the publishable key read/write all payroll — demo only.
- [ ] **Apply the schema to the live project** — it is not applied yet (app runs in offline mode).

## 🟠 Should do before launch
- [ ] Move shared data off browser `localStorage` (per-browser, diverges across HR staff) onto Supabase/backend so the team shares one dataset.
- [ ] Add a Content-Security-Policy header and SRI hashes on the CDN `<script>` tags (chart.js, xlsx).
- [ ] Audit the remaining ~60 `innerHTML` template sites and either route user data through `esc()` or adopt DOMPurify; extend `sanitizeText()` to the loan/advance/disciplinary/KPI/user forms.
- [ ] Real error tracking + server logs (the in-app audit log is client-side and resettable).
- [ ] Automated DB backups (Supabase scheduled backups or `pg_dump` cron) + a tested restore.

## Deploy steps (static front-end)
1. Rotate token (above). Confirm `.mcp.json` / `.env` are gitignored: `git status` shows them ignored.
2. Apply `supabase_schema.sql` in Supabase SQL editor; switch the RLS block to the authenticated policies.
3. Set the publishable key + URL in `supabase.js` (or inject at build).
4. Host the static files (Cloudflare Pages / Netlify / Nginx). Serve over HTTPS only.
5. Smoke test: login, render every module, run each export, confirm no console errors.

## Verdict
This is safe to demo internally. It is **not** safe to hold real salaries/PII until the
auth + RLS blockers above are done — that's a backend build, not a config change.

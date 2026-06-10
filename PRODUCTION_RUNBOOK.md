# AMC HRMS — Production Deploy Runbook

Follow these steps in order. Steps 1–4 are one-time database setup; step 5 deploys;
step 6 is your go-live test. Everything you need to paste is in this repo.

---

## ⛔ Step 0 — Rotate the leaked token FIRST (2 min, do not skip)
The old management token was committed in plaintext and must be considered burned.
1. Supabase Dashboard → **Account → Access Tokens** → revoke `sbp_7c244bdf…`.
2. Generate a new one. You only need it for local tooling, not the live app.
3. `export SUPABASE_ACCESS_TOKEN=sbp_yourNewToken` (it's already referenced in `.mcp.json`).

---

## Step 1 — Create the database (5 min)
1. Open the file `supabase_schema.sql` in this repo.
2. **Edit one line first:** find `current_hr_role()` near the bottom and change
   the bootstrap email `'admin@asalmedia.so'` to **your** real super-admin email.
3. Supabase Dashboard → **SQL Editor → New Query** → paste the whole file → **Run**.
4. You should see `AMC HRMS production schema + RLS + org seed applied`.
   This creates all tables, the 4 subsidiaries + 27 departments, and the security
   policies. No fake employees/payroll — production starts clean.

## Step 2 — Create your admin login (3 min)
The app uses **real Supabase Auth**. A login = a Supabase Auth user.
1. Dashboard → **Authentication → Users → Add user**.
2. Email = the same admin email you set in Step 1. Set a strong password.
   Tick **Auto Confirm User** so it's active immediately.
3. Link that login to the super-admin role: SQL Editor → run (use your email):
   ```sql
   insert into hrms_users (id, username, email, role, status)
   values ('USR_ADMIN', 'superadmin', 'YOUR_ADMIN_EMAIL', 'super_admin', 'Active')
   on conflict (id) do update set role = 'super_admin', status = 'Active';
   ```

## Step 3 — Confirm app config (1 min)
In `supabase.js`, confirm `SUPA.URL` and `SUPA.KEY` (publishable key) match your
project (Dashboard → **Settings → API**). The publishable key is safe to ship —
security is enforced by the RLS you just applied, not by hiding the key.

## Step 4 — Lock Auth settings (2 min)
Dashboard → **Authentication → Providers / Settings**:
- **Disable "Enable email signups"** unless you want anyone to self-register.
  For an HR system you add users yourself (Step 5), so keep signups OFF.
- Confirm **Email** provider is enabled (for password login).

## Step 5 — Deploy the static files (5 min)
The app is plain static files (`index.html`, `app.js`, `data.js`, `style.css`,
`supabase.js`). Host on any static host over **HTTPS**:
- **Cloudflare Pages / Netlify:** drag-drop the folder, or connect the repo.
- **Nginx/VPS:** copy the files to the web root; force HTTPS.
- ⚠️ Do **not** upload `.mcp.json`, `.env`, or `*_old.sql` (already in `.gitignore`).

## Step 6 — Go-live test (2 min)
1. Open your deployed URL. You should see the login screen (no auto-login).
2. Log in with the admin email + password from Step 2.
3. You should land on the Dashboard with the 4 subsidiaries and 27 departments,
   and **zero** employees/payroll (clean slate). Add your first real employee.
4. Open DevTools console — there should be no errors.

---

## Adding more staff logins
Each person who logs in needs **two** things:
1. A **Supabase Auth user** (Dashboard → Authentication → Users → Add user) — this is
   their password/credential. The browser app cannot create these (that needs the
   service key), so do it in the dashboard or via the Auth Admin API.
2. An **hrms_users row** with their `email`, `role`, and `emp_id`. You can manage the
   role/profile side in the app's **User Management** page; just make sure the email
   matches their Auth user exactly.

Roles and what they can do are defined in `data.js` (`ROLES`) and enforced by the RLS
policies in `supabase_schema.sql` (`is_admin / is_hr / is_finance`).

## Multi-user coverage (Phase 2 — now complete)
**Every module now syncs to Supabase and is multi-user.** The core modules
(Employees, Payroll, Attendance, Leave, KPIs, Users) sync via column-mapped tables.
**Loans, Advances, Bonuses, Notices, Disciplinary, Recruitment (requisitions +
candidates), Training, and Succession** sync via JSONB document tables (created by
`supabase_schema.sql`). Writes propagate automatically: any create/update is pushed
to Supabase by `SupaSync.pushDocs()` (called from the app's debounced save), and all
collections load on login (`SupaSync.loadDocs()`), RLS-scoped to the user's role.

One nuance to know: row **deletions** in the doc-store modules are not auto-propagated
by the bulk push (it upserts, it doesn't remove). Most "removals" in these modules are
status changes (e.g. archiving a notice), which DO sync. If you need a hard delete to
remove a row from Supabase, it currently persists server-side until overwritten — call
`SupaWrite.deleteDoc('<table>', id)` if you wire an explicit delete button later.

## Known limitations (be honest with your team)
- **Password reset / MFA** are not wired into the UI. Use the Supabase dashboard for
  resets, or enable Supabase's email reset flow.

## Backups
Supabase Dashboard → **Database → Backups**. Enable daily backups (Pro plan) or set a
`pg_dump` cron. Test a restore before you depend on it.

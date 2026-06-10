-- ============================================================
-- AMC HRMS v2.0 — Supabase Schema (matches supabase.js integration layer)
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- Project: lxpqnlrdnsmzhvnfrgwl
--
-- Column names mirror exactly what supabase.js reads (SupaSync.loadAll)
-- and writes (SupaWrite.*). The previous schema (supabase_schema_v1_old.sql)
-- used different column names and never matched the app code.
--
-- Note: employee_id columns are intentionally NOT foreign keys — the app
-- mixes local demo IDs (EMP001) with server-generated UUIDs, and a hard FK
-- would make write-through sync fail silently for local-only records.
-- ============================================================

-- ── SUBSIDIARIES ── (seeded wholesale from data.js — columns match data.js keys)
CREATE TABLE IF NOT EXISTS subsidiaries (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  code        TEXT,
  color       TEXT DEFAULT '#001B44',
  location    TEXT DEFAULT 'Mogadishu',
  headcount   INT DEFAULT 0,
  sector      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── DEPARTMENTS ──
CREATE TABLE IF NOT EXISTS departments (
  id               TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  subsidiary_id    TEXT REFERENCES subsidiaries(id),
  name             TEXT NOT NULL,
  code             TEXT,
  head_employee_id TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ── EMPLOYEES ──
-- Writes send first_name/last_name; reads use full_name (generated column).
-- Upserts resolve on employee_number (see SUPA.upsert on_conflict).
CREATE TABLE IF NOT EXISTS employees (
  id              TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  employee_number TEXT UNIQUE NOT NULL,
  subsidiary_id   TEXT,
  department_id   TEXT,
  team_id         TEXT,
  first_name      TEXT NOT NULL,
  last_name       TEXT NOT NULL DEFAULT '',
  full_name       TEXT GENERATED ALWAYS AS (TRIM(first_name || ' ' || last_name)) STORED,
  title           TEXT,
  email           TEXT,
  phone           TEXT,
  gender          TEXT CHECK (gender IN ('Male','Female')),
  base_salary     NUMERIC DEFAULT 0,
  allowance       NUMERIC DEFAULT 0,
  joined_date     DATE,
  dob             DATE,
  status          TEXT DEFAULT 'Active',
  contract_type   TEXT DEFAULT 'Permanent',
  nationality     TEXT DEFAULT 'Somali',
  exit_date       DATE,
  exit_reason     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── SYSTEM USERS ──
CREATE TABLE IF NOT EXISTS hrms_users (
  id              TEXT PRIMARY KEY,
  username        TEXT UNIQUE NOT NULL,
  email           TEXT,
  emp_id          TEXT,
  role            TEXT DEFAULT 'employee',
  status          TEXT DEFAULT 'Active',
  last_login      TIMESTAMPTZ,
  failed_attempts INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── LEAVE REQUESTS ──
CREATE TABLE IF NOT EXISTS leave_requests (
  id          TEXT PRIMARY KEY,
  employee_id TEXT,
  type        TEXT NOT NULL,
  from_date   DATE NOT NULL,
  to_date     DATE NOT NULL,
  days        NUMERIC NOT NULL,
  reason      TEXT,
  status      TEXT DEFAULT 'Pending',
  approved_by TEXT,
  applied_on  DATE DEFAULT CURRENT_DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── LEAVE BALANCES ── (one row per employee per leave type)
CREATE TABLE IF NOT EXISTS leave_balances (
  employee_id     TEXT NOT NULL,
  leave_type_code TEXT NOT NULL,        -- 'ANNUAL' | 'SICK' | 'MATERNITY'
  entitled_days   NUMERIC DEFAULT 0,
  used_days       NUMERIC DEFAULT 0,
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (employee_id, leave_type_code)
);

-- ── KPI TEMPLATES ──
CREATE TABLE IF NOT EXISTS kpi_templates (
  id         TEXT PRIMARY KEY,
  name       TEXT NOT NULL,
  role       TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS kpi_template_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id TEXT REFERENCES kpi_templates(id) ON DELETE CASCADE,
  kpi_key     TEXT NOT NULL,
  title       TEXT NOT NULL,
  type        TEXT DEFAULT 'Numerical',
  unit        TEXT,
  weight      NUMERIC DEFAULT 25,
  description TEXT,
  target      NUMERIC DEFAULT 0,
  sort_order  INT DEFAULT 0
);

-- ── KPIs (employee assignments) ──
CREATE TABLE IF NOT EXISTS kpis (
  id          TEXT PRIMARY KEY,
  employee_id TEXT,
  template_id TEXT,
  title       TEXT NOT NULL,
  type        TEXT DEFAULT 'Numerical',
  unit        TEXT,
  target      NUMERIC DEFAULT 0,
  actual      NUMERIC DEFAULT 0,
  weight      NUMERIC DEFAULT 25,
  period      TEXT,
  notes       TEXT,
  deleted_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── EDUCATION RECORDS ──
CREATE TABLE IF NOT EXISTS education_records (
  id           TEXT PRIMARY KEY,
  employee_id  TEXT,
  institution  TEXT NOT NULL,
  degree       TEXT,
  field        TEXT,
  grad_year    INT,
  gpa          TEXT,
  certificates JSONB DEFAULT '[]',
  verified     BOOLEAN DEFAULT FALSE,
  deleted_at   TIMESTAMPTZ,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ── AUDIT LOGS ──
CREATE TABLE IF NOT EXISTS audit_logs (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  time        TIMESTAMPTZ DEFAULT NOW(),
  user_ref    TEXT,
  user_role   TEXT,
  action      TEXT,
  description TEXT,
  module      TEXT,
  ip_address  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── PAYROLL ── (composite PK so PostgREST upsert merge-duplicates is idempotent)
CREATE TABLE IF NOT EXISTS payroll (
  employee_id      TEXT NOT NULL,
  month            TEXT NOT NULL,       -- 'YYYY-MM'
  base_salary      NUMERIC DEFAULT 0,
  allowance        NUMERIC DEFAULT 0,
  ot_hours         NUMERIC DEFAULT 0,
  advance          NUMERIC DEFAULT 0,
  late_deduction   NUMERIC DEFAULT 0,
  absent_deduction NUMERIC DEFAULT 0,
  eid_bonus        NUMERIC DEFAULT 0,
  status           TEXT DEFAULT 'Pending',
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (employee_id, month)
);

-- ── ATTENDANCE ── (composite PK, same upsert reasoning as payroll)
CREATE TABLE IF NOT EXISTS attendance (
  employee_id TEXT NOT NULL,
  date        DATE NOT NULL,
  check_in    TIME,
  check_out   TIME,
  status      TEXT DEFAULT 'Present',
  shift_id    TEXT DEFAULT 'Morning',
  ot_hours    NUMERIC DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (employee_id, date)
);

-- ============================================================
-- ORG STRUCTURE SEED — the only data shipped to production.
-- All employee/payroll/leave/etc. data starts empty; you add real records
-- through the app. Safe to re-run (on conflict do nothing).
-- ============================================================
insert into subsidiaries (id,name,code,color,location,sector) values ('jiil','JIIL Media','JML','#C9A227','Mogadishu','Digital Media') on conflict (id) do nothing;
insert into subsidiaries (id,name,code,color,location,sector) values ('asal_tv','Asal TV','ATV','#001B44','Mogadishu','Television') on conflict (id) do nothing;
insert into subsidiaries (id,name,code,color,location,sector) values ('masrax','Masrax Production','MPR','#8B0000','Mogadishu','Film & Production') on conflict (id) do nothing;
insert into subsidiaries (id,name,code,color,location,sector) values ('nasiye','Nasiye','NSY','#0D6E3F','Mogadishu','News & Media') on conflict (id) do nothing;

insert into departments (id,subsidiary_id,name) values ('jiil_editorial','jiil','News & Editorial') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('jiil_digital','jiil','Digital Content') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('jiil_tech','jiil','Technology & IT') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('jiil_hr','jiil','Human Resources') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('jiil_finance','jiil','Finance & Accounting') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('jiil_marketing','jiil','Marketing & Sales') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('jiil_admin','jiil','Administration') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('atv_broadcast','asal_tv','Broadcasting & On-Air') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('atv_production','asal_tv','Production & Studio') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('atv_marketing','asal_tv','Marketing & Promotions') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('atv_tech','asal_tv','Technical Operations') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('atv_news','asal_tv','News & Journalism') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('atv_hr','asal_tv','Human Resources') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('atv_finance','asal_tv','Finance & Accounting') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('mpr_film','masrax','Film Production') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('mpr_post','masrax','Post Production') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('mpr_creative','masrax','Creative & Design') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('mpr_sound','masrax','Sound & Music') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('mpr_hr','masrax','Human Resources') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('mpr_finance','masrax','Finance & Accounting') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('nsy_editorial','nasiye','Editorial & Content') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('nsy_digital','nasiye','Digital & Social Media') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('nsy_ops','nasiye','Operations') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('nsy_hr','nasiye','Human Resources') on conflict (id) do nothing;
insert into departments (id,subsidiary_id,name) values ('nsy_finance','nasiye','Finance & Accounting') on conflict (id) do nothing;

-- Bootstrap super-admin row so the created admin appears in User Management.
-- (Login already works via the email allowlist in current_hr_role below; this
--  just gives the admin a directory record. Change the email if yours differs.)
insert into hrms_users (id,username,email,role,status)
  values ('USR000','superadmin','admin@asalmedia.so','super_admin','Active')
  on conflict (id) do nothing;

-- ============================================================
-- ROLE HELPERS — resolve the signed-in user's role from their JWT email.
-- SECURITY DEFINER so the lookup itself isn't blocked by RLS on hrms_users.
-- ⚠️ EDIT the bootstrap admin email below to YOUR super-admin email so the
--    very first login works before any hrms_users row exists.
-- ============================================================
create or replace function current_hr_role() returns text
  language sql stable security definer set search_path = public as $$
  select coalesce(
    (select role from hrms_users
       where lower(email) = lower(auth.jwt() ->> 'email') and status = 'Active' limit 1),
    case when lower(auth.jwt() ->> 'email') in ('sirabdiali@gmail.com','admin@asalmedia.so','superadmin@asalmedia.so')
         then 'super_admin' else 'employee' end
  );
$$;

create or replace function my_emp_id() returns text
  language sql stable security definer set search_path = public as $$
  select emp_id from hrms_users where lower(email) = lower(auth.jwt() ->> 'email') limit 1;
$$;

create or replace function is_admin()   returns boolean language sql stable as $$
  select current_hr_role() in ('super_admin','corporate_admin','hr_director'); $$;
create or replace function is_hr()      returns boolean language sql stable as $$
  select current_hr_role() in ('super_admin','corporate_admin','hr_director','hr_manager'); $$;
create or replace function is_finance() returns boolean language sql stable as $$
  select current_hr_role() in ('super_admin','corporate_admin','hr_director','finance_manager'); $$;

-- ============================================================
-- ROW LEVEL SECURITY — production policies (authenticated users only).
-- Reads: any signed-in HR user can view the directory/config they need.
-- Writes: gated by role. Payroll is finance/admin-only (employees see own).
-- The bare publishable key (no JWT) can do NOTHING — every policy requires
-- an authenticated session.
-- ============================================================
do $$
declare t text;
begin
  -- enable RLS + drop any old demo policy on every table
  foreach t in array array[
    'subsidiaries','departments','employees','hrms_users',
    'leave_requests','leave_balances','kpi_templates','kpi_template_items',
    'kpis','education_records','audit_logs','payroll','attendance'
  ] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "Allow anon all" on %I', t);
    execute format('drop policy if exists "read" on %I', t);
    execute format('drop policy if exists "write" on %I', t);
  end loop;
end $$;

-- Config + directory: read for any authenticated user; write for admins/HR.
create policy "read"  on subsidiaries      for select to authenticated using (true);
create policy "write" on subsidiaries      for all    to authenticated using (is_admin()) with check (is_admin());
create policy "read"  on departments       for select to authenticated using (true);
create policy "write" on departments       for all    to authenticated using (is_admin()) with check (is_admin());
create policy "read"  on kpi_templates     for select to authenticated using (true);
create policy "write" on kpi_templates     for all    to authenticated using (is_hr()) with check (is_hr());
create policy "read"  on kpi_template_items for select to authenticated using (true);
create policy "write" on kpi_template_items for all   to authenticated using (is_hr()) with check (is_hr());

create policy "read"  on employees         for select to authenticated using (true);
create policy "write" on employees         for all    to authenticated using (is_hr()) with check (is_hr());

-- Account records: a user sees their own row; admins manage all.
create policy "read"  on hrms_users        for select to authenticated
  using (is_admin() or lower(email) = lower(auth.jwt() ->> 'email'));
create policy "write" on hrms_users        for all    to authenticated using (is_admin()) with check (is_admin());

create policy "read"  on attendance        for select to authenticated using (true);
create policy "write" on attendance        for all    to authenticated using (is_hr()) with check (is_hr());

-- Leave: HR manages all; an employee may file/read their own.
create policy "read"  on leave_requests    for select to authenticated using (true);
create policy "write" on leave_requests    for all    to authenticated
  using (is_hr() or employee_id = my_emp_id()) with check (is_hr() or employee_id = my_emp_id());
create policy "read"  on leave_balances    for select to authenticated using (true);
create policy "write" on leave_balances    for all    to authenticated using (is_hr()) with check (is_hr());

create policy "read"  on kpis              for select to authenticated using (true);
create policy "write" on kpis              for all    to authenticated using (is_hr()) with check (is_hr());
create policy "read"  on education_records for select to authenticated using (true);
create policy "write" on education_records for all    to authenticated using (is_hr()) with check (is_hr());

-- Payroll: finance/admin only; an employee may read their OWN payslip rows.
create policy "read"  on payroll           for select to authenticated
  using (is_finance() or employee_id = my_emp_id());
create policy "write" on payroll           for all    to authenticated using (is_finance()) with check (is_finance());

-- Audit log: admins read; any authenticated action can append.
create policy "read"  on audit_logs        for select to authenticated using (is_admin());
create policy "write" on audit_logs        for insert to authenticated with check (true);

-- ============================================================
-- PHASE 2 — DOCUMENT-STORE MODULES (multi-user sync)
-- Loans, Advances, Bonuses, Notices, Disciplinary, Recruitment, Training,
-- Succession. Stored as JSONB docs so the app's nested fields (loan history,
-- notice tags/acks, succession candidates) round-trip without column mapping.
-- Each row is (id, doc). RLS gates by role; money is finance/own, HR cases
-- are HR-only, succession is admin-only.
-- ============================================================
create table if not exists loans              (id text primary key, doc jsonb not null, updated_at timestamptz default now());
create table if not exists salary_advances    (id text primary key, doc jsonb not null, updated_at timestamptz default now());
create table if not exists bonuses            (id text primary key, doc jsonb not null, updated_at timestamptz default now());
create table if not exists notices            (id text primary key, doc jsonb not null, updated_at timestamptz default now());
create table if not exists notice_acks        (id text primary key, doc jsonb not null, updated_at timestamptz default now());
create table if not exists disciplinary_cases (id text primary key, doc jsonb not null, updated_at timestamptz default now());
create table if not exists requisitions       (id text primary key, doc jsonb not null, updated_at timestamptz default now());
create table if not exists candidates         (id text primary key, doc jsonb not null, updated_at timestamptz default now());
create table if not exists trainings          (id text primary key, doc jsonb not null, updated_at timestamptz default now());
create table if not exists succession_plans   (id text primary key, doc jsonb not null, updated_at timestamptz default now());

do $$
declare t text;
begin
  foreach t in array array[
    'loans','salary_advances','bonuses','notices','notice_acks',
    'disciplinary_cases','requisitions','candidates','trainings','succession_plans'
  ] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "read" on %I', t);
    execute format('drop policy if exists "write" on %I', t);
  end loop;
end $$;

-- Money: finance/admin manage; an employee can read their OWN records.
create policy "read"  on loans              for select to authenticated using (is_finance() or (doc ->> 'empId') = my_emp_id());
create policy "write" on loans              for all    to authenticated using (is_finance()) with check (is_finance());
create policy "read"  on salary_advances    for select to authenticated using (is_finance() or (doc ->> 'empId') = my_emp_id());
create policy "write" on salary_advances    for all    to authenticated using (is_finance() or (doc ->> 'empId') = my_emp_id()) with check (is_finance() or (doc ->> 'empId') = my_emp_id());
create policy "read"  on bonuses            for select to authenticated using (is_finance() or (doc ->> 'empId') = my_emp_id());
create policy "write" on bonuses            for all    to authenticated using (is_finance()) with check (is_finance());

-- Notices: everyone authenticated reads; HR/admin author. Acks: anyone records own.
create policy "read"  on notices            for select to authenticated using (true);
create policy "write" on notices            for all    to authenticated using (is_hr()) with check (is_hr());
create policy "read"  on notice_acks        for select to authenticated using (true);
create policy "write" on notice_acks        for all    to authenticated using (true) with check (true);

-- HR-sensitive: disciplinary cases + candidate pipeline are HR/admin only.
create policy "read"  on disciplinary_cases for select to authenticated using (is_hr());
create policy "write" on disciplinary_cases for all    to authenticated using (is_hr()) with check (is_hr());
create policy "read"  on candidates         for select to authenticated using (is_hr());
create policy "write" on candidates         for all    to authenticated using (is_hr()) with check (is_hr());

-- Open to all staff to read; HR manages.
create policy "read"  on requisitions       for select to authenticated using (true);
create policy "write" on requisitions       for all    to authenticated using (is_hr()) with check (is_hr());
create policy "read"  on trainings          for select to authenticated using (true);
create policy "write" on trainings          for all    to authenticated using (is_hr()) with check (is_hr());

-- Succession is leadership-sensitive: admins only.
create policy "read"  on succession_plans   for select to authenticated using (is_admin());
create policy "write" on succession_plans   for all    to authenticated using (is_admin()) with check (is_admin());

select 'AMC HRMS production schema + RLS + org seed + Phase 2 doc-sync applied' as status;

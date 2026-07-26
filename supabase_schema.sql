-- ============================================================
-- AMC HRMS v2.0 — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── SUBSIDIARIES ──
CREATE TABLE IF NOT EXISTS subsidiaries (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  code        TEXT NOT NULL,
  color       TEXT DEFAULT '#001B44',
  location    TEXT DEFAULT 'Mogadishu',
  headcount   INT DEFAULT 0,
  sector      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── DEPARTMENTS ──
CREATE TABLE IF NOT EXISTS departments (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  subsidiary  TEXT REFERENCES subsidiaries(id),
  head_emp_id TEXT,
  count       INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── TEAMS ──
CREATE TABLE IF NOT EXISTS teams (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  dept_id     TEXT REFERENCES departments(id),
  subsidiary  TEXT REFERENCES subsidiaries(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── EMPLOYEES ──
CREATE TABLE IF NOT EXISTS employees (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  title           TEXT,
  dept_id         TEXT REFERENCES departments(id),
  subsidiary      TEXT REFERENCES subsidiaries(id),
  team_id         TEXT REFERENCES teams(id),
  grade           TEXT,
  salary          NUMERIC DEFAULT 0,
  allowance       NUMERIC DEFAULT 0,
  contract_type   TEXT DEFAULT 'Permanent',
  email           TEXT UNIQUE,
  phone           TEXT,
  joined          DATE,
  dob             DATE,
  gender          TEXT CHECK (gender IN ('M','F')),
  nationality     TEXT DEFAULT 'Somali',
  status          TEXT DEFAULT 'Active' CHECK (status IN ('Active','On Leave','Resigned','Terminated','Contract','Inactive')),
  exit_date       DATE,
  exit_reason     TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── SYSTEM USERS ──
CREATE TABLE IF NOT EXISTS hrms_users (
  id              TEXT PRIMARY KEY,
  username        TEXT UNIQUE NOT NULL,
  email           TEXT UNIQUE NOT NULL,
  emp_id          TEXT REFERENCES employees(id),
  role            TEXT DEFAULT 'viewer',
  status          TEXT DEFAULT 'Active' CHECK (status IN ('Active','Inactive')),
  last_login      TIMESTAMPTZ,
  failed_attempts INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── LEAVE BALANCES ──
CREATE TABLE IF NOT EXISTS leave_balances (
  emp_id          TEXT PRIMARY KEY REFERENCES employees(id),
  annual          INT DEFAULT 21,
  sick            INT DEFAULT 14,
  maternity       INT DEFAULT 0,
  used_annual     INT DEFAULT 0,
  used_sick       INT DEFAULT 0,
  used_maternity  INT DEFAULT 0,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── LEAVE REQUESTS ──
CREATE TABLE IF NOT EXISTS leave_requests (
  id              TEXT PRIMARY KEY,
  emp_id          TEXT REFERENCES employees(id),
  type            TEXT NOT NULL,
  from_date       DATE NOT NULL,
  to_date         DATE NOT NULL,
  days            INT NOT NULL,
  reason          TEXT,
  status          TEXT DEFAULT 'Pending' CHECK (status IN ('Pending','Approved','Rejected')),
  approved_by     TEXT REFERENCES employees(id),
  applied_on      DATE DEFAULT CURRENT_DATE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── ATTENDANCE ──
CREATE TABLE IF NOT EXISTS attendance (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  emp_id          TEXT REFERENCES employees(id),
  date            DATE NOT NULL,
  check_in        TIME,
  check_out       TIME,
  status          TEXT DEFAULT 'Present',
  shift           TEXT DEFAULT 'Morning',
  ot_hours        NUMERIC DEFAULT 0,
  short_hrs       NUMERIC DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(emp_id, date)
);

-- ── PAYROLL ──
CREATE TABLE IF NOT EXISTS payroll (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  emp_id          TEXT REFERENCES employees(id),
  month           TEXT NOT NULL,
  base_salary     NUMERIC DEFAULT 0,
  allowance       NUMERIC DEFAULT 0,
  ot_hours        NUMERIC DEFAULT 0,
  advance         NUMERIC DEFAULT 0,
  late_deduction  NUMERIC DEFAULT 0,
  absent_deduction NUMERIC DEFAULT 0,
  eid_bonus       NUMERIC DEFAULT 0,
  status          TEXT DEFAULT 'Pending' CHECK (status IN ('Pending','Processed')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(emp_id, month)
);

-- ── KPI TEMPLATES ──
CREATE TABLE IF NOT EXISTS kpi_templates (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS kpi_template_items (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  template_id     TEXT REFERENCES kpi_templates(id) ON DELETE CASCADE,
  kpi_key         TEXT NOT NULL,
  title           TEXT NOT NULL,
  type            TEXT DEFAULT 'Numerical',
  unit            TEXT,
  weight          NUMERIC DEFAULT 25,
  description     TEXT,
  target          NUMERIC DEFAULT 0
);

-- ── KPIs (Employee Assignments) ──
CREATE TABLE IF NOT EXISTS kpis (
  id              TEXT PRIMARY KEY,
  emp_id          TEXT REFERENCES employees(id),
  template_id     TEXT REFERENCES kpi_templates(id),
  title           TEXT NOT NULL,
  type            TEXT DEFAULT 'Numerical',
  unit            TEXT,
  target          NUMERIC DEFAULT 0,
  actual          NUMERIC DEFAULT 0,
  weight          NUMERIC DEFAULT 25,
  period          TEXT,
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── EDUCATION RECORDS ──
CREATE TABLE IF NOT EXISTS education_records (
  id              TEXT PRIMARY KEY,
  emp_id          TEXT REFERENCES employees(id),
  institution     TEXT NOT NULL,
  degree          TEXT NOT NULL,
  field           TEXT NOT NULL,
  grad_year       INT,
  gpa             TEXT,
  certificates    TEXT[],
  verified        BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── AUDIT LOGS ──
CREATE TABLE IF NOT EXISTS audit_logs (
  id              SERIAL PRIMARY KEY,
  time            TIMESTAMPTZ DEFAULT NOW(),
  user_ref        TEXT,
  user_role       TEXT,
  action          TEXT NOT NULL,
  module          TEXT,
  ip_address      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── NOTIFICATIONS ──
CREATE TABLE IF NOT EXISTS notifications (
  id              SERIAL PRIMARY KEY,
  type            TEXT,
  text            TEXT NOT NULL,
  time_label      TEXT,
  is_read         BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── DISCIPLINARY CASES ──
CREATE TABLE IF NOT EXISTS disciplinary_cases (
  id              TEXT PRIMARY KEY,
  emp_id          TEXT REFERENCES employees(id),
  type            TEXT NOT NULL,
  severity        TEXT,
  date            DATE,
  reported_by     TEXT REFERENCES employees(id),
  investigator    TEXT REFERENCES employees(id),
  status          TEXT DEFAULT 'Open',
  action          TEXT,
  action_date     DATE,
  description     TEXT,
  resolution      TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── RECRUITMENT REQUISITIONS ──
CREATE TABLE IF NOT EXISTS requisitions (
  id              TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  dept_id         TEXT REFERENCES departments(id),
  subsidiary      TEXT REFERENCES subsidiaries(id),
  grade           TEXT,
  salary_min      NUMERIC,
  salary_max      NUMERIC,
  status          TEXT DEFAULT 'New',
  requested_by    TEXT REFERENCES employees(id),
  approved_by     TEXT REFERENCES employees(id),
  date            DATE DEFAULT CURRENT_DATE,
  kpis            TEXT,
  has_jd          BOOLEAN DEFAULT FALSE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── ROW LEVEL SECURITY ──
ALTER TABLE employees          ENABLE ROW LEVEL SECURITY;
ALTER TABLE hrms_users         ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance         ENABLE ROW LEVEL SECURITY;
ALTER TABLE leave_requests     ENABLE ROW LEVEL SECURITY;
ALTER TABLE payroll            ENABLE ROW LEVEL SECURITY;
ALTER TABLE kpis               ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs         ENABLE ROW LEVEL SECURITY;

-- Allow anon read access for the HRMS app (browser client)
CREATE POLICY "Allow anon read" ON employees         FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON subsidiaries      FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON departments       FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON teams             FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON hrms_users        FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON leave_balances    FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON leave_requests    FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON attendance        FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON payroll           FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON kpis              FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON kpi_templates     FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON kpi_template_items FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON education_records FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON audit_logs        FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON notifications     FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON disciplinary_cases FOR SELECT USING (true);
CREATE POLICY "Allow anon read" ON requisitions      FOR SELECT USING (true);

-- Allow anon write (insert/update/delete) for HRMS operations
CREATE POLICY "Allow anon write" ON employees         FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON hrms_users        FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON attendance        FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON leave_requests    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON leave_balances    FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON payroll           FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON kpis              FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON kpi_templates     FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON kpi_template_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON education_records FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON audit_logs        FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON notifications     FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON disciplinary_cases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon write" ON requisitions      FOR ALL USING (true) WITH CHECK (true);

SELECT 'AMC HRMS Schema created successfully' AS status;

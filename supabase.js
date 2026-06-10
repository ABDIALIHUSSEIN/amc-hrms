/* ============================================================
   AMC HRMS v2.0 — Supabase Integration Layer
   Project: lxpqnlrdnsmzhvnfrgwl.supabase.co
   Key type: Publishable (browser-only, domain-safe)
============================================================ */
'use strict';

const SUPA = {
  URL: 'https://lxpqnlrdnsmzhvnfrgwl.supabase.co',
  KEY: 'sb_publishable_axozTSrqIVRABArAnSuSqg_iySXJ115',

  // Set to the logged-in user's JWT by Auth.* below. All PostgREST calls then
  // carry the user's identity so server-side RLS can enforce who sees/edits what.
  authToken: null,

  headers() {
    return {
      'apikey':        this.KEY,
      'Authorization': `Bearer ${this.authToken || this.KEY}`,
      'Content-Type':  'application/json',
    };
  },

  async fetch(endpoint, options = {}) {
    const url = `${this.URL}/rest/v1/${endpoint}`;
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          ...this.headers(),
          'Prefer': options.prefer || 'return=representation',
          ...(options.headers || {}),
        },
      });
      if (res.status === 204) return null;
      const text = await res.text();
      if (!res.ok) throw new Error(`${res.status}: ${text}`);
      return text ? JSON.parse(text) : null;
    } catch (err) {
      if (err.message.includes('Host not in allowlist')) {
        SupaSync.connected = false;
        throw new Error('Supabase key domain restriction — add your domain in Supabase Dashboard → Settings → API → Allowed Origins');
      }
      throw err;
    }
  },

  async select(table, query = '') { return this.fetch(`${table}?${query}`); },
  async insert(table, data) {
    return this.fetch(table, { method: 'POST', body: JSON.stringify(data) });
  },
  async update(table, filter, data) {
    return this.fetch(`${table}?${filter}`, { method: 'PATCH', body: JSON.stringify(data) });
  },
  async upsert(table, data, onConflict) {
    // onConflict: unique column(s) to resolve on when the payload has no PK
    // (e.g. employees are upserted by employee_number, not id)
    const endpoint = onConflict ? `${table}?on_conflict=${onConflict}` : table;
    return this.fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(Array.isArray(data) ? data : [data]),
      prefer: 'resolution=merge-duplicates,return=representation',
    });
  },
  async delete(table, filter) {
    return this.fetch(`${table}?${filter}`, { method: 'DELETE' });
  },
};

/* ============================================================
   Auth — real authentication via Supabase Auth (GoTrue).
   Replaces the old client-side password check. The browser sends the
   user's email+password to Supabase, gets back a signed JWT, and that
   JWT is attached (SUPA.authToken) to every database call so RLS policies
   enforce access server-side. Tokens persist in localStorage and refresh.
============================================================ */
const Auth = {
  TOKEN_KEY: 'amc_hrms_auth',

  async signIn(email, password) {
    const res = await fetch(`${SUPA.URL}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      headers: { 'apikey': SUPA.KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data.error_description || data.msg || data.error || 'Invalid email or password';
      throw new Error(msg);
    }
    this._store(data);
    return data;
  },

  async refresh() {
    const saved = this._load();
    if (!saved || !saved.refresh_token) return null;
    try {
      const res = await fetch(`${SUPA.URL}/auth/v1/token?grant_type=refresh_token`, {
        method: 'POST',
        headers: { 'apikey': SUPA.KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: saved.refresh_token }),
      });
      if (!res.ok) { this.signOutLocal(); return null; }
      const data = await res.json();
      this._store(data);
      return data;
    } catch (e) { return null; }
  },

  // Restore a session on page load. Refreshes if the access token is near expiry.
  async restore() {
    const saved = this._load();
    if (!saved || !saved.access_token) return null;
    const nowSec = Math.floor(Date.now() / 1000);
    if (saved.expires_at && nowSec > saved.expires_at - 60) {
      return await this.refresh();
    }
    SUPA.authToken = saved.access_token;
    return saved;
  },

  async signOut() {
    const saved = this._load();
    if (saved && saved.access_token) {
      try {
        await fetch(`${SUPA.URL}/auth/v1/logout`, {
          method: 'POST',
          headers: { 'apikey': SUPA.KEY, 'Authorization': `Bearer ${saved.access_token}` },
        });
      } catch (e) { /* ignore network errors on logout */ }
    }
    this.signOutLocal();
  },

  signOutLocal() {
    SUPA.authToken = null;
    try { localStorage.removeItem(this.TOKEN_KEY); } catch (e) {}
  },

  currentUser() {
    const saved = this._load();
    return saved && saved.user ? saved.user : null;
  },

  _store(data) {
    SUPA.authToken = data.access_token;
    const payload = {
      access_token:  data.access_token,
      refresh_token: data.refresh_token,
      expires_at:    data.expires_at || (Math.floor(Date.now() / 1000) + (data.expires_in || 3600)),
      user:          data.user || null,
    };
    try { localStorage.setItem(this.TOKEN_KEY, JSON.stringify(payload)); } catch (e) {}
  },

  _load() {
    try { return JSON.parse(localStorage.getItem(this.TOKEN_KEY) || 'null'); } catch (e) { return null; }
  },
};

/* ============================================================
   SupaSync — Load Supabase data into in-memory DB cache
============================================================ */
const SupaSync = {
  connected: false,
  loading:   false,
  mode:      'local', // 'supabase' | 'local'

  async init() {
    this.loading = true;
    updateSupaStatus('connecting');
    try {
      // Test connection with a lightweight query
      const test = await SUPA.select('subsidiaries', 'select=id,name&limit=1');
      this.connected = true;

      if (Array.isArray(test) && test.length > 0) {
        // Live data exists → load all
        updateSupaStatus('loading');
        await this.loadAll();
        this.mode = 'supabase';
        toast('Connected to Supabase — live data loaded ✓', 'success');
      } else {
        // Tables empty → push local demo data up
        updateSupaStatus('seeding');
        await this.seedAll();
        await this.loadAll();
        this.mode = 'supabase';
        toast('Supabase connected — demo data synced ✓', 'success');
      }
    } catch (err) {
      console.warn('Supabase unavailable:', err.message);
      this.connected = false;
      this.mode = 'local';
      if (err.message.includes('domain restriction') || err.message.includes('allowlist')) {
        toast('Add your domain to Supabase allowed origins to enable live sync', 'warning');
        showDomainHelp();
      } else {
        toast('Running in offline mode — changes not synced to cloud', 'warning');
      }
    } finally {
      this.loading = false;
      updateSupaStatus(this.connected ? 'connected' : 'offline');
    }
  },

  async loadAll() {
    const loads = await Promise.allSettled([
      SUPA.select('subsidiaries',     'order=name'),
      SUPA.select('departments',      'order=name'),
      SUPA.select('employees',        'status=neq.Resigned&status=neq.Terminated&order=full_name&limit=500'),
      SUPA.select('hrms_users',       'status=eq.Active&order=username'),
      SUPA.select('leave_requests',   'order=applied_on.desc&limit=200'),
      SUPA.select('leave_balances',   'select=*'),
      SUPA.select('kpi_templates',    'order=name'),
      SUPA.select('kpi_template_items','order=sort_order'),
      SUPA.select('kpis',             'deleted_at=is.null&order=employee_id&limit=1000'),
      SUPA.select('education_records','deleted_at=is.null&order=grad_year.desc'),
      SUPA.select('audit_logs',       'order=created_at.desc&limit=50'),
      SUPA.select('payroll',          `order=created_at.desc&limit=200`),
      SUPA.select('attendance',       `date=eq.${new Date().toISOString().split('T')[0]}&limit=200`),
    ]);

    const [subs, depts, emps, users, leaveReqs, leaveBals,
           kpiTmpls, kpiItems, kpis, eduRecs, logs, payroll, att] = loads.map(r => r.value || []);

    if (subs?.length)   DB.subsidiaries   = subs;
    if (depts?.length)  DB.departments    = depts.map(d => ({ ...d, sub: d.subsidiary_id, head: d.head_employee_id }));
    if (emps?.length) {
      DB.employees = emps.map(e => ({
        ...e,
        dept:         e.department_id,
        sub:          e.subsidiary_id,
        team:         e.team_id,
        salary:       parseFloat(e.base_salary)  || 0,
        allowance:    parseFloat(e.allowance)     || 0,
        contractType: e.contract_type,
        exitDate:     e.exit_date  || '',
        exitReason:   e.exit_reason || '',
        joined:       e.joined_date,
        name:         e.full_name,
        gender:       e.gender === 'Male' ? 'M' : 'F',
      }));
    }
    if (users?.length) {
      DB.users = users.map(u => ({
        id:             u.id,
        username:       u.username,
        email:          u.email,
        empId:          u.emp_id || '',
        role:           u.role   || 'employee',
        status:         u.status,
        lastLogin:      u.last_login ? new Date(u.last_login).toLocaleString() : 'Never',
        failedAttempts: u.failed_attempts || 0,
        created:        u.created_at?.split('T')[0] || '',
      }));
    }
    if (leaveReqs?.length) {
      DB.leaveRequests = leaveReqs.map(l => ({
        ...l,
        empId: l.employee_id,
        from:  l.from_date,
        to:    l.to_date,
        approvedBy: l.approved_by || '',
        appliedOn:  l.applied_on,
      }));
    }
    if (leaveBals?.length) {
      DB.leaveBalances = {};
      leaveBals.forEach(lb => {
        if (!DB.leaveBalances[lb.employee_id]) DB.leaveBalances[lb.employee_id] = {};
        // Merge all leave type balances into one object per employee
        const existing = DB.leaveBalances[lb.employee_id];
        if (lb.leave_type_code === 'ANNUAL' || lb.entitled_days === 21)
          existing.annual = lb.entitled_days, existing.used_annual = Math.round(lb.used_days);
        else if (lb.leave_type_code === 'SICK' || lb.entitled_days === 14)
          existing.sick   = lb.entitled_days, existing.used_sick   = Math.round(lb.used_days);
      });
    }
    if (kpiTmpls?.length && kpiItems?.length) {
      DB.kpiTemplates = kpiTmpls.map(t => ({
        id: t.id, name: t.name, role: t.role,
        kpis: kpiItems.filter(k => k.template_id === t.id).map(k => ({
          id: k.kpi_key, title: k.title, type: k.type, unit: k.unit,
          weight: k.weight, description: k.description, target: k.target,
        })),
      }));
    }
    if (kpis?.length) {
      DB.kpis = kpis.map(k => ({
        id:         k.id,
        empId:      k.employee_id,
        templateId: k.template_id || '',
        title:      k.title, type: k.type, unit: k.unit,
        target:     parseFloat(k.target), actual: parseFloat(k.actual),
        weight:     parseFloat(k.weight), period: k.period, notes: k.notes || '',
      }));
    }
    if (eduRecs?.length) {
      DB.educationRecords = eduRecs.map(e => ({
        id: e.id, empId: e.employee_id,
        institution: e.institution, degree: e.degree, field: e.field,
        gradYear: e.grad_year, gpa: e.gpa,
        certificates: e.certificates || [], verified: e.verified,
      }));
    }
    if (logs?.length) {
      DB.auditLogs = logs.map(l => ({
        id: l.id,
        time: l.created_at ? new Date(l.created_at).toISOString().replace('T',' ').slice(0,16) : '',
        user: l.user_ref || '', userRole: l.user_role || '',
        action: l.action || l.description || '', module: l.module || '', ip: l.ip_address || '',
      }));
    }
    if (payroll?.length) {
      DB.payroll = payroll.map(p => ({
        empId:    p.employee_id, month: p.month || '',
        baseSalary: parseFloat(p.base_salary)||0, allowance: parseFloat(p.allowance)||0,
        otHours: parseFloat(p.ot_hours)||0, advance: parseFloat(p.advance)||0,
        lateDeduction: parseFloat(p.late_deduction)||0,
        absentDeduction: parseFloat(p.absent_deduction)||0,
        eidBonus: parseFloat(p.eid_bonus)||0, status: p.status || 'Pending',
      }));
    }
    if (att?.length) {
      DB.attendance = att.map(a => ({
        empId: a.employee_id, date: a.date,
        checkIn: a.check_in, checkOut: a.check_out,
        status: a.status, shift: a.shift_id || 'Morning',
        ot: parseFloat(a.ot_hours)||0, shortHrs: 0,
      }));
    }
    // ── Phase 2 document-store collections (loans, advances, notices, etc.) ──
    await this.loadDocs();
    console.log(`✓ Supabase loaded: ${DB.employees.length} employees, ${DB.kpis.length} KPIs`);
  },

  // Maps a Supabase doc-table to its in-memory DB collection key.
  DOC_COLLECTIONS: [
    ['loans','loans'], ['salary_advances','salaryAdvances'],
    ['bonuses','bonuses'], ['notices','notices'],
    ['notice_acks','noticeAcknowledgments'],
    ['disciplinary_cases','disciplinaryCases'],
    ['requisitions','requisitions'], ['candidates','candidates'],
    ['trainings','trainings'], ['succession_plans','successionPlans'],
  ],

  async loadDocs() {
    const results = await Promise.allSettled(
      this.DOC_COLLECTIONS.map(([table]) => SUPA.select(table, 'select=doc&limit=1000'))
    );
    results.forEach((r, i) => {
      const key = this.DOC_COLLECTIONS[i][1];
      const rows = r.value;
      if (Array.isArray(rows) && rows.length) {
        DB[key] = rows.map(x => x.doc).filter(Boolean);
      }
    });
  },

  _docId(key, o, i) {
    if (o && o.id != null) return String(o.id);
    if (key === 'noticeAcknowledgments') return `${o.noticeId || o.notice_id || ''}_${o.userEmail || o.userId || o.user || i}`;
    return `${key}_${i}`;
  },

  // Upsert all document-store collections. Called (debounced) from persistDB
  // after any mutation, so every create/update across all modules syncs without
  // wiring each of the app's 35 mutation points individually.
  async pushDocs() {
    if (!this.connected || this.loading) return;
    for (const [table, key] of this.DOC_COLLECTIONS) {
      const arr = DB[key];
      if (!Array.isArray(arr) || !arr.length) continue;
      const rows = arr.map((o, i) => ({ id: this._docId(key, o, i), doc: o }));
      try { await SUPA.upsert(table, rows); }
      catch (e) { console.warn('SupaSync.pushDocs ' + table + ':', e.message); }
    }
  },

  async seedAll() {
    try {
      await SUPA.upsert('subsidiaries', DB.subsidiaries);
      const depts = DB.departments.map(d => ({
        id: d.id || undefined, subsidiary_id: d.sub||d.subsidiary_id,
        name: d.name, code: d.code||d.name.slice(0,8).replace(/\s/g,'-'),
        head_employee_id: d.head||d.head_employee_id||null,
      }));
      await SUPA.upsert('departments', depts);
      const emps = DB.employees.map(e => ({
        employee_number: e.id, subsidiary_id: e.sub, department_id: e.dept,
        first_name: e.name.split(' ')[0], last_name: e.name.split(' ').slice(1).join(' ') || e.name.split(' ')[0],
        title: e.title, email: e.email, phone: e.phone||null,
        gender: e.gender==='M'?'Male':'Female',
        base_salary: e.salary, allowance: e.allowance,
        joined_date: e.joined, dob: e.dob||null,
        status: e.status, contract_type: e.contractType||'Permanent',
        nationality: e.nationality||'Somali',
      }));
      await SUPA.upsert('employees', emps, 'employee_number');
      const users = DB.users.map(u => ({
        id: u.id, username: u.username, email: u.email,
        emp_id: u.empId||null, role: u.role, status: u.status,
        failed_attempts: u.failedAttempts||0,
      }));
      await SUPA.upsert('hrms_users', users);
      console.log('✓ Demo data seeded to Supabase');
    } catch(e) {
      console.error('Seed error:', e.message);
    }
  },
};

/* ============================================================
   SupaWrite — Write-through after every mutation
============================================================ */
const SupaWrite = {
  // ── Phase 2 document-store helpers ──
  // saveDoc upserts one record into a JSONB doc-table; deleteDoc removes one.
  // Bulk create/update sync happens automatically via SupaSync.pushDocs (called
  // from persistDB); these are for explicit single-row writes/deletes.
  async saveDoc(table, obj) {
    if (!SupaSync.connected || !obj || obj.id == null) return;
    try { await SUPA.upsert(table, { id: String(obj.id), doc: obj }); }
    catch (e) { console.warn('SupaWrite.saveDoc ' + table + ':', e.message); }
  },
  async deleteDoc(table, id) {
    if (!SupaSync.connected || id == null) return;
    try { await SUPA.delete(table, `id=eq.${encodeURIComponent(id)}`); }
    catch (e) { console.warn('SupaWrite.deleteDoc ' + table + ':', e.message); }
  },

  async saveEmployee(emp) {
    if (!SupaSync.connected) return;
    try {
      await SUPA.upsert('employees', {
        employee_number: emp.id, subsidiary_id: emp.sub, department_id: emp.dept||null,
        first_name: emp.name.split(' ')[0], last_name: emp.name.split(' ').slice(1).join(' ')||'',
        title: emp.title, email: emp.email, phone: emp.phone||null,
        gender: emp.gender==='M'?'Male':'Female', base_salary: emp.salary,
        allowance: emp.allowance, joined_date: emp.joined, status: emp.status,
        contract_type: emp.contractType||'Permanent', nationality: emp.nationality||'Somali',
      }, 'employee_number');
    } catch(e) { console.warn('SupaWrite.saveEmployee:', e.message); }
  },
  async saveLeaveRequest(l) {
    if (!SupaSync.connected) return;
    try {
      await SUPA.upsert('leave_requests', {
        id: l.id, employee_id: l.empId, type: l.type,
        from_date: l.from, to_date: l.to, days: l.days,
        reason: l.reason||null, status: l.status,
        approved_by: l.approvedBy||null, applied_on: l.appliedOn,
      });
    } catch(e) { console.warn('SupaWrite.saveLeaveRequest:', e.message); }
  },
  async saveAttendance(a) {
    if (!SupaSync.connected) return;
    try {
      await SUPA.upsert('attendance', {
        employee_id: a.empId, date: a.date, check_in: a.checkIn||null,
        check_out: a.checkOut||null, status: a.status,
        ot_hours: a.ot||0,
      });
    } catch(e) { console.warn('SupaWrite.saveAttendance:', e.message); }
  },
  async saveKPI(k) {
    if (!SupaSync.connected) return;
    try {
      await SUPA.upsert('kpis', {
        id: k.id, employee_id: k.empId, template_id: k.templateId||null,
        title: k.title, type: k.type, unit: k.unit||null,
        target: k.target, actual: k.actual, weight: k.weight,
        period: k.period, notes: k.notes||null,
      });
    } catch(e) { console.warn('SupaWrite.saveKPI:', e.message); }
  },
  async saveKPITemplate(tmpl) {
    if (!SupaSync.connected) return;
    try {
      await SUPA.upsert('kpi_templates', { id: tmpl.id, name: tmpl.name, role: tmpl.role||null });
      await SUPA.delete('kpi_template_items', `template_id=eq.${tmpl.id}`);
      const items = tmpl.kpis.map((k,i) => ({
        template_id: tmpl.id, kpi_key: k.id, title: k.title,
        type: k.type||'Numerical', unit: k.unit||null,
        weight: k.weight, target: k.target||0, sort_order: i,
      }));
      if (items.length) await SUPA.insert('kpi_template_items', items);
    } catch(e) { console.warn('SupaWrite.saveKPITemplate:', e.message); }
  },
  async savePayroll(p) {
    if (!SupaSync.connected) return;
    try {
      await SUPA.upsert('payroll', {
        employee_id: p.empId, month: p.month,
        base_salary: p.baseSalary||0, allowance: p.allowance||0,
        ot_hours: p.otHours||0, advance: p.advance||0,
        late_deduction: p.lateDeduction||0, absent_deduction: p.absentDeduction||0,
        eid_bonus: p.eidBonus||0, status: p.status||'Processed',
      });
    } catch(e) { console.warn('SupaWrite.savePayroll:', e.message); }
  },
  async saveUser(u) {
    if (!SupaSync.connected) return;
    try {
      await SUPA.upsert('hrms_users', {
        id: u.id, username: u.username, email: u.email,
        emp_id: u.empId||null, role: u.role, status: u.status,
        failed_attempts: u.failedAttempts||0,
      });
    } catch(e) { console.warn('SupaWrite.saveUser:', e.message); }
  },
  async deleteUser(userId) {
    if (!SupaSync.connected) return;
    try { await SUPA.delete('hrms_users', `id=eq.${userId}`); }
    catch(e) { console.warn('SupaWrite.deleteUser:', e.message); }
  },
  async saveEducation(edu) {
    if (!SupaSync.connected) return;
    try {
      await SUPA.upsert('education_records', {
        id: edu.id, employee_id: edu.empId, institution: edu.institution,
        degree: edu.degree, field: edu.field, grad_year: edu.gradYear,
        gpa: edu.gpa||null, certificates: edu.certificates||[], verified: edu.verified||false,
      });
    } catch(e) { console.warn('SupaWrite.saveEducation:', e.message); }
  },
  async logAudit(entry) {
    if (!SupaSync.connected) return;
    try {
      await SUPA.insert('audit_logs', {
        time: new Date().toISOString(), user_ref: entry.user,
        user_role: entry.userRole, action: entry.action,
        module: entry.module, ip_address: entry.ip||'browser',
      });
    } catch(e) { /* silent */ }
  },
};

/* ── UI STATUS HELPERS ── */
function updateSupaStatus(state) {
  const el = document.getElementById('supaStatus');
  if (!el) return;
  const states = {
    connecting: { dot:'🟡', label:'Connecting…',    color:'var(--amber)' },
    loading:    { dot:'🔵', label:'Loading data…',  color:'var(--blue)'  },
    seeding:    { dot:'🔵', label:'Syncing…',        color:'var(--blue)'  },
    connected:  { dot:'🟢', label:'Supabase Live',   color:'#10B981'      },
    offline:    { dot:'🟠', label:'Offline Mode',    color:'var(--amber)' },
  };
  const s = states[state] || states.offline;
  el.innerHTML = `<span style="color:${s.color};font-size:11px;font-weight:700;display:flex;align-items:center;gap:4px">${s.dot} ${s.label}</span>`;
  el.title = SupaSync.connected
    ? 'Connected to Supabase — all changes auto-saved to cloud'
    : 'Not connected to Supabase — changes stored locally only';
}

function showDomainHelp() {
  if (typeof openModal === 'function') {
    setTimeout(() => {
      openModal('narrow', `
        <div class="modal-header"><span class="modal-title">⚙️ Supabase Domain Setup</span>
          <button onclick="closeModal()" style="background:none;border:none;font-size:20px;cursor:pointer;color:var(--gray-500)">×</button>
        </div>
        <div class="modal-body">
          <p style="font-size:13px;color:var(--gray-600);margin-bottom:16px">
            Your Supabase publishable key requires domain authorization. Follow these steps:
          </p>
          <ol style="font-size:13px;line-height:2;color:var(--gray-700);padding-left:18px">
            <li>Go to <a href="https://supabase.com/dashboard/project/lxpqnlrdnsmzhvnfrgwl/settings/api" target="_blank" style="color:var(--blue)">Supabase Dashboard → Settings → API</a></li>
            <li>Scroll to <strong>Allowed Origins / CORS</strong></li>
            <li>Add your domain (or <code>*</code> to allow all)</li>
            <li>Save and refresh this page</li>
          </ol>
          <div style="margin-top:16px;padding:10px 14px;background:var(--gray-50);border-radius:var(--radius);font-size:12px">
            <strong>OR</strong> — use the <strong>Backend API</strong> (Node.js + direct PostgreSQL) 
            which bypasses this restriction entirely.
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" onclick="closeModal()">Close</button>
          <a href="https://supabase.com/dashboard/project/lxpqnlrdnsmzhvnfrgwl/settings/api" 
             target="_blank" class="btn btn-primary">Open Supabase Settings</a>
        </div>`);
    }, 2000);
  }
}

function showLoadingBanner(msg) {
  let b = document.getElementById('supaBanner');
  if (!b) {
    b = document.createElement('div');
    b.id = 'supaBanner';
    b.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999;background:linear-gradient(90deg,#001B44,#002D72);color:#fff;text-align:center;padding:8px 16px;font-size:13px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,.2)';
    document.body.prepend(b);
  }
  b.innerHTML = `<span style="width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#C9A227;border-radius:50%;display:inline-block;animation:spin 0.8s linear infinite"></span> ${msg}`;
  b.style.display = 'flex';
}

function hideLoadingBanner() {
  const b = document.getElementById('supaBanner');
  if (b) b.style.display = 'none';
}

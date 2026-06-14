/* ============================================================
   AMC HRMS v2.0 — DATA LAYER
   Asal Media Corporation
   Subsidiaries: JIIL Media, Asal TV, Masrax Production, Nasiye
   ============================================================ */

'use strict';

/* ── SUBSIDIARIES ── */
const DB = {

subsidiaries: [
  { id:'jiil',    name:'JIIL Media',        code:'JML', color:'#C9A227', location:'Mogadishu', headcount:120, sector:'Digital Media' },
  { id:'asal_tv', name:'Asal TV',           code:'ATV', color:'#001B44', location:'Mogadishu', headcount:98,  sector:'Television' },
  { id:'masrax',  name:'Masrax Production', code:'MPR', color:'#8B0000', location:'Mogadishu', headcount:74,  sector:'Film & Production' },
  { id:'nasiye',  name:'Nasiye',            code:'NSY', color:'#0D6E3F', location:'Mogadishu', headcount:55,  sector:'News & Media' },
],

departments: [
  /* ── JIIL MEDIA ── */
  { id:'jiil_editorial',  name:'News & Editorial',       sub:'jiil',    head:'EMP001', count:24, budget:45000 },
  { id:'jiil_digital',    name:'Digital Content',        sub:'jiil',    head:'EMP005', count:18, budget:32000 },
  { id:'jiil_tech',       name:'Technology & IT',         sub:'jiil',    head:'EMP010', count:12, budget:28000 },
  { id:'jiil_hr',         name:'Human Resources',        sub:'jiil',    head:'EMP003', count:6,  budget:18000 },
  { id:'jiil_finance',    name:'Finance & Accounting',   sub:'jiil',    head:'EMP004', count:8,  budget:22000 },
  { id:'jiil_marketing',  name:'Marketing & Sales',      sub:'jiil',    head:'EMP006', count:10, budget:25000 },
  { id:'jiil_admin',      name:'Administration',         sub:'jiil',    head:'EMP007', count:5,  budget:15000 },
  /* ── ASAL TV ── */
  { id:'atv_broadcast',   name:'Broadcasting & On-Air',  sub:'asal_tv', head:'EMP020', count:28, budget:55000 },
  { id:'atv_production',  name:'Production & Studio',    sub:'asal_tv', head:'EMP025', count:22, budget:48000 },
  { id:'atv_marketing',   name:'Marketing & Promotions', sub:'asal_tv', head:'EMP030', count:15, budget:30000 },
  { id:'atv_tech',        name:'Technical Operations',   sub:'asal_tv', head:'EMP021', count:10, budget:22000 },
  { id:'atv_news',        name:'News & Journalism',      sub:'asal_tv', head:'EMP022', count:18, budget:35000 },
  { id:'atv_hr',          name:'Human Resources',        sub:'asal_tv', head:'EMP023', count:5,  budget:16000 },
  { id:'atv_finance',     name:'Finance & Accounting',   sub:'asal_tv', head:'EMP024', count:6,  budget:18000 },
  /* ── MASRAX PRODUCTION ── */
  { id:'mpr_film',        name:'Film Production',        sub:'masrax',  head:'EMP035', count:20, budget:42000 },
  { id:'mpr_post',        name:'Post Production',        sub:'masrax',  head:'EMP036', count:14, budget:32000 },
  { id:'mpr_creative',    name:'Creative & Design',      sub:'masrax',  head:'EMP037', count:10, budget:25000 },
  { id:'mpr_sound',       name:'Sound & Music',          sub:'masrax',  head:'EMP038', count:8,  budget:20000 },
  { id:'mpr_hr',          name:'Human Resources',        sub:'masrax',  head:'EMP039', count:4,  budget:12000 },
  { id:'mpr_finance',     name:'Finance & Accounting',   sub:'masrax',  head:'EMP040', count:5,  budget:15000 },
  /* ── NASIYE ── */
  { id:'nsy_editorial',   name:'Editorial & Content',    sub:'nasiye',  head:'EMP045', count:12, budget:22000 },
  { id:'nsy_digital',     name:'Digital & Social Media', sub:'nasiye',  head:'EMP046', count:8,  budget:18000 },
  { id:'nsy_ops',         name:'Operations',             sub:'nasiye',  head:'EMP047', count:6,  budget:15000 },
  { id:'nsy_hr',          name:'Human Resources',        sub:'nasiye',  head:'EMP048', count:3,  budget:10000 },
  { id:'nsy_finance',     name:'Finance & Accounting',   sub:'nasiye',  head:'EMP049', count:4,  budget:12000 },
  /* ── SHARED / AMC CORPORATE ── */
  { id:'amc_exec',        name:'Executive Leadership',   sub:'all',     head:'EMP000', count:4,  budget:80000 },
  { id:'amc_legal',       name:'Legal & Compliance',     sub:'all',     head:'EMP001', count:3,  budget:20000 },
],

teams: [
  { id:'t1', name:'Morning News Team',   dept:'news',      sub:'jiil' },
  { id:'t2', name:'Evening News Team',   dept:'news',      sub:'jiil' },
  { id:'t3', name:'Social Media Team',   dept:'digital',   sub:'jiil' },
  { id:'t4', name:'Web Dev Team',        dept:'tech',      sub:'jiil' },
  { id:'t5', name:'Live Broadcast',      dept:'broadcast', sub:'asal_tv' },
  { id:'t6', name:'Studio A Team',       dept:'production',sub:'asal_tv' },
  { id:'t7', name:'Feature Films',       dept:'film',      sub:'masrax' },
  { id:'t8', name:'Edit Suite A',        dept:'postprod',  sub:'masrax' },
  { id:'t9', name:'Sales Team A',        dept:'sales',     sub:'nasiye' },
  { id:'t10',name:'Breaking News',       dept:'editorial', sub:'nasiye' },
],

grades: [
  { grade:'G1', title:'Intern/Trainee',       min:200,   max:500   },
  { grade:'G2', title:'Junior Officer',        min:500,   max:1000  },
  { grade:'G3', title:'Officer',               min:1000,  max:1800  },
  { grade:'G4', title:'Senior Officer',        min:1800,  max:2800  },
  { grade:'G5', title:'Team Leader',           min:2800,  max:4000  },
  { grade:'G6', title:'Manager',               min:4000,  max:6000  },
  { grade:'G7', title:'Senior Manager',        min:6000,  max:9000  },
  { grade:'G8', title:'Director',              min:9000,  max:14000 },
  { grade:'G9', title:'C-Level / Executive',   min:14000, max:25000 },
],

employees: [],

/* ── KPI TEMPLATES (fully editable weights) ── */
kpiTemplates: [
  { id:'KT001', name:'Editorial Quality', role:'journalist', kpis:[
    { id:'k1', title:'Story Accuracy Rate',       type:'Percent',   unit:'%',       weight:30, description:'% of stories with no factual errors' },
    { id:'k2', title:'Monthly Story Output',      type:'Numerical', unit:'stories', weight:25, description:'Number of published stories per month' },
    { id:'k3', title:'Audience Engagement',       type:'Percent',   unit:'%',       weight:25, description:'Audience engagement rate on published content' },
    { id:'k4', title:'Deadline Compliance',       type:'Percent',   unit:'%',       weight:20, description:'% of deadlines met on time' },
  ]},
  { id:'KT002', name:'Technical Performance', role:'developer', kpis:[
    { id:'k1', title:'Code Quality Score',        type:'Numerical', unit:'pts',     weight:30, description:'Code review score out of 100' },
    { id:'k2', title:'Sprint Velocity',           type:'Numerical', unit:'pts',     weight:35, description:'Story points completed per sprint' },
    { id:'k3', title:'Bug Resolution Time',       type:'Time',      unit:'hours',   weight:20, description:'Average hours to resolve assigned bugs' },
    { id:'k4', title:'Documentation Coverage',   type:'Percent',   unit:'%',       weight:15, description:'% of code with proper documentation' },
  ]},
  { id:'KT003', name:'Production Quality', role:'producer', kpis:[
    { id:'k1', title:'Production Output',         type:'Numerical', unit:'episodes',weight:35, description:'Number of episodes/segments produced' },
    { id:'k2', title:'Quality Rating',            type:'Numerical', unit:'pts',     weight:30, description:'Average quality rating from review board' },
    { id:'k3', title:'Budget Adherence',          type:'Percent',   unit:'%',       weight:20, description:'% under/within budget' },
    { id:'k4', title:'On-time Delivery',          type:'Percent',   unit:'%',       weight:15, description:'% delivered on scheduled date' },
  ]},
],

kpis: [],
kpiComments: [],
kpiReviews: [],
tasks: [],
projects: [],
appraisalCycles: [],
empDirectory: [],

attendance: [],

leaveRequests: [],

leaveBalances: {},

payroll: [],

requisitions: [],

candidates: [],

trainings: [],

successionPlans: [],

disciplinaryCases: [],

notifications: [],

auditLogs: [],

/* ── USER ACCOUNTS (User Management module) ── */
users: [],

  /* ── BONUS RULES ── */
  bonusRules: [
    { id:'BNR001', name:'Annual Performance Bonus', type:'performance', value:0, cycle:'yearly', applyTo:'all', subsidiaries:['jiil','asal_tv','masrax','nasiye'], active:true, description:'KPI-based: Outstanding=20%, Exceeds=15%, Meets=10%, Improvement=5%, Unsatisfactory=0%' },
    { id:'BNR002', name:'Eid Al-Adha Bonus',        type:'fixed',       value:1, cycle:'yearly', applyTo:'all', subsidiaries:['jiil','asal_tv','masrax','nasiye'], active:true, description:'One month salary as Eid bonus' },
  ],

  /* ── BONUS RECORDS ── */
  bonuses: [],

  /* ── SALARY ADVANCES ── */
  salaryAdvances: [],

  /* ── EMPLOYEE LOANS ── */
  loans: [],

  /* ── NOTICE BOARD ── */
  notices: [],

  /* ── NOTICE ACKNOWLEDGMENTS ── */
  noticeAcknowledgments: []

};

/* ═══════════════════════════════════════════════════════════
   CALCULATION ENGINES
═══════════════════════════════════════════════════════════ */

const PayrollEngine = {

  /* ── Rates ── */
  OT_MULTIPLIER:       1.5,     // overtime pay multiplier
  WORKING_DAYS:        22,      // standard working days per month
  WORKING_HOURS:       8,       // hours per day
  ADVANCE_MAX_PCT:     0.5,     // max 50% of salary for advance
  LOAN_MAX_MONTHS:     36,      // max loan repayment period

  calcOTRate(salary)   { return (salary / this.WORKING_DAYS / this.WORKING_HOURS) * this.OT_MULTIPLIER; },
  calcDailyRate(salary){ return salary / this.WORKING_DAYS; },
  calcHourlyRate(salary){ return salary / this.WORKING_DAYS / this.WORKING_HOURS; },
  maxAdvance(salary)   { return salary * this.ADVANCE_MAX_PCT; },
  calcGratuity(salary) { return salary / 12; },
  calcEidBonus(salary) { return salary; },

  /* ── Tax brackets (Somalia progressive) ── */
  calcTax(gross) {
    if (gross <= 500)  return 0;
    if (gross <= 1000) return (gross - 500)  * 0.04;
    if (gross <= 3000) return 20 + (gross - 1000) * 0.06;
    if (gross <= 6000) return 140 + (gross - 3000) * 0.08;
    return 380 + (gross - 6000) * 0.10;
  },

  /* ── YEARLY Bonus calculation (performance-based) ── */
  BONUS_RATINGS: {
    'Outstanding':           0.20,
    'Exceeds Expectations':  0.15,
    'Meets Expectations':    0.10,
    'Needs Improvement':     0.05,
    'Unsatisfactory':        0.00,
  },
  calcYearlyBonus(emp, performanceRating) {
    const annualSalary = (emp.salary || 0) * 12;
    const pct = this.BONUS_RATINGS[performanceRating] || 0;
    return Math.round(annualSalary * pct * 100) / 100;
  },
  calcBonus(emp, bonusRule) {
    if (!bonusRule) return 0;
    if (bonusRule.type === 'percentage') return (emp.salary || 0) * 12 * (bonusRule.value / 100);
    if (bonusRule.type === 'fixed')      return bonusRule.value;
    if (bonusRule.type === 'performance') {
      const score = typeof PerfEngine !== 'undefined' ? PerfEngine.calcEmployeeScore(emp.id) : 0;
      const rating = score >= 110 ? 'Outstanding'
        : score >= 90  ? 'Exceeds Expectations'
        : score >= 70  ? 'Meets Expectations'
        : score >= 50  ? 'Needs Improvement'
        : 'Unsatisfactory';
      return this.calcYearlyBonus(emp, rating);
    }
    return 0;
  },

  /* ── Loan monthly installment ── */
  calcInstallment(principal, months, interestRatePct = 0) {
    if (interestRatePct === 0) return principal / months;
    const r = interestRatePct / 100 / 12;
    return principal * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  },

  /* ── Get total loan deductions for an employee this month ── */
  getLoanDeductions(empId) {
    const loans = (typeof DB !== 'undefined' ? DB.loans || [] : [])
      .filter(l => l.empId === empId && l.status === 'Active');
    return loans.reduce((sum, l) => sum + (l.monthlyInstallment || 0), 0);
  },

  /* ── Full payroll calculation ── */
  calc(emp, payrow) {
    const base          = +(payrow.baseSalary   || emp.salary      || 0);
    const allow         = +(payrow.allowance    || emp.allowance   || 0);
    const otHours       = +(payrow.otHours      || 0);
    const otPay         = otHours * this.calcOTRate(base);
    const eidBonus      = +(payrow.eidBonus     || 0);
    const perfBonus     = +(payrow.perfBonus    || 0);
    const otherEarnings = +(payrow.otherEarnings|| 0);

    const grossEarnings = base + allow + otPay + eidBonus + perfBonus + otherEarnings;
    const tax           = this.calcTax(grossEarnings);
    const advanceDeduct = +(payrow.advance       || 0);
    const lateDeduction = +(payrow.lateDeduction || 0);
    const absentDeduct  = +(payrow.absentDeduction|| 0);
    const loanDeduct    = +(payrow.loanDeduction || this.getLoanDeductions(emp.id));
    const otherDeduct   = +(payrow.otherDeductions|| 0);

    const totalDeductions = tax + advanceDeduct + lateDeduction + absentDeduct + loanDeduct + otherDeduct;
    const netPay          = Math.max(0, grossEarnings - totalDeductions);

    return {
      base, allow, otHours, otPay, eidBonus, perfBonus, otherEarnings,
      grossEarnings, tax, advanceDeduct, lateDeduction, absentDeduct,
      loanDeduct, otherDeduct, totalDeductions, netPay,
      ytdGross: grossEarnings,
    };
  },
};

const PerfEngine = {
  calcAchievement(kpi) {
    // Binary scoring mode: pass/fail only — Completed=100, else 0.
    if (kpi.scoringMode === 'binary') return kpi.status === 'Completed' ? 100 : 0;
    if (!kpi.target || kpi.target === 0) return 0;
    if (kpi.type === 'Time') return kpi.actual <= kpi.target ? Math.min(120, (kpi.target / kpi.actual) * 100) : (kpi.target / kpi.actual) * 100;
    if (kpi.type === 'Binary') return kpi.actual >= 1 ? 100 : 0;
    return Math.min(120, (kpi.actual / kpi.target) * 100);
  },
  calcEmployeeScore(empId) {
    // Rejected KPIs are excluded from the official score (Approved + Pending count).
    const kpis = DB.kpis.filter(k => k.empId === empId && k.approvalStatus !== 'Rejected');
    if (!kpis.length) return null;
    const totalWeight = kpis.reduce((s, k) => s + k.weight, 0);
    if (totalWeight === 0) return null;
    const weighted = kpis.reduce((s, k) => s + (this.calcAchievement(k) * k.weight), 0);
    return Math.round(weighted / totalWeight);
  },
  ratingLabel(score) {
    // Spec rating scale: ≥110 Outstanding · 100–110 Exceeds · 80–100 Meets · 60–79 Needs · <60 Unsatisfactory
    if (score >= 110) return { label:'Outstanding',            cls:'excellent' };
    if (score >= 100) return { label:'Exceeds Expectations',  cls:'good' };
    if (score >= 80)  return { label:'Meets Expectations',    cls:'average' };
    if (score >= 60)  return { label:'Needs Improvement',     cls:'below' };
    return               { label:'Unsatisfactory',           cls:'poor' };
  },
  // Annual leave accrual: 2.5 days/month, 30/year cap (Fridays included).
  accruedLeave(joined) {
    if (!joined) return 0;
    const j = new Date(joined), now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const start = j > yearStart ? j : yearStart;
    let months = (now.getFullYear()-start.getFullYear())*12 + (now.getMonth()-start.getMonth());
    if (now.getDate() < start.getDate()) months--;
    months = Math.max(0, months);
    return Math.min(30, Math.round(months * 2.5 * 10) / 10);
  },
  deptAvg(deptId) {
    const emps = DB.employees.filter(e => e.dept === deptId && !['Resigned','Terminated'].includes(e.status));
    const scores = emps.map(e => this.calcEmployeeScore(e.id)).filter(s => s !== null);
    if (!scores.length) return 0;
    return Math.round(scores.reduce((a,b) => a+b, 0) / scores.length);
  },
};

const AttEngine = {
  lateMinutes(checkIn) {
    if (!checkIn) return 0;
    const [h, m] = checkIn.split(':').map(Number);
    const startMin = 8 * 60;
    const actualMin = h * 60 + m;
    return Math.max(0, actualMin - startMin);
  },
};

/* ── HELPER FUNCTIONS ── */
function getEmp(id) { return DB.employees.find(e => e.id === id); }
function getEmpName(id) { const e = getEmp(id); return e ? e.name : id || '—'; }
function getDept(id) { return DB.departments.find(d => d.id === id); }
function getDeptName(id) { const d = getDept(id); return d ? d.name : id || '—'; }
function getSub(id) { return DB.subsidiaries.find(s => s.id === id); }
function getSubName(id) { const s = getSub(id); return s ? s.name : id || '—'; }
function getGrade(g) { return DB.grades.find(x => x.grade === g); }
function getTeam(id) { return DB.teams.find(t => t.id === id); }
function getTeamName(id) { const t = getTeam(id); return t ? t.name : id || '—'; }

function initials(name) {
  if (!name) return '??';
  return name.split(' ').slice(0,2).map(p => p[0]?.toUpperCase() || '').join('');
}
function fmtCurrency(v) { return '$' + (v||0).toLocaleString('en-US', {minimumFractionDigits:0, maximumFractionDigits:0}); }
function fmtDate(d) { if (!d) return '—'; try { return new Date(d).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}); } catch { return d; } }
function yearsOfService(joined) { if (!joined) return 0; return Math.floor((Date.now() - new Date(joined)) / (365.25 * 24 * 3600 * 1000)); }
function toTitleCase(str) { return str.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.slice(1)); }
function uuid() { return 'xxxxxxxx'.replace(/x/g, () => Math.floor(Math.random()*16).toString(16)); }

/* ── SESSION PERSISTENCE ── */
const Session = {
  KEY: 'amc_hrms_session',
  save(data) {
    const payload = JSON.stringify({ ...data, ts: Date.now() });
    try {
      localStorage.setItem(this.KEY, payload);
      sessionStorage.setItem(this.KEY, payload);
    } catch(e) {}
  },
  load() {
    try {
      const raw = localStorage.getItem(this.KEY) || sessionStorage.getItem(this.KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      const MAX_AGE = 8 * 60 * 60 * 1000; // 8 hours
      if (Date.now() - data.ts > MAX_AGE) { this.clear(); return null; }
      return data;
    } catch(e) { return null; }
  },
  clear() {
    try { localStorage.removeItem(this.KEY); sessionStorage.removeItem(this.KEY); } catch(e) {}
  },
};

/* ── RBAC PERMISSIONS ── */
const ROLES = {
  super_admin:     { label:'Super Admin',      color:'red',    perms:['*'],    canEdit:false, selfServiceOnly:false },
  corporate_admin: { label:'Corporate Admin',  color:'navy',   perms:['dashboard','employees','attendance','leave','payroll','recruitment','performance','kpi','reports','settings','users','training','disciplinary','organization','succession','notices'], canEdit:true, selfServiceOnly:false },
  hr_director:     { label:'HR Director',      color:'purple', perms:['dashboard','employees','attendance','leave','payroll','recruitment','performance','kpi','reports','users','training','disciplinary','organization','succession','notices'], canEdit:true, selfServiceOnly:false },
  hr_manager:      { label:'HR Manager',       color:'blue',   perms:['dashboard','employees','attendance','leave','payroll','recruitment','performance','kpi','reports','training','disciplinary','notices'], canEdit:true, selfServiceOnly:false },
  finance_manager: { label:'Finance Manager',  color:'gold',   perms:['dashboard','payroll','reports'], canEdit:true, selfServiceOnly:false },
  dept_manager:    { label:'Dept. Manager',    color:'teal',   perms:['dashboard','employees','attendance','leave','payroll','performance','kpi','training'], canEdit:true, selfServiceOnly:false },
  team_leader:     { label:'Team Leader',      color:'green',  perms:['dashboard','attendance','leave','performance'], canEdit:true, selfServiceOnly:false },
  employee:        { label:'Employee',         color:'gray',   perms:['dashboard','attendance','leave','payroll','kpi','advances','loans','notices'], canEdit:false, selfServiceOnly:true },
  auditor:         { label:'Auditor',          color:'amber',  perms:['dashboard','reports'], canEdit:false, selfServiceOnly:false },
  viewer:          { label:'Viewer',           color:'gray',   perms:['dashboard'], canEdit:true, selfServiceOnly:false },
  announcements:   { label:'Announcements',    color:'blue',   perms:['dashboard','employees','advances','loans','notices'], canEdit:false, selfServiceOnly:false, description:'Read-only access to employees, loans, advances, and notice board' },
};

;

function hasPermission(page) {
  const roleKey = STATE?.role || 'viewer';
  // Check DB.customRolePermissions first, fall back to ROLES const
  const crp = (typeof DB !== 'undefined' && DB.customRolePermissions)
    ? DB.customRolePermissions
    : (typeof ROLES !== 'undefined' ? ROLES : null);
  if (!crp) return false;
  const r = crp[roleKey];
  if (!r) return false;
  if (r.perms && r.perms.includes('*')) return true;
  if (r.perms) return r.perms.includes(page);
  return false;
}
function isSelfServiceRole() {
  const roleKey = STATE?.role || 'viewer';
  const crp = (typeof DB !== 'undefined' && DB.customRolePermissions)
    ? DB.customRolePermissions
    : (typeof ROLES !== 'undefined' ? ROLES : null);
  return !!(crp && crp[roleKey] && crp[roleKey].selfServiceOnly === true);
}
function getCurrentEmployee() {
  if (!STATE?.user) return null;
  if (STATE.user.empId) return DB.employees.find(e => e.id === STATE.user.empId) || null;
  if (STATE.user.email) return DB.employees.find(e => e.email === STATE.user.email) || null;
  return null;
}

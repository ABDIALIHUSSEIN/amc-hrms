/* ============================================================
   AMC HRMS v2.0 — DATA LAYER
   Asal Media Corporation
   Subsidiaries: JIIL Media, Asal TV, Masrax Production, Nasiye
   ============================================================ */

'use strict';

/* ── SUBSIDIARIES ── */
const DB = {

subsidiaries: [
  { id:'jiil',    name:'JIIL Media',        code:'JML', color:'#C9A227', location:'Mogadishu', headcount:0, sector:'Digital Media' },
  { id:'asal_tv', name:'Asal TV',           code:'ATV', color:'#001B44', location:'Mogadishu', headcount:0, sector:'Television' },
  { id:'masrax',  name:'Masrax Production', code:'MPR', color:'#8B0000', location:'Mogadishu', headcount:0, sector:'Film & Production' },
  { id:'nasiye',  name:'Nasiye',            code:'NSY', color:'#0D6E3F', location:'Mogadishu', headcount:0, sector:'News & Media' },
],

departments: [
  /* ── JIIL MEDIA ── */
  { id:'jiil_editorial',  name:'News & Editorial',       sub:'jiil',    head:'', count:0, budget:0 },
  { id:'jiil_digital',    name:'Digital Content',        sub:'jiil',    head:'', count:0, budget:0 },
  { id:'jiil_tech',       name:'Technology & IT',        sub:'jiil',    head:'', count:0, budget:0 },
  { id:'jiil_hr',         name:'Human Resources',        sub:'jiil',    head:'', count:0, budget:0 },
  { id:'jiil_finance',    name:'Finance & Accounting',   sub:'jiil',    head:'', count:0, budget:0 },
  { id:'jiil_marketing',  name:'Marketing & Sales',      sub:'jiil',    head:'', count:0, budget:0 },
  { id:'jiil_admin',      name:'Administration',         sub:'jiil',    head:'', count:0, budget:0 },
  /* ── ASAL TV ── */
  { id:'atv_broadcast',   name:'Broadcasting & On-Air',  sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'atv_production',  name:'Production & Studio',    sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'atv_marketing',   name:'Marketing & Promotions', sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'atv_tech',        name:'Technical Operations',   sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'atv_news',        name:'News & Journalism',      sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'atv_hr',          name:'Human Resources',        sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'atv_finance',     name:'Finance & Accounting',   sub:'asal_tv', head:'', count:0, budget:0 },
  /* ── MASRAX PRODUCTION ── */
  { id:'mpr_film',        name:'Film Production',        sub:'masrax',  head:'', count:0, budget:0 },
  { id:'mpr_post',        name:'Post Production',        sub:'masrax',  head:'', count:0, budget:0 },
  { id:'mpr_creative',    name:'Creative & Design',      sub:'masrax',  head:'', count:0, budget:0 },
  { id:'mpr_sound',       name:'Sound & Music',          sub:'masrax',  head:'', count:0, budget:0 },
  { id:'mpr_hr',          name:'Human Resources',        sub:'masrax',  head:'', count:0, budget:0 },
  { id:'mpr_finance',     name:'Finance & Accounting',   sub:'masrax',  head:'', count:0, budget:0 },
  /* ── NASIYE ── */
  { id:'nsy_editorial',   name:'Editorial & Content',    sub:'nasiye',  head:'', count:0, budget:0 },
  { id:'nsy_digital',     name:'Digital & Social Media', sub:'nasiye',  head:'', count:0, budget:0 },
  { id:'nsy_ops',         name:'Operations',             sub:'nasiye',  head:'', count:0, budget:0 },
  { id:'nsy_hr',          name:'Human Resources',        sub:'nasiye',  head:'', count:0, budget:0 },
  { id:'nsy_finance',     name:'Finance & Accounting',   sub:'nasiye',  head:'', count:0, budget:0 },
  /* ── SHARED / AMC CORPORATE ── */
  { id:'amc_exec',        name:'Executive Leadership',   sub:'all',     head:'', count:0, budget:0 },
  { id:'amc_legal',       name:'Legal & Compliance',     sub:'all',     head:'', count:0, budget:0 },
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

employees:         [],
kpis:              [],
attendance:        [],
leaveRequests:     [],
leaveBalances:     {},
payroll:           [],
requisitions:      [],
candidates:        [],
trainings:         [],
disciplinaryCases: [],
auditLogs:         [],
bonuses:           [],
bonusRules:        [],
salaryAdvances:    [],
loans:             [],
notices:           [],
noticeAcknowledgments: [],
successionPlans:   [],
kpiTemplates:      [],
notifications:     [],

/* ── USER ACCOUNTS ── */
users: [
  { id:'USR000', username:'superadmin', email:'admin@asalmedia.so', empId:'', role:'super_admin', status:'Active', lastLogin:'Never', created:'2018-01-01', failedAttempts:0 },
],

};

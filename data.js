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

employees: [
  { id:'EMP001', name:'Fatima Hassan',    title:'CHRO',                    dept:'hr',        sub:'jiil',    team:'t4', grade:'G9', salary:18000, allowance:2000, contractType:'Permanent', email:'fatima@amc.so',   phone:'+252-61-4000001', joined:'2018-01-15', dob:'1982-04-12', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP002', name:'Ahmed Muse',       title:'HR Manager',              dept:'hr',        sub:'jiil',    team:'t4', grade:'G6', salary:5500,  allowance:600,  contractType:'Permanent', email:'ahmed@amc.so',    phone:'+252-61-4000002', joined:'2019-03-10', dob:'1985-08-20', gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP003', name:'Safia Ibrahim',    title:'Finance Manager',         dept:'finance',   sub:'jiil',    team:'t4', grade:'G6', salary:5800,  allowance:700,  contractType:'Permanent', email:'safia@amc.so',    phone:'+252-61-4000003', joined:'2019-06-01', dob:'1987-11-05', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP004', name:'Omar Farah',       title:'Legal Counsel',           dept:'legal',     sub:'jiil',    team:'t4', grade:'G7', salary:7500,  allowance:800,  contractType:'Permanent', email:'omar@amc.so',     phone:'+252-61-4000004', joined:'2020-02-15', dob:'1980-03-18', gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP005', name:'Liban Ahmed',      title:'Digital Director',        dept:'digital',   sub:'jiil',    team:'t3', grade:'G8', salary:11000, allowance:1200, contractType:'Permanent', email:'liban@amc.so',    phone:'+252-61-4000005', joined:'2018-08-20', dob:'1983-07-25', gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP006', name:'Amina Nur',        title:'Admin Officer',           dept:'admin',     sub:'jiil',    team:'t4', grade:'G3', salary:1400,  allowance:200,  contractType:'Permanent', email:'amina@amc.so',    phone:'+252-61-4000006', joined:'2021-01-10', dob:'1995-06-14', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP007', name:'Hassan Warsame',   title:'Senior Journalist',       dept:'news',      sub:'jiil',    team:'t1', grade:'G5', salary:3200,  allowance:400,  contractType:'Permanent', email:'hassan@amc.so',   phone:'+252-61-4000007', joined:'2020-05-20', dob:'1988-12-01', gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP008', name:'Hawa Osman',       title:'Journalist',              dept:'news',      sub:'jiil',    team:'t2', grade:'G4', salary:2200,  allowance:300,  contractType:'Permanent', email:'hawa@amc.so',     phone:'+252-61-4000008', joined:'2021-09-01', dob:'1993-02-28', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP009', name:'Abdullahi Ali',    title:'Cameraman',               dept:'news',      sub:'jiil',    team:'t1', grade:'G3', salary:1600,  allowance:200,  contractType:'Permanent', email:'abdullahi@amc.so',phone:'+252-61-4000009', joined:'2022-03-15', dob:'1996-09-10', gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP010', name:'Maryam Abdi',      title:'IT Manager',              dept:'tech',      sub:'jiil',    team:'t4', grade:'G6', salary:5200,  allowance:600,  contractType:'Permanent', email:'maryam@amc.so',   phone:'+252-61-4000010', joined:'2019-11-01', dob:'1986-05-22', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP011', name:'Yusuf Hassan',     title:'Software Developer',      dept:'tech',      sub:'jiil',    team:'t4', grade:'G4', salary:2800,  allowance:350,  contractType:'Contract',  email:'yusuf@amc.so',    phone:'+252-61-4000011', joined:'2022-06-01', dob:'1998-01-15', gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP012', name:'Ikram Mohamed',    title:'Content Creator',         dept:'digital',   sub:'jiil',    team:'t3', grade:'G3', salary:1500,  allowance:200,  contractType:'Permanent', email:'ikram@amc.so',    phone:'+252-61-4000012', joined:'2023-01-10', dob:'1999-03-20', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP020', name:'Cabdi Rashid',     title:'Broadcast Director',      dept:'broadcast', sub:'asal_tv', team:'t5', grade:'G8', salary:12000, allowance:1500, contractType:'Permanent', email:'cabdi@asaltv.so', phone:'+252-61-4000020', joined:'2017-04-10', dob:'1979-08-15', gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP021', name:'Filsan Jama',      title:'TV Presenter',            dept:'broadcast', sub:'asal_tv', team:'t5', grade:'G5', salary:3800,  allowance:500,  contractType:'Permanent', email:'filsan@asaltv.so',phone:'+252-61-4000021', joined:'2020-07-15', dob:'1991-04-30', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP022', name:'Nadifo Hussein',   title:'News Anchor',             dept:'broadcast', sub:'asal_tv', team:'t5', grade:'G5', salary:3600,  allowance:450,  contractType:'Permanent', email:'nadifo@asaltv.so',phone:'+252-61-4000022', joined:'2021-01-20', dob:'1993-11-12', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP025', name:'Mukhtaar Said',    title:'Production Manager',      dept:'production',sub:'asal_tv', team:'t6', grade:'G7', salary:8000,  allowance:900,  contractType:'Permanent', email:'mukhtaar@asaltv.so',phone:'+252-61-4000025',joined:'2018-10-05',dob:'1984-06-18',gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP026', name:'Sagal Abdi',       title:'Studio Manager',          dept:'production',sub:'asal_tv', team:'t6', grade:'G6', salary:4800,  allowance:550,  contractType:'Permanent', email:'sagal@asaltv.so', phone:'+252-61-4000026', joined:'2020-03-10', dob:'1990-09-05', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP030', name:'Bile Abshir',      title:'Marketing Manager',       dept:'marketing', sub:'asal_tv', team:'t6', grade:'G6', salary:5000,  allowance:600,  contractType:'Permanent', email:'bile@asaltv.so',  phone:'+252-61-4000030', joined:'2019-08-15', dob:'1987-02-22', gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP040', name:'Suad Abdirahman', title:'Film Director',            dept:'film',      sub:'masrax',  team:'t7', grade:'G8', salary:10500, allowance:1200, contractType:'Permanent', email:'suad@masrax.so',  phone:'+252-61-4000040', joined:'2018-05-20', dob:'1981-12-10', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP041', name:'Deeq Salad',       title:'Cinematographer',         dept:'film',      sub:'masrax',  team:'t7', grade:'G5', salary:3500,  allowance:400,  contractType:'Contract',  email:'deeq@masrax.so',  phone:'+252-61-4000041', joined:'2021-02-01', dob:'1994-07-08', gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP044', name:'Faadumo Shire',    title:'Post-Production Lead',    dept:'postprod',  sub:'masrax',  team:'t8', grade:'G6', salary:4500,  allowance:500,  contractType:'Permanent', email:'faadumo@masrax.so',phone:'+252-61-4000044',joined:'2019-12-01',dob:'1989-03-25',gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP050', name:'Guled Omar',       title:'Sales Director',          dept:'sales',     sub:'nasiye',  team:'t9', grade:'G7', salary:7200,  allowance:800,  contractType:'Permanent', email:'guled@nasiye.so', phone:'+252-61-4000050', joined:'2019-01-15', dob:'1982-10-20', gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP051', name:'Layla Hassan',     title:'Account Manager',         dept:'sales',     sub:'nasiye',  team:'t9', grade:'G5', salary:3200,  allowance:350,  contractType:'Permanent', email:'layla@nasiye.so', phone:'+252-61-4000051', joined:'2021-06-01', dob:'1993-05-17', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP055', name:'Hodan Ahmed',      title:'Editor-in-Chief',         dept:'editorial', sub:'nasiye',  team:'t10',grade:'G7', salary:8500,  allowance:1000, contractType:'Permanent', email:'hodan@nasiye.so', phone:'+252-61-4000055', joined:'2018-03-01', dob:'1980-07-14', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP056', name:'Burhan Yusuf',     title:'Senior Editor',           dept:'editorial', sub:'nasiye',  team:'t10',grade:'G5', salary:3400,  allowance:400,  contractType:'Permanent', email:'burhan@nasiye.so',phone:'+252-61-4000056',joined:'2020-09-15',dob:'1989-11-30',gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP060', name:'Nimco Ali',        title:'Graphic Designer',        dept:'digital',   sub:'jiil',    team:'t3', grade:'G3', salary:1800,  allowance:250,  contractType:'Contract',  email:'nimco@amc.so',    phone:'+252-61-4000060', joined:'2023-04-01', dob:'1997-08-18', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP061', name:'Cabdirashid Wais', title:'Video Editor',            dept:'postprod',  sub:'masrax',  team:'t8', grade:'G3', salary:1700,  allowance:220,  contractType:'Contract',  email:'wais@masrax.so',  phone:'+252-61-4000061', joined:'2023-02-15', dob:'1998-04-05', gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP062', name:'Ubah Ibrahim',     title:'HR Officer',              dept:'hr',        sub:'jiil',    team:'t4', grade:'G3', salary:1600,  allowance:200,  contractType:'Permanent', email:'ubah@amc.so',     phone:'+252-61-4000062', joined:'2022-08-01', dob:'1996-01-25', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP070', name:'Jama Cali',        title:'Senior Developer',        dept:'tech',      sub:'jiil',    team:'t4', grade:'G5', salary:3800,  allowance:450,  contractType:'Permanent', email:'jama@amc.so',     phone:'+252-61-4000070', joined:'2020-11-01', dob:'1990-06-12', gender:'M', nationality:'Somali', status:'On Leave', exitDate:'',         exitReason:'' },
  { id:'EMP071', name:'Sadiya Hassan',    title:'Accountant',              dept:'finance',   sub:'jiil',    team:'t4', grade:'G4', salary:2400,  allowance:300,  contractType:'Permanent', email:'sadiya@amc.so',   phone:'+252-61-4000071', joined:'2021-04-15', dob:'1994-09-08', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP080', name:'Khadar Mohamud',   title:'Camera Operator',        dept:'production',sub:'asal_tv', team:'t6', grade:'G3', salary:1600,  allowance:200,  contractType:'Permanent', email:'khadar@asaltv.so',phone:'+252-61-4000080',joined:'2022-05-10',dob:'1997-03-15',gender:'M', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP090', name:'Nimo Abdi',        title:'Researcher',              dept:'news',      sub:'jiil',    team:'t2', grade:'G3', salary:1500,  allowance:180,  contractType:'Contract',  email:'nimo@amc.so',     phone:'+252-61-4000090', joined:'2023-06-01', dob:'1999-10-22', gender:'F', nationality:'Somali', status:'Active',   exitDate:'',         exitReason:'' },
  { id:'EMP099', name:'Ali Sharif',       title:'Correspondent (Resigned)',dept:'news',      sub:'jiil',    team:'t1', grade:'G4', salary:0,     allowance:0,    contractType:'Permanent', email:'ali.old@amc.so',  phone:'+252-61-4000099', joined:'2019-03-01', dob:'1988-05-20', gender:'M', nationality:'Somali', status:'Resigned', exitDate:'2024-12-31',exitReason:'Better opportunity' },
],

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

kpis: [
  { id:'KPI001', empId:'EMP007', templateId:'KT001', title:'Story Accuracy Rate',   type:'Percent',   unit:'%',       target:95,  actual:97,  weight:30, period:'Q2-2026', notes:'' },
  { id:'KPI002', empId:'EMP007', templateId:'KT001', title:'Monthly Story Output',  type:'Numerical', unit:'stories', target:40,  actual:44,  weight:25, period:'Q2-2026', notes:'' },
  { id:'KPI003', empId:'EMP007', templateId:'KT001', title:'Audience Engagement',   type:'Percent',   unit:'%',       target:8,   actual:9.2, weight:25, period:'Q2-2026', notes:'' },
  { id:'KPI004', empId:'EMP007', templateId:'KT001', title:'Deadline Compliance',   type:'Percent',   unit:'%',       target:100, actual:96,  weight:20, period:'Q2-2026', notes:'' },
  { id:'KPI005', empId:'EMP008', templateId:'KT001', title:'Story Accuracy Rate',   type:'Percent',   unit:'%',       target:95,  actual:91,  weight:30, period:'Q2-2026', notes:'' },
  { id:'KPI006', empId:'EMP008', templateId:'KT001', title:'Monthly Story Output',  type:'Numerical', unit:'stories', target:35,  actual:30,  weight:25, period:'Q2-2026', notes:'' },
  { id:'KPI007', empId:'EMP008', templateId:'KT001', title:'Audience Engagement',   type:'Percent',   unit:'%',       target:8,   actual:6.5, weight:25, period:'Q2-2026', notes:'' },
  { id:'KPI008', empId:'EMP008', templateId:'KT001', title:'Deadline Compliance',   type:'Percent',   unit:'%',       target:100, actual:88,  weight:20, period:'Q2-2026', notes:'' },
  { id:'KPI009', empId:'EMP011', templateId:'KT002', title:'Code Quality Score',    type:'Numerical', unit:'pts',     target:85,  actual:90,  weight:30, period:'Q2-2026', notes:'' },
  { id:'KPI010', empId:'EMP011', templateId:'KT002', title:'Sprint Velocity',       type:'Numerical', unit:'pts',     target:40,  actual:45,  weight:35, period:'Q2-2026', notes:'' },
  { id:'KPI011', empId:'EMP011', templateId:'KT002', title:'Bug Resolution Time',   type:'Time',      unit:'hours',   target:4,   actual:3.2, weight:20, period:'Q2-2026', notes:'' },
  { id:'KPI012', empId:'EMP011', templateId:'KT002', title:'Documentation Coverage',type:'Percent',   unit:'%',       target:80,  actual:88,  weight:15, period:'Q2-2026', notes:'' },
  { id:'KPI013', empId:'EMP021', templateId:'KT003', title:'Production Output',     type:'Numerical', unit:'episodes',target:20,  actual:22,  weight:35, period:'Q2-2026', notes:'' },
  { id:'KPI014', empId:'EMP021', templateId:'KT003', title:'Quality Rating',        type:'Numerical', unit:'pts',     target:80,  actual:85,  weight:30, period:'Q2-2026', notes:'' },
  { id:'KPI015', empId:'EMP021', templateId:'KT003', title:'Budget Adherence',      type:'Percent',   unit:'%',       target:100, actual:97,  weight:20, period:'Q2-2026', notes:'' },
  { id:'KPI016', empId:'EMP021', templateId:'KT003', title:'On-time Delivery',      type:'Percent',   unit:'%',       target:100, actual:95,  weight:15, period:'Q2-2026', notes:'' },
  { id:'KPI017', empId:'EMP005', templateId:'KT002', title:'Code Quality Score',    type:'Numerical', unit:'pts',     target:90,  actual:92,  weight:30, period:'Q2-2026', notes:'' },
  { id:'KPI018', empId:'EMP005', templateId:'KT002', title:'Sprint Velocity',       type:'Numerical', unit:'pts',     target:50,  actual:48,  weight:35, period:'Q2-2026', notes:'' },
  { id:'KPI019', empId:'EMP005', templateId:'KT002', title:'Bug Resolution Time',   type:'Time',      unit:'hours',   target:3,   actual:2.8, weight:20, period:'Q2-2026', notes:'' },
  { id:'KPI020', empId:'EMP005', templateId:'KT002', title:'Documentation Coverage',type:'Percent',   unit:'%',       target:90,  actual:95,  weight:15, period:'Q2-2026', notes:'' },
],

attendance: [
  { empId:'EMP001', date:'2026-06-01', checkIn:'08:02', checkOut:'17:10', status:'Present',     shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP002', date:'2026-06-01', checkIn:'08:15', checkOut:'17:05', status:'Late',        shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP003', date:'2026-06-01', checkIn:'07:58', checkOut:'18:30', status:'Present',     shift:'Morning', ot:1.5, shortHrs:0 },
  { empId:'EMP005', date:'2026-06-01', checkIn:'08:00', checkOut:'17:00', status:'Present',     shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP007', date:'2026-06-01', checkIn:'08:20', checkOut:'16:45', status:'Late',        shift:'Morning', ot:0,   shortHrs:0.25 },
  { empId:'EMP008', date:'2026-06-01', checkIn:null,    checkOut:null,    status:'Absent',      shift:'Morning', ot:0,   shortHrs:9 },
  { empId:'EMP009', date:'2026-06-01', checkIn:'08:05', checkOut:'17:00', status:'Present',     shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP010', date:'2026-06-01', checkIn:'08:00', checkOut:'19:00', status:'Overtime',    shift:'Morning', ot:2,   shortHrs:0 },
  { empId:'EMP011', date:'2026-06-01', checkIn:'08:00', checkOut:'17:00', status:'Present',     shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP012', date:'2026-06-01', checkIn:null,    checkOut:null,    status:'AnnualLeave', shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP020', date:'2026-06-01', checkIn:'07:55', checkOut:'17:00', status:'Present',     shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP021', date:'2026-06-01', checkIn:'08:30', checkOut:'17:00', status:'Late',        shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP022', date:'2026-06-01', checkIn:'08:00', checkOut:'17:00', status:'Present',     shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP025', date:'2026-06-01', checkIn:'08:00', checkOut:'17:30', status:'Present',     shift:'Morning', ot:0.5, shortHrs:0 },
  { empId:'EMP040', date:'2026-06-01', checkIn:'09:00', checkOut:'18:00', status:'Present',     shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP041', date:'2026-06-01', checkIn:'09:00', checkOut:'18:00', status:'Present',     shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP050', date:'2026-06-01', checkIn:'08:10', checkOut:'17:00', status:'Present',     shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP055', date:'2026-06-01', checkIn:'08:00', checkOut:'17:00', status:'Present',     shift:'Morning', ot:0,   shortHrs:0 },
  { empId:'EMP070', date:'2026-06-01', checkIn:null,    checkOut:null,    status:'AnnualLeave', shift:'Morning', ot:0,   shortHrs:0 },
],

leaveRequests: [
  { id:'LR001', empId:'EMP008', type:'Sick Leave',    from:'2026-06-01', to:'2026-06-03', days:3, reason:'Medical appointment and recovery',          status:'Approved', approvedBy:'EMP002', appliedOn:'2026-05-31' },
  { id:'LR002', empId:'EMP012', type:'Annual Leave',  from:'2026-06-01', to:'2026-06-07', days:5, reason:'Family holiday trip',                        status:'Approved', approvedBy:'EMP005', appliedOn:'2026-05-28' },
  { id:'LR003', empId:'EMP070', type:'Annual Leave',  from:'2026-06-01', to:'2026-06-14', days:10,reason:'Extended annual leave break',               status:'Approved', approvedBy:'EMP010', appliedOn:'2026-05-20' },
  { id:'LR004', empId:'EMP060', type:'Annual Leave',  from:'2026-06-15', to:'2026-06-19', days:5, reason:'Personal travel',                           status:'Pending',  approvedBy:'',       appliedOn:'2026-06-02' },
  { id:'LR005', empId:'EMP009', type:'Sick Leave',    from:'2026-06-05', to:'2026-06-06', days:2, reason:'Dental surgery',                            status:'Pending',  approvedBy:'',       appliedOn:'2026-06-03' },
  { id:'LR006', empId:'EMP022', type:'Maternity Leave',from:'2026-07-01',to:'2026-09-30',days:65,reason:'Maternity leave',                            status:'Pending',  approvedBy:'',       appliedOn:'2026-06-01' },
  { id:'LR007', empId:'EMP030', type:'Special Leave', from:'2026-06-10', to:'2026-06-10', days:1, reason:'Religious observance',                      status:'Rejected', approvedBy:'EMP020', appliedOn:'2026-06-02' },
],

leaveBalances: {
  'EMP001':{ annual:21, sick:14, maternity:90, used_annual:3,  used_sick:0,  used_maternity:0 },
  'EMP002':{ annual:21, sick:14, maternity:0,  used_annual:5,  used_sick:2,  used_maternity:0 },
  'EMP003':{ annual:21, sick:14, maternity:0,  used_annual:2,  used_sick:0,  used_maternity:0 },
  'EMP005':{ annual:21, sick:14, maternity:0,  used_annual:8,  used_sick:1,  used_maternity:0 },
  'EMP007':{ annual:21, sick:14, maternity:0,  used_annual:4,  used_sick:3,  used_maternity:0 },
  'EMP008':{ annual:21, sick:14, maternity:0,  used_annual:2,  used_sick:3,  used_maternity:0 },
  'EMP009':{ annual:21, sick:14, maternity:0,  used_annual:0,  used_sick:2,  used_maternity:0 },
  'EMP010':{ annual:21, sick:14, maternity:0,  used_annual:6,  used_sick:0,  used_maternity:0 },
  'EMP011':{ annual:21, sick:14, maternity:0,  used_annual:3,  used_sick:1,  used_maternity:0 },
  'EMP012':{ annual:21, sick:14, maternity:0,  used_annual:7,  used_sick:0,  used_maternity:0 },
  'EMP020':{ annual:21, sick:14, maternity:0,  used_annual:5,  used_sick:2,  used_maternity:0 },
  'EMP021':{ annual:21, sick:14, maternity:0,  used_annual:4,  used_sick:1,  used_maternity:0 },
  'EMP022':{ annual:21, sick:14, maternity:90, used_annual:2,  used_sick:0,  used_maternity:0 },
  'EMP070':{ annual:21, sick:14, maternity:0,  used_annual:12, used_sick:2,  used_maternity:0 },
},

payroll: [
  { empId:'EMP001', month:'2026-06', baseSalary:18000, allowance:2000, otHours:0,  otRate:0,      advance:0,   lateDeduction:0,   absentDeduction:0, eidBonus:0, status:'Processed' },
  { empId:'EMP002', month:'2026-06', baseSalary:5500,  allowance:600,  otHours:0,  otRate:0,      advance:0,   lateDeduction:50,  absentDeduction:0, eidBonus:0, status:'Processed' },
  { empId:'EMP003', month:'2026-06', baseSalary:5800,  allowance:700,  otHours:1.5,otRate:0,      advance:1000,lateDeduction:0,   absentDeduction:0, eidBonus:0, status:'Pending' },
  { empId:'EMP005', month:'2026-06', baseSalary:11000, allowance:1200, otHours:0,  otRate:0,      advance:0,   lateDeduction:0,   absentDeduction:0, eidBonus:0, status:'Processed' },
  { empId:'EMP007', month:'2026-06', baseSalary:3200,  allowance:400,  otHours:0,  otRate:0,      advance:500, lateDeduction:45,  absentDeduction:0, eidBonus:0, status:'Pending' },
  { empId:'EMP008', month:'2026-06', baseSalary:2200,  allowance:300,  otHours:0,  otRate:0,      advance:0,   lateDeduction:0,   absentDeduction:100,eidBonus:0,status:'Pending' },
  { empId:'EMP010', month:'2026-06', baseSalary:5200,  allowance:600,  otHours:2,  otRate:0,      advance:0,   lateDeduction:0,   absentDeduction:0, eidBonus:0, status:'Processed' },
  { empId:'EMP011', month:'2026-06', baseSalary:2800,  allowance:350,  otHours:0,  otRate:0,      advance:0,   lateDeduction:0,   absentDeduction:0, eidBonus:0, status:'Processed' },
  { empId:'EMP020', month:'2026-06', baseSalary:12000, allowance:1500, otHours:0,  otRate:0,      advance:0,   lateDeduction:0,   absentDeduction:0, eidBonus:0, status:'Processed' },
  { empId:'EMP021', month:'2026-06', baseSalary:3800,  allowance:500,  otHours:0,  otRate:0,      advance:0,   lateDeduction:60,  absentDeduction:0, eidBonus:0, status:'Pending' },
  { empId:'EMP025', month:'2026-06', baseSalary:8000,  allowance:900,  otHours:0.5,otRate:0,      advance:0,   lateDeduction:0,   absentDeduction:0, eidBonus:0, status:'Processed' },
  { empId:'EMP040', month:'2026-06', baseSalary:10500, allowance:1200, otHours:0,  otRate:0,      advance:0,   lateDeduction:0,   absentDeduction:0, eidBonus:0, status:'Processed' },
  { empId:'EMP050', month:'2026-06', baseSalary:7200,  allowance:800,  otHours:0,  otRate:0,      advance:2000,lateDeduction:0,   absentDeduction:0, eidBonus:0, status:'Pending' },
  { empId:'EMP055', month:'2026-06', baseSalary:8500,  allowance:1000, otHours:0,  otRate:0,      advance:0,   lateDeduction:0,   absentDeduction:0, eidBonus:0, status:'Processed' },
],

requisitions: [
  { id:'REQ001', title:'Senior Journalist',      dept:'news',       sub:'jiil',    grade:'G4', salaryMin:2000, salaryMax:3200, status:'Interview',   requestedBy:'EMP002', approvedBy:'EMP001', date:'2026-05-15', kpis:'40 stories/month, accuracy >95%, engagement >8%', hasJD:true },
  { id:'REQ002', title:'Full Stack Developer',   dept:'tech',       sub:'jiil',    grade:'G4', salaryMin:2500, salaryMax:4000, status:'Advertised',  requestedBy:'EMP010', approvedBy:'EMP001', date:'2026-05-20', kpis:'Sprint velocity >35pts, code quality >85, bug fix <4hrs', hasJD:true },
  { id:'REQ003', title:'TV Presenter',           dept:'broadcast',  sub:'asal_tv', grade:'G5', salaryMin:3000, salaryMax:4500, status:'New',         requestedBy:'EMP020', approvedBy:'',       date:'2026-06-01', kpis:'Broadcast quality >90%, audience rating >4/5', hasJD:false },
  { id:'REQ004', title:'Video Editor',           dept:'postprod',   sub:'masrax',  grade:'G3', salaryMin:1500, salaryMax:2200, status:'Hired',       requestedBy:'EMP044', approvedBy:'EMP040', date:'2026-04-10', kpis:'20 edits/month, quality rating >80', hasJD:true },
  { id:'REQ005', title:'Sales Executive',        dept:'sales',      sub:'nasiye',  grade:'G3', salaryMin:1200, salaryMax:2000, status:'Shortlisted', requestedBy:'EMP050', approvedBy:'EMP001', date:'2026-05-28', kpis:'Revenue target $50k/month, client retention >85%', hasJD:true },
],

candidates: [
  { id:'CND001', name:'Abdifatah Omar',   role:'REQ001', stage:'Interview',     score:82, source:'LinkedIn',    applied:'2026-05-18', email:'abdifatah@gmail.com', phone:'+252-61-9001001' },
  { id:'CND002', name:'Fadumo Ali',       role:'REQ001', stage:'HR Screen',     score:75, source:'Referral',    applied:'2026-05-20', email:'fadumo.a@gmail.com',  phone:'+252-61-9001002' },
  { id:'CND003', name:'Mohamed Hassan',   role:'REQ002', stage:'Technical Test',score:88, source:'Website',     applied:'2026-05-22', email:'mo.hassan@gmail.com', phone:'+252-61-9001003' },
  { id:'CND004', name:'Asad Shire',       role:'REQ002', stage:'CV Review',     score:65, source:'JobBoard',    applied:'2026-05-25', email:'asad.s@gmail.com',    phone:'+252-61-9001004' },
  { id:'CND005', name:'Caasha Jama',      role:'REQ005', stage:'Shortlisted',   score:79, source:'Referral',    applied:'2026-06-01', email:'caasha@gmail.com',    phone:'+252-61-9001005' },
],

trainings: [
  { id:'TRN001', title:'Digital Journalism Masterclass', type:'Professional', provider:'AMC Academy',       startDate:'2026-06-10', endDate:'2026-06-12', duration:'3 days', cost:2800,  maxAttendees:20, enrolled:15, dept:'news',      sub:'jiil',    status:'Scheduled', preEval:3.2, postEval:null },
  { id:'TRN002', title:'Advanced Video Production',      type:'Technical',    provider:'External Trainer',  startDate:'2026-06-15', endDate:'2026-06-16', duration:'2 days', cost:1500,  maxAttendees:15, enrolled:12, dept:'production',sub:'asal_tv', status:'Scheduled', preEval:2.8, postEval:null },
  { id:'TRN003', title:'Leadership & Management Skills', type:'Leadership',   provider:'AMC Academy',       startDate:'2026-05-20', endDate:'2026-05-21', duration:'2 days', cost:0,     maxAttendees:25, enrolled:22, dept:'all',       sub:'all',     status:'Completed', preEval:3.0, postEval:4.2 },
  { id:'TRN004', title:'HR Compliance & Labour Law',     type:'Compliance',   provider:'Legal Dept',        startDate:'2026-06-20', endDate:'2026-06-20', duration:'1 day',  cost:0,     maxAttendees:50, enrolled:38, dept:'hr',        sub:'jiil',    status:'Planned',   preEval:null,postEval:null },
  { id:'TRN005', title:'Adobe Premiere Pro Intensive',   type:'Technical',    provider:'External Trainer',  startDate:'2026-05-05', endDate:'2026-05-07', duration:'3 days', cost:1200,  maxAttendees:12, enrolled:10, dept:'postprod',  sub:'masrax',  status:'Completed', preEval:2.5, postEval:4.0 },
],

successionPlans: [
  { id:'SP001', roleId:'CEO',  roleName:'Chief Executive Officer',   currentHolder:'EMP001', successors:[
    { empId:'EMP005', readiness:'Ready in 1–2 years', score:91, devPlan:'Strategic leadership program Q3 2026' },
    { empId:'EMP020', readiness:'Development needed',  score:78, devPlan:'Executive MBA sponsorship 2026-2027' },
  ]},
  { id:'SP002', roleId:'CHRO', roleName:'Chief HR Officer',         currentHolder:'EMP001', successors:[
    { empId:'EMP002', readiness:'Ready now',            score:88, devPlan:'CHRO shadowing program, ready' },
  ]},
  { id:'SP003', roleId:'CTO',  roleName:'Chief Technology Officer', currentHolder:'EMP010', successors:[
    { empId:'EMP011', readiness:'Ready in 1–2 years',  score:86, devPlan:'Architect certification + leadership coaching' },
    { empId:'EMP070', readiness:'Development needed',   score:74, devPlan:'Distributed systems training 2026' },
  ]},
],

disciplinaryCases: [
  { id:'DIS001', empId:'EMP008', type:'Absenteeism',     severity:'Minor',           date:'2026-05-10', reportedBy:'EMP002', investigator:'EMP002', status:'Closed',              action:'Verbal Warning',  actionDate:'2026-05-12', desc:'Repeated unauthorized absences in May 2026',                resolution:'Verbal warning issued. Employee confirmed improvement.' },
  { id:'DIS002', empId:'EMP021', type:'Policy Violation',severity:'Major',           date:'2026-05-28', reportedBy:'EMP025', investigator:'EMP002', status:'Action Taken',         action:'Written Warning', actionDate:'2026-06-01', desc:'Late arrival 5 times in one month without notification',     resolution:'Written warning issued. PIP initiated.' },
  { id:'DIS003', empId:'EMP060', type:'Misconduct',      severity:'Minor',           date:'2026-06-01', reportedBy:'EMP005', investigator:'',       status:'Open',                action:'',                actionDate:'',           desc:'Inappropriate use of company social media accounts',         resolution:'' },
  { id:'DIS004', empId:'EMP009', type:'Performance',     severity:'Performance Issue',date:'2026-04-15',reportedBy:'EMP007', investigator:'EMP002', status:'Under Investigation',  action:'',                actionDate:'',           desc:'Consistently missing targets for 3 consecutive months',      resolution:'' },
],

notifications: [
  { id:1,  type:'leave',       text:'Layla Hassan submitted annual leave (5 days)',         time:'10 min ago', read:false },
  { id:2,  type:'leave',       text:'Nimo Abdi submitted sick leave (2 days)',              time:'35 min ago', read:false },
  { id:3,  type:'leave',       text:'Nadifo Hussein submitted maternity leave (65 days)',   time:'1 hr ago',   read:false },
  { id:4,  type:'recruitment', text:'New candidate applied for Senior Journalist role',     time:'2 hrs ago',  read:false },
  { id:5,  type:'payroll',     text:'June 2026 payroll pending approval (14 employees)',    time:'3 hrs ago',  read:true  },
  { id:6,  type:'attendance',  text:'3 employees marked absent without leave today',        time:'8:05 AM',    read:true  },
  { id:7,  type:'kpi',         text:'Q2 KPI review due in 7 days',                         time:'Yesterday',  read:true  },
  { id:8,  type:'disciplinary',text:'Case DIS003 opened: Nimco Ali — Misconduct',          time:'Yesterday',  read:true  },
],

auditLogs: [
  { id:1,  time:'2026-06-03 09:15', user:'EMP001', userRole:'Super Admin', action:'Logged in to system',                           module:'Auth',       ip:'192.168.1.10' },
  { id:2,  time:'2026-06-03 09:22', user:'EMP001', userRole:'Super Admin', action:'Processed payroll for EMP003 (June 2026)',       module:'Payroll',    ip:'192.168.1.10' },
  { id:3,  time:'2026-06-03 09:40', user:'EMP002', userRole:'HR Manager',  action:'Approved leave LR001 for EMP008',                module:'Leave',      ip:'192.168.1.14' },
  { id:4,  time:'2026-06-03 10:00', user:'EMP001', userRole:'Super Admin', action:'Updated employee profile EMP021 — salary change',module:'Employees',  ip:'192.168.1.10' },
  { id:5,  time:'2026-06-03 10:15', user:'EMP010', userRole:'IT Manager',  action:'Added new user account for EMP062',              module:'Users',      ip:'192.168.1.22' },
  { id:6,  time:'2026-06-03 10:30', user:'EMP002', userRole:'HR Manager',  action:'Opened disciplinary case DIS003',                module:'Disciplinary',ip:'192.168.1.14'},
  { id:7,  time:'2026-06-03 10:45', user:'EMP001', userRole:'Super Admin', action:'Updated KPI weights for template KT001',         module:'KPI',        ip:'192.168.1.10' },
  { id:8,  time:'2026-06-03 11:00', user:'EMP003', userRole:'Finance Mgr', action:'Exported payroll report — June 2026',            module:'Reports',    ip:'192.168.1.16' },
],

/* ── USER ACCOUNTS (User Management module) ── */
users: [
  { id:'USR000', username:'superadmin',    email:'admin@asalmedia.so', empId:'',       role:'super_admin',     status:'Active',   lastLogin:'2026-06-03 07:00', created:'2018-01-01', failedAttempts:0 },
  { id:'USR001', username:'fatima.hassan', email:'fatima@amc.so',      empId:'EMP001', role:'hr_director',     status:'Active',   lastLogin:'2026-06-03 09:15', created:'2018-01-15', failedAttempts:0 },
  { id:'USR002', username:'ahmed.muse',    email:'ahmed@amc.so',       empId:'EMP002', role:'hr_manager',      status:'Active',   lastLogin:'2026-06-03 09:40', created:'2019-03-10', failedAttempts:0 },
  { id:'USR003', username:'safia.ibrahim', email:'safia@amc.so',       empId:'EMP003', role:'finance_manager', status:'Active',   lastLogin:'2026-06-03 10:00', created:'2019-06-01', failedAttempts:0 },
  { id:'USR004', username:'omar.farah',    email:'omar@amc.so',        empId:'EMP004', role:'dept_manager',    status:'Active',   lastLogin:'2026-06-02 14:30', created:'2020-02-15', failedAttempts:0 },
  { id:'USR005', username:'liban.ahmed',   email:'liban@amc.so',       empId:'EMP005', role:'employee',        status:'Active',   lastLogin:'2026-06-03 08:50', created:'2018-08-20', failedAttempts:0 },
  { id:'USR006', username:'maryam.abdi',   email:'maryam@amc.so',      empId:'EMP010', role:'dept_manager',    status:'Active',   lastLogin:'2026-06-02 09:00', created:'2019-11-01', failedAttempts:0 },
  { id:'USR007', username:'cabdi.rashid',  email:'cabdi@asaltv.so',    empId:'EMP020', role:'dept_manager',    status:'Active',   lastLogin:'2026-06-03 08:00', created:'2017-04-10', failedAttempts:0 },
  { id:'USR008', username:'amina.nur',     email:'amina@amc.so',       empId:'EMP006', role:'employee',        status:'Active',   lastLogin:'Never',            created:'2026-06-01', failedAttempts:0 },
  { id:'USR009', username:'test.viewer',   email:'test@amc.so',        empId:'',       role:'viewer',          status:'Active',   lastLogin:'Never',            created:'2026-06-01', failedAttempts:0 },
  { id:'USR010', username:'announcements', email:'announce@amc.so',    empId:'',       role:'announcements',   status:'Active',   lastLogin:'Never',            created:'2026-06-01', failedAttempts:0 },
],

  /* ── BONUS RULES ── */
  bonusRules: [
    { id:'BNR001', name:'Annual Performance Bonus', type:'performance', value:0, cycle:'yearly', applyTo:'all', subsidiaries:['jiil','asal_tv','masrax','nasiye'], active:true, description:'KPI-based: Outstanding=20%, Exceeds=15%, Meets=10%, Improvement=5%, Unsatisfactory=0%' },
    { id:'BNR002', name:'Eid Al-Adha Bonus',        type:'fixed',       value:1, cycle:'yearly', applyTo:'all', subsidiaries:['jiil','asal_tv','masrax','nasiye'], active:true, description:'One month salary as Eid bonus' },
  ],

  /* ── BONUS RECORDS ── */
  bonuses: [
    { id:'BON001', empId:'EMP001', type:'performance', performanceRating:'Exceeds Expectations', kpiScore:95, amount:32400, description:'Annual Bonus 2025 — Exceeds Expectations (KPI: 95%)', cycle:'ANNUAL-2025', payrollMonth:'2025-12', status:'Paid',    approvedBy:'admin@asalmedia.so', createdAt:'2025-12-01' },
    { id:'BON002', empId:'EMP002', type:'performance', performanceRating:'Meets Expectations',    kpiScore:78, amount:18000, description:'Annual Bonus 2025 — Meets Expectations (KPI: 78%)',    cycle:'ANNUAL-2025', payrollMonth:'2025-12', status:'Paid',    approvedBy:'admin@asalmedia.so', createdAt:'2025-12-01' },
    { id:'BON003', empId:'EMP003', type:'performance', performanceRating:'Outstanding',            kpiScore:112,amount:45600, description:'Annual Bonus 2025 — Outstanding (KPI: 112%)',          cycle:'ANNUAL-2025', payrollMonth:'2025-12', status:'Approved',approvedBy:'admin@asalmedia.so', createdAt:'2025-12-01' },
    { id:'BON004', empId:'EMP004', type:'performance', performanceRating:'Needs Improvement',      kpiScore:58, amount:3600,  description:'Annual Bonus 2025 — Needs Improvement (KPI: 58%)',     cycle:'ANNUAL-2025', payrollMonth:'2025-12', status:'Pending', approvedBy:'', createdAt:'2025-12-01' },
  ],

  /* ── SALARY ADVANCES ── */
  salaryAdvances: [
    { id:'ADV001', empId:'EMP001', amount:9000, reason:'Medical emergency for family member', status:'Paid',     requestedAt:'2026-05-10', approvedBy:'admin@asalmedia.so', approvedAt:'2026-05-11', deductMonth:'2026-05', deductedAt:'2026-05-30', notes:'' },
    { id:'ADV002', empId:'EMP003', amount:5500, reason:'Home renovation advance',              status:'Approved', requestedAt:'2026-06-01', approvedBy:'fatima@amc.so',     approvedAt:'2026-06-02', deductMonth:'2026-06', deductedAt:'',           notes:'Deduct from June payroll' },
    { id:'ADV003', empId:'EMP005', amount:1500, reason:'School fees for children',             status:'Pending',  requestedAt:'2026-06-04', approvedBy:'',                   approvedAt:'',           deductMonth:'',        deductedAt:'',           notes:'' },
    { id:'ADV004', empId:'EMP002', amount:1800, reason:'Travel and accommodation expenses',    status:'Rejected', requestedAt:'2026-05-20', approvedBy:'fatima@amc.so',     approvedAt:'2026-05-21', deductMonth:'',        deductedAt:'',           notes:'Exceeds 50% salary limit' },
  ],

  /* ── EMPLOYEE LOANS ── */
  loans: [
    { id:'LON001', empId:'EMP001', principal:18000, months:12, interestRate:0, monthlyInstallment:1500,   totalRepayable:18000,  amountPaid:3000,   status:'Active',    startDate:'2026-01-01', endDate:'2026-12-31', purpose:'Personal loan',     approvedBy:'admin@asalmedia.so', history:[{month:'2026-01',amount:1500},{month:'2026-02',amount:1500}] },
    { id:'LON002', empId:'EMP003', principal:12000, months:6,  interestRate:0, monthlyInstallment:2000,   totalRepayable:12000,  amountPaid:12000,  status:'Completed', startDate:'2025-12-01', endDate:'2026-05-31', purpose:'Emergency expense',  approvedBy:'admin@asalmedia.so', history:[] },
    { id:'LON003', empId:'EMP004', principal:30000, months:24, interestRate:3, monthlyInstallment:1330,   totalRepayable:31928,  amountPaid:2660,   status:'Active',    startDate:'2026-05-01', endDate:'2028-04-30', purpose:'Car purchase',       approvedBy:'admin@asalmedia.so', history:[{month:'2026-05',amount:1330},{month:'2026-06',amount:1330}] },
    { id:'LON004', empId:'EMP006', principal:5000,  months:4,  interestRate:0, monthlyInstallment:1250,   totalRepayable:5000,   amountPaid:0,      status:'Active',    startDate:'2026-06-01', endDate:'2026-09-30', purpose:'Family emergency',   approvedBy:'ahmed@amc.so',       history:[] },
  ],

  /* ── NOTICE BOARD ── */
  notices: [
    { id:'NOT001', title:'Welcome to AMC HRMS v2.1', body:'We are pleased to announce the launch of the new AMC HRMS. All employees must log in and verify their profile within 7 days. Contact HR at hr@asalmedia.so for issues.', category:'HR Announcement', priority:'High', targetType:'all', targetIds:[], subsidiaries:['jiil','asal_tv','masrax','nasiye'], status:'Active', pinned:true, publishDate:'2026-06-01', expiryDate:'2026-07-01', requiresAck:true, showOnLogin:false, createdBy:'USR000', createdByName:'Super Admin', createdAt:'2026-06-01 08:00', updatedAt:'2026-06-01 08:00', views:0, acknowledgments:[], tags:['system','launch','mandatory'] },
    { id:'NOT002', title:'CRITICAL: Password Security Policy Update', body:'Effective immediately all employees must update passwords. Minimum 12 characters with uppercase lowercase numbers and special characters required. Non-compliance within 48 hours results in account suspension.', category:'Information Security Alert', priority:'Critical', targetType:'all', targetIds:[], subsidiaries:['jiil','asal_tv','masrax','nasiye'], status:'Active', pinned:true, publishDate:'2026-06-04', expiryDate:'2026-06-30', requiresAck:true, showOnLogin:true, createdBy:'USR000', createdByName:'Super Admin', createdAt:'2026-06-04 09:00', updatedAt:'2026-06-04 09:00', views:0, acknowledgments:[], tags:['security','password','mandatory'] },
    { id:'NOT003', title:'Eid Al-Adha Public Holiday Notice', body:'Asal Media Corporation will observe Eid Al-Adha from June 16-18 2026. All offices will be closed. Employees with critical duties will be contacted by their department heads. Eid Mubarak!', category:'HR Announcement', priority:'Informational', targetType:'all', targetIds:[], subsidiaries:['jiil','asal_tv','masrax','nasiye'], status:'Active', pinned:false, publishDate:'2026-06-06', expiryDate:'2026-06-19', requiresAck:false, showOnLogin:false, createdBy:'USR001', createdByName:'Fatima Hassan', createdAt:'2026-06-06 11:00', updatedAt:'2026-06-06 11:00', views:0, acknowledgments:[], tags:['holiday','eid'] },
    { id:'NOT004', title:'Q2 2026 Performance Review Action Required', body:'The Q2 2026 performance review cycle has begun. All department managers must complete KPI evaluations by June 30. Employees must submit self-assessments by June 25.', category:'HR Announcement', priority:'High', targetType:'role', targetIds:['dept_manager','hr_manager','hr_director'], subsidiaries:['jiil','asal_tv','masrax','nasiye'], status:'Active', pinned:false, publishDate:'2026-06-05', expiryDate:'2026-06-30', requiresAck:true, showOnLogin:false, createdBy:'USR001', createdByName:'Fatima Hassan', createdAt:'2026-06-05 08:00', updatedAt:'2026-06-05 08:00', views:0, acknowledgments:[], tags:['performance','kpi','review'] },
  ],

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
    if (!kpi.target || kpi.target === 0) return 0;
    if (kpi.type === 'Time') return kpi.actual <= kpi.target ? Math.min(120, (kpi.target / kpi.actual) * 100) : (kpi.target / kpi.actual) * 100;
    if (kpi.type === 'Binary') return kpi.actual >= 1 ? 100 : 0;
    return Math.min(120, (kpi.actual / kpi.target) * 100);
  },
  calcEmployeeScore(empId) {
    const kpis = DB.kpis.filter(k => k.empId === empId);
    if (!kpis.length) return null;
    const totalWeight = kpis.reduce((s, k) => s + k.weight, 0);
    if (totalWeight === 0) return null;
    const weighted = kpis.reduce((s, k) => s + (this.calcAchievement(k) * k.weight), 0);
    return Math.round(weighted / totalWeight);
  },
  ratingLabel(score) {
    if (score >= 110) return { label:'Outstanding',    cls:'excellent' };
    if (score >= 90)  return { label:'Exceeds Target', cls:'good' };
    if (score >= 70)  return { label:'Meets Target',   cls:'average' };
    if (score >= 50)  return { label:'Needs Improvement', cls:'below' };
    return               { label:'Unsatisfactory',    cls:'poor' };
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

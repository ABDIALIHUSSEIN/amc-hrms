/* ============================================================
   AMC HRMS v2.0 — DATA LAYER
   Asal Media Corporation
   Subsidiaries: JIIL Media, Asal TV, Masrax Production, Nasiye
   ============================================================ */

'use strict';

const DB = {

subsidiaries: [
  { id:'jiil',    name:'JIIL Media',        code:'JML', color:'#C9A227', location:'Mogadishu', headcount:0, sector:'Digital Media' },
  { id:'asal_tv', name:'Asal TV',           code:'ATV', color:'#001B44', location:'Mogadishu', headcount:0, sector:'Television' },
  { id:'masrax',  name:'Masrax Production', code:'MPR', color:'#8B0000', location:'Mogadishu', headcount:0, sector:'Film & Production' },
  { id:'nasiye',  name:'Nasiye',            code:'NSY', color:'#0D6E3F', location:'Mogadishu', headcount:0, sector:'News & Media' },
],

departments: [
  { id:'asa_administration_support_services', name:'Administration & Support Services', sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'asa_broadcasting_on_air', name:'Broadcasting & On-Air', sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'asa_call_center_customer_service', name:'Call Center & Customer Service', sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'asa_human_resources', name:'Human Resources', sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'asa_marketing_promotions', name:'Marketing & Promotions', sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'asa_news_journalism', name:'News & Journalism', sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'asa_production_studio', name:'Production & Studio', sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'asa_technical_operations', name:'Technical Operations', sub:'asal_tv', head:'', count:0, budget:0 },
  { id:'jii_administration', name:'Administration', sub:'jiil', head:'', count:0, budget:0 },
  { id:'jii_film_department', name:'Film Department', sub:'jiil', head:'', count:0, budget:0 },
  { id:'jii_finance_accounting', name:'Finance & Accounting', sub:'jiil', head:'', count:0, budget:0 },
  { id:'jii_human_resources', name:'Human Resources', sub:'jiil', head:'', count:0, budget:0 },
  { id:'jii_make_up_arts', name:'Make-up & Arts', sub:'jiil', head:'', count:0, budget:0 },
  { id:'jii_marketing_sales', name:'Marketing & Sales', sub:'jiil', head:'', count:0, budget:0 },
  { id:'jii_post_production', name:'Post Production', sub:'jiil', head:'', count:0, budget:0 },
  { id:'jii_pre_production', name:'Pre-Production', sub:'jiil', head:'', count:0, budget:0 },
  { id:'jii_production', name:'Production', sub:'jiil', head:'', count:0, budget:0 },
  { id:'jii_quran_tv', name:'Quran TV', sub:'jiil', head:'', count:0, budget:0 },
  { id:'jii_social_media', name:'Social Media', sub:'jiil', head:'', count:0, budget:0 },
  { id:'jii_technology_it', name:'Technology & IT', sub:'jiil', head:'', count:0, budget:0 },
  { id:'mas_art_team', name:'Art Team', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_boom_operator', name:'Boom Operator', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_camera', name:'Camera', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_directors_team', name:'Directors Team', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_documentary', name:'Documentary', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_dop', name:'DOP', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_finance', name:'Finance', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_grip', name:'Grip', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_lighting', name:'Lighting', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_makeup_wardrobe', name:'Makeup & Wardrobe', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_management', name:'Management', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_marketing', name:'Marketing', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_operations', name:'Operations', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_post_production', name:'Post Production', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_production', name:'Production', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_screenwriting', name:'Screenwriting', sub:'masrax', head:'', count:0, budget:0 },
  { id:'mas_sound', name:'Sound', sub:'masrax', head:'', count:0, budget:0 },
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

kpis:              [],
tasks:             [],
projects:          [],
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

users: [],

};

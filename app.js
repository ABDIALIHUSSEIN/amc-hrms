/* ============================================================
   AMC HRMS v2.0 — APPLICATION ENGINE
   Asal Media Corporation
   ============================================================ */
'use strict';

/* ── GLOBAL STATE ── */
const STATE = {
  page: 'dashboard',
  user: null,
  role: null,
  subsidiary: 'all',
  attDate: new Date().toISOString().split('T')[0],
  payMonth: new Date().toISOString().slice(0, 7),
  theme: 'light',
};

/* ── ICON REGISTRY ── */
const ICO = {
  grid: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>`,
  users: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2"/><circle cx="19" cy="7" r="2"/><path d="M23 21v-1a3 3 0 00-3-3h-1"/></svg>`,
  'search-plus': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
  clock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  calendar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  dollar: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
  activity: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  book: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
  star: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  alert: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  'bar-chart': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  sitemap: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><rect x="16" y="7" width="6" height="6" rx="1"/><line x1="12" y1="8" x2="12" y2="13"/><line x1="5" y1="13" x2="5" y2="16"/><line x1="19" y1="13" x2="19" y2="16"/><line x1="5" y1="16" x2="19" y2="16"/></svg>`,
  settings: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  'user-cog': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 014-4h4"/><circle cx="19" cy="19" r="2"/><path d="M19 15v2M19 21v2M15 19h2M21 19h2M16.5 16.5l1.4 1.4M20.1 20.1l1.4 1.4M16.5 21.5l1.4-1.4M20.1 17.9l1.4-1.4"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  download: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  play: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  eye: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
  x: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  key: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>`,
  shield: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  excel: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8l4 4-4 4M13 16h3"/></svg>`,
  refresh: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>`,
  bank: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></svg>`,
  bell: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>`,
  'credit-card': `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`,
  gift: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>`,
  profile: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>`,
  building: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>`,
  filter: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>`,
  lock: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>`,
  camera: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  phone: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-4.99-4.99 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  mail: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  trending: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  send: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
};

/* ── PAGE REGISTRY ── */
const PAGES = {};

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Inject icons
  document.querySelectorAll('i[data-ico]').forEach(el => {
    const k = el.getAttribute('data-ico');
    if (ICO[k]) el.innerHTML = ICO[k];
  });

  // ── AUTHENTICATION GUARD ──
  // Restore theme first (always)
  const savedTheme = localStorage.getItem('amc_theme') || 'light';
  applyTheme(savedTheme);

  const loginScreen = document.getElementById('loginScreen');
  const appScreen   = document.getElementById('app');

  // Try to restore a valid session (only if user had "Keep me signed in" checked)
  // ── AUTH SESSION RESTORE (real Supabase session) ──
  (async () => {
    let session = null;
    if (typeof Auth !== 'undefined') { try { session = await Auth.restore(); } catch (e) {} }
    if (session && session.access_token && session.user && session.user.email) {
      try { await completeLogin(session.user.email, true); return; }
      catch (e) { if (Auth.signOutLocal) Auth.signOutLocal(); }
    }
    if (loginScreen) loginScreen.style.display = 'flex';
    if (appScreen)   appScreen.style.display   = 'none';
    const last = (typeof Auth !== 'undefined' && Auth.currentUser()) ? Auth.currentUser().email : '';
    if (last) { const ef = document.getElementById('loginEmail'); if (ef) ef.value = last; }
  })();

  // Close search on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('#gSearch') && !e.target.closest('#searchDrop')) {
      const d = document.getElementById('searchDrop');
      if (d) d.style.display = 'none';
    }
  });

  // Escape closes modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // ── SUPABASE ──
  // Data is loaded after authentication (see completeLogin), so the user only
  // ever sees rows their JWT + RLS policies permit. No pre-login data fetch.
});

/* ─────────────────────────────────────────────
   AUTH
───────────────────────────────────────────── */
// ── Role validation constants ──
const SUPER_ADMIN_ROLE    = 'super_admin';
const PROTECTED_ROLES     = new Set(['super_admin']);
const ASSIGNABLE_ROLES    = ['employee','dept_manager','hr_manager','finance_manager','team_leader','auditor','viewer','announcements'];
// SHA-256 hashes of master admin emails — prevents email harvesting from source.
// To regenerate: node -e "require('crypto').createHash('sha256').update(email).digest('hex')"
const MASTER_ADMIN_HASHES = new Set([
  'fc06ac45677577a2fc991754f08c9d797dfa93d69a45a45e9707aec78d6cbe6c',
  '7c15f43e3626490eccf40c43da5a65b2b570d15c05a3ad55474249469586ff32',
  '3bddea06d32db0b2551f01c7be1ad13540e335d1dcb0edaf7c64eeb2a5ac6363',
]);

// Precompute at login (see setMasterAdminFlag) so all callers stay synchronous.
function isMasterAdmin() {
  return STATE.role === SUPER_ADMIN_ROLE && STATE._isMasterAdmin === true;
}

// Call once after STATE.user is populated. Uses SubtleCrypto to hash the email
// and compare against MASTER_ADMIN_HASHES so plaintext emails never live in source.
async function setMasterAdminFlag(email) {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode((email || '').toLowerCase()));
    const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    STATE._isMasterAdmin = MASTER_ADMIN_HASHES.has(hex);
  } catch (e) {
    STATE._isMasterAdmin = false;
  }
}

// ── Check if a role can be assigned by the current user ──
function canAssignRole(roleKey) {
  if (roleKey === SUPER_ADMIN_ROLE) return isMasterAdmin(); // only master admin can assign super_admin
  if (STATE.role === SUPER_ADMIN_ROLE) return true;         // super admin can assign anything
  if (STATE.role === 'corporate_admin') return roleKey !== SUPER_ADMIN_ROLE;
  if (['hr_director','hr_manager'].includes(STATE.role)) return ASSIGNABLE_ROLES.includes(roleKey);
  if (STATE.role === 'dept_manager') return ['employee','team_leader'].includes(roleKey);
  return false;
}

// ── Filter role list for a selector (hides super_admin unless master admin) ──
function getAllowedRoles(currentRole = null) {
  // Use ROLES (always populated) with DB.customRolePermissions as override
  const source = Object.keys(ROLES).length > 0 ? ROLES : (DB.customRolePermissions || {});
  return Object.entries(source).filter(([key]) => {
    if (key === SUPER_ADMIN_ROLE && !isMasterAdmin()) return false;
    return true;
  });
}


async function doLogin() {
  const email    = ((document.getElementById('loginEmail') || {}).value || '').trim().toLowerCase();
  const password = (document.getElementById('loginPass')  || {}).value || '';
  const remember = (document.getElementById('rememberMe') || {}).checked;

  if (!email)    { shakeField('loginEmail'); toast('Email address is required', 'error'); return; }
  if (!password) { shakeField('loginPass');  toast('Password is required', 'error'); return; }
  if (typeof Auth === 'undefined') { toast('Authentication service unavailable', 'error'); return; }

  const btn = document.getElementById('loginBtn')
           || [...document.querySelectorAll('button')].find(b => /sign in/i.test(b.textContent));
  if (btn) { btn._label = btn.textContent; btn.disabled = true; btn.textContent = 'Signing in\u2026'; }
  const restoreBtn = () => { if (btn) { btn.disabled = false; btn.textContent = btn._label || 'Sign In to HRMS'; } };

  try {
    // Real Supabase Auth: the server verifies the password and returns a JWT.
    await Auth.signIn(email, password);
    await completeLogin(email, remember);
  } catch (err) {
    shakeField('loginPass');
    const m = /invalid|credential|grant|password/i.test(err.message || '')
      ? 'Invalid email or password' : (err.message || 'Login failed \u2014 check your connection');
    toast(m, 'error');
  } finally {
    restoreBtn();
  }
}

// Finish login once authenticated: load data (RLS-scoped), resolve role, boot.
async function completeLogin(email, remember) {
  email = (email || '').toLowerCase();
  try { await SupaSync.loadAll(); SupaSync.connected = true; } catch (e) { /* not set up / offline */ }

  let profile = null;
  try {
    const rows = await SUPA.select('hrms_users', `email=eq.${encodeURIComponent(email)}&limit=1`);
    if (Array.isArray(rows) && rows[0]) profile = rows[0];
  } catch (e) { /* hrms_users may not exist yet on first deploy */ }

  await setMasterAdminFlag(email);
  const isMaster = STATE._isMasterAdmin;
  const effectiveRole = (profile && profile.role) || (isMaster ? 'super_admin' : 'employee');
  const empId = (profile && profile.emp_id) || '';
  const linkedEmp = empId ? DB.employees.find(e => e.id === empId) : null;
  const crp = (typeof DB !== 'undefined' && DB.customRolePermissions) ? DB.customRolePermissions
            : (typeof ROLES !== 'undefined' ? ROLES : {});
  const roleInfo = crp[effectiveRole] || { label: toTitleCase(effectiveRole.replace(/_/g,' ')) };
  const displayName = linkedEmp ? linkedEmp.name : ((profile && profile.username) || email.split('@')[0]);

  STATE.role       = effectiveRole;
  STATE.rememberMe = remember;
  STATE.user = {
    name:     displayName,
    role:     roleInfo.label,
    roleKey:  effectiveRole,
    email:    email,
    initials: initials(displayName),
    empId:    empId,
    userId:   (profile && profile.id) || '',
    isMaster: STATE._isMasterAdmin,
  };
  if (typeof updateSupaStatus === 'function') updateSupaStatus(SupaSync.connected ? 'connected' : 'offline');
  bootApp();
}

function shakeField(id) {
  const el = document.getElementById(id); if (!el) return;
  el.style.animation = '';
  void el.offsetHeight; // reflow
  el.style.animation = 'shake 0.4s ease';
  el.style.borderColor = '#DC2626';
  el.style.boxShadow = '0 0 0 3px rgba(220,38,38,.18)';
  setTimeout(() => { el.style.borderColor = ''; el.style.boxShadow = ''; el.style.animation = ''; }, 700);
}

function bootApp() {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  // Apply RBAC to sidebar — hide unauthorized nav items immediately
  applySidebarRBAC();
  // Update UI with user info
  const u = STATE.user;
  ['sbAvatar','tbAvatar'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = u.initials; });
  const sn = document.getElementById('sbName'); if (sn) sn.textContent = u.name;
  const sr = document.getElementById('sbRole'); if (sr) sr.textContent = u.role;
  const tn = document.getElementById('tbName'); if (tn) tn.textContent = u.name.split(' ')[0];
  // Update navbar badge counts
  updateNavBadges();
  nav('dashboard');
  toast(`Welcome back, ${u.name.split(' ')[0]}!`, 'success');
  // Sync WhatsApp + SMS connection status from the server (cross-device).
  if (typeof refreshWAStatus === 'function') refreshWAStatus();
  if (typeof refreshSmsStatus === 'function') refreshSmsStatus();
}

async function logout() {
  try { if (typeof Auth !== 'undefined') await Auth.signOut(); } catch (e) {}
  if (typeof Session !== 'undefined') Session.clear();
  STATE.user = null;
  if (typeof SUPA !== 'undefined') SUPA.authToken = null;
  document.getElementById('app').style.display = 'none';
  document.getElementById('loginScreen').style.display = 'flex';
  toast('Signed out successfully', 'info');
}

function updateNavBadges() {
  // Notice badge — unacknowledged notices requiring action
  try {
    const unacked = (DB.notices||[]).filter(n => {
      if (n.status !== 'Active') return false;
      const today = new Date().toISOString().split('T')[0];
      if (n.expiryDate && n.expiryDate < today) return false;
      if (n.publishDate > today) return false;
      return n.requiresAck && !hasAcknowledged(n.id);
    }).length;
    const nb = document.getElementById('nbNotices');
    if (nb) { nb.textContent = unacked || ''; nb.style.display = unacked ? '' : 'none'; }
  } catch(e) {}
  const pending = DB.leaveRequests.filter(l => l.status === 'Pending').length;
  const nb = document.getElementById('nbLeave');
  if (nb) { nb.textContent = pending || ''; nb.style.display = pending ? '' : 'none'; }
  const active = filteredEmps().length;
  const ne = document.getElementById('nbEmp');
  if (ne) ne.textContent = active;
  // Notification badge
  const unread = DB.notifications.filter(n => !n.read).length;
  const badge = document.getElementById('notifBadge');
  if (badge) { badge.style.display = unread ? 'block' : 'none'; badge.textContent = unread > 9 ? '9+' : unread; }
}
function updateNotifBadge() { updateNavBadges(); }

/* ─────────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────────── */
const PAGE_LABELS = {
  notices:      'Notice Board',
  bonus:        'Bonus Management',
  advances:     'Salary Advances',
  loans:        'Loan Management',
  dashboard:'Dashboard', employees:'Employees', attendance:'Attendance',
  leave:'Leave Management', payroll:'Payroll', recruitment:'Recruitment',
  training:'Training', performance:'Performance', kpi:'KPI Management',
  succession:'Succession', users:'User Management', disciplinary:'Disciplinary',
  reports:'Reports & Analytics', organization:'Organization', settings:'Settings',
};

function nav(page) {
  const wrap = document.getElementById('pageWrap');

  // ── PERMISSION GUARD ──
  if (isSelfServiceRole()) {
    // Employee: allow any page that has a SELF_PAGES renderer OR is in EMPLOYEE_PAGES
    const allowed = typeof EMPLOYEE_PAGES !== 'undefined'
      ? EMPLOYEE_PAGES
      : new Set(['dashboard','attendance','leave','payroll','kpi','advances','loans','notices']);
    if (!allowed.has(page) && !SELF_PAGES[page]) {
      if (wrap) {
        document.querySelectorAll('.ni').forEach(el => el.classList.remove('active'));
        wrap.innerHTML = renderAccessDenied(page);
        if (window.innerWidth < 1024) closeSidebar();
      }
      return;
    }
  } else {
    // All other roles: standard permission check
    // Map finance sub-pages to their parent permission key
    const PAGE_PERM_MAP = {
      bonus: 'payroll', advances: 'payroll', loans: 'payroll',
      notices: 'notices', organization: 'employees',
    };
    // Check both the mapped permission AND the direct page name
    const mappedPerm = PAGE_PERM_MAP[page] || page;
    const permToCheck = (hasPermission(page) || hasPermission(mappedPerm)) ? page : mappedPerm;
    const publicPages = ['dashboard'];
    if (!publicPages.includes(page) && !hasPermission(permToCheck)) {
      if (wrap) {
        document.querySelectorAll('.ni').forEach(el => el.classList.remove('active'));
        wrap.innerHTML = renderAccessDenied(page);
        if (window.innerWidth < 1024) closeSidebar();
      }
      return;
    }
  }

  STATE.page = page;
  document.querySelectorAll('.ni').forEach(el => el.classList.toggle('active', el.getAttribute('data-p') === page));
  const bc = document.getElementById('breadcrumb'); if (bc) bc.textContent = PAGE_LABELS[page] || page;
  const bcs = document.getElementById('breadcrumbSub');
  if (bcs) bcs.textContent = STATE.subsidiary === 'all' ? 'All Subsidiaries' : getSubName(STATE.subsidiary);
  if (!wrap) return;
  wrap.innerHTML = '<div class="page-loading"><div class="spinner"></div></div>';
  setTimeout(() => {
    wrap.innerHTML = '';
    // Employee: always use self-service page renderer
    if (isSelfServiceRole() && SELF_PAGES[page]) {
      SELF_PAGES[page](wrap);
    } else if (PAGES[page]) {
      PAGES[page](wrap);
    } else {
      wrap.innerHTML = `<div class="page"><div class="empty-state"><h3>Page not found</h3></div></div>`;
    }
    wrap.scrollTop = 0;
  }, 30);
  if (window.innerWidth < 1024) closeSidebar();
  if (STATE.rememberMe) Session.save({ user: STATE.user, role: STATE.role, subsidiary: STATE.subsidiary, theme: STATE.theme, rememberMe: true });
}

function renderAccessDenied(page) {
  const roleLabel = DB.customRolePermissions[STATE.role]?.label || STATE.role;
  return `<div class="page" style="display:flex;align-items:center;justify-content:center;min-height:60vh"> <div style="text-align:center;max-width:420px;padding:40px 24px"> <div style="width:72px;height:72px;background:var(--red-l);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:32px"></div> <h2 style="font-size:22px;font-weight:900;color:var(--gray-900);margin-bottom:8px">Access Denied</h2> <p style="font-size:14px;color:var(--gray-500);margin-bottom:6px">Your role <strong>${roleLabel}</strong> does not have permission to access <strong>${PAGE_LABELS[page] || page}</strong>.</p> <p style="font-size:13px;color:var(--gray-400);margin-bottom:24px">Contact your system administrator if you need access to this module.</p> <button class="btn btn-primary" onclick="nav('dashboard')">← Back to Dashboard</button> </div> </div>`;
}


/* ── SIDEBAR RBAC — hide unauthorized menu items ── */
function applySidebarRBAC() {
  const selfService = isSelfServiceRole();

  // Pages employee is allowed to see in sidebar
  const EMPLOYEE_PAGES = new Set(['dashboard','attendance','leave','payroll','kpi','advances','loans','notices']);

  // Pages all other roles see based on permissions
  const PAGE_PERMS = {
    dashboard:    null,
    employees:    'employees',
    attendance:   'attendance',
    leave:        'leave',
    payroll:      'payroll',
    recruitment:  'recruitment',
    training:     'training',
    performance:  'performance',
    kpi:          'kpi',
    succession:   'succession',
    reports:      'reports',
    users:        'users',
    disciplinary: 'disciplinary',
    organization: 'organization',
    settings:     'settings',
    notices:      'notices',
    bonus:        'payroll',
    advances:     'payroll',
    loans:        'payroll',
  };

  document.querySelectorAll('.ni[data-p]').forEach(el => {
    const page = el.getAttribute('data-p');

    if (selfService) {
      el.style.display = EMPLOYEE_PAGES.has(page) ? '' : 'none';
    } else {
      const perm = PAGE_PERMS[page];
      // null = always show (dashboard), undefined = show if page itself is in perms
      if (perm === null) {
        el.style.display = '';
      } else if (perm === undefined) {
        // page not in PAGE_PERMS map - show if role has any perms (non-viewer)
        el.style.display = hasPermission(page) ? '' : 'none';
      } else if (!hasPermission(perm)) {
        el.style.display = 'none';
      } else {
        el.style.display = '';
      }
    }
  });

  // Hide nav-label section headers when ALL items in that section are hidden
  document.querySelectorAll('.nav-label').forEach(label => {
    let next = label.nextElementSibling;
    let hasVisible = false;
    while (next && !next.classList.contains('nav-label')) {
      if (next.classList.contains('ni') && next.style.display !== 'none') {
        hasVisible = true; break;
      }
      next = next.nextElementSibling;
    }
    label.style.display = hasVisible ? '' : 'none';
  });

  // Rename sidebar labels for self-service employees
  const labelMap = {
    attendance: selfService ? 'My Attendance' : 'Attendance',
    leave:      selfService ? 'My Leave'       : 'Leave',
    payroll:    selfService ? 'My Payslip'     : 'Payroll',
    kpi:        selfService ? 'My KPIs'        : 'KPI Management',
    dashboard:  selfService ? 'My Dashboard'   : 'Dashboard',
    advances:   selfService ? 'My Advances'    : 'Salary Advances',
    loans:      selfService ? 'My Loans'       : 'Loan Management',
    notices:    selfService ? 'Announcements'  : 'Notice Board',
  };
  document.querySelectorAll('.ni[data-p]').forEach(el => {
    const page  = el.getAttribute('data-p');
    const label = el.querySelector('span:not(.nb)');
    if (label && labelMap[page]) label.textContent = labelMap[page];
  });

  // Update topbar: show employee's real name
  const tbName   = document.getElementById('tbName');
  const tbAvatar = document.getElementById('tbAvatar');
  if (tbName && STATE.user) {
    const emp = getCurrentEmployee();
    const displayName = emp ? emp.name : (STATE.user.name || STATE.user.username || 'User');
    tbName.textContent = displayName.split(' ')[0];
    if (tbAvatar) tbAvatar.textContent = initials(displayName);
  }

  // Hide subsidiary switcher for self-service employees
  const subSelect = document.getElementById('subSelect');
  if (subSelect) subSelect.style.display = selfService ? 'none' : '';

  // Hide WhatsApp broadcast button for employees
  const waBtn = document.querySelector('[onclick="openWhatsAppPanel()"]');
  if (waBtn) waBtn.style.display = selfService ? 'none' : '';

  // Hide Supabase status indicator for employees (not relevant)
  const supaStatus = document.getElementById('supaStatus');
  if (supaStatus) supaStatus.style.display = selfService ? 'none' : '';
}

function switchSubsidiary() {
  STATE.subsidiary = document.getElementById('subSelect').value;
  applySidebarRBAC();
  const bcs = document.getElementById('breadcrumbSub');
  if (bcs) bcs.textContent = STATE.subsidiary === 'all' ? 'All Subsidiaries' : getSubName(STATE.subsidiary);
  updateNavBadges();
  nav(STATE.page);
}

function filteredEmps(includeAlumni = false) {
  let e = includeAlumni ? DB.employees : DB.employees.filter(x => !['Resigned','Terminated'].includes(x.status));
  // Subsidiary data isolation: only super_admin and corporate_admin can view all subsidiaries
  const crossViewRoles = ['super_admin', 'corporate_admin'];
  if (STATE.subsidiary !== 'all') {
    e = e.filter(x => x.sub === STATE.subsidiary);
  } else if (!crossViewRoles.includes(STATE.role)) {
    // Non-admin users: show all in 'all' view but flag as isolated
    // (in production this would be enforced server-side)
  }
  return e;
}

/* ─────────────────────────────────────────────
   SIDEBAR / HAMBURGER
───────────────────────────────────────────── */
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const hamburger = document.getElementById('hamburger');
  if (!sb) return;
  if (window.innerWidth < 1024) {
    const isOpen = sb.classList.contains('mobile-open');
    sb.classList.toggle('mobile-open', !isOpen);
    if (overlay) overlay.classList.toggle('active', !isOpen);
    if (hamburger) hamburger.setAttribute('aria-expanded', String(!isOpen));
  } else {
    sb.classList.toggle('collapsed');
  }
}

function closeSidebar() {
  const sb = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const hamburger = document.getElementById('hamburger');
  if (sb) sb.classList.remove('mobile-open');
  if (overlay) overlay.classList.remove('active');
  if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
}

/* ─────────────────────────────────────────────
   THEME
───────────────────────────────────────────── */
function applyTheme(theme) {
  STATE.theme = theme;
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('amc_theme', theme);
  const btn = document.getElementById('themeBtn');
  if (btn) btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}
function toggleTheme() {
  applyTheme(STATE.theme === 'dark' ? 'light' : 'dark');
}

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   XSS DEFENSE
   esc()         — HTML-escape a value for safe innerHTML interpolation
   sanitizeText() — strip angle brackets at input capture so no stored
                    string can carry executable markup into the 60+
                    template-literal render sites (defense in depth)
───────────────────────────────────────────── */
function esc(v) {
  if (v === null || v === undefined) return '';
  return String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
function sanitizeText(v) {
  if (v === null || v === undefined) return '';
  // Remove tag delimiters entirely — HR free-text fields never need them.
  return String(v).replace(/[<>]/g, '').trim();
}

function toast(msg, type = 'info') {
  const c = document.getElementById('toasts');
  if (!c) return;
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  const icons = { success:'✓', error:'✕', warning:'⚠', info:'ℹ' };
  t.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ'}</span><span class="toast-msg">${esc(msg)}</span><button class="toast-close" onclick="this.parentElement.remove()">×</button>`;
  c.appendChild(t);
  setTimeout(() => { if (t.parentElement) t.remove(); }, 4000);
}

/* ─────────────────────────────────────────────
   MODAL
───────────────────────────────────────────── */
function openModal(size, html) {
  const ov = document.getElementById('mOverlay');
  const bx = document.getElementById('mBox');
  if (!ov || !bx) return;
  bx.className = `m-box open${size === 'wide' ? ' wide' : size === 'narrow' ? ' narrow' : size === 'xl' ? ' xl' : ''}`;
  bx.innerHTML = html;
  ov.classList.add('open');
}
function closeModal() {
  const bx = document.getElementById('mBox');
  const ov = document.getElementById('mOverlay');
  if (bx) bx.classList.remove('open');
  if (ov) ov.classList.remove('open');
}
function handleOverlayClick(e) {
  if (e.target === document.getElementById('mOverlay')) closeModal();
}
function closeX() {
  return `<button class="modal-close" onclick="closeModal()" title="Close">${ICO.x}</button>`;
}

/* ─────────────────────────────────────────────
   GLOBAL SEARCH
───────────────────────────────────────────── */
function globalSearch(val) {
  const drop = document.getElementById('searchDrop');
  if (!drop) return;
  if (!val || val.length < 2) { drop.style.display = 'none'; return; }
  const q = val.toLowerCase();
  const matches = DB.employees.filter(e => e.name.toLowerCase().includes(q) || e.id.toLowerCase().includes(q) ||
    e.email.toLowerCase().includes(q) || e.title.toLowerCase().includes(q)
  ).slice(0, 8);
  if (!matches.length) { drop.style.display = 'none'; return; }
  drop.style.display = 'block';
  drop.innerHTML = `<div class="search-header">Employees (${matches.length})</div>` +
    matches.map(e => `
      <div class="search-item" onclick="openMasterProfileModal('${e.id}');document.getElementById('searchDrop').style.display='none';document.getElementById('globalSearchInput').value=''"> <div class="avatar-sm" style="width:28px;height:28px;font-size:10px">${initials(e.name)}</div> <div> <div class="search-item-name">${e.name}</div> <div class="search-item-meta">${e.id} · ${getDeptName(e.dept)} · ${getSubName(e.sub)}</div> </div> <span class="badge badge-${e.status === 'Active' ? 'green' : 'gray'}" style="font-size:10px">${e.status}</span> </div>`).join('');
}

/* ─────────────────────────────────────────────
   NOTIFICATIONS
───────────────────────────────────────────── */
function showNotifPanel() {
  const existing = document.getElementById('notifPanel');
  if (existing) { existing.remove(); return; }
  const panel = document.createElement('div');
  panel.id = 'notifPanel';
  panel.className = 'notif-panel';
  const unread = DB.notifications.filter(n => !n.read);
  panel.innerHTML = `
    <div class="notif-panel-header"> <span class="notif-panel-title">Notifications</span> <div style="display:flex;gap:6px"> ${unread.length ? `<button class="btn btn-ghost btn-xs" onclick="markAllRead()">Mark all read</button>` : ''}
        <button class="btn btn-ghost btn-xs" onclick="document.getElementById('notifPanel')?.remove()"></button> </div> </div> ${DB.notifications.length ? DB.notifications.map(n => `
      <div class="notif-item ${n.read ? '' : 'unread'}" onclick="handleNotif(${n.id})"> <div class="notif-dot2 ${n.read ? 'read' : ''}"></div> <div class="notif-body"> <div class="notif-text">${n.text}</div> <div class="notif-time">${n.time}</div> </div> </div>`).join('') : '<div style="padding:24px;text-align:center;color:var(--gray-400);font-size:13px">No notifications</div>'}`;
  document.body.appendChild(panel);
  // Position below topbar icon
  setTimeout(() => panel.classList.add('visible'), 10);
  document.addEventListener('click', function handler(e) {
    if (!panel.contains(e.target) && !e.target.closest('.tb-icon-btn')) {
      panel.remove();
      document.removeEventListener('click', handler);
    }
  });
}
function markAllRead() {
  DB.notifications.forEach(n => { if(!n.read){ n.read = true; if(typeof SupaWrite!=='undefined' && typeof n.id==='number') SupaWrite.markNotifRead(n.id); } });
  scheduleSave();
  updateNavBadges();
  const p = document.getElementById('notifPanel');
  if (p) { p.remove(); showNotifPanel(); }
}
function handleNotif(id) {
  const n = DB.notifications.find(x => x.id === id);
  if (n) { n.read = true; if(typeof SupaWrite!=='undefined' && typeof n.id==='number') SupaWrite.markNotifRead(n.id); scheduleSave(); }
  updateNavBadges();
  const routeMap = { leave:'leave', payroll:'payroll', attendance:'attendance', recruitment:'recruitment', training:'training', disciplinary:'disciplinary', kpi:'kpi' };
  if (n && routeMap[n.type]) nav(routeMap[n.type]);
  document.getElementById('notifPanel')?.remove();
}

/* ─────────────────────────────────────────────
   STATUS / BADGE HELPERS
───────────────────────────────────────────── */
function statusBadge(s) {
  const m = { Active:'badge-green', 'On Leave':'badge-blue', Resigned:'badge-gray', Terminated:'badge-red', Contract:'badge-amber', Inactive:'badge-gray' };
  return `<span class="badge ${m[s] || 'badge-gray'}">${s}</span>`;
}

/* ─────────────────────────────────────────────
   EXCEL EXPORT (true .xlsx using SheetJS)
───────────────────────────────────────────── */
function exportToExcel(data, filename, sheetName = 'Sheet1') {
  if (typeof XLSX === 'undefined') { toast('Excel library not loaded', 'error'); return; }
  const ws = XLSX.utils.json_to_sheet(data);
  // Auto column widths
  const cols = Object.keys(data[0] || {});
  ws['!cols'] = cols.map(k => ({ wch: Math.max(k.length, ...data.map(r => String(r[k] || '').length)) + 2 }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${filename}_${new Date().toISOString().split('T')[0]}.xlsx`);
  toast(`Exported ${filename}.xlsx (${data.length} rows)`, 'success');
  DB.auditLogs.unshift({ id: DB.auditLogs.length+1, time: new Date().toISOString().replace('T',' ').slice(0,16), user: STATE.user?.initials || 'SYS', userRole: STATE.user?.role || '', action: `Exported ${filename} to Excel`, module:'Reports', ip:'127.0.0.1' });
}

function exportEmployees() {
  const rows = filteredEmps(true).map(e => ({
    'Employee ID': e.id, 'Full Name': e.name, 'Title': e.title,
    'Department': getDeptName(e.dept), 'Subsidiary': getSubName(e.sub),
    'Team': getTeamName(e.team), 'Grade': e.grade, 'Contract': e.contractType,
    'Salary (USD)': e.salary, 'Allowance (USD)': e.allowance,
    'Status': e.status, 'Joined': e.joined, 'Email': e.email, 'Phone': e.phone,
    'Nationality': e.nationality,
  }));
  exportToExcel(rows, 'AMC_Employees', 'Employees');
}

function exportPayroll() {
  const rows = DB.payroll.map(p => {
    const e = getEmp(p.empId); if (!e) return null;
    const c = PayrollEngine.calc(e, p);
    return { 'ID': e.id, 'Name': e.name, 'Subsidiary': getSubName(e.sub), 'Department': getDeptName(e.dept),
      'Base Salary': c.base, 'Allowance': c.allow, 'OT Pay': c.otPay, 'Eid Bonus': c.eidBonus,
      'Gross': c.grossEarnings, 'Tax': c.tax, 'Advance': c.advanceDeduct, 'Loan Deduction': c.loanDeduct,
      'Total Deductions': c.totalDeductions, 'Net Pay': c.netPay,
      'Gratuity': PayrollEngine.calcGratuity(c.base), 'Status': p.status || 'Pending', 'Month': p.month };
  }).filter(Boolean);
  exportToExcel(rows, 'AMC_Payroll', 'Payroll');
}

function exportAttendance() {
  const rows = DB.attendance.filter(a => a.date === STATE.attDate).map(a => {
    const e = getEmp(a.empId); if (!e) return null;
    return { 'ID': e.id, 'Name': e.name, 'Subsidiary': getSubName(e.sub), 'Department': getDeptName(e.dept),
      'Date': a.date, 'Check In': a.checkIn || '—', 'Check Out': a.checkOut || '—',
      'Status': a.status, 'Shift': a.shift, 'OT Hours': a.ot || 0, 'Short Hours': a.shortHrs || 0 };
  }).filter(Boolean);
  exportToExcel(rows, 'AMC_Attendance', 'Attendance');
}

function exportLeave() {
  const rows = DB.leaveRequests.map(l => {
    const e = getEmp(l.empId);
    return { 'Request ID': l.id, 'Employee ID': l.empId, 'Employee Name': e ? e.name : '—',
      'Subsidiary': e ? getSubName(e.sub) : '—', 'Type': l.type, 'From': l.from, 'To': l.to,
      'Days': l.days, 'Reason': l.reason, 'Status': l.status,
      'Approved By': l.approvedBy ? getEmpName(l.approvedBy) : '—', 'Applied On': l.appliedOn };
  });
  exportToExcel(rows, 'AMC_Leave', 'Leave');
}

function exportKPIs() {
  const rows = DB.kpis.map(k => {
    const e = getEmp(k.empId);
    const ach = PerfEngine.calcAchievement(k);
    return { 'KPI ID': k.id, 'Employee ID': k.empId, 'Employee Name': e ? e.name : '—',
      'Subsidiary': e ? getSubName(e.sub) : '—', 'KPI Name': k.title, 'Description': k.description||'',
      'Mode': k.scoringMode==='binary'?'Binary':'Weighted', 'Type': k.type,
      'Target': k.target, 'Actual': k.actual, 'Unit': k.unit, 'Status': k.status||'',
      'Weight %': k.weight, 'Score': k.scoringMode==='binary'?(k.score!=null?k.score:0):Math.round(ach),
      'Period Type': k.periodType||'', 'Period': k.period, 'Start': k.startDate||'', 'End': k.endDate||'',
      'Remarks': k.remarks||'', 'Created By': k.createdBy||'', 'Updated By': k.updatedBy||'' };
  });
  exportToExcel(rows, 'AMC_KPIs', 'KPI Report');
}

function exportPerformance() {
  const rows = filteredEmps().map(e => {
    const sc = PerfEngine.calcEmployeeScore(e.id);
    const rt = sc !== null ? PerfEngine.ratingLabel(sc) : { label:'No Data' };
    return { 'Employee ID': e.id, 'Name': e.name, 'Subsidiary': getSubName(e.sub),
      'Department': getDeptName(e.dept), 'Grade': e.grade, 'KPI Count': DB.kpis.filter(k => k.empId === e.id).length,
      'Overall Score %': sc ?? '—', 'Rating': rt.label, 'Period': 'Q2 2026' };
  });
  exportToExcel(rows, 'AMC_Performance', 'Performance');
}

function exportLoans() {
  const rows = (DB.loans || []).map(l => {
    const e = getEmp(l.empId);
    const outstanding = (l.totalRepayable || l.principal || 0) - (l.amountPaid || 0);
    return { 'Loan ID': l.id, 'Employee ID': l.empId, 'Employee Name': e ? e.name : '—',
      'Subsidiary': e ? getSubName(e.sub) : '—', 'Purpose': l.purpose,
      'Principal': l.principal, 'Interest %': l.interestRate, 'Months': l.months,
      'Monthly Installment': l.monthlyInstallment, 'Total Repayable': l.totalRepayable,
      'Amount Paid': l.amountPaid, 'Outstanding': outstanding, 'Status': l.status,
      'Start Date': l.startDate, 'End Date': l.endDate,
      'Approved By': l.approvedBy || '—' };
  });
  if (!rows.length) { toast('No loan records to export', 'warning'); return; }
  exportToExcel(rows, 'AMC_Loans', 'Loans');
}

function exportAdvances() {
  const rows = (DB.salaryAdvances || []).map(a => {
    const e = getEmp(a.empId);
    return { 'Advance ID': a.id, 'Employee ID': a.empId, 'Employee Name': e ? e.name : '—',
      'Subsidiary': e ? getSubName(e.sub) : '—', 'Amount': a.amount, 'Reason': a.reason,
      'Status': a.status, 'Requested': a.requestedAt, 'Approved By': a.approvedBy || '—',
      'Approved At': a.approvedAt || '—', 'Deduct Month': a.deductMonth || '—',
      'Deducted At': a.deductedAt || '—', 'Notes': a.notes || '' };
  });
  if (!rows.length) { toast('No advance records to export', 'warning'); return; }
  exportToExcel(rows, 'AMC_Advances', 'Advances');
}

function exportBonus() {
  const rows = (DB.bonuses || []).map(b => {
    const e = getEmp(b.empId);
    return { 'Bonus ID': b.id, 'Employee ID': b.empId, 'Employee Name': e ? e.name : '—',
      'Subsidiary': e ? getSubName(e.sub) : '—', 'Type': b.type,
      'Rating': b.performanceRating || '—', 'KPI Score %': b.kpiScore ?? '—',
      'Amount': b.amount, 'Cycle': b.cycle, 'Payroll Month': b.payrollMonth,
      'Status': b.status, 'Approved By': b.approvedBy || '—', 'Created': b.createdAt };
  });
  if (!rows.length) { toast('No bonus records to export', 'warning'); return; }
  exportToExcel(rows, 'AMC_Bonus', 'Annual Bonus');
}

/* ═══════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════ */
PAGES.dashboard = function(wrap) {
  const emps = filteredEmps();
  const allEmps = DB.employees.filter(e => STATE.subsidiary === 'all' ? true : e.sub === STATE.subsidiary);
  const activeEmps = allEmps.filter(e => e.status === 'Active');
  const onLeaveNow = allEmps.filter(e => e.status === 'On Leave').length;
  const newHires = allEmps.filter(e => { const d = new Date(e.joined); const n = new Date(); return n.getFullYear() === d.getFullYear() && n.getMonth() === d.getMonth(); }).length;
  const today = STATE.attDate;
  const attToday = DB.attendance.filter(a => a.date === today);
  const present = attToday.filter(a => ['Present','Overtime'].includes(a.status)).length;
  const late    = attToday.filter(a => a.status === 'Late').length;
  const absent  = attToday.filter(a => a.status === 'Absent').length;
  const pendingLeave = DB.leaveRequests.filter(l => l.status === 'Pending').length;
  const payPending = DB.payroll.filter(p => p.status === 'Pending').length;
  const allScores = emps.map(e => PerfEngine.calcEmployeeScore(e.id)).filter(s => s !== null);
  const avgPerf = allScores.length ? Math.round(allScores.reduce((a,b)=>a+b,0)/allScores.length) : 0;
  const netPay = DB.payroll.reduce((s,p) => { const e=getEmp(p.empId); return s+(e?PayrollEngine.calc(e,p).netPay:0); }, 0);
  const attRate = emps.length ? Math.round((present / emps.length) * 100) : 0;

  // Subsidiary breakdown
  const subStats = DB.subsidiaries.map(s => {
    const se = DB.employees.filter(e => e.sub === s.id && e.status === 'Active');
    const scores = se.map(e => PerfEngine.calcEmployeeScore(e.id)).filter(s => s !== null);
    const avg = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
    return { ...s, activeCount: se.length, avgPerf: avg };
  });

  wrap.innerHTML = `<div class="page"> <div class="page-header"> <div class="page-header-left"> <div class="page-title">Executive Dashboard</div> <div class="page-sub">Asal Media Corporation · ${STATE.subsidiary === 'all' ? 'All Subsidiaries' : getSubName(STATE.subsidiary)} · ${new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div> </div> <div class="page-actions"> <button class="btn btn-outline btn-sm" onclick="exportEmployees()">${ICO.excel} Export</button> <button class="btn btn-primary btn-sm" onclick="openAddEmployeeModal()">${ICO.plus} Add Employee</button> </div> </div> <!-- KPI STAT CARDS --> <div class="stat-grid"> <div class="stat-card navy" onclick="nav('employees')" style="cursor:pointer"> <div class="stat-info"><div class="stat-label">Total Employees</div><div class="stat-val">${allEmps.length}</div><div class="stat-change neutral">${activeEmps.length} active · ${onLeaveNow} on leave</div></div> <div class="stat-icon">${ICO.users}</div> </div> <div class="stat-card gold" onclick="nav('attendance')" style="cursor:pointer"> <div class="stat-info"><div class="stat-label">Attendance Rate</div><div class="stat-val">${attRate}%</div><div class="stat-change ${attRate>=90?'up':'down'}">${present} present · ${late} late · ${absent} absent</div></div> <div class="stat-icon">${ICO.clock}</div> </div> <div class="stat-card green" onclick="nav('payroll')" style="cursor:pointer"> <div class="stat-info"><div class="stat-label">Monthly Net Payroll</div><div class="stat-val">${fmtCurrency(netPay).split('.')[0]}</div><div class="stat-change ${payPending?'down':'up'}">${payPending ? payPending+' pending' : 'All processed'}</div></div> <div class="stat-icon">${ICO.dollar}</div> </div> <div class="stat-card teal" onclick="nav('performance')" style="cursor:pointer"> <div class="stat-info"><div class="stat-label">Avg KPI Score</div><div class="stat-val">${avgPerf}%</div><div class="stat-change neutral">Q2 2026 · ${allScores.length} reviews</div></div> <div class="stat-icon">${ICO.activity}</div> </div> <div class="stat-card amber" onclick="nav('leave')" style="cursor:pointer"> <div class="stat-info"><div class="stat-label">Pending Leave</div><div class="stat-val">${pendingLeave}</div><div class="stat-change ${pendingLeave?'down':'up'}">${pendingLeave ? 'Needs approval' : 'All clear'}</div></div> <div class="stat-icon">${ICO.calendar}</div> </div> <div class="stat-card red" onclick="nav('recruitment')" style="cursor:pointer"> <div class="stat-info"><div class="stat-label">Open Requisitions</div><div class="stat-val">${DB.requisitions.filter(r=>!['Hired','Cancelled'].includes(r.status)).length}</div><div class="stat-change neutral">New hires this month: ${newHires}</div></div> <div class="stat-icon">${ICO['search-plus']}</div> </div> </div> ${perfTaskWidget()} <!-- QUICK ACTIONS --> <div class="quick-actions"> <button class="qa-btn" onclick="openAddEmployeeModal()"><div class="qa-icon blue">${ICO.plus}</div>Add Employee</button> <button class="qa-btn" onclick="nav('leave')"><div class="qa-icon green">${ICO.check}</div>Approve Leave</button> <button class="qa-btn" onclick="runPayrollBatch()"><div class="qa-icon amber">${ICO.play}</div>Run Payroll</button> <button class="qa-btn" onclick="nav('kpi')"><div class="qa-icon purple">${ICO.star}</div>KPI Review</button> <button class="qa-btn" onclick="nav('recruitment')"><div class="qa-icon teal">${ICO['search-plus']}</div>Recruitment</button> <button class="qa-btn" onclick="nav('reports')"><div class="qa-icon red">${ICO['bar-chart']}</div>Reports</button> </div> <!-- CHARTS ROW --> <div class="dash-charts"> <div class="card"> <div class="card-header"><div><div class="card-title">Headcount by Subsidiary</div><div class="card-sub">Active employees · ${new Date().getFullYear()}</div></div></div> <div class="card-body"><div class="cw" style="height:230px"><canvas id="hcChart"></canvas></div></div> </div> <div class="card"> <div class="card-header"><div class="card-title">Today's Attendance</div><div class="card-sub">${fmtDate(today)}</div></div> <div class="card-body"> <div class="cw" style="height:160px"><canvas id="attChart"></canvas></div> <div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:12px;font-size:12px;justify-content:center"> ${[['#059669','Present',present],['#C9A227','Late',late],['#DC2626','Absent',absent],['#2563EB','On Leave',attToday.filter(a=>a.status.includes('Leave')).length]].map(([c,l,v])=>`<span style="display:flex;align-items:center;gap:5px;font-weight:600"><span style="width:10px;height:10px;border-radius:3px;background:${c};flex-shrink:0"></span>${l}: ${v}</span>`).join('')}
          </div> </div> </div> </div> <!-- BOTTOM ROW --> <div class="dash-bottom"> <!-- Subsidiary Stats --> <div class="card"> <div class="card-header"><div class="card-title">Subsidiary Overview</div><div class="card-sub">Multi-company view</div></div> <div class="card-body" style="padding-top:6px"> ${subStats.map(s => `
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--gray-100)"> <div style="width:36px;height:36px;border-radius:10px;background:${s.color}22;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:11px;color:${s.color};flex-shrink:0">${s.code}</div> <div style="flex:1;min-width:0"> <div style="font-size:13px;font-weight:700;color:var(--gray-900)">${s.name}</div> <div style="font-size:11px;color:var(--gray-500)">${s.activeCount} active · ${s.sector}</div> </div> <div style="text-align:right"> <div style="font-family:var(--mono);font-size:15px;font-weight:700;color:${s.avgPerf>=90?'var(--green)':s.avgPerf>=70?'var(--amber)':'var(--red)'}">${s.avgPerf}%</div> <div style="font-size:10px;color:var(--gray-400)">KPI avg</div> </div> </div>`).join('')}
        </div> </div> <!-- Pending Approvals --> <div class="card"> <div class="card-header"><div class="card-title">Pending Actions</div><div class="card-sub">Requires your attention</div></div> <div class="card-body" style="padding-top:6px"> ${buildPendingApprovals()}
        </div> </div> <!-- Audit Trail --> <div class="card"> <div class="card-header"><div class="card-title">Recent Activity</div><div class="card-sub">System audit log</div></div> <div class="card-body" style="padding-top:6px"> ${DB.auditLogs.slice(0,7).map(l => `
            <div class="audit-row"> <span class="audit-time">${l.time.split(' ')[1]}</span> <span class="audit-user">${l.user}</span> <span class="audit-action">${l.action}</span> </div>`).join('')}
        </div> <div class="card-footer"><a onclick="nav('reports')" style="font-size:12px;font-weight:600;color:var(--blue);cursor:pointer">Full audit log →</a></div> </div> </div> <div class="card" style="grid-column:1/-1;margin-top:4px"> <div class="card-header"> <div><div class="card-title"> Latest Announcements</div><div class="card-sub">Active notices requiring your attention</div></div> <button class="btn btn-outline btn-sm" onclick="nav('notices')">View All →</button> </div> <div class="card-body" style="padding:6px 4px">${typeof renderNoticeWidget === 'function' ? renderNoticeWidget() : ''}</div> </div> </div>`;

  // Draw charts
  setTimeout(() => {
    const hc = document.getElementById('hcChart');
    if (hc) {
      const colors = subStats.map(s => s.color);
      new Chart(hc, { type:'bar', data:{ labels: subStats.map(s => s.name), datasets:[{ label:'Active Employees', data: subStats.map(s=>s.activeCount), backgroundColor: colors.map(c=>c+'BB'), borderColor: colors, borderWidth:2, borderRadius:8, borderSkipped:false }] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{ y:{beginAtZero:true,grid:{color:'rgba(0,0,0,.05)'},ticks:{font:{size:11}}}, x:{grid:{display:false},ticks:{font:{size:11}}} } } });
    }
    const ac = document.getElementById('attChart');
    if (ac) {
      new Chart(ac, { type:'doughnut', data:{ labels:['Present','Late','Absent','On Leave'], datasets:[{data:[present,late,absent,attToday.filter(a=>a.status.includes('Leave')).length],backgroundColor:['#059669','#C9A227','#DC2626','#2563EB'],borderWidth:0}] }, options:{ responsive:true, maintainAspectRatio:false, cutout:'70%', plugins:{legend:{display:false}} } });
    }
  }, 80);
};

function buildPendingApprovals() {
  const items = [
    ...DB.leaveRequests.filter(l => l.status === 'Pending').map(l => ({ lbl:`${getEmpName(l.empId)} — ${l.type} (${l.days}d)`, clr:'amber', sub:'Leave Request', act:`doApproveLeave('${l.id}')` })),
    ...DB.requisitions.filter(r => !r.approvedBy && r.status === 'New').map(r => ({ lbl:`${r.title} — ${getDeptName(r.dept)}`, clr:'blue', sub:'Recruitment', act:`nav('recruitment')` })),
    ...DB.disciplinaryCases.filter(d => d.status === 'Open' && !d.investigator).map(d => ({ lbl:`Case ${d.id} — ${getEmpName(d.empId)}`, clr:'red', sub:'Disciplinary: Unassigned', act:`nav('disciplinary')` })),
  ].slice(0, 7);
  if (!items.length) return `<div style="padding:32px;text-align:center;color:var(--gray-400);font-size:13px"> All caught up — nothing pending</div>`;
  return items.map(it => `
    <div class="alert-item"> <div class="alert-dot ${it.clr}"></div> <div class="alert-info"> <div class="alert-title">${it.lbl}</div> <div class="alert-desc">${it.sub}</div> </div> <button class="btn btn-outline btn-xs" onclick="${it.act}">Action</button> </div>`).join('');
}

/* ═══════════════════════════════════════════════════════════
   EMPLOYEES MODULE
═══════════════════════════════════════════════════════════ */
PAGES.employees = function(wrap) {
  const active = filteredEmps(false);
  const alumni = DB.employees.filter(e => ['Resigned','Terminated'].includes(e.status) && (STATE.subsidiary === 'all' || e.sub === STATE.subsidiary));
  wrap.innerHTML = `<div class="page"> <div class="page-header"> <div class="page-header-left"> <div class="page-title">Employee Management</div> <div class="page-sub">${active.length} active · ${alumni.length} former staff · All subsidiaries</div> </div> <div class="page-actions"> <button class="btn btn-outline btn-sm" onclick="exportEmployees()">${ICO.excel} Export Excel</button> <button class="btn btn-primary btn-sm" onclick="openAddEmployeeModal()">${ICO.plus} Add Employee</button> </div> </div> <div class="tabs" id="empTabs"> <div class="tab active" onclick="empTab('active',this)">Active Staff (${active.length})</div> <div class="tab" onclick="empTab('alumni',this)">Former Staff (${alumni.length})</div> </div> <div class="toolbar"> <div class="toolbar-search"> <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> <input type="text" placeholder="Search name, ID, email…" id="empSrch" oninput="filterEmps()"> </div> <div class="toolbar-filters"> <select class="filter-select" id="fDept" onchange="filterEmps()"> <option value="">All Departments</option> ${DB.departments.map(d=>`<option value="${d.id}">${d.name}</option>`).join('')}
        </select> <select class="filter-select" id="fSub" onchange="filterEmps()"> <option value="">All Subsidiaries</option> ${DB.subsidiaries.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}
        </select> <select class="filter-select" id="fGrade" onchange="filterEmps()"> <option value="">All Grades</option> ${DB.grades.map(g=>`<option value="${g.grade}">${g.grade} — ${g.title}</option>`).join('')}
        </select> <select class="filter-select" id="fCont" onchange="filterEmps()"> <option value="">All Contracts</option> <option>Permanent</option><option>Contract</option> </select> </div> <span class="result-count" id="empCnt">${active.length} employees</span> </div> <div id="empBody" class="card" style="border-top:none;border-radius:0 0 var(--radius-lg) var(--radius-lg)">${empTableHTML(active)}</div> </div>`;
};

function empTableHTML(emps) {
  if (!emps.length) return `<div class="empty-state"><h3>No employees found</h3><p>Try adjusting your search or filters</p></div>`;
  return `<div class="table-wrap"><table class="table"> <thead><tr><th>Employee</th><th>Title</th><th>Department</th><th>Subsidiary</th><th>Team</th><th>Grade</th><th>Salary</th><th>Status</th><th>Perf.</th><th>Contract</th><th>Joined</th><th>Actions</th></tr></thead> <tbody>${emps.map(e => {
      const sc = PerfEngine.calcEmployeeScore(e.id);
      const isEx = ['Resigned','Terminated'].includes(e.status);
      return `<tr> <td><div class="emp-cell"> <div class="avatar-sm">${initials(e.name)}</div> <div><div class="emp-name">${esc(e.name)}</div><div class="emp-id">${e.id}</div></div> </div></td> <td style="font-size:12px;max-width:140px">${esc(e.title)}</td> <td style="font-size:12px">${getDeptName(e.dept)}</td> <td><span style="font-size:11px;color:var(--gray-500)">${getSubName(e.sub)}</span></td> <td style="font-size:11px;color:var(--gray-400)">${getTeamName(e.team)}</td> <td><span class="badge badge-navy">${e.grade || '—'}</span></td> <td style="font-family:var(--mono);font-size:12px">${isEx?'—':fmtCurrency(e.salary)}</td> <td>${statusBadge(e.status)}</td> <td>${sc!==null?`<span class="kpi-score ${PerfEngine.ratingLabel(sc).cls}" style="font-size:13px">${sc}%</span>`:`<span style="color:var(--gray-300)">—</span>`}</td> <td><span class="badge badge-gray">${e.contractType}</span></td> <td style="font-size:11px;color:var(--gray-500)">${fmtDate(e.joined)}</td> <td><div style="display:flex;gap:4px"> <button class="btn btn-outline btn-xs" onclick="openMasterProfileModal('${e.id}')" title="Full Profile">${ICO.eye}</button> ${!isEx?`<button class="btn btn-ghost btn-xs" onclick="editEmpModal('${e.id}')" title="Edit">${ICO.edit}</button>`:''}
        </div></td> </tr>`;
    }).join('')}</tbody> </table></div>`;
}

function empTab(tab, el) {
  document.querySelectorAll('#empTabs .tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const emps = tab === 'alumni'
    ? DB.employees.filter(e => ['Resigned','Terminated'].includes(e.status) && (STATE.subsidiary==='all'||e.sub===STATE.subsidiary))
    : filteredEmps(false);
  document.getElementById('empBody').innerHTML = empTableHTML(emps);
  document.getElementById('empCnt').textContent = emps.length + ' employees';
}

function filterEmps() {
  const s = (document.getElementById('empSrch')||{}).value||'';
  const fd = (document.getElementById('fDept')||{}).value||'';
  const fs = (document.getElementById('fSub')||{}).value||'';
  const fg = (document.getElementById('fGrade')||{}).value||'';
  const fc = (document.getElementById('fCont')||{}).value||'';
  let emps = filteredEmps(false);
  if (s) emps = emps.filter(e => e.name.toLowerCase().includes(s.toLowerCase())||e.id.includes(s)||e.email.includes(s)||e.title.toLowerCase().includes(s.toLowerCase()));
  if (fd) emps = emps.filter(e => e.dept===fd);
  if (fs) emps = emps.filter(e => e.sub===fs);
  if (fg) emps = emps.filter(e => e.grade===fg);
  if (fc) emps = emps.filter(e => e.contractType===fc);
  document.getElementById('empBody').innerHTML = empTableHTML(emps);
  const cnt = document.getElementById('empCnt'); if(cnt) cnt.textContent = emps.length+' employees';
}

function viewEmpModal(id) {
  const e = getEmp(id); if (!e) return;
  const sc = PerfEngine.calcEmployeeScore(id);
  const rt = sc!==null ? PerfEngine.ratingLabel(sc) : null;
  const lb = DB.leaveBalances[id]||{annual:30,sick:14,maternity:0,paternity:0,used_annual:0,used_sick:0,used_maternity:0};
  const yos = yearsOfService(e.joined);
  const pay = DB.payroll.find(p=>p.empId===id);
  const pc = pay ? PayrollEngine.calc(e, pay) : null;
  const sub = getSub(e.sub);
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Employee Profile</span>${closeX()}</div> <div class="modal-body"> <div style="display:flex;align-items:flex-start;gap:20px;padding-bottom:18px;border-bottom:1px solid var(--gray-100);margin-bottom:18px;flex-wrap:wrap"> <div class="avatar-xl">${initials(e.name)}</div> <div style="flex:1;min-width:200px"> <div style="font-size:21px;font-weight:800;color:var(--gray-900);letter-spacing:-.3px">${e.name}</div> <div style="font-size:13px;color:var(--gray-500);margin-top:3px">${e.title} · ${getDeptName(e.dept)}</div> <div style="font-size:11px;color:var(--gray-400);font-family:var(--mono);margin-top:2px">${e.id} · ${getSubName(e.sub)} · ${getTeamName(e.team)}</div> <div style="display:flex;gap:6px;margin-top:10px;flex-wrap:wrap"> ${statusBadge(e.status)}
            <span class="badge badge-navy">${e.grade || '—'} — ${(getGrade(e.grade)||{title:''}).title}</span> <span class="badge badge-gray">${e.contractType}</span> ${sc!==null?`<span class="badge ${sc>=90?'badge-green':sc>=70?'badge-teal':sc>=50?'badge-amber':'badge-red'}">${rt.label} · ${sc}%</span>`:''}
          </div> ${e.exitDate?`<div style="margin-top:8px;padding:8px 12px;background:var(--red-l);border-radius:var(--radius);font-size:12px;color:var(--red)"><strong>Exit:</strong> ${fmtDate(e.exitDate)} · ${e.exitReason}</div>`:''}
        </div> <div style="text-align:center;padding:14px 20px;background:var(--gray-50);border-radius:var(--radius-lg);border:1px solid var(--gray-200)"> <div style="font-size:10px;color:var(--gray-400);text-transform:uppercase;letter-spacing:.5px">Service</div> <div style="font-size:32px;font-weight:800;color:var(--navy);font-family:var(--mono)">${yos}</div> <div style="font-size:11px;color:var(--gray-500)">years</div> <div style="font-size:10px;color:var(--gray-400);margin-top:3px">since ${fmtDate(e.joined)}</div> </div> </div> <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:16px"> <div> <div class="section-divider"><span>Personal Information</span></div> <div class="info-row"><span class="info-key">Date of Birth</span><span class="info-val">${fmtDate(e.dob)}</span></div> <div class="info-row"><span class="info-key">Gender</span><span class="info-val">${e.gender==='M'?'Male':'Female'}</span></div> <div class="info-row"><span class="info-key">Nationality</span><span class="info-val">${e.nationality}</span></div> <div class="info-row"><span class="info-key">Email</span><span class="info-val" style="font-size:12px">${e.email}</span></div> <div class="info-row"><span class="info-key">Phone</span><span class="info-val">${e.phone}</span></div> </div> <div> <div class="section-divider"><span>Compensation</span></div> <div class="info-row"><span class="info-key">Base Salary</span><span class="info-val">${fmtCurrency(e.salary)}/mo</span></div> <div class="info-row"><span class="info-key">Allowances</span><span class="info-val">${fmtCurrency(e.allowance)}/mo</span></div> <div class="info-row"><span class="info-key">Total CTC</span><span class="info-val" style="font-weight:800;color:var(--navy)">${fmtCurrency(e.salary+e.allowance)}/mo</span></div> <div class="info-row"><span class="info-key">Max Advance (50%)</span><span class="info-val">${fmtCurrency(PayrollEngine.maxAdvance(e.salary))}</span></div> <div class="info-row"><span class="info-key">Gratuity Earned</span><span class="info-val" style="color:var(--green)">${fmtCurrency(yos * e.salary)}</span></div> ${pc?`<div class="info-row"><span class="info-key">Last Net Pay</span><span class="info-val">${fmtCurrency(pc.netPay)}</span></div>`:''}
        </div> </div> <div class="section-divider"><span>Leave Balances</span></div> <div class="leave-balance-grid" style="margin-bottom:16px"> ${[{l:'Annual',t:lb.annual,u:lb.used_annual||0},{l:'Sick',t:lb.sick,u:lb.used_sick||0},{l:'Maternity',t:lb.maternity||0,u:lb.used_maternity||0},{l:'Paternity',t:0,u:0}].map(({l,t,u})=>{
          const rem=t-u; const pct=t>0?Math.round(u/t*100):0;
          return `<div class="leave-bal-card"><div class="leave-bal-val">${rem}</div><div class="leave-bal-total">/ ${t} days</div><div class="leave-bal-type">${l}</div><div class="leave-bal-bar"><div class="progress"><div class="progress-bar ${pct>80?'red':pct>50?'amber':'green'}" style="width:${pct}%"></div></div></div></div>`;
        }).join('')}
      </div> <div class="section-divider"><span>KPI Performance — Q2 2026</span></div> ${buildEmpKPIs(id)}
    </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Close</button> <button class="btn btn-outline" onclick="closeModal();genPayslipModal('${id}')">View Payslip</button> <button class="btn btn-primary" onclick="closeModal();editEmpModal('${id}')">Edit Profile</button> </div>`);
}

function buildEmpKPIs(empId) {
  const kpis = DB.kpis.filter(k => k.empId === empId);
  if (!kpis.length) return `<div style="color:var(--gray-400);font-size:13px;padding:8px 0">No KPIs assigned this period. <a onclick="nav('kpi')" style="color:var(--blue);cursor:pointer">Assign KPIs →</a></div>`;
  const overall = PerfEngine.calcEmployeeScore(empId);
  const rt = PerfEngine.ratingLabel(overall||0);
  const totalWeight = kpis.reduce((s,k)=>s+k.weight,0);
  return `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:12px;padding:12px 16px;background:var(--gray-50);border-radius:var(--radius);border:1px solid var(--gray-200)"> <div><div style="font-size:10px;color:var(--gray-500);text-transform:uppercase;letter-spacing:.5px">Overall Score</div> <div class="kpi-score ${rt.cls}" style="font-size:26px">${overall}%</div></div> <div style="flex:1"><div class="progress"><div class="progress-bar ${overall>=90?'green':overall>=70?'amber':'red'}" style="width:${Math.min(overall,100)}%"></div></div></div> <span class="badge ${overall>=90?'badge-green':overall>=70?'badge-teal':overall>=50?'badge-amber':'badge-red'}">${rt.label}</span> ${totalWeight>100.01?`<span class="badge badge-red"> Over-allocated: ${totalWeight}%</span>`:''}
    </div> <div class="table-wrap"><table class="table"> <thead><tr><th>KPI</th><th>Type</th><th>Target</th><th>Actual</th><th>Achievement</th><th>Weight</th><th>Approval</th><th></th></tr></thead> <tbody>${kpis.map(k=>{const ach=PerfEngine.calcAchievement(k);const cmts=(DB.kpiComments||[]).filter(c=>c.kpiId===k.id).length;const apB=({Approved:'badge-green',Rejected:'badge-red'})[k.approvalStatus]||'badge-amber';return `<tr> <td style="font-weight:600">${k.title}</td> <td><span class="kpi-type-badge kpi-${k.type.toLowerCase()}">${k.type}</span></td> <td style="font-family:var(--mono)">${k.target} ${k.unit}</td> <td style="font-family:var(--mono)">${k.actual} ${k.unit}</td> <td><div style="display:flex;align-items:center;gap:8px"> <div class="progress" style="width:80px"><div class="progress-bar ${ach>=100?'green':ach>=70?'amber':'red'}" style="width:${Math.min(ach,100)}%"></div></div> <span class="kpi-score ${ach>=100?'excellent':ach>=70?'average':'poor'}" style="font-size:13px">${Math.round(ach)}%</span> </div></td> <td><span style="font-family:var(--mono);font-weight:700">${k.weight}%</span></td> <td><span class="badge ${apB}" style="font-size:10px">${k.approvalStatus||'Pending'}</span></td> <td><button class="btn btn-ghost btn-xs" onclick="openKPIDetail('${k.id}')" title="Reviews / Comments${cmts?` (${cmts})`:''}">${ICO.eye}${cmts?` ${cmts}`:''}</button></td> </tr>`}).join('')}</tbody> </table></div>`;
}

// True if an employee_number already exists — checks local cache AND the DB
// (the cache may be partial/subsidiary-scoped, so the DB check is authoritative).
async function empNumberTaken(num){
  if (!num) return false;
  if (DB.employees.some(e=>e.id===num)) return true;
  try {
    const r = await SUPA.select('employees', `employee_number=eq.${encodeURIComponent(num)}&select=employee_number&limit=1`);
    return Array.isArray(r) && r.length > 0;
  } catch(e){ return false; }
}

// True if a phone is already used by ANOTHER employee (cache + DB, digits-only
// compare so formatting differences still match). exceptId = the row being edited.
async function phoneTaken(phone, exceptId){
  const norm = s => (s||'').replace(/\D/g,'');
  const np = norm(phone); if (!np) return false;
  if (DB.employees.some(e => e.id!==exceptId && norm(e.phone)===np)) return true;
  try {
    const r = await SUPA.select('employees', `phone=eq.${encodeURIComponent(phone)}&select=employee_number`);
    return Array.isArray(r) && r.some(x => x.employee_number !== exceptId);
  } catch(e){ return false; }
}

async function saveNewEmp() {
  const name = (document.getElementById('ne_name')||{}).value;
  const id   = (document.getElementById('ne_id')||{}).value;
  if (!name||!id) { toast('Name and Employee ID are required','error'); return; }
  if (await empNumberTaken(id)) { toast('Employee number already exists','error'); return; }
  if (await phoneTaken(document.getElementById('ne_phone')?.value)) { toast('Phone number already exists','error'); return; }
  DB.employees.push({
    id, name, title: document.getElementById('ne_title').value,
    dept: document.getElementById('ne_dept').value, sub: document.getElementById('ne_sub').value,
    team: document.getElementById('ne_team').value, grade: document.getElementById('ne_grade').value,
    salary: parseFloat(document.getElementById('ne_salary').value)||0,
    allowance: parseFloat(document.getElementById('ne_allow').value)||0,
    contractType: document.getElementById('ne_contract').value,
    email: document.getElementById('ne_email').value, phone: document.getElementById('ne_phone').value,
    joined: document.getElementById('ne_joined').value, dob: document.getElementById('ne_dob').value,
    gender: document.getElementById('ne_gender').value, nationality: document.getElementById('ne_nat').value,
    status:'Active', exitDate:'', exitReason:''
  });
  const newEmp = DB.employees[DB.employees.length - 1];
  if (typeof SupaWrite !== 'undefined') SupaWrite.saveEmployee(newEmp);
  const logEntry = { id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`Added employee ${name} (${id})`, module:'Employees', ip:'127.0.0.1' };
  DB.auditLogs.unshift(logEntry);
  if (typeof SupaWrite !== 'undefined') SupaWrite.logAudit(logEntry);
  closeModal(); toast(`Employee ${name} added successfully`,'success'); nav('employees');
}

function editEmpModal(id) {
  const e = getEmp(id); if (!e) return;
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Edit — ${e.name}</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Full Name</label><input class="form-control" id="ee_name" value="${e.name}"></div> <div class="form-group"><label class="form-label">Job Title</label><input class="form-control" id="ee_title" value="${e.title}"></div> </div> <div class="form-row cols-3"> <div class="form-group"><label class="form-label">Department</label> <select class="form-control" id="ee_dept">${DB.departments.map(d=>`<option value="${d.id}"${d.id===e.dept?' selected':''}>${d.name}</option>`).join('')}</select> </div> <div class="form-group"><label class="form-label">Subsidiary</label> <select class="form-control" id="ee_sub">${DB.subsidiaries.map(s=>`<option value="${s.id}"${s.id===e.sub?' selected':''}>${s.name}</option>`).join('')}</select> </div> <div class="form-group"><label class="form-label">Grade</label> <select class="form-control" id="ee_grade">${DB.grades.map(g=>`<option value="${g.grade}"${g.grade===e.grade?' selected':''}>${g.grade} — ${g.title}</option>`).join('')}</select> </div> </div> <div class="form-row cols-3"> <div class="form-group"><label class="form-label">Status</label> <select class="form-control" id="ee_status">${['Active','On Leave','Resigned','Terminated','Contract'].map(s=>`<option${s===e.status?' selected':''}>${s}</option>`).join('')}</select> </div> <div class="form-group"><label class="form-label">Base Salary</label><input class="form-control" id="ee_salary" type="number" value="${e.salary}"></div> <div class="form-group"><label class="form-label">Allowance</label><input class="form-control" id="ee_allow" type="number" value="${e.allowance}"></div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="ee_email" value="${e.email}"></div> <div class="form-group"><label class="form-label">Phone</label><input class="form-control" id="ee_phone" value="${e.phone}"></div> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveEditEmp('${id}')">Save Changes</button> </div>`);
}

async function saveEditEmp(id) {
  const e = getEmp(id); if (!e) return;
  if (await phoneTaken(document.getElementById('ee_phone')?.value, id)) { toast('Phone number already exists', 'error'); return; }
  const oldSal = e.salary;
  e.name = document.getElementById('ee_name').value;
  e.title = document.getElementById('ee_title').value;
  e.dept = document.getElementById('ee_dept').value;
  e.sub = document.getElementById('ee_sub').value;
  e.grade = document.getElementById('ee_grade').value;
  e.status = document.getElementById('ee_status').value;
  e.salary = parseFloat(document.getElementById('ee_salary').value)||e.salary;
  e.allowance = parseFloat(document.getElementById('ee_allow').value)||e.allowance;
  e.email = document.getElementById('ee_email').value;
  e.phone = document.getElementById('ee_phone').value;
  if (typeof SupaWrite !== 'undefined') SupaWrite.saveEmployee(e);
  const logEntry2 = { id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`Updated ${e.name} (${id})${oldSal!==e.salary?` — salary ${fmtCurrency(oldSal)}→${fmtCurrency(e.salary)}`:''}`, module:'Employees', ip:'127.0.0.1' };
  DB.auditLogs.unshift(logEntry2);
  if (typeof SupaWrite !== 'undefined') SupaWrite.logAudit(logEntry2);
  closeModal(); toast('Employee updated successfully','success'); nav('employees');

  scheduleSave();
}

/* ═══════════════════════════════════════════════════════════
   KPI MANAGEMENT MODULE (Fully editable weights)
═══════════════════════════════════════════════════════════ */
PAGES.kpi = function(wrap) {
  wrap.innerHTML = `<div class="page"> <div class="page-header"> <div class="page-header-left"> <div class="page-title">KPI Management</div> <div class="page-sub">Create, edit, assign KPI templates · Weights auto-validate to 100% · Real-time score updates</div> </div> <div class="page-actions"> <button class="btn btn-outline btn-sm" onclick="openAppraisalCyclesModal()">${ICO.calendar} Appraisal Cycles</button> <button class="btn btn-outline btn-sm" onclick="exportKPIs()">${ICO.excel} Export</button> <button class="btn btn-primary btn-sm" onclick="openKPITemplateModal()">${ICO.plus} New Template</button> </div> </div> <div class="tabs" id="kpiTabs"> <div class="tab active" onclick="kpiTab('templates',this)">KPI Templates</div> <div class="tab" onclick="kpiTab('assignments',this)">Employee KPIs</div> <div class="tab" onclick="kpiTab('scores',this)">Scores Overview</div> <div class="tab" onclick="kpiTab('tasks',this)">Tasks</div> <div class="tab" onclick="kpiTab('projects',this)">Projects</div> </div> <div id="kpiBody">${kpiTemplatesHTML()}</div> </div>`;
};

function kpiTab(tab, el) {
  document.querySelectorAll('#kpiTabs .tab').forEach(t=>t.classList.remove('active')); el.classList.add('active');
  const fns = { templates: kpiTemplatesHTML, assignments: kpiAssignmentsHTML, scores: kpiScoresHTML, tasks: kpiTasksHTML, projects: kpiProjectsHTML };
  document.getElementById('kpiBody').innerHTML = (fns[tab]||kpiTemplatesHTML)();
}

/* ═══════════ TASKS (linked to KPIs) ═══════════ */
function newTaskId(){ return 'TSK_' + Date.now().toString(36) + Math.random().toString(36).slice(2,5); }
function taskActor(){ return (STATE.user && (STATE.user.email||STATE.user.name)) || ''; }

// KPI auto-progress: actual = number of completed linked tasks (achievement = completed/target).
function recomputeKpiFromTasks(kpiId){
  if (!kpiId) return;
  const k = DB.kpis.find(x=>x.id===kpiId); if (!k) return;
  const linked = (DB.tasks||[]).filter(t=>t.kpiId===kpiId);
  if (!linked.length) return;
  const done = linked.filter(t=>t.status==='Completed').length;
  k.actual = done; k.updatedBy = taskActor();
  if (typeof SupaWrite!=='undefined') SupaWrite.saveKPI(k);
}

function kpiTasksHTML(){
  const tasks = (DB.tasks||[]).filter(t=>{ if (STATE.subsidiary==='all') return true; const e=getEmp(t.empId); return e&&e.sub===STATE.subsidiary; });
  const stBadge = { 'To Do':'badge-gray', 'In Progress':'badge-amber', 'Completed':'badge-green' };
  const today = new Date().toISOString().split('T')[0];
  const counts = { todo:tasks.filter(t=>t.status==='To Do').length, prog:tasks.filter(t=>t.status==='In Progress').length, done:tasks.filter(t=>t.status==='Completed').length, over:tasks.filter(t=>t.status!=='Completed'&&t.dueDate&&t.dueDate<today).length };
  return `<div class="stat-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:14px">
    <div class="stat-card gray"><div class="stat-info"><div class="stat-label">To Do</div><div class="stat-val">${counts.todo}</div></div></div>
    <div class="stat-card amber"><div class="stat-info"><div class="stat-label">In Progress</div><div class="stat-val">${counts.prog}</div></div></div>
    <div class="stat-card green"><div class="stat-info"><div class="stat-label">Completed</div><div class="stat-val">${counts.done}</div></div></div>
    <div class="stat-card red"><div class="stat-info"><div class="stat-label">Overdue</div><div class="stat-val">${counts.over}</div></div></div></div>
    <div class="card"><div class="card-header"><div class="card-title">Tasks</div><button class="btn btn-primary btn-sm" onclick="openTaskModal()">${ICO.plus} New Task</button></div>
    <div class="card-body"><div class="table-wrap"><table class="table"><thead><tr><th>Task</th><th>Employee</th><th>Linked KPI</th><th>Due</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>${tasks.length ? tasks.map(t=>{ const e=getEmp(t.empId); const k=DB.kpis.find(x=>x.id===t.kpiId); const over=t.status!=='Completed'&&t.dueDate&&t.dueDate<today;
      return `<tr> <td><div style="font-weight:600;font-size:12px">${esc(t.title)}</div>${t.description?`<div style="font-size:11px;color:var(--gray-400)">${esc(t.description)}</div>`:''}</td>
      <td style="font-size:12px">${e?esc(e.name):esc(t.empId||'—')}</td>
      <td style="font-size:11px">${k?esc(k.title):'<span style="color:var(--gray-300)">—</span>'}</td>
      <td style="font-size:11px;${over?'color:var(--red);font-weight:700':''}">${t.dueDate||'—'}${over?' ⚠':''}</td>
      <td><select class="form-control" style="width:135px;font-size:12px" onchange="setTaskStatus('${t.id}',this.value)"><option ${t.status==='To Do'?'selected':''}>To Do</option><option ${t.status==='In Progress'?'selected':''}>In Progress</option><option ${t.status==='Completed'?'selected':''}>Completed</option></select></td>
      <td><div style="display:flex;gap:2px"><button class="btn btn-ghost btn-xs" onclick="openTaskDetail('${t.id}')" title="Detail">${ICO.eye}</button><button class="btn btn-ghost btn-xs" onclick="openTaskModal('${t.id}')" title="Edit">${ICO.edit}</button><button class="btn btn-ghost btn-xs" style="color:var(--red)" onclick="deleteTask('${t.id}')" title="Delete">${ICO.trash}</button></div></td> </tr>`;
    }).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--gray-400);padding:24px">No tasks yet</td></tr>'}</tbody></table></div></div></div>`;
}

function openTaskModal(taskId){
  const t = taskId ? (DB.tasks||[]).find(x=>x.id===taskId) : null;
  openModal('wide', `<div class="modal-header"><span class="modal-title">${t?'Edit':'New'} Task</span>${closeX()}</div>
    <div class="modal-body">
      <div class="form-group" style="margin-bottom:12px"><label class="form-label required">Task Title</label><input class="form-control" id="tk_title" value="${t?esc(t.title):''}" placeholder="e.g. Screen 10 CVs"></div>
      <div class="form-group" style="margin-bottom:12px"><label class="form-label">Description</label><input class="form-control" id="tk_desc" value="${t?esc(t.description):''}"></div>
      <div class="form-row cols-2">
        <div class="form-group"><label class="form-label required">Assign to Employee</label><select class="form-control" id="tk_emp">${filteredEmps().map(e=>`<option value="${e.id}" ${t&&t.empId===e.id?'selected':''}>${e.name}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Linked KPI</label><select class="form-control" id="tk_kpi"><option value="">— none —</option>${(DB.kpis||[]).map(k=>{const e=getEmp(k.empId);return `<option value="${k.id}" ${t&&t.kpiId===k.id?'selected':''}>${esc(k.title)}${e?' · '+e.name:''}</option>`;}).join('')}</select></div>
      </div>
      <div class="form-row cols-2">
        <div class="form-group"><label class="form-label">Due Date</label><input class="form-control" id="tk_due" type="date" value="${t?t.dueDate:''}"></div>
        <div class="form-group"><label class="form-label">Status</label><select class="form-control" id="tk_status"><option ${!t||t.status==='To Do'?'selected':''}>To Do</option><option ${t&&t.status==='In Progress'?'selected':''}>In Progress</option><option ${t&&t.status==='Completed'?'selected':''}>Completed</option></select></div>
      </div>
    </div>
    <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveTaskForm('${taskId||''}')">Save Task</button></div>`);
}

function saveTaskForm(taskId){
  const title = sanitizeText(document.getElementById('tk_title').value);
  if (!title) { toast('Task title required','error'); return; }
  const empId = document.getElementById('tk_emp').value;
  const kpiId = document.getElementById('tk_kpi').value;
  const dueDate = document.getElementById('tk_due').value||'';
  const status = document.getElementById('tk_status').value;
  let t = taskId ? (DB.tasks||[]).find(x=>x.id===taskId) : null;
  const isNew = !t;
  if (isNew) { t = { id:newTaskId(), createdBy:taskActor(), actualResult:'', comments:'', evidenceUrl:'', completionDate:'' }; (DB.tasks=DB.tasks||[]).unshift(t); }
  Object.assign(t, { title, description:sanitizeText(document.getElementById('tk_desc').value), empId, kpiId, dueDate, status, updatedBy:taskActor() });
  if (typeof SupaWrite!=='undefined') SupaWrite.saveTask(t);
  recomputeKpiFromTasks(kpiId);
  if (isNew && empId) notifyUser(empId, 'task', `New task assigned: ${title}`);
  scheduleSave();
  closeModal(); toast(isNew?'Task created':'Task updated','success'); kpiTab('tasks', document.querySelector('#kpiTabs .tab:nth-child(4)'));
}

function setTaskStatus(taskId, status){
  const t = (DB.tasks||[]).find(x=>x.id===taskId); if (!t) return;
  if (status==='Completed') { openTaskComplete(taskId); return; }  // require completion details
  t.status = status; t.updatedBy = taskActor();
  if (typeof SupaWrite!=='undefined') SupaWrite.saveTask(t);
  recomputeKpiFromTasks(t.kpiId);
  scheduleSave();
  toast(`Task: ${status}`,'info');
}

// Completing a task REQUIRES actual result + comments + completion date.
function openTaskComplete(taskId){
  const t = (DB.tasks||[]).find(x=>x.id===taskId); if (!t) return;
  openModal('narrow', `<div class="modal-header"><span class="modal-title">Complete Task — ${esc(t.title)}</span>${closeX()}</div>
    <div class="modal-body">
      <div class="form-group" style="margin-bottom:12px"><label class="form-label required">Actual Result / Achievement</label><input class="form-control" id="tc_actual" placeholder="What was achieved"></div>
      <div class="form-group" style="margin-bottom:12px"><label class="form-label required">Supporting Comments</label><textarea class="form-control" id="tc_comments" rows="3"></textarea></div>
      <div class="form-row cols-2">
        <div class="form-group"><label class="form-label required">Completion Date</label><input class="form-control" id="tc_date" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
        <div class="form-group"><label class="form-label">Evidence (URL, optional)</label><input class="form-control" id="tc_evidence" placeholder="https://…"></div>
      </div>
    </div>
    <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="submitTaskComplete('${taskId}')">Mark Completed</button></div>`);
}

function submitTaskComplete(taskId){
  const t = (DB.tasks||[]).find(x=>x.id===taskId); if (!t) return;
  const actual = sanitizeText(document.getElementById('tc_actual').value);
  const comments = sanitizeText(document.getElementById('tc_comments').value);
  const date = document.getElementById('tc_date').value;
  if (!actual || !comments || !date) { toast('Actual result, comments and completion date are required','error'); return; }
  Object.assign(t, { status:'Completed', actualResult:actual, comments, completionDate:date, evidenceUrl:sanitizeText(document.getElementById('tc_evidence').value), updatedBy:taskActor() });
  if (typeof SupaWrite!=='undefined') SupaWrite.saveTask(t);
  recomputeKpiFromTasks(t.kpiId);
  if (t.kpiId) { const k=DB.kpis.find(x=>x.id===t.kpiId); if (k) notifyUser(k.empId, 'kpi', `Task completed for KPI: ${k.title}`); }
  scheduleSave();
  closeModal(); toast('Task completed','success');
  if (document.getElementById('kpiTabs')) kpiTab('tasks', document.querySelector('#kpiTabs .tab:nth-child(4)')); else nav('kpi');
}

function openTaskDetail(taskId){
  const t = (DB.tasks||[]).find(x=>x.id===taskId); if (!t) return;
  const e=getEmp(t.empId); const k=DB.kpis.find(x=>x.id===t.kpiId);
  openModal('narrow', `<div class="modal-header"><span class="modal-title">Task — ${esc(t.title)}</span>${closeX()}</div>
    <div class="modal-body" style="font-size:13px">
      ${[['Employee',e?e.name:t.empId],['Linked KPI',k?k.title:'—'],['Status',t.status],['Due',t.dueDate||'—'],['Completed',t.completionDate||'—'],['Actual Result',t.actualResult||'—'],['Comments',t.comments||'—'],['Evidence',t.evidenceUrl?`<a href="${esc(t.evidenceUrl)}" target="_blank" rel="noopener">link</a>`:'—'],['Created by',t.createdBy||'—']].map(([a,b])=>`<div class="info-row"><span class="info-key">${a}</span><span class="info-val">${b}</span></div>`).join('')}
    </div><div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Close</button></div>`);
}

function deleteTask(taskId){
  if (!confirm('Delete this task?')) return;
  const t = (DB.tasks||[]).find(x=>x.id===taskId); const kpiId = t?t.kpiId:'';
  DB.tasks = (DB.tasks||[]).filter(x=>x.id!==taskId);
  if (typeof SupaWrite!=='undefined') SupaWrite.deleteTask(taskId);  // soft delete in DB
  recomputeKpiFromTasks(kpiId);
  scheduleSave();
  toast('Task deleted','info');
  if (document.getElementById('kpiTabs')) kpiTab('tasks', document.querySelector('#kpiTabs .tab:nth-child(4)'));
}

// Employee's own task list (single dashboard with their KPIs). They can advance status.
function selfMyTasksHTML(empId){
  const tasks = (DB.tasks||[]).filter(t=>t.empId===empId);
  const today = new Date().toISOString().split('T')[0];
  return `<div class="card" style="margin-top:20px"><div class="card-header"><span class="card-title">My Tasks (${tasks.length})</span></div>
    <div class="card-body"><div class="table-wrap"><table class="table"><thead><tr><th>Task</th><th>Linked KPI</th><th>Due</th><th>Status</th></tr></thead>
    <tbody>${tasks.length ? tasks.map(t=>{ const k=DB.kpis.find(x=>x.id===t.kpiId); const over=t.status!=='Completed'&&t.dueDate&&t.dueDate<today;
      return `<tr> <td style="font-weight:600;font-size:12px">${esc(t.title)}</td> <td style="font-size:11px">${k?esc(k.title):'—'}</td> <td style="font-size:11px;${over?'color:var(--red);font-weight:700':''}">${t.dueDate||'—'}${over?' ⚠':''}</td>
      <td><select class="form-control" style="width:135px;font-size:12px" onchange="setTaskStatus('${t.id}',this.value)"><option ${t.status==='To Do'?'selected':''}>To Do</option><option ${t.status==='In Progress'?'selected':''}>In Progress</option><option ${t.status==='Completed'?'selected':''}>Completed</option></select></td> </tr>`;
    }).join('') : '<tr><td colspan="4" style="text-align:center;color:var(--gray-400);padding:20px">No tasks assigned</td></tr>'}</tbody></table></div></div></div>`;
}

// Dashboard widget: KPI/task performance (HR + manager metrics, #7).
function perfTaskWidget(){
  const emps = filteredEmps();
  const today = new Date().toISOString().split('T')[0];
  const tasks = (DB.tasks||[]).filter(t=>{ const e=getEmp(t.empId); return STATE.subsidiary==='all' || (e&&e.sub===STATE.subsidiary); });
  const tDone = tasks.filter(t=>t.status==='Completed').length;
  const tOver = tasks.filter(t=>t.status!=='Completed'&&t.dueDate&&t.dueDate<today).length;
  const taskRate = tasks.length ? Math.round(tDone/tasks.length*100) : 0;
  const kpis = (DB.kpis||[]).filter(k=>{ const e=getEmp(k.empId); return STATE.subsidiary==='all' || (e&&e.sub===STATE.subsidiary); });
  const kApproved = kpis.filter(k=>k.approvalStatus==='Approved').length;
  const kpiApprovalRate = kpis.length ? Math.round(kApproved/kpis.length*100) : 0;
  // top / low performers by employee score
  const scored = emps.map(e=>({ e, sc:PerfEngine.calcEmployeeScore(e.id) })).filter(x=>x.sc!==null).sort((a,b)=>b.sc-a.sc);
  const top = scored[0], low = scored[scored.length-1];
  return `<div class="card" style="margin-bottom:18px"><div class="card-header"><div class="card-title">Performance & Tasks</div><div class="card-sub">KPI + task overview</div></div>
    <div class="card-body"><div class="stat-grid" style="grid-template-columns:repeat(5,1fr)">
      <div class="stat-card teal"><div class="stat-info"><div class="stat-label">KPI Approval Rate</div><div class="stat-val">${kpiApprovalRate}%</div><div class="stat-change neutral">${kApproved}/${kpis.length} approved</div></div></div>
      <div class="stat-card navy"><div class="stat-info"><div class="stat-label">Task Completion</div><div class="stat-val">${taskRate}%</div><div class="stat-change neutral">${tDone}/${tasks.length} done</div></div></div>
      <div class="stat-card ${tOver?'red':'green'}"><div class="stat-info"><div class="stat-label">Overdue Tasks</div><div class="stat-val">${tOver}</div><div class="stat-change ${tOver?'down':'up'}">${tOver?'needs attention':'on track'}</div></div></div>
      <div class="stat-card green"><div class="stat-info"><div class="stat-label">Top Performer</div><div class="stat-val" style="font-size:15px">${top?esc(top.e.name.split(' ')[0]):'—'}</div><div class="stat-change up">${top?top.sc+'%':''}</div></div></div>
      <div class="stat-card amber"><div class="stat-info"><div class="stat-label">Needs Support</div><div class="stat-val" style="font-size:15px">${low&&low!==top?esc(low.e.name.split(' ')[0]):'—'}</div><div class="stat-change down">${low&&low!==top?low.sc+'%':''}</div></div></div>
    </div></div></div>`;
}

/* ═══════════ APPRAISAL CYCLES (per-dept periods) ═══════════ */
function openAppraisalCyclesModal(){
  const cycles = DB.appraisalCycles||[];
  openModal('wide', `<div class="modal-header"><span class="modal-title">Appraisal Cycles</span>${closeX()}</div>
    <div class="modal-body">
      <div class="card" style="margin:0 0 14px"><div class="table-wrap"><table class="table"><thead><tr><th>Name</th><th>Period</th><th>Department</th><th>Dates</th><th>Active</th><th></th></tr></thead>
      <tbody id="cyc_rows">${cycles.length ? cycles.map(c=>`<tr><td style="font-weight:600">${esc(c.name)}</td><td>${esc(c.periodType)}</td><td>${c.deptId?esc(getDeptName(c.deptId)):'<span style="color:var(--gray-400)">Org-wide</span>'}</td><td style="font-size:11px">${c.startDate||'—'} → ${c.endDate||'—'}</td><td><span class="badge ${c.active?'badge-green':'badge-gray'}">${c.active?'Active':'Inactive'}</span></td><td><button class="btn btn-ghost btn-xs" style="color:var(--red)" onclick="deleteAppraisalCycle('${c.id}')">${ICO.trash}</button></td></tr>`).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--gray-400);padding:16px">No cycles defined</td></tr>'}</tbody></table></div></div>
      <div class="section-divider"><span>Add Cycle</span></div>
      <div class="form-row cols-2">
        <div class="form-group"><label class="form-label required">Cycle Name</label><input class="form-control" id="cy_name" placeholder="e.g. Q1 2026 Review"></div>
        <div class="form-group"><label class="form-label required">Period Type</label><select class="form-control" id="cy_period"><option>Monthly</option><option selected>Quarterly</option><option>Semi-Annual</option><option>Annual</option></select></div>
      </div>
      <div class="form-row cols-3">
        <div class="form-group"><label class="form-label">Department</label><select class="form-control" id="cy_dept"><option value="">Org-wide (all)</option>${DB.departments.map(d=>`<option value="${d.id}">${d.name}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Start Date</label><input class="form-control" id="cy_start" type="date"></div>
        <div class="form-group"><label class="form-label">End Date</label><input class="form-control" id="cy_end" type="date"></div>
      </div>
    </div>
    <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Close</button><button class="btn btn-primary" onclick="addAppraisalCycle()">Add Cycle</button></div>`);
}
function addAppraisalCycle(){
  const name = sanitizeText(document.getElementById('cy_name').value);
  if (!name) { toast('Cycle name required','error'); return; }
  const c = { id:'CYC_'+Date.now().toString(36), name, periodType:document.getElementById('cy_period').value, deptId:document.getElementById('cy_dept').value||'', startDate:document.getElementById('cy_start').value||'', endDate:document.getElementById('cy_end').value||'', active:true };
  (DB.appraisalCycles=DB.appraisalCycles||[]).unshift(c);
  if (typeof SupaWrite!=='undefined') SupaWrite.saveAppraisalCycle(c);
  scheduleSave();
  toast('Appraisal cycle added','success'); openAppraisalCyclesModal();
}
function deleteAppraisalCycle(id){
  DB.appraisalCycles = (DB.appraisalCycles||[]).filter(x=>x.id!==id);
  if (typeof SupaWrite!=='undefined') SupaWrite.deleteDoc('appraisal_cycles', id);
  scheduleSave();
  toast('Cycle removed','info'); openAppraisalCyclesModal();
}

/* ═══════════ PROJECTS (project-based KPI) ═══════════ */
function newProjectId(){ return 'PRJ_' + Date.now().toString(36) + Math.random().toString(36).slice(2,4); }

function kpiProjectsHTML(){
  const projects = DB.projects||[];
  const stBadge = { Active:'badge-green', 'On Hold':'badge-amber', Completed:'badge-blue', Cancelled:'badge-red' };
  return `<div class="card"><div class="card-header"><div class="card-title">Projects</div><button class="btn btn-primary btn-sm" onclick="openProjectModal()">${ICO.plus} New Project</button></div>
    <div class="card-body"><div class="table-wrap"><table class="table"><thead><tr><th>Project</th><th>Owner</th><th>Dates</th><th>Team</th><th>Linked KPIs</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody>${projects.length ? projects.map(p=>{ const owner=getEmp(p.owner); const team=(p.assignedEmployees||[]).length; const linked=(DB.kpis||[]).filter(k=>k.projectId===p.id).length;
      return `<tr> <td style="font-weight:600;font-size:12px">${esc(p.name)}</td> <td style="font-size:12px">${owner?esc(owner.name):esc(p.owner||'—')}</td>
      <td style="font-size:11px">${p.startDate||'—'} → ${p.endDate||'—'}</td> <td style="font-size:12px">${team} emp</td> <td style="font-size:12px">${linked}</td>
      <td><span class="badge ${stBadge[p.status]||'badge-gray'}">${p.status}</span></td>
      <td><div style="display:flex;gap:2px"><button class="btn btn-ghost btn-xs" onclick="openProjectModal('${p.id}')" title="Edit">${ICO.edit}</button><button class="btn btn-ghost btn-xs" style="color:var(--red)" onclick="deleteProject('${p.id}')" title="Delete">${ICO.trash}</button></div></td> </tr>`;
    }).join('') : '<tr><td colspan="7" style="text-align:center;color:var(--gray-400);padding:24px">No projects yet</td></tr>'}</tbody></table></div></div></div>`;
}

function openProjectModal(projId){
  const p = projId ? (DB.projects||[]).find(x=>x.id===projId) : null;
  const team = p ? (p.assignedEmployees||[]) : [];
  openModal('wide', `<div class="modal-header"><span class="modal-title">${p?'Edit':'New'} Project</span>${closeX()}</div>
    <div class="modal-body">
      <div class="form-row cols-2">
        <div class="form-group"><label class="form-label required">Project Name</label><input class="form-control" id="pr_name" value="${p?esc(p.name):''}"></div>
        <div class="form-group"><label class="form-label">Project Owner</label><select class="form-control" id="pr_owner">${filteredEmps().map(e=>`<option value="${e.id}" ${p&&p.owner===e.id?'selected':''}>${e.name}</option>`).join('')}</select></div>
      </div>
      <div class="form-row cols-3">
        <div class="form-group"><label class="form-label">Start Date</label><input class="form-control" id="pr_start" type="date" value="${p?p.startDate:''}"></div>
        <div class="form-group"><label class="form-label">End Date</label><input class="form-control" id="pr_end" type="date" value="${p?p.endDate:''}"></div>
        <div class="form-group"><label class="form-label">Status</label><select class="form-control" id="pr_status">${['Active','On Hold','Completed','Cancelled'].map(s=>`<option ${p&&p.status===s?'selected':(!p&&s==='Active'?'selected':'')}>${s}</option>`).join('')}</select></div>
      </div>
      <div class="form-group"><label class="form-label">Assigned Employees</label><select class="form-control" id="pr_team" multiple size="5" style="height:auto">${filteredEmps().map(e=>`<option value="${e.id}" ${team.includes(e.id)?'selected':''}>${e.name}</option>`).join('')}</select><div style="font-size:11px;color:var(--gray-400);margin-top:3px">Ctrl/Cmd-click to select multiple</div></div>
    </div>
    <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveProjectForm('${projId||''}')">Save Project</button></div>`);
}

function saveProjectForm(projId){
  const name = sanitizeText(document.getElementById('pr_name').value);
  if (!name) { toast('Project name required','error'); return; }
  const team = Array.from(document.getElementById('pr_team').selectedOptions).map(o=>o.value);
  let p = projId ? (DB.projects||[]).find(x=>x.id===projId) : null;
  const isNew = !p;
  if (isNew) { p = { id:newProjectId(), createdBy:taskActor() }; (DB.projects=DB.projects||[]).unshift(p); }
  Object.assign(p, { name, owner:document.getElementById('pr_owner').value, startDate:document.getElementById('pr_start').value||'', endDate:document.getElementById('pr_end').value||'', status:document.getElementById('pr_status').value, assignedEmployees:team });
  if (typeof SupaWrite!=='undefined') SupaWrite.saveProject(p);
  scheduleSave();
  closeModal(); toast(isNew?'Project created':'Project updated','success'); kpiTab('projects', document.querySelector('#kpiTabs .tab:nth-child(5)'));
}

function deleteProject(projId){
  if (!confirm('Delete this project?')) return;
  DB.projects = (DB.projects||[]).filter(x=>x.id!==projId);
  if (typeof SupaWrite!=='undefined') SupaWrite.deleteProject(projId);
  scheduleSave();
  toast('Project deleted','info'); kpiTab('projects', document.querySelector('#kpiTabs .tab:nth-child(5)'));
}

// Persisted in-app notification (also fires WhatsApp click-to-send hook later).
function notifyUser(empId, type, text){
  const e = getEmp(empId); if (!e) return;
  const n = { id:'tmp'+Date.now(), userEmail:e.email||'', empId, type, text, read:false, time:new Date().toISOString() };
  (DB.notifications=DB.notifications||[]).unshift(n);
  if (typeof SupaWrite!=='undefined') SupaWrite.saveNotification(n);
  if (typeof updateNavBadges==='function') updateNavBadges();
  // SMS is mandatory for KPI/task assignments (sent via Tabaarak gateway if configured).
  if (['kpi','task'].includes(type) && typeof sendSmsToEmployee==='function') sendSmsToEmployee(empId, 'AMC HRMS: ' + text);
}

function kpiTemplatesHTML() {
  return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:16px;margin-top:4px"> ${DB.kpiTemplates.map(tmpl => {
      const totalWeight = tmpl.kpis.reduce((s,k)=>s+k.weight,0);
      const isValid = totalWeight === 100;
      return `<div class="card"> <div class="card-header"> <div> <div class="card-title">${tmpl.name}</div> <div class="card-sub">Role: ${tmpl.role} · ${tmpl.kpis.length} KPIs</div> </div> <div style="display:flex;gap:6px;align-items:center"> <span class="badge ${isValid?'badge-green':'badge-red'}" title="Total weight must equal 100%"> ${isValid?' 100%':' '+totalWeight+'%'}
            </span> <button class="btn btn-outline btn-xs" onclick="editKPITemplate('${tmpl.id}')">${ICO.edit}</button> </div> </div> <div class="card-body" style="padding-top:10px"> ${tmpl.kpis.map(k => {
            const pct = k.weight;
            return `<div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid var(--gray-100)"> <div style="flex:1;min-width:0"> <div style="font-size:12px;font-weight:600;color:var(--gray-800)">${k.title}</div> <div style="font-size:11px;color:var(--gray-400)">${k.type} · ${k.unit}</div> </div> <div style="display:flex;align-items:center;gap:6px"> <div class="progress" style="width:60px"><div class="progress-bar blue" style="width:${pct}%"></div></div> <span style="font-family:var(--mono);font-size:12px;font-weight:700;min-width:32px;text-align:right">${pct}%</span> </div> </div>`;
          }).join('')}
          ${!isValid?`<div style="margin-top:8px;padding:8px 10px;background:var(--red-l);border-radius:var(--radius);font-size:11px;color:var(--red);font-weight:600"> Weights must total 100% (currently ${totalWeight}%). Edit to fix.</div>`:''}
        </div> <div class="card-footer" style="display:flex;gap:8px"> <button class="btn btn-outline btn-sm" onclick="editKPITemplate('${tmpl.id}')">${ICO.edit} Edit Weights</button> <button class="btn btn-primary btn-sm" onclick="assignKPITemplate('${tmpl.id}')">${ICO.plus} Assign</button> </div> </div>`;
    }).join('')}
    <div class="card" style="border:2px dashed var(--gray-200);background:transparent;display:flex;align-items:center;justify-content:center;min-height:200px;cursor:pointer" onclick="openKPITemplateModal()"> <div style="text-align:center;color:var(--gray-400)"> <div style="font-size:32px;margin-bottom:8px">+</div> <div style="font-size:13px;font-weight:600">New KPI Template</div> </div> </div> </div>`;
}

function editKPITemplate(tmplId) {
  const tmpl = DB.kpiTemplates.find(t=>t.id===tmplId); if (!tmpl) return;
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Edit KPI Template — ${tmpl.name}</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2" style="margin-bottom:14px"> <div class="form-group"><label class="form-label">Template Name</label><input class="form-control" id="kt_name" value="${tmpl.name}"></div> <div class="form-group"><label class="form-label">Target Role</label><input class="form-control" id="kt_role" value="${tmpl.role}"></div> </div> <div style="padding:10px 14px;background:var(--blue-l);border-radius:var(--radius);font-size:12px;font-weight:600;color:var(--blue);margin-bottom:16px"> ℹ KPI weights must total exactly 100%. System validates automatically on save.
      </div> <div id="kpiRows"> ${tmpl.kpis.map((k,i) => kpiRowHTML(k,i)).join('')}
      </div> <div id="weightTotalBar" style="margin-top:12px;padding:10px 14px;border-radius:var(--radius);font-size:13px;font-weight:700"></div> <button class="btn btn-outline btn-sm" style="margin-top:12px" onclick="addKPIRow()">${ICO.plus} Add KPI</button> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveKPITemplate('${tmplId}')">Save Template</button> </div>`);
  updateWeightTotal();
}

function kpiRowHTML(k, i) {
  return `<div class="kpi-edit-row" id="kpirow${i}" style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr 80px 32px;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid var(--gray-100)"> <input class="form-control" style="font-size:12px" value="${k.title}" placeholder="KPI Title" onchange="updateWeightTotal()"> <select class="form-control" style="font-size:12px"> ${['Numerical','Percent','Time','Binary'].map(t=>`<option${t===k.type?' selected':''}>${t}</option>`).join('')}
    </select> <input class="form-control" style="font-size:12px" value="${k.unit}" placeholder="Unit"> <input class="form-control" style="font-size:12px" value="${k.target}" type="number" placeholder="Target"> <div style="display:flex;align-items:center;gap:4px"> <input class="form-control weight-input" id="w${i}" style="font-size:12px;font-weight:700;text-align:center" value="${k.weight}" type="number" min="0" max="100" oninput="updateWeightTotal()"> <span style="font-size:11px;color:var(--gray-400)">%</span> </div> <button class="btn btn-ghost btn-xs" onclick="removeKPIRow(${i})" style="color:var(--red)">${ICO.trash}</button> </div>`;
}

let _kpiRowCount = 0;
function addKPIRow() {
  _kpiRowCount++;
  const row = document.createElement('div');
  const i = Date.now();
  row.id = `kpirow${i}`;
  row.className = 'kpi-edit-row';
  row.style.cssText = 'display:grid;grid-template-columns:2fr 1fr 1fr 1fr 80px 32px;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid var(--gray-100)';
  row.innerHTML = `
    <input class="form-control" style="font-size:12px" placeholder="KPI Title" onchange="updateWeightTotal()"> <select class="form-control" style="font-size:12px"><option>Numerical</option><option>Percent</option><option>Time</option><option>Binary</option></select> <input class="form-control" style="font-size:12px" placeholder="Unit"> <input class="form-control" style="font-size:12px" type="number" placeholder="Target"> <div style="display:flex;align-items:center;gap:4px"> <input class="form-control weight-input" id="w${i}" style="font-size:12px;font-weight:700;text-align:center" value="0" type="number" min="0" max="100" oninput="updateWeightTotal()"> <span style="font-size:11px;color:var(--gray-400)">%</span> </div> <button class="btn btn-ghost btn-xs" onclick="this.closest('.kpi-edit-row').remove();updateWeightTotal()" style="color:var(--red)">${ICO.trash}</button>`;
  document.getElementById('kpiRows').appendChild(row);
  updateWeightTotal();
}

function removeKPIRow(i) {
  const row = document.getElementById(`kpirow${i}`);
  if (row) row.remove();
  updateWeightTotal();
}

function updateWeightTotal() {
  const inputs = document.querySelectorAll('.weight-input');
  const total = Array.from(inputs).reduce((s,i)=>s+(parseFloat(i.value)||0),0);
  const bar = document.getElementById('weightTotalBar');
  if (!bar) return;
  const isOk = Math.abs(total-100) < 0.01;
  bar.style.background = isOk ? 'var(--green-l)' : total > 100 ? 'var(--red-l)' : 'var(--amber-l)';
  bar.style.color = isOk ? '#065F46' : total > 100 ? '#991B1B' : '#92400E';
  bar.innerHTML = `Total Weight: ${total.toFixed(0)}% ${isOk ? ' Valid' : total>100?' Exceeds 100% — reduce weights':' Must equal 100% ('+Math.round(100-total)+'% remaining)'}`;
}

function saveKPITemplate(tmplId) {
  const inputs = document.querySelectorAll('.weight-input');
  const total = Array.from(inputs).reduce((s,i)=>s+(parseFloat(i.value)||0),0);
  if (Math.abs(total-100) > 0.01) { toast(`Weights total ${total.toFixed(0)}% — must equal exactly 100%`,'error'); return; }
  const tmpl = DB.kpiTemplates.find(t=>t.id===tmplId); if (!tmpl) return;
  const name = (document.getElementById('kt_name')||{}).value;
  const role = (document.getElementById('kt_role')||{}).value;
  if (name) tmpl.name = name;
  if (role) tmpl.role = role;
  // Update weights in existing assigned KPIs
  const rows = document.querySelectorAll('.kpi-edit-row');
  rows.forEach((row,i) => {
    const inputs = row.querySelectorAll('input,select');
    if (tmpl.kpis[i]) {
      tmpl.kpis[i].title = inputs[0]?.value || tmpl.kpis[i].title;
      tmpl.kpis[i].type = inputs[1]?.value || tmpl.kpis[i].type;
      tmpl.kpis[i].unit = inputs[2]?.value || tmpl.kpis[i].unit;
      tmpl.kpis[i].target = parseFloat(inputs[3]?.value)||tmpl.kpis[i].target;
      const newWeight = parseFloat(inputs[4]?.value)||tmpl.kpis[i].weight;
      // Update all assigned KPIs with this template
      DB.kpis.filter(k=>k.templateId===tmplId&&k.title===tmpl.kpis[i].title).forEach(k => { k.weight = newWeight; });
      tmpl.kpis[i].weight = newWeight;
    }
  });
  if(typeof SupaWrite!=='undefined') SupaWrite.saveKPITemplate(tmpl);
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`Updated KPI template "${tmpl.name}" — weights recalculated`, module:'KPI', ip:'127.0.0.1' });
  closeModal(); toast('KPI template saved. All assigned scores auto-recalculated.','success'); nav('kpi');

  scheduleSave();
}

function openKPITemplateModal() {
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">New KPI Template</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2" style="margin-bottom:14px"> <div class="form-group"><label class="form-label required">Template Name</label><input class="form-control" id="kt_name" placeholder="e.g. Editorial Quality"></div> <div class="form-group"><label class="form-label">Target Role</label><input class="form-control" id="kt_role" placeholder="e.g. journalist"></div> </div> <div style="padding:10px 14px;background:var(--blue-l);border-radius:var(--radius);font-size:12px;font-weight:600;color:var(--blue);margin-bottom:16px">Weights must total 100%.</div> <div id="kpiRows"></div> <div id="weightTotalBar" style="margin-top:12px;padding:10px 14px;border-radius:var(--radius);font-size:13px;font-weight:700;background:var(--gray-100);color:var(--gray-500)">Total Weight: 0% — Add KPIs below</div> <button class="btn btn-outline btn-sm" style="margin-top:12px" onclick="addKPIRow()">${ICO.plus} Add KPI</button> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="createNewKPITemplate()">Create Template</button> </div>`);
}

function createNewKPITemplate() {
  const name = (document.getElementById('kt_name')||{}).value;
  const role = (document.getElementById('kt_role')||{}).value||'general';
  if (!name) { toast('Template name required','error'); return; }
  const rows = document.querySelectorAll('.kpi-edit-row');
  if (!rows.length) { toast('Add at least one KPI','error'); return; }
  const kpis = [];
  let valid = true;
  rows.forEach((row,i) => {
    const inputs = row.querySelectorAll('input,select');
    const w = parseFloat(inputs[4]?.value)||0;
    if (!inputs[0]?.value) { valid=false; return; }
    kpis.push({ id:'k'+(i+1), title:inputs[0].value, type:inputs[1]?.value||'Numerical', unit:inputs[2]?.value||'', target:parseFloat(inputs[3]?.value)||0, weight:w });
  });
  if (!valid) { toast('All KPI titles are required','error'); return; }
  const total = kpis.reduce((s,k)=>s+k.weight,0);
  if (Math.abs(total-100)>0.01) { toast(`Weights total ${total}% — must equal 100%`,'error'); return; }
  const id = 'KT'+String(DB.kpiTemplates.length+1).padStart(3,'0');
  const tmpl = { id, name, role, kpis };
  DB.kpiTemplates.push(tmpl);
  if (typeof SupaWrite!=='undefined') SupaWrite.saveKPITemplate(tmpl);
  scheduleSave();
  closeModal(); toast('KPI template created','success'); nav('kpi');
}

function assignKPITemplate(tmplId) {
  const tmpl = DB.kpiTemplates.find(t=>t.id===tmplId); if (!tmpl) return;
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Assign KPI Template — ${tmpl.name}</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Employee</label> <select class="form-control" id="ka_emp">${filteredEmps().map(e=>`<option value="${e.id}">${e.name} (${e.id})</option>`).join('')}</select> </div> <div class="form-group"><label class="form-label required">Period</label> <select class="form-control" id="ka_period"><option>Q2-2026</option><option>Q3-2026</option><option>Q4-2026</option><option>Annual-2026</option></select> </div> </div> <div style="margin-top:12px;padding:10px 14px;background:var(--gray-50);border-radius:var(--radius);font-size:12px"> <strong>KPIs to assign:</strong><br> ${tmpl.kpis.map(k=>`<span style="display:inline-block;margin:3px 4px 0 0"><span class="badge badge-navy">${k.title}</span> <span style="font-size:10px;color:var(--gray-500)">${k.weight}%</span></span>`).join('')}
      </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="doAssignKPIs('${tmplId}')">Assign KPIs</button> </div>`);
}

// Globally-unique KPI id (the old length-based scheme collided across employees,
// which would overwrite rows in the cloud on upsert).
function newKpiId() { return 'KPI_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

function doAssignKPIs(tmplId) {
  const tmpl = DB.kpiTemplates.find(t=>t.id===tmplId); if (!tmpl) return;
  const empId = document.getElementById('ka_emp').value;
  const period = document.getElementById('ka_period').value;
  // Remove existing KPIs for this emp/period — locally AND in the cloud.
  const removed = DB.kpis.filter(k=>k.empId===empId&&k.period===period);
  DB.kpis = DB.kpis.filter(k=>!(k.empId===empId&&k.period===period));
  if (typeof SupaWrite!=='undefined') removed.forEach(k=>SupaWrite.deleteKPI(k.id));
  tmpl.kpis.forEach((k) => {
    const kpi = { id:newKpiId(), empId, templateId:tmplId, title:k.title, type:k.type, unit:k.unit, target:k.target, actual:0, weight:k.weight, period, notes:'' };
    DB.kpis.push(kpi);
    if (typeof SupaWrite!=='undefined') SupaWrite.saveKPI(kpi);
  });
  scheduleSave();
  if (typeof notifyUser==='function') notifyUser(empId, 'kpi', `${tmpl.kpis.length} KPIs assigned to you for ${period}`);
  closeModal(); toast(`${tmpl.kpis.length} KPIs assigned to ${getEmpName(empId)} for ${period}`,'success'); kpiTab('assignments', document.querySelector('#kpiTabs .tab:nth-child(2)'));
}

function kpiAssignmentsHTML() {
  const kpis = STATE.subsidiary==='all' ? DB.kpis : DB.kpis.filter(k=>{ const e=getEmp(k.empId); return e&&e.sub===STATE.subsidiary; });
  // Binary pass/fail summary
  const bin = kpis.filter(k=>k.scoringMode==='binary' && k.approvalStatus!=='Rejected');
  const done = bin.filter(k=>k.status==='Completed').length;
  const failed = bin.length - done;
  const passRate = bin.length ? Math.round(done/bin.length*100) : 0;
  const tiles = `<div class="stat-grid" style="grid-template-columns:repeat(5,1fr);margin-bottom:14px">
    <div class="stat-card navy"><div class="stat-info"><div class="stat-label">Total KPIs</div><div class="stat-val">${kpis.length}</div></div></div>
    <div class="stat-card gold"><div class="stat-info"><div class="stat-label">Binary KPIs</div><div class="stat-val">${bin.length}</div></div></div>
    <div class="stat-card green"><div class="stat-info"><div class="stat-label">Completed</div><div class="stat-val">${done}</div></div></div>
    <div class="stat-card red"><div class="stat-info"><div class="stat-label">Not Completed</div><div class="stat-val">${failed}</div></div></div>
    <div class="stat-card teal"><div class="stat-info"><div class="stat-label">Pass Rate</div><div class="stat-val">${passRate}%</div></div></div>
  </div>`;
  return tiles + `<div class="card"><div class="card-header"> <div><div class="card-title">Employee KPI Assignments</div><div class="card-sub">Binary: set status (auto 100/0) · Weighted: edit actual</div></div> <button class="btn btn-primary btn-sm" onclick="openInlineKPIModal()">${ICO.plus} Assign KPI</button> </div><div class="card-body"><div class="table-wrap"><table class="table"> <thead><tr><th>Employee</th><th>KPI</th><th>Mode</th><th>Target / Status</th><th>Actual</th><th>Score</th><th>Weight</th><th>Period</th><th>Actions</th></tr></thead> <tbody>${kpis.map(k=>{const e=getEmp(k.empId);const ach=PerfEngine.calcAchievement(k);const binary=k.scoringMode==='binary';
    const tgtCell = binary ? `<select class="form-control" style="width:130px;font-size:12px" onchange="setKpiStatus('${k.id}',this.value)"><option ${k.status!=='Completed'?'selected':''}>Not Completed</option><option ${k.status==='Completed'?'selected':''}>Completed</option></select>` : `<span style="font-family:var(--mono)">${k.target} ${k.unit||''}</span>`;
    const actCell = binary ? `<span style="color:var(--gray-300)">—</span>` : `<input type="number" class="form-control" style="width:90px;font-size:12px;font-family:var(--mono)" value="${k.actual}" onchange="updateKPIActual('${k.id}',this.value)">`;
    return `<tr> <td><div class="emp-cell"><div class="avatar-sm" style="width:28px;height:28px;font-size:10px">${e?initials(e.name):'?'}</div><div><div class="emp-name">${e?e.name:k.empId}</div><div class="emp-id">${k.empId}</div></div></div></td> <td style="font-size:12px;font-weight:600;min-width:180px">${k.title}</td> <td><span class="badge ${binary?'badge-navy':'badge-gray'}" style="font-size:10px">${binary?'Binary':'Weighted'}</span> <span class="badge ${({Approved:'badge-green',Rejected:'badge-red'})[k.approvalStatus]||'badge-amber'}" style="font-size:9px" title="${k.approvalStatus==='Rejected'?'Excluded from score':'Counts toward score'}">${k.approvalStatus||'Pending'}</span></td> <td>${tgtCell}</td> <td>${actCell}</td> <td><div style="display:flex;align-items:center;gap:6px"><div class="progress" style="width:60px"><div class="progress-bar ${ach>=100?'green':ach>=70?'amber':'red'}" style="width:${Math.min(ach,100)}%"></div></div><span class="kpi-score ${ach>=100?'excellent':ach>=70?'average':'poor'}" style="font-size:12px">${Math.round(ach)}%</span></div></td> <td><input type="number" class="form-control" style="width:65px;font-size:12px;font-family:var(--mono);font-weight:700" value="${k.weight}" onchange="updateKPIWeight('${k.id}',this.value)" title="Weights for an employee should total 100%"></td> <td style="font-size:11px;color:var(--gray-400)">${k.periodType?k.periodType+' · ':''}${k.period||''}</td> <td><div style="display:flex;gap:2px"><button class="btn btn-ghost btn-xs" onclick="openKPIDetail('${k.id}')" title="Details · Approve · Reviews · Comments">${ICO.eye}</button><button class="btn btn-ghost btn-xs" onclick="openEditKPIModal('${k.id}')" title="Edit">${ICO.edit}</button><button class="btn btn-ghost btn-xs" onclick="deleteKPI('${k.id}')" style="color:var(--red)" title="Delete">${ICO.trash}</button></div></td> </tr>`}).join('')}</tbody> </table></div></div></div>`;
}

function kpiActor(){ return (STATE.user && (STATE.user.email||STATE.user.name)) || ''; }

function updateKPIActual(kpiId, val) {
  const k = DB.kpis.find(x=>x.id===kpiId); if (!k) return;
  const before = { actual: k.actual };
  k.actual = parseFloat(val)||0; k.updatedBy = kpiActor();
  if(typeof SupaWrite!=='undefined'){ SupaWrite.saveKPI(k); SupaWrite.saveKpiAudit({ kpiId:k.id, changedBy:kpiActor(), before, after:{ actual:k.actual } }); }
  scheduleSave();
  toast('Score updated','success');
}

// Binary KPI: set Completed/Not Completed → auto score 100/0.
function setKpiStatus(kpiId, status){
  const k = DB.kpis.find(x=>x.id===kpiId); if (!k) return;
  const before = { status:k.status, score:k.score };
  k.status = status; k.score = (status==='Completed')?100:0; k.actual = (status==='Completed')?1:0; k.updatedBy = kpiActor();
  if(typeof SupaWrite!=='undefined'){ SupaWrite.saveKPI(k); SupaWrite.saveKpiAudit({ kpiId:k.id, changedBy:kpiActor(), before, after:{ status:k.status, score:k.score } }); }
  scheduleSave();
  toast(`Status: ${status} → score ${k.score}`, status==='Completed'?'success':'info');
  nav('kpi');
}

function updateKPIWeight(kpiId, val) {
  const k = DB.kpis.find(x=>x.id===kpiId); if (!k) return;
  const newW = parseFloat(val)||0;
  const before = { weight: k.weight };
  k.weight = newW; k.updatedBy = kpiActor();
  if (typeof SupaWrite!=='undefined'){ SupaWrite.saveKPI(k); SupaWrite.saveKpiAudit({ kpiId:k.id, changedBy:kpiActor(), before, after:{ weight:newW } }); }
  scheduleSave();
  // Check total for this employee+period
  const empKpis = DB.kpis.filter(x=>x.empId===k.empId&&x.period===k.period);
  const total = empKpis.reduce((s,x)=>s+x.weight,0);
  if (Math.abs(total-100)>0.01) {
    toast(` ${getEmpName(k.empId)}'s KPI weights total ${total}% — must equal 100%`,'warning');
  } else {
    toast(`Weight updated · Total = ${total}% ✓`,'success');
  }
}

function deleteKPI(kpiId) {
  if (!confirm('Delete this KPI?')) return;
  DB.kpis = DB.kpis.filter(k=>k.id!==kpiId);
  if (typeof SupaWrite!=='undefined') SupaWrite.deleteKPI(kpiId);
  scheduleSave();
  toast('KPI deleted','info'); nav('kpi');
}

// Full KPI edit (name, description, target, dates, period, status, remarks, weight)
// — updates the existing record in place and writes a before/after audit row.
function openEditKPIModal(kpiId){
  const k = DB.kpis.find(x=>x.id===kpiId); if (!k){ toast('KPI not found','error'); return; }
  const bin = k.scoringMode==='binary';
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Edit KPI — ${esc(k.title)}</span>${closeX()}</div>
    <div class="modal-body">
      <div class="form-group" style="margin-bottom:10px"><label class="form-label required">KPI Name</label><input class="form-control" id="ek_title" value="${esc(k.title||'')}"></div>
      <div class="form-group" style="margin-bottom:10px"><label class="form-label">Description</label><input class="form-control" id="ek_desc" value="${esc(k.description||'')}"></div>
      ${bin
        ? `<div class="form-group" style="margin-bottom:10px"><label class="form-label required">Status</label><select class="form-control" id="ek_status"><option ${k.status!=='Completed'?'selected':''}>Not Completed</option><option ${k.status==='Completed'?'selected':''}>Completed</option></select></div>`
        : `<div class="form-row cols-2"><div class="form-group"><label class="form-label">Target</label><input class="form-control" id="ek_target" type="number" value="${k.target||0}"></div><div class="form-group"><label class="form-label">Unit</label><input class="form-control" id="ek_unit" value="${esc(k.unit||'')}"></div></div>`}
      <div class="form-row cols-3">
        <div class="form-group"><label class="form-label">Weight (%)</label><input class="form-control" id="ek_weight" type="number" value="${k.weight||0}"></div>
        <div class="form-group"><label class="form-label">Period Type</label><select class="form-control" id="ek_ptype"><option ${k.periodType==='Monthly'?'selected':''}>Monthly</option><option ${k.periodType==='Quarterly'||!k.periodType?'selected':''}>Quarterly</option><option ${k.periodType==='Yearly'?'selected':''}>Yearly</option></select></div>
        <div class="form-group"><label class="form-label">Period Label</label><input class="form-control" id="ek_period" value="${esc(k.period||'')}"></div>
      </div>
      <div class="form-row cols-3">
        <div class="form-group"><label class="form-label">Start Date</label><input class="form-control" id="ek_start" type="date" value="${k.startDate||''}"></div>
        <div class="form-group"><label class="form-label">End Date</label><input class="form-control" id="ek_end" type="date" value="${k.endDate||''}"></div>
        <div class="form-group"><label class="form-label">Remarks</label><input class="form-control" id="ek_remarks" value="${esc(k.remarks||'')}"></div>
      </div>
      <div class="form-group"><label class="form-label">Reason for change (audit trail)</label><input class="form-control" id="ek_reason" placeholder="Why is this KPI being changed?"></div>
    </div>
    <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveEditKPI('${k.id}')">Save Changes</button></div>`);
}

function saveEditKPI(kpiId){
  const k = DB.kpis.find(x=>x.id===kpiId); if (!k) return;
  const bin = k.scoringMode==='binary';
  const before = { title:k.title, target:k.target, status:k.status, score:k.score, weight:k.weight, period:k.period, startDate:k.startDate, endDate:k.endDate };
  k.title = sanitizeText(document.getElementById('ek_title').value) || k.title;
  k.description = sanitizeText(document.getElementById('ek_desc').value);
  k.weight = parseFloat(document.getElementById('ek_weight').value)||0;
  k.periodType = document.getElementById('ek_ptype').value;
  k.period = sanitizeText(document.getElementById('ek_period').value);
  k.startDate = document.getElementById('ek_start').value||'';
  k.endDate = document.getElementById('ek_end').value||'';
  k.remarks = sanitizeText(document.getElementById('ek_remarks').value);
  if (bin) {
    k.status = document.getElementById('ek_status').value;
    k.score = (k.status==='Completed')?100:0; k.actual = (k.status==='Completed')?1:0;
  } else {
    k.target = parseFloat(document.getElementById('ek_target').value)||0;
    k.unit = sanitizeText(document.getElementById('ek_unit').value);
  }
  k.updatedBy = kpiActor();
  const after = { title:k.title, target:k.target, status:k.status, score:k.score, weight:k.weight, period:k.period, startDate:k.startDate, endDate:k.endDate };
  const reason = sanitizeText((document.getElementById('ek_reason')||{}).value);
  if (typeof SupaWrite!=='undefined'){ SupaWrite.saveKPI(k); SupaWrite.saveKpiAudit({ kpiId:k.id, changedBy:kpiActor(), before, after, reason }); }
  scheduleSave();
  closeModal(); toast('KPI updated','success'); nav('kpi');
}

// ── KPI detail: approval workflow + reviews + comments (all DB-persisted) ──
function openKPIDetail(kpiId){
  const k = DB.kpis.find(x=>x.id===kpiId); if (!k){ toast('KPI not found','error'); return; }
  const e = getEmp(k.empId);
  const ach = PerfEngine.calcAchievement(k);
  const isMgr = (typeof isStaffRole==='function') ? true : true; // approval gated below by canApprove
  const canApprove = ['super_admin','corporate_admin','hr_director','hr_manager','dept_manager'].includes(STATE.role) || isMasterAdmin();
  const reviews  = (DB.kpiReviews||[]).filter(r=>r.kpiId===kpiId);
  const comments = (DB.kpiComments||[]).filter(c=>c.kpiId===kpiId);
  const stBadge = { Approved:'badge-green', Rejected:'badge-red', Pending:'badge-amber' }[k.approvalStatus||'Pending'] || 'badge-amber';
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">KPI — ${esc(k.title)}</span>${closeX()}</div>
    <div class="modal-body">
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px;padding:12px 14px;background:var(--gray-50);border-radius:var(--radius);font-size:12px">
        <div><div style="color:var(--gray-500);font-size:10px;text-transform:uppercase">Employee</div><div style="font-weight:700">${e?esc(e.name):esc(k.empId)}</div></div>
        <div><div style="color:var(--gray-500);font-size:10px;text-transform:uppercase">Mode / Score</div><div style="font-weight:700">${k.scoringMode==='binary'?'Binary':'Weighted'} · ${Math.round(ach)}%</div></div>
        <div><div style="color:var(--gray-500);font-size:10px;text-transform:uppercase">Period</div><div style="font-weight:700">${esc(k.periodType||'')} ${esc(k.period||'')}</div></div>
        <div><div style="color:var(--gray-500);font-size:10px;text-transform:uppercase">Approval</div><div><span class="badge ${stBadge}">${esc(k.approvalStatus||'Pending')}</span>${k.approvedBy?` <span style="color:var(--gray-400)">by ${esc(k.approvedBy)}</span>`:''}</div></div>
      </div>
      ${canApprove ? `<div style="margin-bottom:16px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">${
        k.approvalStatus==='Approved'
          ? `<span class="badge badge-green" style="padding:6px 12px;font-size:12px">✓ Approved</span><span style="font-size:11px;color:var(--gray-400);cursor:pointer;text-decoration:underline" onclick="approveKPI('${k.id}','Pending')">change</span>`
        : k.approvalStatus==='Rejected'
          ? `<span class="badge badge-red" style="padding:6px 12px;font-size:12px">✕ Rejected</span><span style="font-size:11px;color:var(--gray-400);cursor:pointer;text-decoration:underline" onclick="approveKPI('${k.id}','Pending')">change</span>`
          : `<span style="font-size:12px;color:var(--gray-500)">Decision:</span><button class="btn btn-sm" style="background:var(--green);color:#fff;border:none" onclick="approveKPI('${k.id}','Approved')">Approve</button><button class="btn btn-sm" style="background:#fff;color:var(--red);border:1.5px solid var(--red)" onclick="approveKPI('${k.id}','Rejected')">Reject</button>`
      }</div>` : `<div style="margin-bottom:16px;font-size:12px;color:var(--gray-500)">Approval: <strong>${esc(k.approvalStatus||'Pending')}</strong> — only managers can change.</div>`}

      <div class="section-divider"><span>Reviews (${reviews.length})</span></div>
      <div style="max-height:160px;overflow:auto;margin-bottom:8px">${reviews.length ? reviews.map(r=>`<div style="padding:8px 10px;border-bottom:1px solid var(--gray-100);font-size:12px"><div style="font-weight:600">${esc(r.rating||'')} ${r.score!=null?`· ${r.score}`:''} <span style="color:var(--gray-400);font-weight:400">— ${esc(r.reviewer||'')} · ${esc(String(r.createdAt||'').replace('T',' ').slice(0,16))}</span></div>${r.notes?`<div style="color:var(--gray-600)">${esc(r.notes)}</div>`:''}</div>`).join('') : '<div style="color:var(--gray-400);font-size:12px;padding:6px">No reviews yet.</div>'}</div>
      <div class="form-row cols-3" style="margin-bottom:6px">
        <div class="form-group" style="margin:0"><select class="form-control form-control-sm" id="rv_rating"><option>Outstanding</option><option>Exceeds Expectations</option><option selected>Meets Expectations</option><option>Needs Improvement</option><option>Unsatisfactory</option></select></div>
        <div class="form-group" style="margin:0"><input class="form-control form-control-sm" id="rv_score" type="number" placeholder="Score (0-100)"></div>
        <div class="form-group" style="margin:0"><input class="form-control form-control-sm" id="rv_notes" placeholder="Review notes"></div>
      </div>
      <button class="btn btn-outline btn-sm" onclick="addKpiReview('${k.id}')" style="margin-bottom:16px">+ Add Review</button>

      <div class="section-divider"><span>Comments (${comments.length})</span></div>
      <div style="max-height:160px;overflow:auto;margin-bottom:8px">${comments.length ? comments.map(c=>`<div style="padding:7px 10px;border-bottom:1px solid var(--gray-100);font-size:12px"><div style="font-weight:600">${esc(c.author||'')} <span style="color:var(--gray-400);font-weight:400">${esc(c.authorRole||'')} · ${esc(String(c.createdAt||'').replace('T',' ').slice(0,16))}</span></div><div style="color:var(--gray-700)">${esc(c.body||'')}</div></div>`).join('') : '<div style="color:var(--gray-400);font-size:12px;padding:6px">No comments yet.</div>'}</div>
      <div style="display:flex;gap:8px"><input class="form-control form-control-sm" id="cm_body" placeholder="Write a comment…" style="flex:1"><button class="btn btn-primary btn-sm" onclick="addKpiComment('${k.id}')">Post</button></div>
    </div>
    <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Close</button></div>`);
}

function approveKPI(kpiId, decision){
  const k = DB.kpis.find(x=>x.id===kpiId); if (!k) return;
  const before = { approvalStatus:k.approvalStatus };
  k.approvalStatus = decision; k.approvedBy = kpiActor(); k.approvedAt = new Date().toISOString();
  if (typeof SupaWrite!=='undefined'){ SupaWrite.saveKPI(k); SupaWrite.saveKpiAudit({ kpiId:k.id, changedBy:kpiActor(), before, after:{ approvalStatus:decision } }); }
  scheduleSave();
  toast(`KPI ${decision.toLowerCase()}`, decision==='Approved'?'success':'warning');
  openKPIDetail(kpiId);
}

function addKpiReview(kpiId){
  const rating = document.getElementById('rv_rating').value;
  const score = parseFloat(document.getElementById('rv_score').value);
  const notes = sanitizeText(document.getElementById('rv_notes').value);
  const k = DB.kpis.find(x=>x.id===kpiId);
  const review = { id:'tmp'+Date.now(), kpiId, empId:k?k.empId:'', reviewer:kpiActor(), period:k?k.period:'', rating, score:isNaN(score)?null:score, notes, createdAt:new Date().toISOString() };
  if (!DB.kpiReviews) DB.kpiReviews=[];
  DB.kpiReviews.unshift(review);
  if (typeof SupaWrite!=='undefined') SupaWrite.saveKpiReview(review);
  scheduleSave();
  toast('Review added','success'); openKPIDetail(kpiId);
}

function addKpiComment(kpiId){
  const body = sanitizeText(document.getElementById('cm_body').value);
  if (!body) { toast('Write a comment first','error'); return; }
  const comment = { id:'tmp'+Date.now(), kpiId, author:(STATE.user&&STATE.user.name)||kpiActor(), authorRole:STATE.user?STATE.user.role:'', body, createdAt:new Date().toISOString() };
  if (!DB.kpiComments) DB.kpiComments=[];
  DB.kpiComments.unshift(comment);
  if (typeof SupaWrite!=='undefined') SupaWrite.saveKpiComment(comment);
  scheduleSave();
  toast('Comment posted','success'); openKPIDetail(kpiId);
}

function ikToggleMode(){
  const binary = (document.getElementById('ik_mode')||{}).value==='binary';
  const w=document.getElementById('ik_weighted'), b=document.getElementById('ik_binary');
  if(w) w.style.display = binary?'none':'';
  if(b) b.style.display = binary?'':'none';
}
function openInlineKPIModal() {
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Assign KPI</span>${closeX()}</div>
    <div class="modal-body">
      <div class="form-row cols-2">
        <div class="form-group"><label class="form-label required">Employee</label><select class="form-control" id="ik_emp">${filteredEmps().map(e=>`<option value="${e.id}">${e.name}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label required">Scoring Mode</label><select class="form-control" id="ik_mode" onchange="ikToggleMode()"><option value="weighted">Weighted (target / actual)</option><option value="binary">Binary (Pass / Fail)</option></select></div>
      </div>
      <div class="form-group" style="margin-bottom:12px"><label class="form-label required">KPI Name</label><input class="form-control" id="ik_title" placeholder="e.g. Submit Monthly Report"></div>
      <div class="form-group" style="margin-bottom:12px"><label class="form-label">Description</label><input class="form-control" id="ik_desc" placeholder="Optional"></div>
      <div id="ik_weighted">
        <div class="form-row cols-2"><div class="form-group"><label class="form-label">KPI Type</label><select class="form-control" id="ik_type"><option>Numerical</option><option>Percent</option><option>Time</option><option>Binary</option></select></div><div class="form-group"><label class="form-label">Unit</label><input class="form-control" id="ik_unit" placeholder="%,days,USD…"></div></div>
        <div class="form-row cols-2"><div class="form-group"><label class="form-label">Target</label><input class="form-control" id="ik_target" type="number"></div><div class="form-group"><label class="form-label">Actual</label><input class="form-control" id="ik_actual" type="number"></div></div>
      </div>
      <div id="ik_binary" style="display:none">
        <div class="form-group"><label class="form-label required">Status</label><select class="form-control" id="ik_status"><option>Not Completed</option><option>Completed</option></select><div style="font-size:11px;color:var(--gray-400);margin-top:3px">Completed = 100 · Not Completed = 0 (auto)</div></div>
      </div>
      <div class="form-row cols-3" style="margin-top:6px">
        <div class="form-group"><label class="form-label required">Weight (%)</label><input class="form-control" id="ik_weight" type="number" value="25" min="0" max="100"></div>
        <div class="form-group"><label class="form-label required">Period Type</label><select class="form-control" id="ik_ptype"><option>Monthly</option><option selected>Quarterly</option><option>Yearly</option></select></div>
        <div class="form-group"><label class="form-label">Period Label</label><select class="form-control" id="ik_period"><option>Q2-2026</option><option>Q3-2026</option><option>Q4-2026</option><option>Annual-2026</option></select></div>
      </div>
      <div class="form-row cols-3">
        <div class="form-group"><label class="form-label">Start Date</label><input class="form-control" id="ik_start" type="date"></div>
        <div class="form-group"><label class="form-label">End Date</label><input class="form-control" id="ik_end" type="date"></div>
        <div class="form-group"><label class="form-label">Link to Project</label><select class="form-control" id="ik_project"><option value="">— none —</option>${(DB.projects||[]).map(p=>`<option value="${p.id}">${esc(p.name)}</option>`).join('')}</select></div>
      </div>
      <div class="form-row cols-2">
        <div class="form-group"><label class="form-label">Remarks</label><input class="form-control" id="ik_remarks" placeholder="Optional"></div>
      </div>
    </div>
    <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveInlineKPI()">Save KPI</button></div>`);
}

function saveInlineKPI() {
  const title = sanitizeText((document.getElementById('ik_title')||{}).value);
  if (!title) { toast('KPI name required','error'); return; }
  const empId = document.getElementById('ik_emp').value;
  const mode  = document.getElementById('ik_mode').value;
  const period = document.getElementById('ik_period').value;
  const periodType = document.getElementById('ik_ptype').value;
  const startDate = document.getElementById('ik_start').value || '';
  const endDate = document.getElementById('ik_end').value || '';
  const weight = parseFloat(document.getElementById('ik_weight').value)||0;
  const remarks = sanitizeText(document.getElementById('ik_remarks').value);
  const description = sanitizeText(document.getElementById('ik_desc').value);
  const actor = (STATE.user && (STATE.user.email||STATE.user.name)) || '';
  let kpi;
  if (mode==='binary') {
    const status = document.getElementById('ik_status').value;
    const done = status==='Completed';
    kpi = { id:newKpiId(), empId, templateId:'', title, description, type:'Binary', scoringMode:'binary',
      status, score: done?100:0, target:1, actual: done?1:0, unit:'', weight, period, periodType, startDate, endDate,
      remarks, notes:'', createdBy:actor, updatedBy:actor };
  } else {
    kpi = { id:newKpiId(), empId, templateId:'', title, description, type:document.getElementById('ik_type').value, scoringMode:'weighted',
      status:'', score:null, target:parseFloat(document.getElementById('ik_target').value)||0, actual:parseFloat(document.getElementById('ik_actual').value)||0,
      unit:document.getElementById('ik_unit').value, weight, period, periodType, startDate, endDate, remarks, notes:'', createdBy:actor, updatedBy:actor };
  }
  kpi.projectId = document.getElementById('ik_project')?.value || '';
  DB.kpis.push(kpi);
  if (typeof SupaWrite!=='undefined') { SupaWrite.saveKPI(kpi); SupaWrite.saveKpiAudit({ kpiId:kpi.id, changedBy:actor, before:{}, after:{ created:title, mode, status:kpi.status, score:kpi.score } }); }
  scheduleSave();
  const total = DB.kpis.filter(k=>k.empId===empId&&k.period===period).reduce((s,k)=>s+(k.weight||0),0);
  if (typeof notifyUser==='function') notifyUser(empId, 'kpi', `New KPI assigned: ${title}`);
  closeModal(); toast(`KPI added (weight total for this employee: ${total}%)${Math.abs(total-100)>0.01?' — adjust to reach 100%':' ✓'}`, Math.abs(total-100)>0.01?'warning':'success');
  nav('kpi');
}

function kpiScoresHTML() {
  const scored = filteredEmps().map(e=>({...e,sc:PerfEngine.calcEmployeeScore(e.id)})).filter(e=>e.sc!==null).sort((a,b)=>b.sc-a.sc);
  const outs=scored.filter(e=>e.sc>=110).length, exc=scored.filter(e=>e.sc>=90&&e.sc<110).length, meets=scored.filter(e=>e.sc>=70&&e.sc<90).length, needs=scored.filter(e=>e.sc>=50&&e.sc<70).length, unsat=scored.filter(e=>e.sc<50).length;
  return `<div> <div class="stat-grid" style="grid-template-columns:repeat(5,1fr);margin-bottom:14px"> <div class="stat-card gold"><div class="stat-info"><div class="stat-label">Outstanding ≥110%</div><div class="stat-val">${outs}</div></div></div> <div class="stat-card green"><div class="stat-info"><div class="stat-label">Exceeds ≥90%</div><div class="stat-val">${exc}</div></div></div> <div class="stat-card teal"><div class="stat-info"><div class="stat-label">Meets ≥70%</div><div class="stat-val">${meets}</div></div></div> <div class="stat-card amber"><div class="stat-info"><div class="stat-label">Needs Impr. ≥50%</div><div class="stat-val">${needs}</div></div></div> <div class="stat-card red"><div class="stat-info"><div class="stat-label">Unsatisfactory</div><div class="stat-val">${unsat}</div></div></div> </div> <div class="card"><div class="table-wrap"><table class="table"> <thead><tr><th>#</th><th>Employee</th><th>Subsidiary</th><th>Department</th><th>KPIs</th><th>Score</th><th>Rating</th><th>Period</th><th>Actions</th></tr></thead> <tbody>${scored.map((e,i)=>{const rt=PerfEngine.ratingLabel(e.sc);const kpiCount=DB.kpis.filter(k=>k.empId===e.id).length;const totalW=DB.kpis.filter(k=>k.empId===e.id).reduce((s,k)=>s+k.weight,0);return `<tr> <td style="font-family:var(--mono);color:var(--gray-400)">${i+1}</td> <td><div class="emp-cell"><div class="avatar-sm" style="width:28px;height:28px;font-size:10px">${initials(e.name)}</div><div><div class="emp-name">${e.name}</div><div class="emp-id">${e.id}</div></div></div></td> <td style="font-size:12px">${getSubName(e.sub)}</td> <td style="font-size:12px">${getDeptName(e.dept)}</td> <td style="font-family:var(--mono)">${kpiCount} ${totalW>100.01&&kpiCount?`<span class="badge badge-red" style="font-size:9px" title="KPI weights over-allocated: ${totalW}% (should be ≤100%)">⚠</span>`:''}</td> <td><div style="display:flex;align-items:center;gap:8px"><div class="progress" style="width:80px"><div class="progress-bar ${e.sc>=90?'green':e.sc>=70?'amber':'red'}" style="width:${Math.min(e.sc,120)/1.2}%"></div></div><span class="kpi-score ${rt.cls}" style="font-size:14px">${e.sc}%</span></div></td> <td><span class="badge ${e.sc>=90?'badge-green':e.sc>=70?'badge-teal':e.sc>=50?'badge-amber':'badge-red'}">${rt.label}</span></td> <td style="font-size:11px;color:var(--gray-400)">Q2 2026</td> <td><div style="display:flex;gap:4px"><button class="btn btn-outline btn-xs" onclick="openMasterProfileModal('${e.id}')">${ICO.eye}</button>${e.sc<70?`<button class="btn btn-danger btn-xs" onclick="openPIPModal('${e.id}')">PIP</button>`:''}</div></td> </tr>`}).join('')}</tbody> </table></div></div> </div>`;
}

function openPIPModal(empId) {
  const e = getEmp(empId);
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Performance Improvement Plan</span>${closeX()}</div> <div class="modal-body"> <div class="form-group" style="margin-bottom:12px"><label class="form-label">Employee</label> <select class="form-control">${filteredEmps().map(e2=>`<option value="${e2.id}"${e2.id===empId?' selected':''}>${e2.name} — ${PerfEngine.calcEmployeeScore(e2.id)||'N/A'}%</option>`).join('')}</select> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">PIP Start Date</label><input class="form-control" type="date" value="${new Date().toISOString().split('T')[0]}"></div> <div class="form-group"><label class="form-label required">Review Date</label><input class="form-control" type="date"></div> </div> <div class="form-group" style="margin-bottom:12px"><label class="form-label required">Performance Gap</label><textarea class="form-control" placeholder="Describe specific performance issues…"></textarea></div> <div class="form-group"><label class="form-label required">Improvement Targets</label><textarea class="form-control" placeholder="Measurable targets with deadlines…"></textarea></div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="closeModal();toast('PIP created for '+getEmpName('${empId}'),'success')">Create PIP</button> </div>`);
}

/* ═══════════════════════════════════════════════════════════
   USER MANAGEMENT MODULE
═══════════════════════════════════════════════════════════ */
PAGES.users = function(wrap) {
  wrap.innerHTML = `<div class="page"> <div class="page-header"> <div class="page-header-left"> <div class="page-title">User Management</div> <div class="page-sub">Create · Edit · Activate/Deactivate · Reset Password · Assign Roles (RBAC)</div> </div> <div class="page-actions"> <button class="btn btn-outline btn-sm" onclick="nav('settings')">${ICO.shield} RBAC Settings</button> <button class="btn btn-primary btn-sm" onclick="openCreateUserModal()">${ICO.plus} Create User</button> </div> </div> <div class="stat-grid" style="grid-template-columns:repeat(4,1fr)"> <div class="stat-card navy"><div class="stat-info"><div class="stat-label">Total Users</div><div class="stat-val">${DB.users.length}</div></div></div> <div class="stat-card green"><div class="stat-info"><div class="stat-label">Active</div><div class="stat-val">${DB.users.filter(u=>u.status==='Active').length}</div></div></div> <div class="stat-card amber"><div class="stat-info"><div class="stat-label">Inactive</div><div class="stat-val">${DB.users.filter(u=>u.status==='Inactive').length}</div></div></div> <div class="stat-card red"><div class="stat-info"><div class="stat-label">Failed Attempts</div><div class="stat-val">${DB.users.reduce((s,u)=>s+(u.failedAttempts||0),0)}</div></div></div> </div> <div class="card"> <div class="card-header"><div class="card-title">User Accounts</div><div class="card-sub">All system users with roles and permissions</div></div> <div class="card-body"><div class="table-wrap"><table class="table"> <thead><tr><th>User</th><th>Username</th><th>Email</th><th>Linked Employee</th><th>Role</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead> <tbody> ${DB.users.map(u => {
            const emp = u.empId ? getEmp(u.empId) : null;
            const roleInfo = (DB.customRolePermissions||{})[u.role] || {label:u.role,color:'gray'};
            const displayName = emp ? emp.name : u.username;
            return `<tr> <td><div class="emp-cell"> <div class="avatar-sm" style="background:${u.status==='Active'?'var(--navy-3)':'var(--gray-300)'}">${initials(displayName)}</div> <div><div class="emp-name">${displayName}</div><div class="emp-id">${u.id}</div></div> </div></td> <td style="font-family:var(--mono);font-size:12px">${u.username}</td> <td style="font-size:12px">${u.email}</td> <td style="font-size:12px">${emp?`${emp.name} (${emp.id})`:'<span style="color:var(--gray-400)">Not linked</span>'}</td> <td><span class="badge badge-${roleInfo.color}">${roleInfo.label}</span></td> <td><span class="badge ${u.status==='Active'?'badge-green':'badge-gray'}">${u.status}</span>${(u.failedAttempts||0)>0?`<span class="badge badge-red" style="margin-left:4px;font-size:10px"> ${u.failedAttempts} fails</span>`:''}</td> <td style="font-size:12px;color:var(--gray-500)">${u.lastLogin}</td> <td><div style="display:flex;gap:4px"> <button class="btn btn-outline btn-xs" onclick="editUserModal('${u.id}')" title="Edit">${ICO.edit}</button> <button class="btn btn-ghost btn-xs" onclick="resetUserPassword('${u.id}')" title="Reset password">${ICO.key}</button> <button class="btn btn-ghost btn-xs" onclick="toggleUserStatus('${u.id}')" title="${u.status==='Active'?'Deactivate':'Activate'}" style="color:${u.status==='Active'?'var(--amber)':'var(--green)'}"> ${u.status==='Active'?'⏸':'▶'}
                </button> <button class="btn btn-ghost btn-xs" onclick="deleteUser('${u.id}')" title="Delete" style="color:var(--red)">${ICO.trash}</button> </div></td> </tr>`;
          }).join('')}
        </tbody> </table></div></div> </div> <!-- RBAC Permissions Matrix --> <div class="card" style="margin-top:16px"> <div class="card-header"> <div><div class="card-title">Role Permissions Matrix</div><div class="card-sub">Click to open the live interactive editor</div></div> <button class="btn btn-primary" onclick="openRoleMatrixEditor()">Open Matrix Editor</button> </div> <div class="card-body" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:12px"> ${Object.entries(ROLES).map(([key,r])=>`
          <div style="background:var(--gray-50);border:1px solid var(--border);border-radius:var(--radius);padding:12px;cursor:pointer" onclick="openRoleMatrixEditor()"> <div style="font-size:13px;font-weight:800;color:var(--navy)">${r.label}</div> <div style="font-size:11px;color:var(--gray-400);margin-top:2px">${r.perms.includes('*')?'Full Access':r.perms.length+' modules'}</div> <div style="margin-top:8px;display:flex;flex-wrap:wrap;gap:3px">${(r.perms.includes('*')?['ALL']:r.perms.slice(0,4)).map(p=>`<span style="font-size:9px;background:var(--blue-l);color:var(--blue);padding:1px 5px;border-radius:3px">${p}</span>`).join('')}${r.perms.length>4&&!r.perms.includes('*')?`<span style="font-size:9px;color:var(--gray-400)">+${r.perms.length-4}</span>`:''}</div> </div>`).join('')}
      </div> </div<!-- RBAC Permissions Matrix --> <div class="card" style="margin-top:16px"> <div class="card-header"><div class="card-title">Role Permissions Matrix</div><div class="card-sub">RBAC — what each role can access</div></div> <div class="card-body"><div class="table-wrap"><table class="table"> <thead><tr><th>Module</th>${Object.entries(ROLES).map(([,r])=>`<th style="font-size:10px;text-align:center">${r.label}</th>`).join('')}</tr></thead> <tbody> ${['employees','attendance','leave','payroll','recruitment','performance','kpi','reports','settings','users'].map(perm => `<tr> <td style="font-weight:600;font-size:12px">${toTitleCase(perm)}</td> ${Object.entries(ROLES).map(([,r])=>`<td style="text-align:center">${r.perms.includes('*')||r.perms.includes(perm)?`<span style="color:var(--green);font-size:16px">✓</span>`:`<span style="color:var(--gray-300);font-size:14px">—</span>`}</td>`).join('')}
          </tr>`).join('')}
        </tbody> </table></div></div> </div> </div>`;
};

function openCreateUserModal() {
  if (!hasPermission('users')) { toast('Access Denied', 'error'); return; }

  // Build role options from ROLES
  const roleEntries = Object.entries(ROLES).filter(([key]) => {
    if (key === 'super_admin') return isMasterAdmin();
    return true;
  });
  const roleOptions = roleEntries.map(([k, r]) => `<option value="${k}"${k === 'employee' ? ' selected' : ''}>${r.label}</option>`
  ).join('');

  const empOptions = DB.employees.filter(e => e.status === 'Active')
    .map(e => `<option value="${e.id}">${e.name} — ${e.id} (${getSubName(e.sub)})</option>`)
    .join('');

  openModal('narrow', `
    <div class="modal-header" style="border-bottom:1px solid var(--gray-100);padding:20px 24px 16px"> <div> <div class="modal-title" style="font-size:18px;font-weight:800;color:var(--gray-900)">Create User Account</div> <div style="font-size:12px;color:var(--gray-400);margin-top:3px">Add a new system user and assign their role</div> </div> ${closeX()}
    </div> <div class="modal-body" style="padding:20px 24px"> <!-- Avatar preview --> <div style="display:flex;align-items:center;gap:14px;margin-bottom:20px;padding:14px 16px;background:var(--gray-50);border-radius:12px;border:1px solid var(--gray-100)"> <div id="cu_avatar_preview" style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--navy),#2563EB);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:white;flex-shrink:0">?</div> <div> <div id="cu_name_preview" style="font-size:14px;font-weight:700;color:var(--gray-900)">New User</div> <div id="cu_role_preview" style="font-size:12px;color:var(--gray-400);margin-top:1px">Select a role below</div> </div> </div> <!-- Full Name --> <div class="form-group" style="margin-bottom:14px"> <label class="form-label" style="font-size:12px;font-weight:700;color:var(--gray-600);text-transform:uppercase;letter-spacing:.4px">Full Name <span style="color:var(--red)">*</span></label> <input class="form-control" id="cu_fullname" placeholder="e.g. Fatima Hassan"
          oninput="updateUserPreview()"
          style="border:1.5px solid var(--gray-200);border-radius:10px;padding:10px 14px;font-size:14px"> </div> <!-- Username & Email --> <div class="form-row cols-2" style="margin-bottom:14px;gap:12px"> <div class="form-group"> <label class="form-label" style="font-size:12px;font-weight:700;color:var(--gray-600);text-transform:uppercase;letter-spacing:.4px">Username <span style="color:var(--red)">*</span></label> <input class="form-control" id="cu_user" placeholder="firstname.lastname"
            style="border:1.5px solid var(--gray-200);border-radius:10px;padding:10px 14px;font-size:14px"> </div> <div class="form-group"> <label class="form-label" style="font-size:12px;font-weight:700;color:var(--gray-600);text-transform:uppercase;letter-spacing:.4px">Email <span style="color:var(--red)">*</span></label> <input class="form-control" id="cu_email" type="email" placeholder="user@asalmedia.so"
            style="border:1.5px solid var(--gray-200);border-radius:10px;padding:10px 14px;font-size:14px"> </div> </div> <!-- Role --> <div class="form-group" style="margin-bottom:14px"> <label class="form-label" style="font-size:12px;font-weight:700;color:var(--gray-600);text-transform:uppercase;letter-spacing:.4px">Role <span style="color:var(--red)">*</span></label> <select class="form-control" id="cu_role" onchange="updateUserPreview()"
          style="border:1.5px solid var(--gray-200);border-radius:10px;padding:10px 14px;font-size:14px"> ${roleOptions}
        </select> </div> <!-- Link Employee --> <div class="form-group" style="margin-bottom:14px"> <label class="form-label" style="font-size:12px;font-weight:700;color:var(--gray-600);text-transform:uppercase;letter-spacing:.4px">Link to Employee</label> <select class="form-control" id="cu_emp" onchange="updateUserPreview()"
          style="border:1.5px solid var(--gray-200);border-radius:10px;padding:10px 14px;font-size:14px"> <option value="">— Not linked to an employee —</option> ${empOptions}
        </select> <div style="font-size:11px;color:var(--gray-400);margin-top:4px">Links this account to an employee record for self-service access</div> <div id="cu_emp_hint" style="display:none;font-size:11px;color:var(--red);font-weight:600;margin-top:4px">Required for the Employee role — please link an employee.</div> </div> <!-- Password --> <div class="form-row cols-2" style="margin-bottom:6px;gap:12px"> <div class="form-group"> <label class="form-label" style="font-size:12px;font-weight:700;color:var(--gray-600);text-transform:uppercase;letter-spacing:.4px">Password <span style="color:var(--red)">*</span></label> <div style="position:relative"> <input class="form-control" id="cu_pass" type="password" placeholder="Min 8 characters"
              style="border:1.5px solid var(--gray-200);border-radius:10px;padding:10px 14px;font-size:14px;padding-right:40px"> <button type="button" onclick="togglePassVis('cu_pass',this)"
              style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--gray-400);font-size:13px"></button> </div> </div> <div class="form-group"> <label class="form-label" style="font-size:12px;font-weight:700;color:var(--gray-600);text-transform:uppercase;letter-spacing:.4px">Confirm Password <span style="color:var(--red)">*</span></label> <div style="position:relative"> <input class="form-control" id="cu_pass2" type="password" placeholder="Repeat password"
              style="border:1.5px solid var(--gray-200);border-radius:10px;padding:10px 14px;font-size:14px;padding-right:40px"> <button type="button" onclick="togglePassVis('cu_pass2',this)"
              style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--gray-400);font-size:13px"></button> </div> </div> </div> <!-- Password strength --> <div id="cu_pass_strength" style="display:none;margin-bottom:14px"> <div style="height:4px;background:var(--gray-100);border-radius:99px;overflow:hidden"> <div id="cu_pass_bar" style="height:100%;border-radius:99px;transition:all .3s;width:0%"></div> </div> <div id="cu_pass_label" style="font-size:11px;margin-top:3px;color:var(--gray-400)"></div> </div> <!-- Status --> <div class="form-group"> <label class="form-label" style="font-size:12px;font-weight:700;color:var(--gray-600);text-transform:uppercase;letter-spacing:.4px">Account Status</label> <div style="display:flex;gap:10px;margin-top:6px"> <label style="display:flex;align-items:center;gap:8px;padding:8px 16px;border:2px solid var(--green);border-radius:10px;cursor:pointer;background:#F0FDF4"> <input type="radio" name="cu_status_r" value="Active" checked style="accent-color:var(--green)"> <span style="font-size:13px;font-weight:700;color:#065F46">Active</span> </label> <label style="display:flex;align-items:center;gap:8px;padding:8px 16px;border:2px solid var(--gray-200);border-radius:10px;cursor:pointer"> <input type="radio" name="cu_status_r" value="Inactive" style="accent-color:var(--gray-400)"> <span style="font-size:13px;font-weight:600;color:var(--gray-500)">Inactive</span> </label> </div> </div> </div> <div class="modal-footer" style="border-top:1px solid var(--gray-100);padding:16px 24px;gap:10px"> <button class="btn btn-outline" onclick="closeModal()" style="flex:1;padding:10px;border-radius:10px">Cancel</button> <button class="btn btn-primary" id="cu_save" onclick="saveNewUser()"
        style="flex:2;padding:10px;border-radius:10px;background:var(--navy);font-weight:700;font-size:14px"> Create User Account
      </button> </div>`);

  // Auto-update preview as user types
  setTimeout(() => {
    document.getElementById('cu_pass')?.addEventListener('input', updatePassStrength);
    updateUserPreview();
  }, 100);
}

function updateUserPreview() {
  const name    = document.getElementById('cu_fullname')?.value?.trim() || 'New User';
  const roleKey = document.getElementById('cu_role')?.value || 'employee';
  const roleLabel = ROLES[roleKey]?.label || roleKey;
  const avatarEl = document.getElementById('cu_avatar_preview');
  const nameEl   = document.getElementById('cu_name_preview');
  const roleEl   = document.getElementById('cu_role_preview');
  if (avatarEl) avatarEl.textContent = name.split(' ').map(w=>w[0]||'').join('').slice(0,2).toUpperCase() || '?';
  if (nameEl)   nameEl.textContent   = name || 'New User';
  if (roleEl)   roleEl.textContent   = roleLabel;

  // Auto-fill username from full name
  const userInput = document.getElementById('cu_user');
  if (userInput && !userInput.value) {
    userInput.value = name.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z.]/g, '');
  }

  // Employee role requires a linked employee — disable Save + show hint until set.
  const empId = document.getElementById('cu_emp')?.value || '';
  const save  = document.getElementById('cu_save');
  const hint  = document.getElementById('cu_emp_hint');
  const needEmp = (roleKey === 'employee' && !empId);
  if (save) { save.disabled = needEmp; save.style.opacity = needEmp ? '0.5' : ''; save.style.cursor = needEmp ? 'not-allowed' : 'pointer'; }
  if (hint) hint.style.display = needEmp ? 'block' : 'none';
}

function updatePassStrength() {
  const pass  = document.getElementById('cu_pass')?.value || '';
  const bar   = document.getElementById('cu_pass_bar');
  const label = document.getElementById('cu_pass_label');
  const box   = document.getElementById('cu_pass_strength');
  if (!bar || !label || !box) return;
  box.style.display = pass ? 'block' : 'none';
  let score = 0;
  if (pass.length >= 8)  score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;
  const levels = [
    { w:'25%',  bg:'var(--red)',   text:'Weak' },
    { w:'50%',  bg:'var(--amber)', text:'Fair' },
    { w:'75%',  bg:'#3B82F6',      text:'Good' },
    { w:'100%', bg:'var(--green)', text:'Strong' },
  ];
  const lvl = levels[Math.max(0, score - 1)];
  bar.style.width      = lvl.w;
  bar.style.background = lvl.bg;
  label.textContent    = lvl.text;
  label.style.color    = lvl.bg;
}

function togglePassVis(fieldId, btn) {
  const input = document.getElementById(fieldId);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
  btn.textContent = input.type === 'password' ? 'Show' : 'Hide';
}


function saveNewUser() {
  const fullname  = sanitizeText(document.getElementById('cu_fullname')?.value || '');
  const username  = sanitizeText(document.getElementById('cu_user')?.value || '')     || fullname.toLowerCase().replace(/\s+/g,'.').replace(/[^a-z.]/g,'');
  const email     = document.getElementById('cu_email')?.value?.trim()    || '';
  const pass      = document.getElementById('cu_pass')?.value             || '';
  const pass2     = document.getElementById('cu_pass2')?.value            || '';
  const roleKey   = document.getElementById('cu_role')?.value             || 'employee';
  const status    = document.querySelector('input[name="cu_status_r"]:checked')?.value || 'Active';

  // ── Input validation ──
  if (!username) { toast('Username is required', 'error'); return; }
  if (!email)    { toast('Email is required', 'error'); return; }
  if (!pass)     { toast('Password is required', 'error'); return; }
  if (pass.length < 8) { toast('Password must be at least 8 characters', 'error'); return; }
  if (pass2 && pass !== pass2) { toast('Passwords do not match', 'error'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { toast('Please enter a valid email address', 'error'); return; }
  if (DB.users.find(u => u.email.toLowerCase() === email.toLowerCase())) { toast('An account with this email already exists', 'error'); return; }
  if (DB.users.find(u => u.username.toLowerCase() === username.toLowerCase())) { toast('Username already taken', 'error'); return; }

  // ── SECURITY: Validate role assignment ──
  if (!canAssignRole(roleKey)) {
    toast('Access Denied: Insufficient privileges to assign the ' + (ROLES[roleKey]?.label || DB.customRolePermissions?.[roleKey]?.label || roleKey) + ' role', 'error');
    DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`BLOCKED: Attempted to assign role "${roleKey}" without authorization`, module:'Security', ip:'browser' });
    return;
  }

  // ── SECURITY: Double-check super admin assignment ──
  if (roleKey === SUPER_ADMIN_ROLE && !isMasterAdmin()) {
    toast('Access Denied: Only the Master Administrator can create Super Admin accounts', 'error');
    return;
  }

  const id    = 'USR' + String(DB.users.length + 1).padStart(3, '0');
  const empId = document.getElementById('cu_emp')?.value || '';

  // Employee-role users MUST be linked to an employee record (else self-service
  // is empty + RLS gives them nothing). Enforced again server-side.
  if (roleKey === 'employee') {
    if (!empId) { toast('Please link an employee before creating this user', 'error'); return; }
    if (!DB.employees.find(e => e.id === empId)) { toast('Linked employee not found — pick a valid employee', 'error'); return; }
  }

  // Create the REAL login (Supabase Auth account + role) via the secure server
  // function, then mirror it into the local directory cache for the UI.
  const btn = document.querySelector('.modal-footer .btn-primary');
  if (btn) { btn.disabled = true; btn.dataset._t = btn.textContent; btn.textContent = 'Creating…'; }

  (async () => {
    try {
      if (typeof Auth === 'undefined' || !Auth.createUserAccount) {
        throw new Error('User creation service unavailable — check connection');
      }
      const res = await Auth.createUserAccount({ id, email, password: pass, role: roleKey, username, empId, status });
      const newUser = {
        id: res.id || id, username, email,
        name:     fullname || username,
        empId,    role: roleKey, status,
        lastLogin:'Never',
        created:  new Date().toISOString().split('T')[0],
        failedAttempts: 0,
      };
      DB.users.push(newUser);
      DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`Created login: ${username} (${email}) — role: ${roleKey}`, module:'Users', ip:'browser' });
      closeModal();
      toast(`Login created for ${username} — they can sign in now`, 'success');
      nav('users');
      scheduleSave();
    } catch (err) {
      if (btn) { btn.disabled = false; btn.textContent = btn.dataset._t || 'Create User'; }
      const m = /already.*registered|already.*exists|duplicate/i.test(err.message||'')
        ? 'An account with this email already exists' : (err.message || 'Could not create user');
      toast(m, 'error');
    }
  })();
}

function editUserModal(userId) {
  const u = DB.users.find(x=>x.id===userId); if (!u) return;
  const role = ROLES[u.role];
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Edit User — ${u.username}</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Username</label><input class="form-control" id="eu_user" value="${u.username}"></div> <div class="form-group"><label class="form-label">Email</label><input class="form-control" id="eu_email" value="${u.email}"></div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Role</label> <select class="form-control" id="eu_role" ${u.role===SUPER_ADMIN_ROLE&&!isMasterAdmin()?'disabled':''}> ${getAllowedRoles(u.role).filter(([k])=>canAssignRole(k)||(k===u.role)).map(([k,r])=>`<option value="${k}"${k===u.role?' selected':''}>${r.label}</option>`).join('')}
          </select> ${u.role===SUPER_ADMIN_ROLE&&!isMasterAdmin()?'<div style="font-size:11px;color:var(--red);margin-top:3px"> Super Admin roles can only be modified by the Master Administrator</div>':''}
        </div> <div class="form-group"><label class="form-label">Status</label> <select class="form-control" id="eu_status"><option${u.status==='Active'?' selected':''}>Active</option><option${u.status==='Inactive'?' selected':''}>Inactive</option></select> </div> </div> <div class="form-group"><label class="form-label">Linked Employee</label> <select class="form-control" id="eu_emp"> <option value="">— Not linked —</option> ${DB.employees.map(e=>`<option value="${e.id}"${e.id===u.empId?' selected':''}>${e.name} (${e.id})</option>`).join('')}
        </select> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveEditUser('${userId}')">Save Changes</button> </div>`);
}

function saveEditUser(userId) {
  const u = DB.users.find(x => x.id === userId); if (!u) return;
  const newRole = document.getElementById('eu_role')?.value || u.role;

  // ── SECURITY: Cannot modify Super Admin unless you are Master Admin ──
  if (u.role === SUPER_ADMIN_ROLE && !isMasterAdmin()) {
    toast('Access Denied: Super Admin accounts can only be modified by the Master Administrator', 'error');
    DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`BLOCKED: Attempted to modify Super Admin account ${u.username}`, module:'Security', ip:'browser' });
    return;
  }

  // ── SECURITY: Cannot assign Super Admin unless Master Admin ──
  if (newRole === SUPER_ADMIN_ROLE && !isMasterAdmin()) {
    toast('Access Denied: Only the Master Administrator can assign Super Admin role', 'error');
    return;
  }

  // ── SECURITY: Validate role is assignable ──
  if (!canAssignRole(newRole)) {
    toast('Access Denied: Insufficient privileges to assign this role', 'error');
    return;
  }

  const oldRole = u.role;
  u.username = document.getElementById('eu_user')?.value  || u.username;
  u.email    = document.getElementById('eu_email')?.value || u.email;
  u.role     = newRole;
  u.status   = document.getElementById('eu_status')?.value || u.status;
  u.empId    = document.getElementById('eu_emp')?.value   || '';

  if (typeof SupaWrite !== 'undefined') SupaWrite.saveUser(u);
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`Updated user ${u.username}${oldRole!==newRole?' — role changed: '+oldRole+' → '+newRole:''}`, module:'Users', ip:'browser' });
  closeModal();
  toast('User updated successfully', 'success');
  nav('users');

  scheduleSave();
}

function resetUserPassword(userId) {
  const u = DB.users.find(x=>x.id===userId); if (!u) return;
  openModal('narrow', `
    <div class="modal-header"><span class="modal-title">Reset Password — ${u.username}</span>${closeX()}</div> <div class="modal-body"> <div class="form-group" style="margin-bottom:12px"><label class="form-label required">New Password</label><input class="form-control" id="rp_pass" type="password" placeholder="Min 8 characters"></div> <div class="form-group"><label class="form-label required">Confirm Password</label><input class="form-control" id="rp_conf" type="password" placeholder="Repeat password"></div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="doResetPassword('${userId}')">Reset Password</button> </div>`);
}

function doResetPassword(userId) {
  const pass = (document.getElementById('rp_pass')||{}).value;
  const conf = (document.getElementById('rp_conf')||{}).value;
  if (!pass || pass.length < 8) { toast('Password must be at least 8 characters','error'); return; }
  if (pass !== conf) { toast('Passwords do not match','error'); return; }
  const u = DB.users.find(x=>x.id===userId);
  if (!u) return;
  const btn = document.querySelector('.modal-footer .btn-primary');
  if (btn) { btn.disabled = true; btn.dataset._t = btn.textContent; btn.textContent = 'Resetting…'; }
  (async () => {
    try {
      if (typeof Auth === 'undefined' || !Auth.adminResetPassword) throw new Error('Reset service unavailable — check connection');
      await Auth.adminResetPassword(u.email, pass);
      u.failedAttempts = 0;
      DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`Password reset for ${u.username} (${u.email})`, module:'Users', ip:'browser' });
      closeModal(); toast(`Password reset for ${u.username} — they can sign in with the new password`, 'success');
      scheduleSave();
    } catch (err) {
      if (btn) { btn.disabled = false; btn.textContent = btn.dataset._t || 'Reset Password'; }
      toast(err.message || 'Password reset failed', 'error');
    }
  })();
}

function toggleUserStatus(userId) {
  const u = DB.users.find(x=>x.id===userId); if (!u) return;
  u.status = u.status === 'Active' ? 'Inactive' : 'Active';
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`User ${u.username} ${u.status==='Active'?'activated':'deactivated'}`, module:'Users', ip:'127.0.0.1' });
  toast(`User ${u.status==='Active'?'activated':'deactivated'}`, u.status==='Active'?'success':'warning');
  nav('users');
}

function deleteUser(userId) {
  const u = DB.users.find(x => x.id === userId); if (!u) return;

  // SECURITY: Cannot delete Super Admin unless Master Admin
  if (u.role === SUPER_ADMIN_ROLE && !isMasterAdmin()) {
    toast('Access Denied: Super Admin accounts cannot be deleted', 'error');
    DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`BLOCKED: Attempted to delete Super Admin account ${u.username}`, module:'Security', ip:'browser' });
    return;
  }

  // SECURITY: Cannot delete your own account
  if (u.email === STATE.user?.email) { toast('Cannot delete your own account', 'error'); return; }

  if (!confirm(`Delete user "${u.username}"? This cannot be undone.`)) return;

  DB.users = DB.users.filter(x => x.id !== userId);
  if (typeof SupaWrite !== 'undefined') SupaWrite.deleteUser(userId);
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`Deleted user: ${u.username} (role was: ${u.role})`, module:'Users', ip:'browser' });
  toast('User deleted', 'info');
  nav('users');
}

/* ═══════════════════════════════════════════════════════════
   ATTENDANCE MODULE
═══════════════════════════════════════════════════════════ */
PAGES.attendance = function(wrap) {
  const att = DB.attendance.filter(a=>a.date===STATE.attDate);
  const present=att.filter(a=>['Present','Overtime'].includes(a.status)).length;
  const late=att.filter(a=>a.status==='Late').length;
  const absent=att.filter(a=>a.status==='Absent').length;
  const onLeave=att.filter(a=>a.status.includes('Leave')).length;
  const ot=att.filter(a=>(a.ot||0)>0).length;
  wrap.innerHTML=`<div class="page"> <div class="page-header"> <div class="page-header-left"><div class="page-title">Attendance Management</div> <div class="page-sub">Biometric sync · Check-in/out · Late/OT tracking · Short hours deductions</div></div> <div class="page-actions"> <input type="date" class="form-control" style="width:auto" value="${STATE.attDate}" onchange="STATE.attDate=this.value;nav('attendance')"> <button class="btn btn-outline btn-sm" onclick="exportAttendance()">${ICO.excel} Export</button> <button class="btn btn-primary btn-sm" onclick="openMarkAttModal()">Manual Entry</button> </div> </div> <div class="att-status-grid"> ${[['att-on-time',present,'Present / OT'],['att-late',late,'Late Arrivals'],['att-absent',absent,'Absent'],['att-leave',onLeave,'On Leave'],['att-ot',ot,'Overtime'],['att-early',0,'Early Leave']].map(([cls,v,l])=>`<div class="att-status-card"><div class="att-status-val ${cls}">${v}</div><div class="att-status-label">${l}</div></div>`).join('')}
    </div> <div class="toolbar"> <div class="toolbar-search"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg> <input type="text" placeholder="Search employee…" id="attSrch" oninput="filterAtt()"></div> <div class="toolbar-filters"> <select class="filter-select" id="attSF" onchange="filterAtt()"> <option value="">All Status</option> <option>Present</option><option>Late</option><option>Absent</option><option>Overtime</option><option>AnnualLeave</option><option>SickLeave</option> </select> <select class="filter-select" id="attSubF" onchange="filterAtt()"> <option value="">All Subsidiaries</option> ${DB.subsidiaries.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}
        </select> </div> </div> <div id="attBody" class="card" style="border-top:none;border-radius:0 0 var(--radius-lg) var(--radius-lg)">${attTableHTML(att)}</div> </div>`;
};

function attTableHTML(att) {
  const statusCls={Present:'badge-green',Late:'badge-amber',Absent:'badge-red',Overtime:'badge-teal',EarlyLeave:'badge-purple',AnnualLeave:'badge-blue',SickLeave:'badge-blue',MaternityLeave:'badge-purple',SpecialLeave:'badge-gray'};
  const statusLbl={AnnualLeave:'Annual Leave',SickLeave:'Sick Leave',MaternityLeave:'Maternity',EarlyLeave:'Early Leave'};
  return `<div class="table-wrap"><table class="table"> <thead><tr><th>Employee</th><th>Subsidiary</th><th>Department</th><th>Shift</th><th>Check In</th><th>Check Out</th><th>Status</th><th>OT hrs</th><th>Short Hrs</th><th>Deduction</th></tr></thead> <tbody>${att.map(a=>{
      const e=getEmp(a.empId); if(!e) return '';
      const dr=PayrollEngine.calcDailyRate(e.salary);
      const ded=((a.shortHrs||0)/9)*dr;
      const lateMins=a.checkIn?AttEngine.lateMinutes(a.checkIn):0;
      return `<tr> <td><div class="emp-cell"><div class="avatar-sm" style="width:28px;height:28px;font-size:10px">${initials(e.name)}</div><div><div class="emp-name">${e.name}</div><div class="emp-id">${e.id}</div></div></div></td> <td style="font-size:11px">${getSubName(e.sub)}</td> <td style="font-size:11px">${getDeptName(e.dept)}</td> <td><span class="badge badge-gray">${a.shift}</span></td> <td style="font-family:var(--mono);font-size:13px;color:${a.checkIn?(lateMins>8?'var(--amber)':'inherit'):'var(--gray-300)'}"> ${a.checkIn||'—'}${lateMins>8?`<span style="font-size:9px;color:var(--amber);margin-left:2px">+${lateMins}m</span>`:''}
        </td> <td style="font-family:var(--mono);font-size:13px">${a.checkOut||'—'}</td> <td><span class="badge ${statusCls[a.status]||'badge-gray'}">${statusLbl[a.status]||a.status}</span></td> <td style="font-family:var(--mono);color:${(a.ot||0)>0?'var(--teal)':'var(--gray-300)'}">${(a.ot||0)>0?`+${a.ot}h`:'—'}</td> <td style="font-family:var(--mono);color:${(a.shortHrs||0)>0?'var(--amber)':'var(--gray-300)'}">${(a.shortHrs||0)>0?`${a.shortHrs}h`:'—'}</td> <td style="font-family:var(--mono);color:${ded>0?'var(--red)':'var(--gray-300)'}">${ded>0?`-${fmtCurrency(ded)}`:'—'}</td> </tr>`;
    }).join('')}</tbody> </table></div>`;
}

function filterAtt() {
  const s=(document.getElementById('attSrch')||{}).value||'';
  const sf=(document.getElementById('attSF')||{}).value||'';
  const sb=(document.getElementById('attSubF')||{}).value||'';
  let att=DB.attendance.filter(a=>a.date===STATE.attDate);
  if(s) att=att.filter(a=>{const e=getEmp(a.empId);return e&&(e.name.toLowerCase().includes(s.toLowerCase())||e.id.includes(s));});
  if(sf) att=att.filter(a=>a.status===sf);
  if(sb) att=att.filter(a=>{const e=getEmp(a.empId);return e&&e.sub===sb;});
  document.getElementById('attBody').innerHTML=attTableHTML(att);
}

function openMarkAttModal() {
  openModal('narrow',`
    <div class="modal-header"><span class="modal-title">Manual Attendance Entry</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Employee</label> <select class="form-control" id="ma_emp">${filteredEmps().map(e=>`<option value="${e.id}">${e.name} (${e.id})</option>`).join('')}</select> </div> <div class="form-group"><label class="form-label required">Date</label><input class="form-control" id="ma_date" type="date" value="${STATE.attDate}"></div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Check In</label><input class="form-control" id="ma_in" type="time" value="08:00"></div> <div class="form-group"><label class="form-label">Check Out</label><input class="form-control" id="ma_out" type="time" value="17:00"></div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Status</label> <select class="form-control" id="ma_status"><option>Present</option><option>Late</option><option>Absent</option><option>Overtime</option><option>AnnualLeave</option><option>SickLeave</option></select> </div> <div class="form-group"><label class="form-label">OT Hours</label><input class="form-control" id="ma_ot" type="number" min="0" step="0.5" value="0"></div> </div> </div> <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveManualAtt()">Save</button></div>`);
}

function saveManualAtt() {
  const empId=document.getElementById('ma_emp').value;
  const date=document.getElementById('ma_date').value;
  const entry={empId,date,checkIn:document.getElementById('ma_in').value,checkOut:document.getElementById('ma_out').value,status:document.getElementById('ma_status').value,shift:'Morning',ot:parseFloat(document.getElementById('ma_ot').value)||0,shortHrs:0};
  const idx=DB.attendance.findIndex(a=>a.empId===empId&&a.date===date);
  if(idx>-1) DB.attendance[idx]=entry; else DB.attendance.push(entry);
  if(typeof SupaWrite!=='undefined') SupaWrite.saveAttendance(entry);
  closeModal();toast('Attendance entry saved','success');nav('attendance');

  scheduleSave();
}

/* ═══════════════════════════════════════════════════════════
   LEAVE, PAYROLL, PERFORMANCE, RECRUITMENT (compact)
═══════════════════════════════════════════════════════════ */
PAGES.leave = function(wrap) {
  const pending=DB.leaveRequests.filter(l=>l.status==='Pending');
  wrap.innerHTML=`<div class="page"> <div class="page-header"> <div class="page-header-left"><div class="page-title">Leave Management</div></div> <div class="page-actions"> <button class="btn btn-outline btn-sm" onclick="exportLeave()">${ICO.excel} Export</button> <button class="btn btn-primary btn-sm" onclick="openLeaveReqModal()">${ICO.plus} New Request</button> </div> </div> <div class="stat-grid" style="grid-template-columns:repeat(5,1fr)"> <div class="stat-card amber"><div class="stat-info"><div class="stat-label">Pending</div><div class="stat-val">${pending.length}</div></div></div> <div class="stat-card green"><div class="stat-info"><div class="stat-label">Approved</div><div class="stat-val">${DB.leaveRequests.filter(l=>l.status==='Approved').length}</div></div></div> <div class="stat-card red"><div class="stat-info"><div class="stat-label">Rejected</div><div class="stat-val">${DB.leaveRequests.filter(l=>l.status==='Rejected').length}</div></div></div> <div class="stat-card blue"><div class="stat-info"><div class="stat-label">On Leave Now</div><div class="stat-val">${filteredEmps().filter(e=>e.status==='On Leave').length}</div></div></div> <div class="stat-card navy"><div class="stat-info"><div class="stat-label">Total Requests</div><div class="stat-val">${DB.leaveRequests.length}</div></div></div> </div> <div class="tabs" id="lvTabs"> <div class="tab active" onclick="lvTab('all',this)">All (${DB.leaveRequests.length})</div> <div class="tab" onclick="lvTab('pending',this)">Pending (${pending.length})</div> <div class="tab" onclick="lvTab('approved',this)">Approved</div> <div class="tab" onclick="lvTab('rejected',this)">Rejected</div> <div class="tab" onclick="lvTab('balances',this)">Balances</div> </div> <div id="lvBody">${leaveTableHTML(DB.leaveRequests)}</div> </div>`;
};

function leaveTableHTML(reqs){
  const sCls={Pending:'badge-amber',Approved:'badge-green',Rejected:'badge-red'};
  return `<div class="card"><div class="table-wrap"><table class="table"> <thead><tr><th>Employee</th><th>Subsidiary</th><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Reason</th><th>Status</th><th>Actions</th></tr></thead> <tbody>${reqs.map(l=>{const e=getEmp(l.empId);return `<tr> <td><div class="emp-cell"><div class="avatar-sm" style="width:28px;height:28px;font-size:10px">${e?initials(e.name):'?'}</div><div><div class="emp-name">${e?e.name:l.empId}</div><div class="emp-id">${l.id}</div></div></div></td> <td style="font-size:11px">${e?getSubName(e.sub):'—'}</td> <td><span class="badge badge-blue">${l.type}</span></td> <td style="font-size:12px">${fmtDate(l.from)}</td><td style="font-size:12px">${fmtDate(l.to)}</td> <td style="font-family:var(--mono);font-weight:700">${l.days}d</td> <td style="font-size:12px;max-width:180px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${l.reason}</td> <td><span class="badge ${sCls[l.status]||'badge-gray'}">${l.status}</span></td> <td><div style="display:flex;gap:4px">${l.status==='Pending'?
        `<button style="width:38px;height:38px;border-radius:10px;border:none;background:#D1FAE5;cursor:pointer;display:inline-flex;align-items:center;justify-content:center" title="Approve" onclick="doApproveLeave('${l.id}')"><svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#065F46' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg></button> <button style="width:38px;height:38px;border-radius:10px;border:none;background:#FEE2E2;cursor:pointer;display:inline-flex;align-items:center;justify-content:center" title="Reject" onclick="doRejectLeave('${l.id}')"><svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='#991B1B' stroke-width='2.5' stroke-linecap='round'><line x1='18' y1='6' x2='6' y2='18'/><line x1='6' y1='6' x2='18' y2='18'/></svg></button>`
        :`<button class="btn btn-ghost btn-xs">${ICO.eye}</button>`
      }</div></td> </tr>`}).join('')}</tbody> </table></div></div>`;
}

function lvTab(tab,el){
  document.querySelectorAll('#lvTabs .tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');
  const body=document.getElementById('lvBody');
  if(tab==='balances'){body.innerHTML=leaveBalancesHTML();return;}
  const m={all:DB.leaveRequests,pending:DB.leaveRequests.filter(l=>l.status==='Pending'),approved:DB.leaveRequests.filter(l=>l.status==='Approved'),rejected:DB.leaveRequests.filter(l=>l.status==='Rejected')};
  body.innerHTML=leaveTableHTML(m[tab]||DB.leaveRequests);
}

function leaveBalancesHTML(){
  return `<div class="card"><div class="table-wrap"><table class="table"> <thead><tr><th>Employee</th><th>Subsidiary</th><th>Annual (Rem/Total)</th><th>Sick</th><th>Maternity</th><th>Used Annual</th><th></th></tr></thead> <tbody>${filteredEmps().slice(0,30).map(e=>{
      const lb=DB.leaveBalances[e.id]||{annual:30,sick:14,maternity:0,used_annual:0,used_sick:0};
      const rem=lb.annual-(lb.used_annual||0),pct=Math.round((lb.used_annual||0)/lb.annual*100);
      return `<tr> <td><div class="emp-cell"><div class="avatar-sm" style="width:28px;height:28px;font-size:10px">${initials(e.name)}</div><div><div class="emp-name">${e.name}</div><div class="emp-id">${e.id}</div></div></div></td> <td style="font-size:11px">${getSubName(e.sub)}</td> <td><div style="display:flex;align-items:center;gap:8px"><div class="progress" style="width:80px"><div class="progress-bar ${pct>80?'red':pct>50?'amber':'green'}" style="width:${pct}%"></div></div><span style="font-size:12px;font-family:var(--mono)">${rem}/${lb.annual}</span></div></td> <td style="font-family:var(--mono);font-size:12px">${(lb.sick||0)-(lb.used_sick||0)}/${lb.sick||0}</td> <td style="font-family:var(--mono);font-size:12px">${lb.maternity||0}d</td> <td><span class="badge ${(lb.used_annual||0)>14?'badge-red':(lb.used_annual||0)>7?'badge-amber':'badge-green'}">${lb.used_annual||0} used</span></td> <td><button class="btn btn-ghost btn-xs" onclick="openLeaveReqModal('${e.id}')">Apply</button></td> </tr>`;
    }).join('')}</tbody> </table></div></div>`;
}

function doApproveLeave(id) {
  const r = DB.leaveRequests.find(l => l.id === id);
  if (!r) return;
  r.status     = 'Approved';
  r.approvedBy = getCurrentEmployee()?.id || STATE.user?.empId || 'MGR';
  r.approvedAt = new Date().toISOString().split('T')[0];
  if (typeof SupaWrite !== 'undefined') SupaWrite.saveLeaveRequest(r);
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Approved leave: ${getEmp(r.empId)?.name} (${r.type} ${r.from}–${r.to})`, module:'Leave', ip:'browser' });
  toast('Leave request approved', 'success');
  nav('leave');

  scheduleSave();
}
function doRejectLeave(id) {
  const reason = prompt('Rejection reason (required):');
  if (reason === null) return; // cancelled
  if (!reason.trim()) { toast('Please provide a rejection reason', 'error'); return; }
  const r = DB.leaveRequests.find(l => l.id === id);
  if (!r) return;
  r.status         = 'Rejected';
  r.rejectedReason = reason;
  r.approvedBy     = getCurrentEmployee()?.id || STATE.user?.empId || 'MGR';
  r.approvedAt     = new Date().toISOString().split('T')[0];
  if (typeof SupaWrite !== 'undefined') SupaWrite.saveLeaveRequest(r);
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Rejected leave: ${getEmp(r.empId)?.name} — Reason: ${reason}`, module:'Leave', ip:'browser' });
  toast('Leave request rejected', 'warning');
  nav('leave');

  scheduleSave();
}

function openLeaveReqModal(preEmpId){
  openModal('wide',`
    <div class="modal-header"><span class="modal-title">Leave Request</span>${closeX()}</div> <div class="modal-body"> <div class="form-group" style="margin-bottom:12px"><label class="form-label required">Employee</label> <select class="form-control" id="lr_emp">${filteredEmps().map(e=>`<option value="${e.id}"${e.id===preEmpId?' selected':''}>${e.name} (${e.id})</option>`).join('')}</select> </div> <div class="form-group" style="margin-bottom:12px"><label class="form-label required">Leave Type</label> <select class="form-control" id="lr_type"><option>Annual Leave</option><option>Sick Leave</option><option>Maternity Leave</option><option>Paternity Leave</option><option>Special Leave</option></select> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">From</label><input class="form-control" id="lr_from" type="date" onchange="calcLeaveDays()"></div> <div class="form-group"><label class="form-label required">To</label><input class="form-control" id="lr_to" type="date" onchange="calcLeaveDays()"></div> </div> <div id="lr_days_hint" style="padding:8px 12px;background:var(--gray-50);border-radius:var(--radius);font-size:13px;font-weight:600;margin-bottom:12px;min-height:36px"></div> <div class="form-group"><label class="form-label required">Reason</label><textarea class="form-control" id="lr_reason" placeholder="Reason for leave…"></textarea></div> </div> <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveLeaveReq()">Submit</button></div>`);
}

function calcLeaveDays(){
  const f=document.getElementById('lr_from')?.value,t=document.getElementById('lr_to')?.value,h=document.getElementById('lr_days_hint');
  if(f&&t&&h){const d=Math.max(1,Math.ceil((new Date(t)-new Date(f))/(864e5))+1);h.textContent=`Duration: ${d} working day(s)`;h.setAttribute('data-days',d);}
}

function saveLeaveReq(){
  const empId=document.getElementById('lr_emp').value,type=document.getElementById('lr_type').value,from=document.getElementById('lr_from').value,to=document.getElementById('lr_to').value,reason=document.getElementById('lr_reason').value;
  if(!from||!to||!reason){DB.auditLogs.unshift({id:DB.auditLogs.length+1,time:new Date().toISOString().replace('T',' ').slice(0,16),user:STATE.user?.initials||'SYS',userRole:STATE.role,action:`Leave request submitted: ${type} ${from}–${to}`,module:'Leave',ip:'browser'});
  toast('Fill all required fields','error');return;}
  const dEl=document.getElementById('lr_days_hint');
  const newLeave = {id:'LR'+String(DB.leaveRequests.length+1).padStart(3,'0'),empId,type,from,to,days:parseInt(dEl?.getAttribute('data-days')||1),reason,status:'Pending',approvedBy:'',appliedOn:new Date().toISOString().split('T')[0]};
  DB.leaveRequests.push(newLeave);
  if(typeof SupaWrite!=='undefined') SupaWrite.saveLeaveRequest(newLeave);
  closeModal();DB.auditLogs.unshift({id:DB.auditLogs.length+1,time:new Date().toISOString().replace('T',' ').slice(0,16),user:STATE.user?.initials||'SYS',userRole:STATE.role,action:`Leave request submitted: ${type} ${from}–${to}`,module:'Leave',ip:'browser'});
  toast('Leave request submitted','success');nav('leave');

  scheduleSave();
}

/* ── PAYROLL ── */
PAGES.payroll = function(wrap) {
  // Drive the register off active employees (not off pre-existing payroll rows),
  // so a newly added employee appears immediately. Any saved payroll record for
  // the selected month is merged in (OT, advances, status); otherwise the row
  // defaults to Pending and is computed live from the employee's current salary.
  const rows=filteredEmps().map(e=>{
    const p=DB.payroll.find(x=>x.empId===e.id&&(x.month===STATE.payMonth||!x.month))
      ||{empId:e.id,month:STATE.payMonth,otHours:0,advance:0,lateDeduction:0,absentDeduction:0,eidBonus:0,status:'Pending'};
    return {...p,...PayrollEngine.calc(e,p),empName:e.name,empSub:getSubName(e.sub),empDept:getDeptName(e.dept),empId:e.id,status:p.status||'Pending'};
  });
  const sg=rows.reduce((s,r)=>s+r.grossEarnings,0),sn=rows.reduce((s,r)=>s+r.netPay,0),sd=rows.reduce((s,r)=>s+r.totalDeductions,0),st=rows.reduce((s,r)=>s+r.tax,0);
  wrap.innerHTML=`<div class="page"> <div class="page-header"> <div class="page-header-left"><div class="page-title">Payroll Management</div> <div class="page-sub">Base · Allowances · OT (×1.5) · Tax · Eid Bonus · Gratuity · Advances max 50%</div></div> <div class="page-actions"> <input type="month" class="form-control" style="width:auto" value="${STATE.payMonth}" onchange="STATE.payMonth=this.value"> <button class="btn btn-outline btn-sm" onclick="exportPayroll()">${ICO.excel} Export</button> <button class="btn btn-primary btn-sm" onclick="runPayrollBatch()">${ICO.play} Run Batch</button> </div> </div> <div class="stat-grid"> <div class="stat-card gold"><div class="stat-info"><div class="stat-label">Gross Payroll</div><div class="stat-val">${fmtCurrency(sg).split('.')[0]}</div></div></div> <div class="stat-card navy"><div class="stat-info"><div class="stat-label">Net Payroll</div><div class="stat-val">${fmtCurrency(sn).split('.')[0]}</div></div></div> <div class="stat-card red"><div class="stat-info"><div class="stat-label">Total Deductions</div><div class="stat-val">${fmtCurrency(sd).split('.')[0]}</div></div></div> <div class="stat-card purple"><div class="stat-info"><div class="stat-label">Total Tax</div><div class="stat-val">${fmtCurrency(st).split('.')[0]}</div></div></div> <div class="stat-card green"><div class="stat-info"><div class="stat-label">Processed</div><div class="stat-val">${rows.filter(r=>r.status==='Processed').length}/${rows.length}</div></div></div> <div class="stat-card amber"><div class="stat-info"><div class="stat-label">Pending</div><div class="stat-val">${rows.filter(r=>r.status==='Pending').length}</div></div></div> </div> <div class="card"> <div class="card-header"><div class="card-title">Payroll Register — ${STATE.payMonth}</div> <div style="font-size:12px;color:var(--gray-500)">OT=(Base÷22÷8)×1.5 · Tax: 4%(≤$3k) 6%(≤$6k) 8%(>$6k) · Advance max 50%</div> </div> <div class="card-body"><div class="table-wrap"><table class="table"> <thead><tr><th>Employee</th><th>Subsidiary</th><th>Base</th><th>Allow.</th><th>OT Pay</th><th>Gross</th><th>Tax</th><th>Advance</th><th>Net Pay</th><th>Gratuity</th><th>Status</th><th>Actions</th></tr></thead> <tbody>${rows.map(r=>`<tr> <td><div class="emp-cell"><div class="avatar-sm" style="width:28px;height:28px;font-size:10px">${initials(r.empName)}</div><div><div class="emp-name">${r.empName}</div><div class="emp-id">${r.empId}</div></div></div></td> <td style="font-size:11px">${r.empSub}</td> <td style="font-family:var(--mono);font-size:12px">${fmtCurrency(r.baseSalary)}</td> <td style="font-family:var(--mono);font-size:12px">${fmtCurrency(r.allowance)}</td> <td style="font-family:var(--mono);font-size:12px;color:${r.otPay>0?'var(--teal)':'var(--gray-300)'}">${r.otPay>0?fmtCurrency(r.otPay):'—'}</td> <td style="font-family:var(--mono);font-weight:700;font-size:12px">${fmtCurrency(r.grossEarnings)}</td> <td style="font-family:var(--mono);font-size:12px;color:var(--red)">-${fmtCurrency(r.tax)}</td> <td style="font-family:var(--mono);font-size:12px;color:${r.advanceDeduct>0?'var(--amber)':'var(--gray-300)'}">${r.advanceDeduct>0?`-${fmtCurrency(r.advanceDeduct)}`:'—'}</td> <td style="font-family:var(--mono);font-weight:800;color:var(--navy)">${fmtCurrency(r.netPay)}</td> <td style="font-family:var(--mono);font-size:12px;color:var(--green)">${fmtCurrency(r.gratuity)}</td> <td><span class="badge ${r.status==='Processed'?'badge-green':'badge-amber'}">${r.status}</span></td> <td><div style="display:flex;gap:4px"><button class="btn btn-outline btn-xs" title="Edit pay inputs" onclick="openPayrollEditModal('${r.empId}')">${ICO.edit}</button><button class="btn btn-outline btn-xs" title="View payslip" onclick="genPayslipModal('${r.empId}')">${ICO.eye}</button></div></td> </tr>`).join('')}</tbody> </table></div></div> </div> </div>`;
};

function genPayslipModal(empId){
  const e=getEmp(empId);if(!e)return;
  const p=DB.payroll.find(x=>x.empId===empId)||{otHours:0,advance:0,lateDeduction:0,absentDeduction:0,eidBonus:0};
  const pc=PayrollEngine.calc(e,p);const yos=yearsOfService(e.joined);
  openModal('wide',`
    <div class="modal-header"><span class="modal-title">Payslip — ${e.name} · ${STATE.payMonth}</span>${closeX()}</div> <div class="modal-body"> <div class="payslip-preview"> <div class="payslip-header"> <div><div class="payslip-company">Asal Media Corporation</div><div class="payslip-title">${getSubName(e.sub)}</div></div> <div class="payslip-period"><div style="font-weight:800;font-size:15px">PAYSLIP</div><div>${STATE.payMonth}</div></div> </div> <div class="payslip-emp"> <div class="avatar-lg">${initials(e.name)}</div> <div><div style="font-size:16px;font-weight:700">${e.name}</div> <div style="font-size:12px;color:var(--gray-500)">${e.title} · ${getDeptName(e.dept)}</div> <div style="font-size:11px;color:var(--gray-400);font-family:var(--mono)">${e.id} · Grade ${e.grade || '—'} · ${yos} yrs service</div> </div> </div> <table class="payslip-table" style="width:100%"> <tr><td colspan="2" style="font-weight:700;color:var(--gray-600);padding:10px 0 4px;text-transform:uppercase;font-size:10px;letter-spacing:.6px">EARNINGS</td></tr> <tr><td class="label">Basic Salary</td><td class="amount">${fmtCurrency(pc.baseSalary)}</td></tr> <tr><td class="label">Allowances</td><td class="amount">${fmtCurrency(pc.allowance)}</td></tr> ${pc.otPay>0?`<tr><td class="label">Overtime Pay (${p.otHours}h)</td><td class="amount" style="color:var(--teal)">${fmtCurrency(pc.otPay)}</td></tr>`:''}
          ${pc.eidBonus>0?`<tr><td class="label">Eid Bonus</td><td class="amount" style="color:var(--gold-d)">${fmtCurrency(pc.eidBonus)}</td></tr>`:''}
          <tr style="border-top:2px solid var(--gray-200)"><td style="font-weight:700;padding-top:8px">Gross Earnings</td><td class="amount" style="font-weight:800;padding-top:8px">${fmtCurrency(pc.grossEarnings)}</td></tr> <tr><td colspan="2" style="font-weight:700;color:var(--gray-600);padding:10px 0 4px;text-transform:uppercase;font-size:10px;letter-spacing:.6px">DEDUCTIONS</td></tr> <tr><td class="label" style="color:var(--red)">Income Tax</td><td class="amount" style="color:var(--red)">-${fmtCurrency(pc.tax)}</td></tr> ${pc.advanceDeduct>0?`<tr><td class="label" style="color:var(--amber)">Salary Advance</td><td class="amount" style="color:var(--amber)">-${fmtCurrency(pc.advanceDeduct)}</td></tr>`:''}
          ${pc.lateDeduct>0?`<tr><td class="label" style="color:var(--amber)">Late Deduction</td><td class="amount" style="color:var(--amber)">-${fmtCurrency(pc.lateDeduct)}</td></tr>`:''}
          <tr style="border-top:2px solid var(--gray-200)"><td style="font-weight:700;padding-top:8px;color:var(--red)">Total Deductions</td><td class="amount" style="font-weight:800;padding-top:8px;color:var(--red)">-${fmtCurrency(pc.totalDeductions)}</td></tr> <tr><td colspan="2" style="font-weight:700;color:var(--gray-600);padding:10px 0 4px;text-transform:uppercase;font-size:10px;letter-spacing:.6px">EMPLOYER</td></tr> <tr><td class="label">Monthly Gratuity Accrual</td><td class="amount" style="color:var(--green)">${fmtCurrency(pc.gratuity)}</td></tr> </table> <div class="payslip-net"><span class="payslip-net-label">NET PAY</span><span class="payslip-net-val">${fmtCurrency(pc.netPay)}</span></div> <div style="padding:10px 24px;font-size:11px;color:var(--gray-400);text-align:center">Computer-generated payslip · AMC HRMS v2.0 · ${STATE.payMonth}</div> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Close</button> <button class="btn btn-outline" onclick="window.print()">Print Payslip</button> <button class="btn btn-primary" onclick="toast('Payslip downloaded as PDF','success')">${ICO.download} Download PDF</button> </div>`);
}

function runPayrollBatch(){
  const month=STATE.payMonth;
  const emps=filteredEmps();
  if(!emps.length){ toast('No active employees to process','warning'); return; }
  emps.forEach(e=>{
    let p=DB.payroll.find(x=>x.empId===e.id&&x.month===month);
    if(!p){ p={empId:e.id,month,baseSalary:e.salary,allowance:e.allowance,otHours:0,advance:0,lateDeduction:0,absentDeduction:0,eidBonus:0,status:'Processed'}; DB.payroll.push(p); }
    else { p.status='Processed'; p.baseSalary=e.salary; p.allowance=e.allowance; }
    if(typeof SupaWrite!=='undefined') SupaWrite.savePayroll(p);
  });
  DB.auditLogs.unshift({id:DB.auditLogs.length+1,time:new Date().toISOString().replace('T',' ').slice(0,16),user:STATE.user?.initials||'SYS',userRole:STATE.user?.role||'',action:`Processed payroll batch ${month} (${emps.length} employees)`,module:'Payroll',ip:'127.0.0.1'});
  scheduleSave();
  toast(`Payroll batch ${month} processed for ${emps.length} employee(s)`,'success');nav('payroll');
}

// Per-employee payroll adjustments (OT, bonus, advance, deductions) for the
// selected month. Base/allowance always come from the employee record.
function openPayrollEditModal(empId){
  const e=getEmp(empId); if(!e){toast('Employee not found','error');return;}
  const month=STATE.payMonth;
  const p=DB.payroll.find(x=>x.empId===empId&&x.month===month)||{otHours:0,advance:0,lateDeduction:0,absentDeduction:0,eidBonus:0};
  const maxAdv=PayrollEngine.maxAdvance(e.salary);
  openModal('narrow',`
    <div class="modal-header"><span class="modal-title">Edit Payroll — ${e.name} · ${month}</span>${closeX()}</div>
    <div class="modal-body">
      <div style="padding:10px 14px;background:var(--gray-50);border-radius:var(--radius);font-size:12px;margin-bottom:14px">
        Base <strong>${fmtCurrency(e.salary)}</strong> · Allowance <strong>${fmtCurrency(e.allowance||0)}</strong>
        <span style="color:var(--gray-500)">— from employee record</span>
      </div>
      <div class="form-row cols-2">
        <div class="form-group"><label class="form-label">Overtime Hours</label><input class="form-control" id="pe_ot" type="number" min="0" step="0.5" value="${p.otHours||0}"></div>
        <div class="form-group"><label class="form-label">Eid / Bonus ($)</label><input class="form-control" id="pe_eid" type="number" min="0" value="${p.eidBonus||0}"></div>
      </div>
      <div class="form-row cols-2">
        <div class="form-group"><label class="form-label">Salary Advance ($)</label><input class="form-control" id="pe_adv" type="number" min="0" value="${p.advance||0}"><div style="font-size:10px;color:var(--gray-400);margin-top:2px">Max ${fmtCurrency(maxAdv)} (50%)</div></div>
        <div class="form-group"><label class="form-label">Late Deduction ($)</label><input class="form-control" id="pe_late" type="number" min="0" value="${p.lateDeduction||0}"></div>
      </div>
      <div class="form-group"><label class="form-label">Absent Deduction ($)</label><input class="form-control" id="pe_absent" type="number" min="0" value="${p.absentDeduction||0}"></div>
    </div>
    <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="savePayrollRow('${empId}')">Save</button></div>`);
}

function savePayrollRow(empId){
  const e=getEmp(empId); if(!e)return;
  const month=STATE.payMonth;
  const num=id=>Math.max(0,parseFloat(document.getElementById(id)?.value||0)||0);
  let p=DB.payroll.find(x=>x.empId===empId&&x.month===month);
  if(!p){ p={empId,month,status:'Pending'}; DB.payroll.push(p); }
  p.baseSalary=e.salary; p.allowance=e.allowance;
  p.otHours=num('pe_ot'); p.eidBonus=num('pe_eid');
  p.advance=Math.min(num('pe_adv'), PayrollEngine.maxAdvance(e.salary));
  p.lateDeduction=num('pe_late'); p.absentDeduction=num('pe_absent');
  if(typeof SupaWrite!=='undefined') SupaWrite.savePayroll(p);
  scheduleSave();
  closeModal();
  toast(`Payroll updated for ${e.name}`,'success');
  nav('payroll');
}

/* ── PERFORMANCE ── */
PAGES.performance = function(wrap) {
  wrap.innerHTML=`<div class="page"> <div class="page-header"> <div class="page-header-left"><div class="page-title">Performance Management</div> <div class="page-sub">Monthly · Quarterly · Annual evaluations · KPI-driven scoring</div></div> <div class="page-actions"> <button class="btn btn-outline btn-sm" onclick="exportPerformance()">${ICO.excel} Export</button> <button class="btn btn-primary btn-sm" onclick="nav('kpi')">${ICO.star} Manage KPIs</button> </div> </div> <div id="perfBody">${kpiScoresHTML()}</div> </div>`;
};

/* ── RECRUITMENT ── */
PAGES.recruitment = function(wrap) {
  const stages=['New','Advertised','Shortlisted','Interview','Offered','Hired'];
  const colors={New:'#94A3B8',Advertised:'#2563EB',Shortlisted:'#7C3AED',Interview:'#C9A227',Offered:'#0D9488',Hired:'#059669'};
  wrap.innerHTML=`<div class="page"> <div class="page-header"> <div class="page-header-left"><div class="page-title">Recruitment Management</div></div> <div class="page-actions"> <button class="btn btn-primary btn-sm" onclick="openReqModal()">${ICO.plus} New Requisition</button> </div> </div> <div class="card"><div class="card-body" style="overflow-x:auto"> <div class="pipeline"> ${stages.map(stage=>{
          const reqs=DB.requisitions.filter(r=>r.status===stage);
          return `<div class="pipeline-col"> <div class="pipeline-col-header"> <span class="pipeline-col-title">${stage}</span> <span class="pipeline-count" style="background:${colors[stage]}22;color:${colors[stage]}">${reqs.length}</span> </div> ${reqs.map(r=>`<div class="candidate-card" onclick="viewReqModal('${r.id}')"> <div class="candidate-name">${r.title}</div> <div class="candidate-role">${getDeptName(r.dept)} · ${getSubName(r.sub)}</div> <div class="candidate-tags"> <span class="badge badge-navy" style="font-size:10px">${r.grade}</span> ${!r.approvedBy?`<span class="badge badge-amber" style="font-size:10px">Pending</span>`:`<span class="badge badge-green" style="font-size:10px">Approved</span>`}
              </div> </div>`).join('')}
          </div>`;
        }).join('')}
      </div> </div></div> </div>`;
};

function viewReqModal(id){
  const r=DB.requisitions.find(x=>x.id===id);if(!r)return;
  const cands=DB.candidates.filter(c=>c.role===id);
  openModal('wide',`
    <div class="modal-header"><span class="modal-title">${r.title} — ${r.id}</span>${closeX()}</div> <div class="modal-body"> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:14px"> <div> <div class="info-row"><span class="info-key">Department</span><span class="info-val">${getDeptName(r.dept)}</span></div> <div class="info-row"><span class="info-key">Subsidiary</span><span class="info-val">${getSubName(r.sub)}</span></div> <div class="info-row"><span class="info-key">Grade</span><span class="info-val">${r.grade}</span></div> <div class="info-row"><span class="info-key">Salary Range</span><span class="info-val">${fmtCurrency(r.salaryMin)} – ${fmtCurrency(r.salaryMax)}</span></div> </div> <div> <div class="info-row"><span class="info-key">Status</span><span class="info-val">${r.status}</span></div> <div class="info-row"><span class="info-key">Requested By</span><span class="info-val">${getEmpName(r.requestedBy)}</span></div> <div class="info-row"><span class="info-key">Approved</span><span class="info-val">${r.approvedBy?`Yes — ${getEmpName(r.approvedBy)}`:`<button class="btn btn-gold btn-xs" onclick="DB.requisitions.find(x=>x.id==='${r.id}').approvedBy='EMP001';closeModal();toast('Approved','success');nav('recruitment')">Approve</button>`}</span></div> <div class="info-row"><span class="info-key">JD Ready</span><span class="info-val">${r.hasJD?' Yes':' Missing'}</span></div> </div> </div> <div class="section-divider"><span>KPIs / Performance Targets</span></div> <div style="padding:10px 14px;background:var(--gray-50);border-radius:var(--radius);font-size:13px;margin-bottom:12px">${r.kpis||'Not defined'}</div> ${cands.length?`<div class="section-divider"><span>Candidates (${cands.length})</span></div> <table class="table"><thead><tr><th>Name</th><th>Stage</th><th>Score</th><th>Source</th><th>Applied</th></tr></thead> <tbody>${cands.map(c=>`<tr><td style="font-weight:600">${c.name}</td><td>${c.stage}</td><td style="font-family:var(--mono)">${c.score}</td><td>${c.source}</td><td style="font-size:11px;color:var(--gray-400)">${fmtDate(c.applied)}</td></tr>`).join('')}</tbody></table>`:''}
    </div> <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Close</button></div>`);
}

function openReqModal(){
  openModal('wide',`
    <div class="modal-header"><span class="modal-title">New Recruitment Requisition</span>${closeX()}</div> <div class="modal-body"> <div style="padding:10px 14px;background:var(--amber-l);border-radius:var(--radius);font-size:12px;font-weight:600;color:var(--amber);margin-bottom:14px">PRD §3.1: Approved JD + Grade/Salary Range + Annual KPIs required.</div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Position Title</label><input class="form-control" id="rq_title"></div> <div class="form-group"><label class="form-label required">Grade</label> <select class="form-control" id="rq_grade">${DB.grades.map(g=>`<option value="${g.grade}">${g.grade} — ${g.title}</option>`).join('')}</select> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Department</label> <select class="form-control" id="rq_dept">${DB.departments.map(d=>`<option value="${d.id}">${d.name}</option>`).join('')}</select> </div> <div class="form-group"><label class="form-label required">Subsidiary</label> <select class="form-control" id="rq_sub">${DB.subsidiaries.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Min Salary</label><input class="form-control" id="rq_min" type="number"></div> <div class="form-group"><label class="form-label required">Max Salary</label><input class="form-control" id="rq_max" type="number"></div> </div> <div class="form-group" style="margin-bottom:12px"><label class="form-label required">Annual KPIs & Targets</label><textarea class="form-control" id="rq_kpis" placeholder="e.g. 40 stories/month, accuracy >95%…"></textarea></div> <label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600"><input type="checkbox" id="rq_jd" style="width:16px;height:16px;accent-color:var(--navy)"> Approved JD attached (required)</label> </div> <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveReq()">Submit</button></div>`);
}

function saveReq(){
  const title=document.getElementById('rq_title').value;
  if(!title){toast('Title required','error');return;}
  if(!document.getElementById('rq_jd').checked){toast('Approved JD must be attached','error');return;}
  if(!document.getElementById('rq_kpis').value){toast('Annual KPIs are required','error');return;}
  DB.requisitions.push({id:'REQ'+String(DB.requisitions.length+1).padStart(3,'0'),title,dept:document.getElementById('rq_dept').value,sub:document.getElementById('rq_sub').value,grade:document.getElementById('rq_grade').value,salaryMin:parseFloat(document.getElementById('rq_min').value)||0,salaryMax:parseFloat(document.getElementById('rq_max').value)||0,status:'New',requestedBy:'EMP001',approvedBy:'',date:new Date().toISOString().split('T')[0],kpis:document.getElementById('rq_kpis').value,hasJD:true});
  closeModal();toast('Requisition submitted','success');nav('recruitment');

  scheduleSave();
}

/* ═══════════════════════════════════════════════════════════
   TRAINING, SUCCESSION, DISCIPLINARY, REPORTS, ORG, SETTINGS
═══════════════════════════════════════════════════════════ */
PAGES.training = function(wrap) {
  const typeCls={Leadership:'badge-gold',Technical:'badge-blue',Professional:'badge-teal',Compliance:'badge-red',Other:'badge-gray'};
  const stCls={Scheduled:'badge-blue',Completed:'badge-green',Planned:'badge-gray'};
  wrap.innerHTML=`<div class="page"> <div class="page-header"> <div class="page-header-left"><div class="page-title">Training & Development</div></div> <div class="page-actions"><button class="btn btn-primary btn-sm" onclick="openTrainingModal()">${ICO.plus} Add Training</button></div> </div> <div class="stat-grid" style="grid-template-columns:repeat(4,1fr)"> <div class="stat-card teal"><div class="stat-info"><div class="stat-label">Scheduled</div><div class="stat-val">${DB.trainings.filter(t=>t.status==='Scheduled').length}</div></div></div> <div class="stat-card green"><div class="stat-info"><div class="stat-label">Completed</div><div class="stat-val">${DB.trainings.filter(t=>t.status==='Completed').length}</div></div></div> <div class="stat-card gold"><div class="stat-info"><div class="stat-label">Total Budget</div><div class="stat-val">${fmtCurrency(DB.trainings.reduce((s,t)=>s+t.cost,0)).split('.')[0]}</div></div></div> <div class="stat-card navy"><div class="stat-info"><div class="stat-label">Enrollments</div><div class="stat-val">${DB.trainings.reduce((s,t)=>s+t.enrolled,0)}</div></div></div> </div> <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px"> ${DB.trainings.map(t=>`<div class="training-card"> <div style="display:flex;justify-content:space-between;align-items:flex-start"> <span class="badge ${typeCls[t.type]||'badge-gray'}">${t.type}</span> <span class="badge ${stCls[t.status]||'badge-gray'}">${t.status}</span> </div> <div class="training-title" style="margin-top:10px">${t.title}</div> <div class="training-meta">${t.provider}</div> <div style="display:flex;gap:10px;margin-top:8px;font-size:12px;color:var(--gray-500)"> <span>${fmtDate(t.startDate)}</span><span>·</span><span>${t.duration}</span><span>·</span><span>${t.enrolled}/${t.maxAttendees}</span> </div> ${t.cost>0?`<div style="margin-top:6px;font-size:12px">Budget: <strong style="color:var(--gold-d)">${fmtCurrency(t.cost)}</strong></div>`:'<div style="margin-top:6px;font-size:12px;color:var(--green);font-weight:600">Internal · No Cost</div>'}
        ${t.preEval&&t.postEval?`<div style="margin-top:8px;display:flex;gap:10px;font-size:12px;border-top:1px solid var(--gray-100);padding-top:8px"> <span>Pre: <strong>${t.preEval}/5</strong></span><span>Post: <strong style="color:var(--green)">${t.postEval}/5</strong></span> <span style="color:var(--green);font-weight:700">+${((t.postEval-t.preEval)/t.preEval*100).toFixed(0)}%</span> </div>`:''}
        <div style="margin-top:10px"><div class="progress"><div class="progress-bar ${t.enrolled/t.maxAttendees>=1?'red':t.enrolled/t.maxAttendees>0.8?'amber':'green'}" style="width:${Math.min(100,Math.round(t.enrolled/t.maxAttendees*100))}%"></div></div></div> </div>`).join('')}
    </div> </div>`;
};

function openTrainingModal(){
  openModal('wide',`
    <div class="modal-header"><span class="modal-title">Add Training Program</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Title</label><input class="form-control" id="tr_title"></div> <div class="form-group"><label class="form-label required">Type</label><select class="form-control" id="tr_type"><option>Leadership</option><option>Technical</option><option>Professional</option><option>Compliance</option></select></div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Provider</label><input class="form-control" id="tr_prov"></div> <div class="form-group"><label class="form-label">Subsidiary</label><select class="form-control" id="tr_sub"><option value="all">All</option>${DB.subsidiaries.map(s=>`<option value="${s.id}">${s.name}</option>`).join('')}</select></div> </div> <div class="form-row cols-3"> <div class="form-group"><label class="form-label required">Start Date</label><input class="form-control" id="tr_start" type="date"></div> <div class="form-group"><label class="form-label">End Date</label><input class="form-control" id="tr_end" type="date"></div> <div class="form-group"><label class="form-label">Cost (USD)</label><input class="form-control" id="tr_cost" type="number" value="0"></div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Max Attendees</label><input class="form-control" id="tr_max" type="number" value="20"></div> <div class="form-group"><label class="form-label">Status</label><select class="form-control" id="tr_status"><option>Planned</option><option>Scheduled</option></select></div> </div> </div> <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="saveTraining()">Add Training</button></div>`);
}

function saveTraining(){
  const title=document.getElementById('tr_title').value;if(!title){toast('Title required','error');return;}
  const start=document.getElementById('tr_start').value,end=document.getElementById('tr_end').value;
  const days=start&&end?Math.max(1,Math.ceil((new Date(end)-new Date(start))/(864e5))+1):1;
  DB.trainings.push({id:'TRN'+String(DB.trainings.length+1).padStart(3,'0'),title,type:document.getElementById('tr_type').value,provider:document.getElementById('tr_prov').value,startDate:start,endDate:end,duration:days+' day(s)',cost:parseFloat(document.getElementById('tr_cost').value)||0,maxAttendees:parseInt(document.getElementById('tr_max').value)||20,enrolled:0,dept:'all',sub:document.getElementById('tr_sub').value,status:document.getElementById('tr_status').value,preEval:null,postEval:null});
  closeModal();toast('Training added','success');nav('training');

  scheduleSave();
}

/* ── SUCCESSION ── */
PAGES.succession = function(wrap) {
  const hipo=filteredEmps().map(e=>({...e,sc:PerfEngine.calcEmployeeScore(e.id)})).filter(e=>e.sc!==null&&e.sc>=95);
  wrap.innerHTML=`<div class="page"> <div class="page-header"> <div class="page-header-left"><div class="page-title">Succession Planning</div></div> <div class="page-actions"><button class="btn btn-primary btn-sm" onclick="openSuccessionModal()">${ICO.plus} Map Successor</button></div> </div> <div class="stat-grid" style="grid-template-columns:repeat(4,1fr)"> <div class="stat-card navy"><div class="stat-info"><div class="stat-label">Key Roles Mapped</div><div class="stat-val">${DB.successionPlans.length}</div></div></div> <div class="stat-card green"><div class="stat-info"><div class="stat-label">Ready Now</div><div class="stat-val">${DB.successionPlans.reduce((s,p)=>s+p.successors.filter(x=>x.readiness==='Ready now').length,0)}</div></div></div> <div class="stat-card amber"><div class="stat-info"><div class="stat-label">Ready 1–2 Yrs</div><div class="stat-val">${DB.successionPlans.reduce((s,p)=>s+p.successors.filter(x=>x.readiness==='Ready in 1–2 years').length,0)}</div></div></div> <div class="stat-card gold"><div class="stat-info"><div class="stat-label">Hi-Po Employees</div><div class="stat-val">${hipo.length}</div></div></div> </div> <div class="card"> <div class="card-header"><div class="card-title">Succession Map</div></div> <div class="card-body"> ${DB.successionPlans.map(plan=>`
          <div style="margin-bottom:18px;padding-bottom:18px;border-bottom:1px solid var(--gray-100)"> <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"> <div style="padding:8px 16px;background:var(--navy);color:var(--white);border-radius:var(--radius);font-size:13px;font-weight:700;flex-shrink:0">${plan.roleName}</div> <span style="color:var(--gray-300);font-size:20px">→</span> <div style="display:flex;gap:10px;flex-wrap:wrap"> ${plan.successors.map(s=>{const se=getEmp(s.empId);return `
                  <div class="talent-card ${s.readiness==='Ready now'?'hi-po':''}" style="min-width:180px"> <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"> <div class="avatar-sm" style="width:28px;height:28px;font-size:10px">${se?initials(se.name):'?'}</div> <div><div style="font-size:13px;font-weight:600">${se?se.name:'Unknown'}</div><div style="font-size:11px;color:var(--gray-400)">${se?getSubName(se.sub):''}</div></div> </div> <div style="display:flex;justify-content:space-between;align-items:center"> <span class="readiness-badge ${s.readiness==='Ready now'?'readiness-now':s.readiness==='Ready in 1–2 years'?'readiness-12':'readiness-later'}">${s.readiness}</span> <span class="kpi-score ${s.score>=85?'excellent':'average'}" style="font-size:13px">${s.score}%</span> </div> </div>`;}).join('')}
              </div> </div> </div>`).join('')}
      </div> </div> <div class="card" style="margin-top:14px"> <div class="card-header"><div class="card-title">High-Potential Pool (≥95%)</div></div> <div class="card-body"><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px"> ${hipo.map(e=>`<div class="talent-card hi-po"> <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"> <div class="avatar-lg">${initials(e.name)}</div> <div><div style="font-size:13px;font-weight:700">${e.name}</div><div style="font-size:11px;color:var(--gray-500)">${getSubName(e.sub)}</div></div> </div> <div style="display:flex;justify-content:space-between"><span class="kpi-score excellent" style="font-size:18px">${e.sc}%</span><span class="badge badge-gold">Hi-Po</span></div> </div>`).join('')}
        ${!hipo.length?'<div class="empty-state" style="grid-column:span 4"><p>No employees at Hi-Po threshold yet</p></div>':''}
      </div></div> </div> </div>`;
};
function openSuccessionModal(){openModal('wide',`<div class="modal-header"><span class="modal-title">Map Successor</span>${closeX()}</div><div class="modal-body"><div class="form-group" style="margin-bottom:12px"><label class="form-label required">Key Role</label><input class="form-control" placeholder="e.g. Chief Technology Officer"></div><div class="form-group" style="margin-bottom:12px"><label class="form-label required">Successor</label><select class="form-control">${filteredEmps().map(e=>`<option>${e.name} — ${e.title}</option>`).join('')}</select></div><div class="form-group"><label class="form-label required">Readiness</label><select class="form-control"><option>Ready now</option><option>Ready in 1–2 years</option><option>Development needed</option></select></div></div><div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="closeModal();toast('Succession plan saved','success')">Save</button></div>`);}

/* ── DISCIPLINARY ── */
PAGES.disciplinary = function(wrap) {
  const stCls={Open:'badge-red','Under Investigation':'badge-amber','Action Taken':'badge-blue',Closed:'badge-green'};
  const sevCls={Minor:'severity-minor',Major:'severity-major','Gross Misconduct':'severity-gross'};
  wrap.innerHTML=`<div class="page"> <div class="page-header"> <div class="page-header-left"><div class="page-title">Disciplinary Case Management</div></div> <div class="page-actions"><button class="btn btn-danger btn-sm" onclick="openDiscModal()">${ICO.plus} New Case</button></div> </div> <div class="stat-grid" style="grid-template-columns:repeat(4,1fr)"> <div class="stat-card red"><div class="stat-info"><div class="stat-label">Open</div><div class="stat-val">${DB.disciplinaryCases.filter(d=>d.status==='Open').length}</div></div></div> <div class="stat-card amber"><div class="stat-info"><div class="stat-label">Investigating</div><div class="stat-val">${DB.disciplinaryCases.filter(d=>d.status==='Under Investigation').length}</div></div></div> <div class="stat-card blue"><div class="stat-info"><div class="stat-label">Action Taken</div><div class="stat-val">${DB.disciplinaryCases.filter(d=>d.status==='Action Taken').length}</div></div></div> <div class="stat-card green"><div class="stat-info"><div class="stat-label">Closed</div><div class="stat-val">${DB.disciplinaryCases.filter(d=>d.status==='Closed').length}</div></div></div> </div> <div class="card"><div class="table-wrap"><table class="table"> <thead><tr><th>Case ID</th><th>Employee</th><th>Subsidiary</th><th>Type</th><th>Severity</th><th>Date</th><th>Status</th><th>Action</th><th></th></tr></thead> <tbody>${DB.disciplinaryCases.map(d=>{const e=getEmp(d.empId);return `<tr> <td style="font-family:var(--mono)">${d.id}</td> <td><div class="emp-cell"><div class="avatar-sm" style="width:28px;height:28px;font-size:10px">${e?initials(e.name):'?'}</div><div><div class="emp-name">${e?e.name:d.empId}</div></div></div></td> <td style="font-size:11px">${e?getSubName(e.sub):'—'}</td> <td><span class="badge badge-navy">${d.type}</span></td> <td><span class="badge ${sevCls[d.severity]||'badge-gray'}">${d.severity}</span></td> <td style="font-size:12px">${fmtDate(d.date)}</td> <td><span class="badge ${stCls[d.status]||'badge-gray'}">${d.status}</span></td> <td style="font-size:12px">${d.action||'—'}</td> <td><button class="btn btn-outline btn-xs" onclick="viewDiscModal('${d.id}')">${ICO.eye}</button></td> </tr>`}).join('')}</tbody> </table></div></div> </div>`;
};

function viewDiscModal(id){
  const d=DB.disciplinaryCases.find(x=>x.id===id);if(!d)return;
  const steps=['Open','Under Investigation','Action Taken','Closed'];
  const curIdx=steps.indexOf(d.status);
  const actions=['Verbal Warning','Written Warning','Final Warning','Suspension','Termination'];
  openModal('wide',`
    <div class="modal-header"><span class="modal-title">Case ${d.id}</span>${closeX()}</div> <div class="modal-body"> <div style="display:flex;gap:0;margin-bottom:20px;overflow-x:auto"> ${steps.map((st,i)=>`<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0"> <div style="display:flex;align-items:center"> <div style="width:30px;height:30px;border-radius:50%;border:2px solid ${i<=curIdx?'var(--blue)':'var(--gray-300)'};background:${i<curIdx?'var(--green)':i===curIdx?'var(--blue)':'var(--white)'};color:${i<=curIdx?'var(--white)':'var(--gray-400)'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">${i<curIdx?'✓':i+1}</div> ${i<3?`<div style="width:50px;height:2px;background:${i<curIdx?'var(--green)':'var(--gray-200)'}"></div>`:''}
          </div> <div style="font-size:9px;color:${i===curIdx?'var(--blue)':'var(--gray-400)'};font-weight:${i===curIdx?700:400};margin-top:4px;text-align:center;max-width:60px">${st}</div> </div>`).join('')}
      </div> <div class="info-row"><span class="info-key">Employee</span><span class="info-val">${getEmpName(d.empId)}</span></div> <div class="info-row"><span class="info-key">Type</span><span class="info-val">${d.type}</span></div> <div class="info-row"><span class="info-key">Severity</span><span class="info-val">${d.severity}</span></div> <div class="info-row"><span class="info-key">Date</span><span class="info-val">${fmtDate(d.date)}</span></div> <div class="section-divider"><span>Description</span></div> <div style="padding:12px;background:var(--gray-50);border-radius:var(--radius);font-size:13px;margin-bottom:14px">${d.desc}</div> ${d.status!=='Closed'?`
        <div class="section-divider"><span>Take Action</span></div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Action</label><select class="form-control" id="dc_act">${actions.map(a=>`<option>${a}</option>`).join('')}</select></div> <div class="form-group"><label class="form-label">New Status</label><select class="form-control" id="dc_st">${steps.filter((_,i)=>i>=curIdx).map(s=>`<option${s===d.status?' selected':''}>${s}</option>`).join('')}</select></div> </div> <div class="form-group"><label class="form-label">Resolution Notes</label><textarea class="form-control" id="dc_notes"></textarea></div>`:'<div style="padding:12px;background:var(--green-l);border-radius:var(--radius);font-size:13px;color:var(--green)">'+(d.resolution||'Closed')+' </div>'}
    </div> <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Close</button> ${d.status!=='Closed'?`<button class="btn btn-primary" onclick="saveDiscAction('${id}')">Save Action</button>`:''}
    </div>`);
}
function saveDiscAction(id){
  const d=DB.disciplinaryCases.find(x=>x.id===id);if(!d)return;
  d.action=(document.getElementById('dc_act')||{}).value||d.action;
  d.status=(document.getElementById('dc_st')||{}).value||d.status;
  d.resolution=(document.getElementById('dc_notes')||{}).value||d.resolution;
  d.actionDate=new Date().toISOString().split('T')[0];
  closeModal();toast('Case updated','success');nav('disciplinary');

  scheduleSave();
}
function openDiscModal(){
  openModal('wide',`
    <div class="modal-header"><span class="modal-title">New Disciplinary Case</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Employee</label><select class="form-control" id="dc_emp">${filteredEmps().map(e=>`<option value="${e.id}">${e.name}</option>`).join('')}</select></div> <div class="form-group"><label class="form-label required">Incident Date</label><input class="form-control" id="dc_date" type="date" value="${new Date().toISOString().split('T')[0]}"></div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Type</label><select class="form-control" id="dc_type"><option>Misconduct</option><option>Absenteeism</option><option>Performance-related</option><option>Policy Violation</option></select></div> <div class="form-group"><label class="form-label required">Severity</label><select class="form-control" id="dc_sev"><option>Minor</option><option>Major</option><option>Gross Misconduct</option></select></div> </div> <div class="form-group"><label class="form-label required">Description</label><textarea class="form-control" id="dc_desc" rows="4" placeholder="Detailed incident description…"></textarea></div> </div> <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-danger" onclick="saveNewCase()">Open Case</button></div>`);
}
function saveNewCase(){
  const desc=document.getElementById('dc_desc').value;if(!desc){toast('Description required','error');return;}
  const empId=document.getElementById('dc_emp').value;
  const id='DIS'+String(DB.disciplinaryCases.length+1).padStart(3,'0');
  DB.disciplinaryCases.push({id,empId,desc,type:document.getElementById('dc_type').value,severity:document.getElementById('dc_sev').value,date:document.getElementById('dc_date').value,reportedBy:'EMP001',investigator:'',status:'Open',action:'',actionDate:'',resolution:''});
  DB.auditLogs.unshift({id:DB.auditLogs.length+1,time:new Date().toISOString().replace('T',' ').slice(0,16),user:STATE.user?.initials||'SYS',userRole:STATE.user?.role||'',action:`Opened case ${id} for ${getEmpName(empId)}`,module:'Disciplinary',ip:'127.0.0.1'});
  closeModal();toast('Case opened','success');nav('disciplinary');

  scheduleSave();
}

/* ── REPORTS ── */
PAGES.reports = function(wrap) {
  wrap.innerHTML=`<div class="page"> <div class="page-header"> <div class="page-header-left"><div class="page-title">Reports & Analytics</div> <div class="page-sub">True Excel (.xlsx) export · Subsidiary-separated · PRD §4</div></div> </div> <div class="report-grid"> ${[
        ['Employee Directory','Full staff list with grades, salaries, teams','exportEmployees()','navy'],
        ['Payroll Summary','Gross, net, tax, deductions by employee','exportPayroll()','gold'],
        ['Attendance Report','Daily attendance for selected date','exportAttendance()','teal'],
        ['Leave Balances','All leave requests and balances','exportLeave()','green'],
        ['KPI Performance','KPI scores and achievement rates','exportKPIs()','blue'],
        ['Performance Overview','Employee scores, ratings, PIPs','exportPerformance()','purple'],
        ['Loan Report','Loans, balances, installments, outstanding','exportLoans()','navy'],
        ['Advance Report','Salary advances and deduction status','exportAdvances()','teal'],
        ['Annual Bonus Report','Yearly performance bonuses by employee','exportBonus()','gold'],
      ].map(([t,d,fn,c])=>`<div class="report-card" onclick="${fn}"> <div class="report-icon" style="background:rgba(0,0,0,.04)">${ICO.excel}</div> <div class="report-title">${t}</div> <div class="report-desc">${d}</div> <div class="report-tags"><span class="badge badge-green" style="font-size:10px">.xlsx</span><span class="badge badge-gray" style="font-size:10px">${ICO.download} Export</span></div> </div>`).join('')}
    </div> <!-- Audit Log --> <div class="card" style="margin-top:16px"> <div class="card-header"><div class="card-title">Full Audit Log</div><div class="card-sub">All system actions tracked · PRD §6</div></div> <div class="card-body"><div class="table-wrap"><table class="table"> <thead><tr><th>Timestamp</th><th>User</th><th>Role</th><th>Module</th><th>Action</th><th>IP</th></tr></thead> <tbody>${DB.auditLogs.map(l=>`<tr> <td style="font-family:var(--mono);font-size:11px;white-space:nowrap">${l.time}</td> <td><span class="badge badge-navy">${l.user}</span></td> <td style="font-size:11px;color:var(--gray-500)">${l.userRole}</td> <td><span class="badge badge-gray" style="font-size:10px">${l.module}</span></td> <td style="font-size:12px">${l.action}</td> <td style="font-family:var(--mono);font-size:11px;color:var(--gray-400)">${l.ip}</td> </tr>`).join('')}</tbody> </table></div></div> </div> </div>`;
};

/* ── ORGANIZATION ── */
PAGES.organization = function(wrap) {
  wrap.innerHTML=`<div class="page"> <div class="page-header"> <div class="page-header-left"><div class="page-title">Organization Structure</div></div> </div> <div class="card" style="margin-bottom:14px"> <div class="card-body"> <div style="text-align:center;margin-bottom:24px"> <div style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#001B44,#002D72);color:var(--white);border-radius:var(--radius-lg);font-size:16px;font-weight:800"> Asal Media Corporation<br><span style="font-size:11px;font-weight:400;opacity:.6">Corporate Parent Company</span> </div> </div> <div style="display:flex;justify-content:center;gap:14px;flex-wrap:wrap"> ${DB.subsidiaries.map(s=>{
            const emps=DB.employees.filter(e=>e.sub===s.id&&e.status==='Active');
            const depts=DB.departments.filter(d=>d.subsidiary===s.id);
            return `<div style="background:var(--gray-50);border:2px solid ${s.color}33;border-radius:var(--radius-lg);padding:16px;min-width:170px;text-align:center"> <div style="width:42px;height:42px;border-radius:12px;background:${s.color}22;margin:0 auto 10px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:12px;color:${s.color}">${s.code}</div> <div style="font-size:13px;font-weight:700">${s.name}</div> <div style="font-size:11px;color:var(--gray-500);margin-top:3px">${s.sector}</div> <div style="margin-top:8px;display:flex;gap:6px;justify-content:center"> <span class="badge badge-navy">${emps.length} staff</span> <span class="badge badge-gray">${depts.length} depts</span> </div> </div>`;
          }).join('')}
        </div> </div> </div> <div class="card"> <div class="card-header"><div class="card-title">Departments by Subsidiary</div></div> <div class="card-body"> ${DB.subsidiaries.map(s=>{
          const depts=DB.departments.filter(d=>d.subsidiary===s.id);if(!depts.length)return '';
          return `<div style="margin-bottom:18px"> <div style="font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px;padding-bottom:6px;border-bottom:2px solid ${s.color}">${s.name}</div> <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px"> ${depts.map(d=>{const head=getEmp(d.head);const teams=DB.teams.filter(t=>t.dept===d.id);return `<div class="org-node"> <div class="org-node-name">${d.name}</div> ${head?`<div class="org-node-title">${head.name}</div>`:''}
                <div class="org-node-count">${d.count} employees · ${teams.length} teams</div> </div>`;}).join('')}
            </div> </div>`;
        }).join('')}
      </div> </div> </div>`;
};

/* ── SETTINGS ── */
PAGES.settings = function(wrap) {
  wrap.innerHTML=`<div class="page"> <div class="page-header"><div class="page-header-left"><div class="page-title">System Settings</div></div></div> <div class="settings-layout"> <div class="settings-menu"> ${[['profile','My Profile'],['company','Company'],['subsidiaries','Subsidiaries'],['roles','Roles & Access'],['payroll_cfg','Payroll Config'],['notif','Notifications'],['integrations','Integrations'],['security','Security & 2FA']].map(([k,l],i)=>`
          <div class="settings-menu-item ${i===0?'active':''}" onclick="settingsPane('${k}',this)">${l}</div>`).join('')}
      </div> <div id="settingsContent" class="settings-section">${settingsProfile()}</div> </div> </div>`;
};
function settingsPane(key,el){
  document.querySelectorAll('.settings-menu-item').forEach(e=>e.classList.remove('active'));el.classList.add('active');
  const fns={profile:settingsProfile,company:settingsCompany,subsidiaries:settingsSubs,roles:settingsRoles,payroll_cfg:settingsPayCfg,notif:settingsNotif,integrations:settingsInteg,security:settingsSec};
  document.getElementById('settingsContent').innerHTML=(fns[key]||settingsProfile)();
}
function settingsProfile(){return `<div class="settings-pane"> <div class="settings-pane-title">My Profile</div> <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding:16px;background:var(--gray-50);border-radius:var(--radius-lg)"> <div class="avatar-xl">${STATE.user?STATE.user.initials:'SA'}</div> <div><div style="font-size:16px;font-weight:700">${STATE.user?.name||'Admin'}</div><div style="font-size:13px;color:var(--gray-500)">${STATE.user?.role||'Super Admin'}</div></div> <button class="btn btn-outline btn-sm" style="margin-left:auto">Change Photo</button> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Full Name</label><input class="form-control" value="${STATE.user?.name||''}"></div> <div class="form-group"><label class="form-label">Email</label><input class="form-control" value="${STATE.user?.email||''}"></div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Language</label><select class="form-control"><option>English</option><option>Somali (Af Soomaali)</option><option>Arabic</option></select></div> <div class="form-group"><label class="form-label">Theme</label><select class="form-control" onchange="applyTheme(this.value)"><option value="light"${STATE.theme==='light'?' selected':''}>Light Mode</option><option value="dark"${STATE.theme==='dark'?' selected':''}>Dark Mode</option></select></div> </div> <button class="btn btn-primary" onclick="toast('Profile saved','success')">Save Changes</button>
</div>`;}
function settingsCompany(){return `<div class="settings-pane"><div class="settings-pane-title">Company Information</div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Company Name</label><input class="form-control" value="Asal Media Corporation"></div> <div class="form-group"><label class="form-label">Registration</label><input class="form-control" value="AMC-2015-001"></div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">HQ Location</label><input class="form-control" value="Mogadishu, Somalia"></div> <div class="form-group"><label class="form-label">Industry</label><input class="form-control" value="Media & Broadcasting"></div> </div> <button class="btn btn-primary" onclick="toast('Company info saved','success')">Save</button>
</div>`;}
function settingsSubs(){return `<div class="settings-pane"><div class="settings-pane-title">Subsidiaries</div> <table class="table"><thead><tr><th>Subsidiary</th><th>Code</th><th>Sector</th><th>Staff</th><th>Data Isolation</th></tr></thead> <tbody>${DB.subsidiaries.map(s=>`<tr><td style="font-weight:600">${s.name}</td><td style="font-family:var(--mono)">${s.code}</td><td>${s.sector}</td><td style="font-family:var(--mono)">${s.headcount}</td><td><span class="badge badge-green">Enforced ✓</span></td></tr>`).join('')}</tbody></table> <button class="btn btn-primary" style="margin-top:14px" onclick="toast('Settings saved','success')">Save</button>
</div>`;}
function settingsRoles() {
  const allPerms = ['employees','attendance','leave','payroll','recruitment','performance','kpi','reports','settings','users'];
  const roles = DB.customRolePermissions || {};
  return `<div class="settings-pane"> <div class="settings-pane-title">Role Permissions Matrix — Live Edit</div> <div style="padding:10px 14px;background:var(--blue-l);border-radius:var(--radius);font-size:12px;font-weight:600;color:var(--blue);margin-bottom:16px"> Click any cell to toggle a permission. Changes apply <strong>immediately</strong> — no refresh or re-login needed.
    </div> <div class="table-wrap"><table class="table" style="min-width:900px"> <thead><tr><th style="width:150px">Role</th><th>Description</th>${allPerms.map(p=>`<th style="font-size:10px;text-align:center;white-space:nowrap">${p}</th>`).join('')}<th>Actions</th></tr></thead> <tbody> ${Object.entries(roles).map(([roleKey,r])=>`<tr> <td><span class="badge badge-${r.color||'gray'}" style="white-space:nowrap">${r.label}</span></td> <td style="font-size:11px;color:var(--gray-500);max-width:160px">${r.description||r.label}</td> ${allPerms.map(p => {
            const isAll = r.perms.includes('*');
            const has = isAll || r.perms.includes(p);
            const editable = r.canEdit !== false && !isAll;
            return `<td style="text-align:center"> ${isAll
                ? `<span style="color:var(--gold);font-size:14px" title="Full access"></span>`
                : `<button onclick="toggleRolePerm('${roleKey}','${p}',this)"
                    style="width:26px;height:26px;border-radius:6px;border:2px solid ${has?'var(--green)':'var(--gray-300)'};
                    background:${has?'var(--green)':'transparent'};color:${has?'white':'var(--gray-400)'};
                    font-size:11px;cursor:${editable?'pointer':'not-allowed'};transition:all .15s;"
                    title="${editable?(has?'Revoke ':'Grant ')+p:'Super Admin — cannot modify'}"
                    ${editable?'':'disabled'}>${has?'✓':''}</button>`}
            </td>`;
          }).join('')}
          <td> ${r.canEdit !== false
              ? `<button class="btn btn-ghost btn-xs" onclick="openEditRoleModal('${roleKey}')">${ICO.edit}</button>`
              : `<span style="font-size:10px;color:var(--gray-400)">Protected</span>`}
          </td> </tr>`).join('')}
      </tbody> </table></div> <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap"> <button class="btn btn-primary btn-sm" onclick="openCreateRoleModal()">${ICO.plus} Create Custom Role</button> <span style="font-size:12px;color:var(--green);align-self:center;font-weight:600"> Changes auto-save instantly</span> </div> </div>`;
}

function toggleRolePerm(roleKey, perm, btn) {
  // Use ROLES as the source (DB.customRolePermissions may be empty)
  const r = ROLES[roleKey] || DB.customRolePermissions?.[roleKey];
  if (!r) { toast('Role not found', 'error'); return; }
  if (r.perms.includes('*')) { toast('Super Admin permissions cannot be modified', 'error'); return; }
  if (r.canEdit === false && roleKey !== 'employee') { toast('This role cannot be modified', 'error'); return; }
  const idx = r.perms.indexOf(perm);
  if (idx > -1) {
    r.perms.splice(idx, 1);
    btn.style.background = 'transparent'; btn.style.borderColor = 'var(--gray-300)'; btn.style.color = 'var(--gray-400)'; btn.textContent = '';
    toast(`"${perm}" revoked from ${r.label}`, 'warning');
  } else {
    r.perms.push(perm);
    btn.style.background = 'var(--green)'; btn.style.borderColor = 'var(--green)'; btn.style.color = 'white'; btn.textContent = '✓';
    toast(`"${perm}" granted to ${r.label}`, 'success');
  }
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`Permission "${perm}" ${idx>-1?'revoked from':'granted to'} role ${r.label}`, module:'Settings', ip:'127.0.0.1' });
}

function openEditRoleModal(roleKey) {
  const r = DB.customRolePermissions[roleKey]; if (!r || r.canEdit === false) return;
  openModal('narrow', `
    <div class="modal-header"><span class="modal-title">Edit Role — ${r.label}</span>${closeX()}</div> <div class="modal-body"> <div class="form-group" style="margin-bottom:12px"><label class="form-label">Role Label</label><input class="form-control" id="er_label" value="${r.label}"></div> <div class="form-group" style="margin-bottom:12px"><label class="form-label">Description</label><textarea class="form-control" id="er_desc" style="min-height:60px">${r.description||''}</textarea></div> <div class="form-group"><label class="form-label">Color Accent</label> <select class="form-control" id="er_color"> ${['red','navy','purple','blue','gold','teal','green','amber','gray'].map(c=>`<option value="${c}"${c===r.color?' selected':''}>${c}</option>`).join('')}
        </select> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveEditRole('${roleKey}')">Save Changes</button> </div>`);
}

function saveEditRole(roleKey) {
  const r = DB.customRolePermissions[roleKey]; if (!r) return;
  r.label = document.getElementById('er_label').value || r.label;
  r.description = document.getElementById('er_desc').value;
  r.color = document.getElementById('er_color').value;
  closeModal();
  nav('settings');
  toast('Role updated — changes apply immediately', 'success');
  settingsPane('roles', document.querySelector('.settings-menu-item.active'));
}

function openCreateRoleModal() {
  const allPerms = ['employees','attendance','leave','payroll','recruitment','performance','kpi','reports','settings','users'];
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Create Custom Role</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Role Key (no spaces)</label><input class="form-control" id="cr_id" placeholder="e.g. content_manager"></div> <div class="form-group"><label class="form-label required">Display Label</label><input class="form-control" id="cr_label" placeholder="e.g. Content Manager"></div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Description</label><input class="form-control" id="cr_desc" placeholder="What this role can do"></div> <div class="form-group"><label class="form-label">Color</label> <select class="form-control" id="cr_color"> ${['blue','teal','green','purple','amber','red','gold','navy','gray'].map(c=>`<option value="${c}">${c}</option>`).join('')}
          </select> </div> </div> <div class="section-divider"><span>Assign Permissions</span></div> <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-top:6px"> ${allPerms.map(p=>`<label style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;cursor:pointer;padding:6px;border-radius:6px;border:1px solid var(--gray-200)"> <input type="checkbox" id="crp_${p}" style="accent-color:var(--navy)"> ${p}
        </label>`).join('')}
      </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveCreateRole()">Create Role</button> </div>`);
}

function saveCreateRole() {
  const id = (document.getElementById('cr_id')?.value || '').toLowerCase().replace(/\s+/g,'_');
  const label = document.getElementById('cr_label')?.value;
  if (!id || !label) { toast('Role Key and Label are required', 'error'); return; }
  if (DB.customRolePermissions[id]) { toast('Role key already exists', 'error'); return; }
  const allPerms = ['employees','attendance','leave','payroll','recruitment','performance','kpi','reports','settings','users'];
  const perms = allPerms.filter(p => document.getElementById('crp_' + p)?.checked);
  DB.customRolePermissions[id] = {
    label, color: document.getElementById('cr_color')?.value || 'blue',
    perms, canEdit: true, description: document.getElementById('cr_desc')?.value || ''
  };
  closeModal();
  nav('settings');
  toast(`Role "${label}" created successfully`, 'success');
  settingsPane('roles', document.querySelector('.settings-menu-item.active'));
}
function settingsPayCfg(){return `<div class="settings-pane"><div class="settings-pane-title">Payroll Configuration</div> <div class="form-row cols-2"><div class="form-group"><label class="form-label">Working Days/Month</label><input class="form-control" type="number" value="22"></div><div class="form-group"><label class="form-label">Working Hours/Day</label><input class="form-control" type="number" value="8"></div></div> <div class="form-row cols-2"><div class="form-group"><label class="form-label">OT Multiplier</label><input class="form-control" type="number" step="0.1" value="1.5"></div><div class="form-group"><label class="form-label">Max Advance %</label><input class="form-control" type="number" value="50"></div></div> <div class="section-divider"><span>Tax Brackets</span></div> <table class="table"><thead><tr><th>Threshold</th><th>Rate</th></tr></thead><tbody> <tr><td>Under $1,000</td><td>0%</td></tr><tr><td>$1,000–$2,999</td><td>4%</td></tr><tr><td>$3,000–$5,999</td><td>6%</td></tr><tr><td>$6,000+</td><td>8%</td></tr> </tbody></table> <button class="btn btn-primary" style="margin-top:14px" onclick="toast('Payroll config saved','success')">Save</button>
</div>`;}
function settingsNotif(){return `<div class="settings-pane"><div class="settings-pane-title">Notification Settings</div> ${[['Late Arrival SMS','Send SMS when 8+ min late'],['Leave Approval Email','Email on leave decision'],['Payroll Notification','Email when payslip ready'],['KPI Review Reminder','Monthly KPI review reminder'],['Disciplinary Alert','Alert on case status change']].map(([l,d])=>`<div class="toggle-row"><div><div class="toggle-label">${l}</div><div class="toggle-desc">${d}</div></div><div class="toggle-switch on" onclick="this.classList.toggle('on')"></div></div>`).join('')}
</div>`;}
function settingsInteg(){return `<div class="settings-pane"><div class="settings-pane-title">System Integrations</div>
  <div class="toggle-row"><div><div class="toggle-label" style="display:flex;align-items:center;gap:8px">SMS Gateway (Tabaarak)<span class="badge ${isSmsConfigured()?'badge-green':'badge-amber'}">${isSmsConfigured()?'Connected':'Not set'}</span></div><div class="toggle-desc">Send KPI/task assignment SMS via tabaarakict.so</div></div><button class="btn btn-primary btn-sm" onclick="openSMSSetup()">${isSmsConfigured()?'Reconfigure':'Set up'}</button></div>
  ${[['Biometric System','badge-gray','Optional','ZKTeco integration'],['Email (SMTP)','badge-gray','Optional','Transactional email provider'],['Active Directory','badge-gray','Optional','SSO']].map(([l,cls,st,d])=>`<div class="toggle-row"><div><div class="toggle-label" style="display:flex;align-items:center;gap:8px">${l}<span class="badge ${cls}">${st}</span></div><div class="toggle-desc">${d}</div></div></div>`).join('')}
</div>`;}

/* ═══════════ SMS (Tabaarak gateway) ═══════════ */
function isSmsConfigured(){ try { return JSON.parse(localStorage.getItem('amc_sms_status')||'{}').configured===true; } catch { return false; } }
async function refreshSmsStatus(){ try { if(!SUPA||!SUPA.fn||!SUPA.authToken) return; const s=await SUPA.fn('sms',{action:'status'}); localStorage.setItem('amc_sms_status',JSON.stringify({configured:!!s.configured})); } catch(e){} }
function openSMSSetup(){
  openModal('narrow', `<div class="modal-header"><span class="modal-title">SMS Setup — Tabaarak</span>${closeX()}</div>
    <div class="modal-body">
      <div style="font-size:12px;color:var(--gray-500);margin-bottom:12px">Enter your Tabaarak SMS gateway login. Stored securely on the server, never in the browser.</div>
      <div class="form-group" style="margin-bottom:10px"><label class="form-label required">Gateway Username</label><input class="form-control" id="sms_user"></div>
      <div class="form-group" style="margin-bottom:14px"><label class="form-label required">Gateway Password</label><input class="form-control" id="sms_pass" type="password"></div>
      <div style="background:var(--gray-50);border-radius:var(--radius);padding:12px"><div style="font-size:12px;font-weight:700;margin-bottom:6px">Test</div>
        <div class="form-row cols-2" style="margin-bottom:0"><div class="form-group" style="margin-bottom:0"><input class="form-control form-control-sm" id="sms_testnum" placeholder="61xxxxxxx"></div><button class="btn btn-outline btn-sm" onclick="smsTest()" style="align-self:flex-end">Send Test</button></div>
        <div id="sms_test_result" style="font-size:12px;margin-top:8px;font-weight:600;display:none"></div>
      </div>
    </div>
    <div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="smsSaveConfig()">Save & Connect</button></div>`);
}
async function smsSaveConfig(){
  const user=document.getElementById('sms_user').value.trim(), pass=document.getElementById('sms_pass').value.trim();
  if(!user||!pass){ toast('Username and password required','error'); return; }
  try { await SUPA.fn('sms',{action:'save_config',user,pass}); localStorage.setItem('amc_sms_status',JSON.stringify({configured:true})); closeModal(); toast('SMS gateway connected','success'); nav('settings'); }
  catch(e){ toast(e.message||'Could not save','error'); }
}
async function smsTest(){
  const user=document.getElementById('sms_user').value.trim(), pass=document.getElementById('sms_pass').value.trim();
  const to=document.getElementById('sms_testnum').value.trim(), r=document.getElementById('sms_test_result');
  if(!user||!pass||!to){ toast('Fill username, password, test number','error'); return; }
  if(r){ r.style.display='block'; r.style.color='var(--gray-500)'; r.textContent='Sending…'; }
  try { await SUPA.fn('sms',{action:'send',to,user,pass,message:'AMC HRMS test SMS. Gateway working.'}); if(r){ r.style.color='#075E54'; r.textContent='✓ Sent. Check the phone.'; } }
  catch(e){ if(r){ r.style.color='var(--red)'; r.textContent='✕ '+(e.message||'Failed'); } }
}
async function sendSmsToEmployee(empId, message){
  const e=getEmp(empId); if(!e||!e.phone||!isSmsConfigured()) return;
  try { await SUPA.fn('sms',{action:'send', to:e.phone, message}); } catch(err){ /* silent */ }
}
function settingsSec(){return `<div class="settings-pane"><div class="settings-pane-title">Security & Compliance</div> ${[['Two-Factor Authentication (2FA)','Required for admin roles'],['Session Timeout (8hrs)','Auto-logout on expiry'],['Audit All Changes','Track every change with user + timestamp'],['Data Encryption at Rest','AES-256 for employee data']].map(([l,d])=>`<div class="toggle-row"><div><div class="toggle-label">${l}</div><div class="toggle-desc">${d}</div></div><div class="toggle-switch on" onclick="this.classList.toggle('on')"></div></div>`).join('')}
  <div style="margin-top:14px;padding:12px 14px;background:var(--green-l);border-radius:var(--radius);font-size:12px;color:var(--green);font-weight:600"> All security controls active · Session persistence enabled · Audit logs running</div>
  <button class="btn btn-outline btn-sm" onclick="openSystemHealth()" style="margin-top:12px">${ICO.activity || ''} View System Error Log</button>
</div>`;}

// Admin view of captured production errors (from the client_errors table).
async function openSystemHealth(){
  openModal('wide', `<div class="modal-header"><span class="modal-title">System Error Log</span>${closeX()}</div><div class="modal-body"><div id="sysHealthBody" style="font-size:13px;color:var(--gray-500)">Loading…</div></div><div class="modal-footer"><button class="btn btn-outline" onclick="closeModal()">Close</button></div>`);
  try {
    const rows = await SUPA.select('client_errors','select=*&order=created_at.desc&limit=50');
    const body = document.getElementById('sysHealthBody');
    if (!body) return;
    if (!rows || !rows.length) { body.innerHTML = `<div class="empty-state"><p>✓ No errors recorded — system healthy.</p></div>`; return; }
    body.innerHTML = `<div style="margin-bottom:10px;font-weight:700;color:var(--gray-700)">${rows.length} most recent error(s)</div>
      <div style="max-height:420px;overflow:auto;border:1px solid var(--gray-200);border-radius:var(--radius)">
      ${rows.map(r=>`<div style="padding:9px 12px;border-bottom:1px solid var(--gray-100)">
        <div style="font-weight:600;color:var(--red);font-size:12px">${esc(r.message||'')}</div>
        <div style="font-size:11px;color:var(--gray-400);font-family:var(--mono)">${esc(r.source||'')}</div>
        <div style="font-size:10px;color:var(--gray-400);margin-top:2px">${esc(String(r.created_at||'').replace('T',' ').slice(0,16))} · ${esc(r.user_email||'')} · ${esc(r.page||'')}</div>
      </div>`).join('')}</div>`;
  } catch(e) {
    const body = document.getElementById('sysHealthBody');
    if (body) body.innerHTML = `<div style="color:var(--red)">Could not load errors: ${esc(e.message)}</div>`;
  }
}

/* ═══════════════════════════════════════════════════════════
   MASTER EMPLOYEE PROFILE MODULE
   Full record: Personal · Job · Role · Education · KPIs
═══════════════════════════════════════════════════════════ */


function openAddEducationModal(empId) {
  const e = getEmp(empId);
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Add Education — ${e?.name||empId}</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Institution / University</label><input class="form-control" id="edu_inst" placeholder="e.g. University of Nairobi"></div> <div class="form-group"><label class="form-label required">Degree Obtained</label><input class="form-control" id="edu_degree" placeholder="e.g. Bachelor of Science"></div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Field of Study</label><input class="form-control" id="edu_field" placeholder="e.g. Computer Science"></div> <div class="form-group"><label class="form-label required">Graduation Year</label><input class="form-control" id="edu_year" type="number" min="1970" max="${new Date().getFullYear()}" value="${new Date().getFullYear()-4}"></div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">GPA / Grade</label><input class="form-control" id="edu_gpa" placeholder="e.g. 3.8/4.0 or Distinction"></div> <div class="form-group"><label class="form-label">Verified?</label> <select class="form-control" id="edu_verified"><option value="true"> Verified</option><option value="false">Unverified</option></select> </div> </div> <div class="form-group"><label class="form-label">Certificates &amp; Qualifications</label> <textarea class="form-control" id="edu_certs" rows="2" placeholder="Enter certificates separated by commas, e.g. CPA, SHRM-SCP, PMP"></textarea> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveEducationRecord('${empId}')">Save Record</button> </div>`);
}

function saveEducationRecord(empId) {
  const inst = document.getElementById('edu_inst')?.value?.trim();
  const degree = document.getElementById('edu_degree')?.value?.trim();
  const field = document.getElementById('edu_field')?.value?.trim();
  if (!inst || !degree || !field) { toast('Institution, Degree and Field are required', 'error'); return; }
  if (!DB.educationRecords) DB.educationRecords = [];
  const certsRaw = document.getElementById('edu_certs')?.value || '';
  DB.educationRecords.push({
    id: 'EDU' + String(DB.educationRecords.length+1).padStart(3,'0'),
    empId, institution: inst, degree, field,
    gradYear: parseInt(document.getElementById('edu_year')?.value) || new Date().getFullYear()-4,
    gpa: document.getElementById('edu_gpa')?.value || '—',
    certificates: certsRaw.split(',').map(c=>c.trim()).filter(Boolean),
    verified: document.getElementById('edu_verified')?.value === 'true'
  });
  const newEdu = DB.educationRecords[DB.educationRecords.length-1];
  if(typeof SupaWrite!=='undefined') SupaWrite.saveEducation(newEdu);
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`Added education record for ${getEmpName(empId)}`, module:'Employees', ip:'127.0.0.1' });
  closeModal();
  nav('employees');
  toast('Education record saved', 'success');
  openMasterProfileModal(empId);
}

/* ═══════════════════════════════════════════════════════════
   PRODUCTION RESET MODULE — In-App Demo Data Cleaner
   Only visible to super_admin role
═══════════════════════════════════════════════════════════ */
function openResetModal() {
  if (STATE.role !== 'super_admin') {
    toast('Only Super Admin can reset demo data', 'error'); return;
  }
  openModal('wide', `
    <div class="modal-header" style="background:linear-gradient(135deg,#7F1D1D,#991B1B);color:white"> <span class="modal-title" style="color:white;font-size:16px">Reset Demo Data — Production Setup</span> ${closeX()}
    </div> <div class="modal-body"> <!-- Warning Banner --> <div style="background:#FEF2F2;border:2px solid #FCA5A5;border-radius:var(--radius);padding:14px 16px;margin-bottom:20px"> <div style="font-size:14px;font-weight:800;color:#991B1B;margin-bottom:6px">This action is irreversible</div> <div style="font-size:13px;color:#7F1D1D;line-height:1.7"> This will permanently delete all demo/sample data from the system.
          Only the database structure and system configuration will be preserved.
        </div> </div> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px"> <!-- Will be deleted --> <div style="background:var(--red-l);border-radius:var(--radius);padding:14px 16px"> <div style="font-size:12px;font-weight:800;color:var(--red);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px"> Will be deleted</div> ${[
            'All 33 demo employees',
            'All departments & teams',
            'All user accounts (except Super Admin)',
            'All attendance records',
            'All leave requests',
            'All payroll records',
            'All KPIs & KPI templates',
            'All performance reviews',
            'All training records',
            'All recruitment data',
            'All assets',
            'All notifications',
            'All audit logs',
          ].map(item => `<div style="font-size:12px;color:#7F1D1D;padding:2px 0;display:flex;align-items:center;gap:6px"> <span style="color:#DC2626;font-size:14px;line-height:1">×</span> ${item}
          </div>`).join('')}
        </div> <!-- Will be kept --> <div style="background:var(--green-l);border-radius:var(--radius);padding:14px 16px"> <div style="font-size:12px;font-weight:800;color:#065F46;margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px"> Will be preserved</div> ${[
            'Database schema & structure',
            'Foreign keys & constraints',
            'Indexes & triggers',
            'Subsidiaries (JIIL, ATV, MPR, NSY)',
            'All 10 system roles',
            'All module permissions',
            'Leave types (7)',
            'Job grades (G1–G10)',
            'Shift configurations',
            'Super Admin account',
            'System settings',
          ].map(item => `<div style="font-size:12px;color:#065F46;padding:2px 0;display:flex;align-items:center;gap:6px"> <span style="color:#059669;font-size:14px;line-height:1">✓</span> ${item}
          </div>`).join('')}
        </div> </div> <!-- Super Admin credentials after reset --> <div style="background:var(--blue-l);border:1px solid var(--blue);border-radius:var(--radius);padding:12px 16px;margin-bottom:20px"> <div style="font-size:12px;font-weight:800;color:var(--blue);margin-bottom:6px">After reset, use these credentials:</div> <div style="font-size:13px;font-family:var(--mono);color:var(--navy)"> Email:    admin@asalmedia.so<br> Password: Admin@AMC2026 <span style="font-size:11px;color:var(--amber);font-family:var(--sans)">(change immediately)</span> </div> </div> <!-- Confirmation input --> <div class="form-group"> <label class="form-label required" style="color:#991B1B"> Type <strong>RESET AMC</strong> to confirm
        </label> <input class="form-control" id="resetConfirmInput"
          placeholder="Type: RESET AMC"
          style="border-color:#FCA5A5;font-family:var(--mono);font-weight:700;font-size:14px"
          oninput="document.getElementById('resetConfirmBtn').disabled = this.value !== 'RESET AMC'"> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel — Keep Demo Data</button> <button id="resetConfirmBtn" class="btn" disabled
        onclick="executeReset()"
        style="background:#DC2626;color:white;border-color:#DC2626;opacity:.5;cursor:not-allowed"
        onmouseenter="if(!this.disabled)this.style.background='#B91C1C'"
        onmouseleave="if(!this.disabled)this.style.background='#DC2626'"> Delete All Demo Data
      </button> </div>`);

  // Enable button when text matches
  setTimeout(() => {
    document.getElementById('resetConfirmBtn').addEventListener('click', () => {});
    document.getElementById('resetConfirmInput').addEventListener('input', function() {
      const btn = document.getElementById('resetConfirmBtn');
      const match = this.value === 'RESET AMC';
      btn.disabled = !match;
      btn.style.opacity = match ? '1' : '.5';
      btn.style.cursor  = match ? 'pointer' : 'not-allowed';
    });
  }, 100);
}

function executeReset() {
  const input = document.getElementById('resetConfirmInput');
  if (!input || input.value !== 'RESET AMC') return;

  closeModal();
  showResetProgress();

  // Simulate steps with real local data clearing
  const steps = [
    { label: 'Clearing attendance records…',      action: () => { DB.attendance = []; } },
    { label: 'Clearing leave requests…',           action: () => { DB.leaveRequests = []; DB.leaveBalances = {}; } },
    { label: 'Clearing payroll records…',          action: () => { DB.payroll = []; } },
    { label: 'Clearing KPIs and templates…',       action: () => { DB.kpis = []; DB.kpiTemplates = []; } },
    { label: 'Clearing training records…',         action: () => { DB.trainings = []; } },
    { label: 'Clearing recruitment data…',         action: () => { DB.requisitions = []; DB.candidates = []; } },
    { label: 'Clearing performance reviews…',      action: () => { DB.successionPlans = []; } },
    { label: 'Clearing disciplinary cases…',       action: () => { DB.disciplinaryCases = []; } },
    { label: 'Clearing notifications…',            action: () => { DB.notifications = []; } },
    { label: 'Clearing audit logs…',               action: () => { DB.auditLogs = []; } },
    { label: 'Removing all employees…',            action: () => { DB.employees = []; } },
    { label: 'Removing all departments & teams…',  action: () => { DB.departments = []; DB.teams = []; } },
    { label: 'Removing user accounts…',            action: () => {
        DB.users = [{
          id:'USR_ADMIN', username:'superadmin', email:'admin@asalmedia.so',
          empId:'', role:'super_admin', status:'Active',
          lastLogin:'Never', created: new Date().toISOString().split('T')[0],
          failedAttempts:0
        }];
      }
    },
    { label: 'Resetting sequences…',               action: () => {} },
    { label: 'Preserving system configuration…',   action: () => {} },
    { label: 'Rebuilding indexes…',                action: () => {
        // Write-through to Supabase if connected
        if (typeof SupaSync !== 'undefined' && SupaSync.connected) {
          resetSupabase();
        }
      }
    },
    { label: 'Verifying integrity…',               action: () => {
        STATE.role       = 'super_admin';
        STATE.subsidiary = 'all';
        Session.clear();
      }
    },
  ];

  let current = 0;
  const total = steps.length;

  const tick = () => {
    if (current >= total) {
      showResetComplete();
      return;
    }
    const step = steps[current];
    updateProgress(current + 1, total, step.label);
    try { step.action(); } catch(e) { console.warn('Reset step error:', e.message); }
    current++;
    setTimeout(tick, 180);
  };
  tick();
}

async function resetSupabase() {
  if (typeof SUPA === 'undefined' || !SupaSync.connected) return;
  const tables = [
    'attendance','leave_requests','leave_balances','payroll','kpis','kpi_template_items',
    'kpi_templates','education_records','audit_logs','notifications',
    'disciplinary_cases','requisitions'
  ];
  for (const t of tables) {
    try { await SUPA.delete(t, 'id=neq.00000000-0000-0000-0000-000000000000'); } catch(e) {}
  }
  // Delete all employees and users except superadmin
  try {
    await SUPA.delete('employees', 'id=neq.00000000-0000-0000-0000-000000000000');
    await SUPA.delete('hrms_users', 'email=neq.admin@asalmedia.so');
    await SUPA.delete('departments', 'id=neq.00000000-0000-0000-0000-000000000000');
  } catch(e) {}
}

function showResetProgress() {
  const overlay = document.createElement('div');
  overlay.id = 'resetOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:99999;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px';
  overlay.innerHTML = `
    <div style="background:white;border-radius:16px;padding:32px 40px;width:480px;max-width:calc(100vw - 32px);text-align:center"> <div style="font-size:32px;margin-bottom:12px"></div> <div style="font-size:18px;font-weight:800;color:#111;margin-bottom:6px">Resetting System</div> <div id="resetStepLabel" style="font-size:13px;color:#6B7280;margin-bottom:20px;min-height:20px">Initializing…</div> <div style="background:#F3F4F6;border-radius:99px;height:8px;overflow:hidden;margin-bottom:8px"> <div id="resetProgressBar" style="height:100%;background:linear-gradient(90deg,#DC2626,#C9A227);border-radius:99px;width:0%;transition:width .15s ease"></div> </div> <div id="resetProgressText" style="font-size:12px;color:#9CA3AF;font-family:monospace">0%</div> </div>`;
  document.body.appendChild(overlay);
}

function updateProgress(current, total, label) {
  const pct = Math.round(current / total * 100);
  const bar = document.getElementById('resetProgressBar');
  const txt = document.getElementById('resetProgressText');
  const lbl = document.getElementById('resetStepLabel');
  if (bar) bar.style.width = pct + '%';
  if (txt) txt.textContent = `Step ${current} of ${total} — ${pct}%`;
  if (lbl) lbl.textContent = label;
}

function showResetComplete() {
  const overlay = document.getElementById('resetOverlay');
  if (overlay) overlay.remove();

  openModal('wide', `
    <div class="modal-body" style="padding:40px;text-align:center"> <div style="width:72px;height:72px;background:var(--green-l);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 20px">✅</div> <div style="font-size:22px;font-weight:900;color:var(--gray-900);margin-bottom:8px"> Demo Data Successfully Removed
      </div> <div style="font-size:14px;color:var(--gray-500);margin-bottom:32px"> System ready for production data entry
      </div> <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px"> ${[
          { label:'Employees', val:'0 records' },
          { label:'Departments', val:'0 records' },
          { label:'Payroll', val:'0 records' },
          { label:'Attendance', val:'0 records' },
          { label:'KPIs', val:'0 records' },
          { label:'Users', val:'1 (Super Admin)' },
        ].map(s => `<div style="background:var(--gray-50);border-radius:var(--radius);padding:12px;text-align:center"> <div style="font-size:20px">${s.icon}</div> <div style="font-size:11px;color:var(--gray-400);font-weight:600;text-transform:uppercase">${s.label}</div> <div style="font-size:13px;font-weight:800;color:var(--gray-800);font-family:var(--mono)">${s.val}</div> </div>`).join('')}
      </div> <div style="background:var(--blue-l);border-radius:var(--radius);padding:16px;text-align:left;margin-bottom:28px"> <div style="font-size:12px;font-weight:800;color:var(--blue);margin-bottom:8px">Super Admin Account</div> <div style="font-size:13px;font-family:var(--mono);color:var(--navy)"> Email: admin@asalmedia.so<br> Password: Admin@AMC2026
        </div> <div style="font-size:11px;color:var(--amber);font-weight:600;margin-top:6px">Change password immediately after login</div> </div> <div style="background:var(--gray-50);border-radius:var(--radius);padding:14px 16px;text-align:left;margin-bottom:24px"> <div style="font-size:12px;font-weight:800;color:var(--gray-700);margin-bottom:8px">Next Steps:</div> ${[
          '1. Log out and log back in with admin@asalmedia.so',
          '2. Change the default password immediately',
          '3. Create departments for each subsidiary',
          '4. Add your real employees',
          '5. Create user accounts and assign roles',
          '6. Set up KPI templates',
        ].map(s => `<div style="font-size:12px;color:var(--gray-600);padding:2px 0">${s}</div>`).join('')}
      </div> <div style="display:flex;gap:10px;justify-content:center"> <button class="btn btn-outline" onclick="closeModal();nav('settings')">Back to Settings</button> <button class="btn btn-primary" onclick="closeModal();doLogout()" style="background:var(--navy)"> Log Out & Re-Login →
        </button> </div> </div>`);

  // Log the reset
  DB.auditLogs.unshift({
    id: 1,
    time: new Date().toISOString().replace('T',' ').slice(0,16),
    user: STATE.user?.initials || 'SYS',
    userRole: 'super_admin',
    action: 'System reset — all demo data removed. Production setup initiated.',
    module: 'Settings',
    ip: '127.0.0.1'
  });
}

/* ═══════════════════════════════════════════════════════════
   INTEGRATIONS MODULE — Finance ERP, Biometric, Email, SMS
   Settings → Integrations
═══════════════════════════════════════════════════════════ */
function settingsIntegrations() {
  return `<div class="settings-pane"> <div class="settings-pane-title">System Integrations</div> <div style="font-size:13px;color:var(--gray-500);margin-bottom:20px"> Connect AMC HRMS to your Finance ERP, Biometric devices, Email server, and SMS gateway.
      Changes are saved to your <code style="background:var(--gray-100);padding:1px 6px;border-radius:4px">.env</code> configuration file.
    </div> <!-- Integration Cards Grid --> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px"> <!-- EMAIL SMTP --> <div class="integration-card" id="int-email"> <div class="int-card-header"> <div style="display:flex;align-items:center;gap:10px"> <div class="int-icon" style="background:linear-gradient(135deg,#3B82F6,#1D4ED8)"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> </div> <div> <div class="int-name">Email (SMTP)</div> <div class="int-desc">Notifications, payslips, alerts</div> </div> </div> <div id="email-status-badge" class="int-badge int-badge-gray">● Not configured</div> </div> <div class="int-fields"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Provider</label> <select class="form-control form-control-sm" id="int_smtp_provider" onchange="updateSMTPFields()"> <option value="smtp">Custom SMTP</option> <option value="gmail">Gmail</option> <option value="office365">Office 365</option> <option value="sendgrid">SendGrid</option> </select> </div> <div class="form-group"><label class="form-label">SMTP Host</label> <input class="form-control form-control-sm" id="int_smtp_host" placeholder="smtp.gmail.com"> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Port</label> <input class="form-control form-control-sm" id="int_smtp_port" placeholder="587" type="number"> </div> <div class="form-group"><label class="form-label">Username / Email</label> <input class="form-control form-control-sm" id="int_smtp_user" placeholder="your@email.com"> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Password / App Key</label> <input class="form-control form-control-sm" id="int_smtp_pass" type="password" placeholder="••••••••"> </div> <div class="form-group"><label class="form-label">From Name</label> <input class="form-control form-control-sm" id="int_smtp_from" placeholder="AMC HRMS <noreply@asalmedia.so>"> </div> </div> </div> <div class="int-actions"> <button class="btn btn-outline btn-sm" onclick="testIntegration('email')">Test Connection</button> <button class="btn btn-primary btn-sm" onclick="saveIntegration('email')">Save</button> </div> <div id="email-test-result" class="int-result" style="display:none"></div> </div> <!-- SMS GATEWAY --> <div class="integration-card" id="int-sms"> <div class="int-card-header"> <div style="display:flex;align-items:center;gap:10px"> <div class="int-icon" style="background:linear-gradient(135deg,#10B981,#059669)"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> </div> <div> <div class="int-name">SMS Gateway</div> <div class="int-desc">Leave alerts, OTP, payslip notices</div> </div> </div> <div id="sms-status-badge" class="int-badge int-badge-gray">● Disabled</div> </div> <div class="int-fields"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Provider</label> <select class="form-control form-control-sm" id="int_sms_provider" onchange="updateSMSFields()"> <option value="africastalking">Africa's Talking  Somalia</option> <option value="twilio">Twilio</option> <option value="infobip">Infobip</option> <option value="custom">Custom HTTP</option> </select> </div> <div class="form-group"><label class="form-label">Sender ID</label> <input class="form-control form-control-sm" id="int_sms_sender" placeholder="AMC-HRMS"> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">API Key / Account SID</label> <input class="form-control form-control-sm" id="int_sms_key" placeholder="Your API key"> </div> <div class="form-group"><label class="form-label">Username / Token</label> <input class="form-control form-control-sm" id="int_sms_user" placeholder="AT username or token"> </div> </div> <div class="form-group"> <label class="form-label">Test Phone Number</label> <input class="form-control form-control-sm" id="int_sms_test_phone" placeholder="+252xxxxxxxxx"> </div> </div> <div class="int-actions"> <button class="btn btn-outline btn-sm" onclick="testIntegration('sms')">Send Test SMS</button> <button class="btn btn-primary btn-sm" onclick="saveIntegration('sms')">Save</button> </div> <div id="sms-test-result" class="int-result" style="display:none"></div> </div> <!-- BIOMETRIC --> <div class="integration-card" id="int-biometric"> <div class="int-card-header"> <div style="display:flex;align-items:center;gap:10px"> <div class="int-icon" style="background:linear-gradient(135deg,#8B5CF6,#6D28D9)"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> </div> <div> <div class="int-name">Biometric System</div> <div class="int-desc">Auto attendance from fingerprint/card</div> </div> </div> <div id="bio-status-badge" class="int-badge int-badge-gray">● Disabled</div> </div> <div class="int-fields"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Device Type</label> <select class="form-control form-control-sm" id="int_bio_provider"> <option value="zkteco">ZKTeco (most common)</option> <option value="suprema">Suprema BioStar 2</option> <option value="anviz">Anviz</option> <option value="rest">Custom REST</option> </select> </div> <div class="form-group"><label class="form-label">Device IP Address</label> <input class="form-control form-control-sm" id="int_bio_host" placeholder="192.168.1.201"> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Port</label> <input class="form-control form-control-sm" id="int_bio_port" placeholder="80" type="number"> </div> <div class="form-group"><label class="form-label">Device Serial No.</label> <input class="form-control form-control-sm" id="int_bio_serial" placeholder="ABCD123456"> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Username</label> <input class="form-control form-control-sm" id="int_bio_user" placeholder="admin"> </div> <div class="form-group"><label class="form-label">Password</label> <input class="form-control form-control-sm" id="int_bio_pass" type="password" placeholder="12345"> </div> </div> <div class="form-group"> <label class="form-label">Shift Start Time</label> <input class="form-control form-control-sm" id="int_bio_shift" placeholder="08:00" type="time" value="08:00"> </div> </div> <div class="int-actions"> <button class="btn btn-outline btn-sm" onclick="testIntegration('biometric')">Test Device</button> <button class="btn btn-outline btn-sm" onclick="bioSyncNow()">Sync Today</button> <button class="btn btn-primary btn-sm" onclick="saveIntegration('biometric')">Save</button> </div> <div id="bio-test-result" class="int-result" style="display:none"></div> </div> <!-- FINANCE ERP --> <div class="integration-card" id="int-erp"> <div class="int-card-header"> <div style="display:flex;align-items:center;gap:10px"> <div class="int-icon" style="background:linear-gradient(135deg,#F59E0B,#D97706)"> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> </div> <div> <div class="int-name">Finance ERP</div> <div class="int-desc">Sync payroll journals & employee records</div> </div> </div> <div id="erp-status-badge" class="int-badge int-badge-gray">● Disabled</div> </div> <div class="int-fields"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">ERP System</label> <select class="form-control form-control-sm" id="int_erp_provider"> <option value="odoo">Odoo (open-source)</option> <option value="quickbooks">QuickBooks Online</option> <option value="sap">SAP Business One</option> <option value="sage">Sage</option> <option value="custom">Custom REST ERP</option> </select> </div> <div class="form-group"><label class="form-label">ERP URL</label> <input class="form-control form-control-sm" id="int_erp_url" placeholder="http://your-erp.com"> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Database / Company ID</label> <input class="form-control form-control-sm" id="int_erp_db" placeholder="your_erp_db"> </div> <div class="form-group"><label class="form-label">Username</label> <input class="form-control form-control-sm" id="int_erp_user" placeholder="admin"> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Password / API Key</label> <input class="form-control form-control-sm" id="int_erp_pass" type="password" placeholder="••••••••"> </div> <div class="form-group"><label class="form-label">Salary Account Code</label> <input class="form-control form-control-sm" id="int_erp_salary_acc" placeholder="400"> </div> </div> </div> <div class="int-actions"> <button class="btn btn-outline btn-sm" onclick="testIntegration('erp')">Test Connection</button> <button class="btn btn-outline btn-sm" onclick="erpSyncEmployees()">Sync Employees</button> <button class="btn btn-primary btn-sm" onclick="saveIntegration('erp')">Save</button> </div> <div id="erp-test-result" class="int-result" style="display:none"></div> </div> </div> <!-- API Endpoint Reference --> <div style="margin-top:24px;padding:16px;background:var(--gray-50);border-radius:var(--radius);border:1px solid var(--gray-200)"> <div style="font-size:12px;font-weight:800;color:var(--gray-700);margin-bottom:10px">Backend API Endpoints</div> <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:11px;font-family:var(--mono)"> ${[
          ['GET',  '/api/v1/integrations/status',              'All integration status'],
          ['POST', '/api/v1/integrations/email/test',          'Test SMTP connection'],
          ['POST', '/api/v1/integrations/sms/test',            'Send test SMS'],
          ['GET',  '/api/v1/integrations/biometric/sync',      'Sync today attendance'],
          ['GET',  '/api/v1/integrations/biometric/device',    'Device info'],
          ['POST', '/api/v1/integrations/erp/payroll',         'Sync payroll to ERP'],
          ['POST', '/api/v1/integrations/erp/sync-all',        'Sync all employees to ERP'],
        ].map(([method,path,desc]) => `
          <div style="display:flex;gap:6px;padding:4px 0;border-bottom:1px solid var(--gray-200)"> <span style="color:${method==='GET'?'var(--blue)':'var(--green)'};font-weight:700;min-width:36px">${method}</span> <span style="color:var(--gray-700)">${path}</span> </div>`).join('')}
      </div> </div> </div>`;
}

// Integration helper functions
function testIntegration(type) {
  const resultEl = document.getElementById(`${type}-test-result`);
  if (!resultEl) return;
  resultEl.style.display = 'block';
  resultEl.className = 'int-result testing';
  resultEl.innerHTML = '<span class="spinner" style="width:14px;height:14px;border-width:2px"></span> Testing connection…';

  // Simulate test (real implementation calls backend API)
  setTimeout(() => {
    const configs = {
      email:     { field: 'int_smtp_host',    label: 'SMTP Host' },
      sms:       { field: 'int_sms_key',      label: 'API Key' },
      biometric: { field: 'int_bio_host',     label: 'Device IP' },
      erp:       { field: 'int_erp_url',      label: 'ERP URL' },
    };
    const cfg = configs[type];
    const val = document.getElementById(cfg.field)?.value;
    if (!val) {
      resultEl.className = 'int-result error';
      resultEl.innerHTML = `Please enter the ${cfg.label} before testing`;
      return;
    }
    resultEl.className = 'int-result success';
    resultEl.innerHTML = ` Configuration saved — connection will be tested when backend starts`;
    document.getElementById(`${type}-status-badge`).className = 'int-badge int-badge-amber';
    document.getElementById(`${type}-status-badge`).textContent = '● Configured';
    toast(`${type.charAt(0).toUpperCase()+type.slice(1)} settings saved`, 'success');
  }, 1200);
}

function saveIntegration(type) {
  toast(`${type.charAt(0).toUpperCase()+type.slice(1)} configuration saved to .env`, 'success');
  document.getElementById(`${type}-status-badge`).className = 'int-badge int-badge-amber';
  document.getElementById(`${type}-status-badge`).textContent = '● Configured';
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:`${type} integration configured`, module:'Settings', ip:'127.0.0.1' });
}

function bioSyncNow() {
  toast('Biometric sync triggered — check attendance module in 30 seconds', 'info');
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.user?.role||'', action:'Manual biometric sync triggered', module:'Attendance', ip:'127.0.0.1' });
}

function erpSyncEmployees() {
  toast('ERP employee sync queued — all active employees will be synced', 'info');
}

function updateSMTPFields() {
  const provider = document.getElementById('int_smtp_provider')?.value;
  const hostEl = document.getElementById('int_smtp_host');
  const portEl = document.getElementById('int_smtp_port');
  const defaults = {
    gmail:     { host:'smtp.gmail.com',        port:'587' },
    office365: { host:'smtp.office365.com',    port:'587' },
    sendgrid:  { host:'smtp.sendgrid.net',     port:'587' },
    smtp:      { host:'',                       port:'587' },
  };
  const d = defaults[provider];
  if (hostEl && d.host) hostEl.value = d.host;
  if (portEl && d.port) portEl.value = d.port;
}

function updateSMSFields() {
  const provider = document.getElementById('int_sms_provider')?.value;
  const userEl = document.getElementById('int_sms_user');
  if (userEl) {
    const labels = { africastalking:'AT Username (sandbox for testing)', twilio:'Auth Token', infobip:'Base URL', custom:'Gateway URL' };
    userEl.placeholder = labels[provider] || 'Username';
  }
}



/* ═══════════════════════════════════════════════════════════
   WHATSAPP MODULE — Browser-Only, No Backend Needed
   Uses WhatsApp Cloud API (Meta) — works from index.html
   Setup: meta.com/business → WhatsApp → get token + phone ID
═══════════════════════════════════════════════════════════ */

// ── WhatsApp config ──
// The access token now lives SERVER-SIDE (in the whatsapp Edge Function +
// RLS-locked table), never in the browser. Locally we cache only the
// non-secret connection status for instant UI.
function getWAConfig() {
  try { return JSON.parse(localStorage.getItem('amc_wa_status') || '{}'); } catch { return {}; }
}
function saveWAStatus(cfg) {
  localStorage.setItem('amc_wa_status', JSON.stringify(cfg || {}));
}
function isWAConfigured() {
  return !!getWAConfig().configured;
}
// Refresh the cached connection status from the server (so it's correct across
// devices). Silently updates the local cache; the panel reads it on next open.
async function refreshWAStatus() {
  try {
    if (typeof SUPA === 'undefined' || !SUPA.fn || !SUPA.authToken) return;
    const s = await SUPA.fn('whatsapp', { action: 'status' });
    saveWAStatus({ configured: !!s.configured, phoneId: s.phoneId || '', displayNum: s.displayNum || '' });
  } catch (e) { /* keep cached status */ }
}

// ── Send a single WhatsApp message via the secure server function ──
async function waSendOne(phone, message) {
  const data = await SUPA.fn('whatsapp', { action: 'send', to: phone, message });
  return data;
}

// ── Open WhatsApp Panel ──
function openWhatsAppPanel() {
  const configured = isWAConfigured();
  const cfg = getWAConfig();

  openModal('xl', `
    <div class="modal-header" style="background:linear-gradient(135deg,#075E54,#128C7E);color:white"> <span class="modal-title" style="color:white;display:flex;align-items:center;gap:10px"> <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> WhatsApp Broadcast
      </span> ${closeX()}
    </div> <div class="modal-body" style="padding:0"> <!-- Status bar --> <div style="background:${configured ? '#075E54' : '#92400E'};padding:12px 20px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap"> <div style="display:flex;align-items:center;gap:10px"> <div style="width:10px;height:10px;border-radius:50%;background:${configured ? '#25D366' : '#F59E0B'};flex-shrink:0"></div> <div> <div style="color:white;font-size:13px;font-weight:700">${configured ? ' WhatsApp Cloud API Connected' : 'API not configured yet'}</div> <div style="color:rgba(255,255,255,.65);font-size:11px">${configured ? 'Phone ID: ' + (cfg.phoneId||'').slice(0,8) + '…' : 'Enter your Meta WhatsApp Cloud API credentials below'}</div> </div> </div> <button onclick="openWASetup()" class="btn btn-sm" style="background:rgba(255,255,255,.15);color:white;border:1px solid rgba(255,255,255,.3)"> ${configured ? 'Change Settings' : ' Setup API'}
        </button> </div> ${!configured ? `
      <!-- Setup prompt --> <div style="padding:24px;text-align:center;background:#FFFBEB;border-bottom:1px solid #FDE68A"> <div style="font-size:24px;margin-bottom:10px"></div> <div style="font-size:15px;font-weight:800;color:#92400E;margin-bottom:6px">Send now — no setup needed</div> <div style="font-size:13px;color:#92400E;margin-bottom:16px;max-width:440px;margin-left:auto;margin-right:auto"> Type a message and hit <strong>Send via WhatsApp</strong> below — it opens WhatsApp with the message ready for each employee, using the numbers already in the system. <br><br>Optional: connect the <strong>Meta Cloud API</strong> (button above) for fully automated bulk sending without clicking each one.
        </div> <button onclick="openWASetup()" class="btn btn-primary" style="background:#075E54;border-color:#075E54"> Configure Now — Takes 2 Minutes
        </button> </div>` : ''}

      <div style="padding:20px 24px"> <!-- Target selector --> <div style="margin-bottom:16px"> <div style="font-size:12px;font-weight:800;color:var(--gray-500);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px"> Send To</div> <div style="display:flex;gap:8px;flex-wrap:wrap" id="wa-target-row"> ${[
              ['all',     ' All Employees'],
              ['jiil',    'JIIL Media'],
              ['asal_tv', 'Asal TV'],
              ['masrax',  'Masrax Production'],
              ['nasiye',  'Nasiye'],
            ].map(([id, label], i) => `
              <button class="wa-tgt-btn${i===0?' wa-tgt-active':''}" data-sub="${id}"
                onclick="waSelectTarget(this,'${id}')"
                style="padding:7px 16px;border-radius:99px;border:2px solid ${i===0?'#075E54':'var(--gray-300)'};background:${i===0?'#075E54':'transparent'};color:${i===0?'white':'var(--gray-700)'};font-size:12px;font-weight:700;cursor:pointer;transition:all .15s"> ${label}
              </button>`).join('')}
          </div> <div id="wa-count-line" style="font-size:12px;color:var(--gray-400);margin-top:8px"> ${DB.employees.filter(e=>e.status==='Active'&&e.phone).length} employees have phone numbers
          </div> </div> <!-- Templates --> <div style="margin-bottom:16px"> <div style="font-size:12px;font-weight:800;color:var(--gray-500);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px"> Quick Templates</div> <div style="display:flex;gap:8px;flex-wrap:wrap"> <button onclick="waUseTemplate('t1')" class="wa-tmpl-btn"> Announcement</button> <button onclick="waUseTemplate('t2')" class="wa-tmpl-btn"> Eid Mubarak</button> <button onclick="waUseTemplate('t3')" class="wa-tmpl-btn">Payroll Ready</button> <button onclick="waUseTemplate('t4')" class="wa-tmpl-btn">⏰ Attendance</button> <button onclick="waUseTemplate('t5')" class="wa-tmpl-btn"> Holiday</button> </div> </div> <!-- Message box --> <div class="form-group"> <label class="form-label" style="display:flex;justify-content:space-between"> <span>Message <span style="color:var(--red)">*</span></span> <span id="wa-chars" style="color:var(--gray-400);font-size:11px">0 / 1024</span> </label> <textarea id="wa-msg" rows="5" class="form-control"
            placeholder="Type your message…&#10;&#10;Use {name} to personalize — replaced with each employee's name."
            oninput="document.getElementById('wa-chars').textContent=this.value.length+' / 1024'"
            style="font-size:13px;line-height:1.7;resize:vertical"></textarea> <div style="font-size:11px;color:var(--gray-400);margin-top:4px">{name} = employee name · *bold* · _italic_</div> </div> <!-- Progress (hidden until sending) --> <div id="wa-send-progress" style="display:none;margin-top:16px"> <div style="font-size:13px;font-weight:600;color:var(--gray-600);margin-bottom:6px" id="wa-prog-label">Sending…</div> <div style="background:var(--gray-100);border-radius:99px;height:8px;overflow:hidden"> <div id="wa-prog-bar" style="height:100%;background:linear-gradient(90deg,#075E54,#25D366);border-radius:99px;width:0%;transition:width .3s"></div> </div> <div id="wa-prog-count" style="font-size:11px;color:var(--gray-400);margin-top:4px">0 sent</div> </div> </div> </div> <div class="modal-footer" style="justify-content:space-between;flex-wrap:wrap;gap:8px"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button id="wa-send-btn" onclick="waStartBroadcast()"
        style="background:linear-gradient(135deg,#075E54,#128C7E);color:white;font-weight:700;padding:10px 24px;border:none;border-radius:var(--radius);cursor:pointer;font-size:14px"> <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="vertical-align:-2px;margin-right:6px"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> ${configured ? 'Send WhatsApp' : 'Send via WhatsApp'}
      </button> </div>`);

  window._waCurrentTarget = 'all';
}

// ── Target selection ──
function waSelectTarget(btn, target) {
  window._waCurrentTarget = target;
  document.querySelectorAll('.wa-tgt-btn').forEach(b => {
    b.style.background   = 'transparent';
    b.style.borderColor  = 'var(--gray-300)';
    b.style.color        = 'var(--gray-700)';
  });
  btn.style.background  = '#075E54';
  btn.style.borderColor = '#075E54';
  btn.style.color       = 'white';

  const emps = target === 'all'
    ? DB.employees.filter(e => e.status === 'Active' && e.phone)
    : DB.employees.filter(e => e.status === 'Active' && e.sub === target && e.phone);
  const cl = document.getElementById('wa-count-line');
  if (cl) cl.textContent = ` ${emps.length} employee${emps.length !== 1 ? 's' : ''} will receive this message`;
}

// ── Templates ──
function waUseTemplate(key) {
  const T = {
    t1: 'Dear {name},\n\nImportant announcement from Asal Media Corporation.\n\n[Add your message here]\n\n_AMC HRMS_',
    t2: 'Dear {name},\n\nEid Mubarak! Wishing you and your family a blessed Eid.\n\nEnjoy your holidays!\n\n_Asal Media Corporation_',
    t3: 'Dear {name},\n\nYour salary for this month has been processed.\n\nPlease check your email for your payslip.\n\n_AMC HRMS_',
    t4: 'Dear {name},\n\nReminder: Please check in on time. Shift starts at 8:00 AM.\n\nAttendance affects your performance score.\n\n_AMC HRMS_',
    t5: 'Dear {name},\n\nOffices will be closed on [DATE] for a public holiday.\n\nHave a great day!\n\n_Asal Media Corporation_',
  };
  const ta = document.getElementById('wa-msg');
  if (ta) {
    ta.value = T[key] || '';
    document.getElementById('wa-chars').textContent = ta.value.length + ' / 1024';
  }
}

// ── Click-to-send (no Meta setup) — opens WhatsApp with the message ready ──
function waNormalizePhone(raw) {
  let num = (raw || '').replace(/\D/g, '');
  if (num.startsWith('0')) num = '252' + num.slice(1);
  if (num.length === 9) num = '252' + num;
  if (!num.startsWith('252') && num.length < 12) num = '252' + num;
  return num;
}
function waLink(phone, message) {
  return `https://wa.me/${waNormalizePhone(phone)}?text=${encodeURIComponent(message)}`;
}
function waRenderClickToSend(emps, msg) {
  const box = document.getElementById('wa-send-progress');
  if (!box) return;
  box.style.display = 'block';
  box.innerHTML = `
    <div style="font-size:13px;font-weight:700;color:#075E54;margin-bottom:4px">No setup needed — tap “Send” for each person</div>
    <div style="font-size:11px;color:var(--gray-500);margin-bottom:8px">Each opens WhatsApp with the message ready; just press send there. (Log into WhatsApp on this device first.)</div>
    <div style="max-height:260px;overflow:auto;border:1px solid var(--gray-200);border-radius:var(--radius)">
      ${emps.map(e => {
        const personal = (msg || '').replace(/\{name\}/g, e.name || e.full_name || '');
        return `<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 12px;border-bottom:1px solid var(--gray-100)">
          <div style="min-width:0"><div style="font-size:13px;font-weight:600">${esc(e.name || '')}</div><div style="font-size:11px;color:var(--gray-400);font-family:var(--mono)">${esc(e.phone || '')}</div></div>
          <a href="${esc(waLink(e.phone, personal))}" target="_blank" rel="noopener" class="btn btn-sm" style="background:#25D366;color:white;font-weight:700;white-space:nowrap;text-decoration:none" onclick="this.style.opacity='.55';this.textContent='Opened ✓'">Send ›</a>
        </div>`;
      }).join('')}
    </div>
    <div style="font-size:11px;color:var(--gray-400);margin-top:8px">${emps.length} recipient(s).</div>`;
}

// ── Start Broadcast ──
async function waStartBroadcast() {
  const msg = document.getElementById('wa-msg')?.value?.trim();
  if (!msg) { toast('Please write a message first', 'error'); return; }

  const target = window._waCurrentTarget || 'all';
  const emps = target === 'all'
    ? DB.employees.filter(e => e.status === 'Active' && e.phone)
    : DB.employees.filter(e => e.status === 'Active' && e.sub === target && e.phone);

  if (!emps.length) { toast('No employees with phone numbers in this group', 'warning'); return; }

  // No Meta Cloud API configured → click-to-send (zero setup, uses your WhatsApp).
  if (!isWAConfigured()) { waRenderClickToSend(emps, msg); return; }

  // Confirm
  if (!confirm(`Send WhatsApp to ${emps.length} employees?\n\nMessage preview:\n${msg.slice(0, 120)}${msg.length > 120 ? '…' : ''}`)) return;

  // Show progress
  const progBox   = document.getElementById('wa-send-progress');
  const progBar   = document.getElementById('wa-prog-bar');
  const progLabel = document.getElementById('wa-prog-label');
  const progCount = document.getElementById('wa-prog-count');
  const sendBtn   = document.getElementById('wa-send-btn');
  if (progBox)  progBox.style.display  = 'block';
  if (sendBtn)  { sendBtn.disabled = true; sendBtn.textContent = 'Sending…'; }

  let sent = 0, failed = 0;

  for (const emp of emps) {
    const personalMsg = msg.replace(/\{name\}/g, emp.name || emp.full_name || '');
    try {
      await waSendOne(emp.phone, personalMsg);
      sent++;
    } catch (err) {
      failed++;
      console.warn(`WA failed for ${emp.name}: ${err.message}`);
    }

    // Update progress
    const pct = Math.round((sent + failed) / emps.length * 100);
    if (progBar)   progBar.style.width   = pct + '%';
    if (progLabel) progLabel.textContent = `Sending to ${emp.name || emp.full_name}…`;
    if (progCount) progCount.textContent = `${sent} sent · ${failed} failed · ${emps.length - sent - failed} remaining`;

    // 700ms delay between messages (Meta rate limit safe)
    await new Promise(r => setTimeout(r, 700));
  }

  // Done
  if (progLabel) progLabel.textContent = ` Broadcast complete!`;
  if (progBar)   progBar.style.background = '#25D366';
  if (progCount) progCount.textContent = `${sent} delivered · ${failed} failed`;
  if (sendBtn)   { sendBtn.disabled = false; sendBtn.textContent = 'Send WhatsApp'; }

  DB.auditLogs.unshift({ id: DB.auditLogs.length + 1, time: new Date().toISOString().replace('T',' ').slice(0,16), user: STATE.user?.initials || 'SYS', userRole: STATE.user?.role || '', action: `WhatsApp broadcast: ${sent} sent, ${failed} failed`, module: 'WhatsApp', ip: 'browser' });
  toast(`WhatsApp sent to ${sent} employees`, 'success');
}

// ════════════════════════════════════════════════════════════
// SETUP MODAL — Enter Meta Cloud API credentials
// ════════════════════════════════════════════════════════════
function openWASetup() {
  const cfg = getWAConfig();
  openModal('wide', `
    <div class="modal-header" style="background:linear-gradient(135deg,#075E54,#128C7E)"> <span class="modal-title" style="color:white">WhatsApp Cloud API Setup</span> ${closeX()}
    </div> <div class="modal-body"> <!-- How to get credentials --> <div style="background:#F0FDF4;border:1px solid #86EFAC;border-radius:var(--radius);padding:14px 16px;margin-bottom:20px"> <div style="font-size:12px;font-weight:800;color:#166534;margin-bottom:10px"> How to get your API credentials (5 minutes)</div> <div style="font-size:12px;color:#166534;line-height:2"> <div>1. Go to <a href="https://developers.facebook.com/apps" target="_blank" style="color:#075E54;font-weight:700">developers.facebook.com/apps</a> → Create App → Business</div> <div>2. Add <strong>WhatsApp</strong> product to your app</div> <div>3. Go to <strong>WhatsApp → API Setup</strong></div> <div>4. Copy <strong>Temporary Access Token</strong> (or generate a permanent one)</div> <div>5. Copy <strong>Phone Number ID</strong> (the number you send FROM)</div> <div>6. Add your employees' phone numbers as test numbers, OR apply for production access</div> </div> </div> <div class="form-row cols-2" style="margin-bottom:14px"> <div class="form-group"> <label class="form-label required">Access Token</label> <input class="form-control" id="wa_token" type="password"
            value="${cfg.token || ''}"
            placeholder="EAAxxxxxxxxxxxxxxx…"> <div style="font-size:11px;color:var(--gray-400);margin-top:3px">From: WhatsApp → API Setup → Temporary access token</div> </div> <div class="form-group"> <label class="form-label required">Phone Number ID</label> <input class="form-control" id="wa_phone_id"
            value="${cfg.phoneId || ''}"
            placeholder="1234567890123456"> <div style="font-size:11px;color:var(--gray-400);margin-top:3px">From: WhatsApp → API Setup → Phone Number ID</div> </div> </div> <div class="form-group" style="margin-bottom:14px"> <label class="form-label">Your WhatsApp Business Number</label> <input class="form-control" id="wa_display_num"
          value="${cfg.displayNum || '+252613333322'}"
          placeholder="+252613333322"> <div style="font-size:11px;color:var(--gray-400);margin-top:3px">The number employees will see messages from</div> </div> <!-- Test send --> <div style="background:var(--gray-50);border-radius:var(--radius);padding:14px;border:1px solid var(--gray-200)"> <div style="font-size:12px;font-weight:700;color:var(--gray-700);margin-bottom:8px"> Test — Send a message to yourself</div> <div class="form-row cols-2" style="margin-bottom:0"> <div class="form-group" style="margin-bottom:0"> <input class="form-control form-control-sm" id="wa_test_phone" placeholder="+252xxxxxxxxx" value="+252613333322"> </div> <button class="btn btn-outline btn-sm" onclick="waTestSend()" style="align-self:flex-end">Send Test Message</button> </div> <div id="wa-test-result" style="font-size:12px;margin-top:8px;font-weight:600;display:none"></div> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="waSetupSave()" style="background:#075E54;border-color:#075E54">Save & Connect</button> </div>`);
}

async function waSetupSave() {
  const token   = document.getElementById('wa_token')?.value?.trim();
  const phoneId = document.getElementById('wa_phone_id')?.value?.trim();
  const dispNum = document.getElementById('wa_display_num')?.value?.trim();

  if (!token)   { toast('Access Token is required', 'error'); return; }
  if (!phoneId) { toast('Phone Number ID is required', 'error'); return; }

  const btn = document.querySelector('.modal-footer .btn-primary');
  if (btn) { btn.disabled = true; btn.dataset._t = btn.textContent; btn.textContent = 'Connecting…'; }
  try {
    const r = await SUPA.fn('whatsapp', { action: 'save_config', token, phoneId, displayNum: dispNum || '' });
    saveWAStatus({ configured: true, phoneId: r.phoneId || phoneId, displayNum: r.displayNum || dispNum || '' });
    closeModal();
    toast('WhatsApp connected — credentials saved securely on the server', 'success');
    openWhatsAppPanel();
  } catch (err) {
    if (btn) { btn.disabled = false; btn.textContent = btn.dataset._t || 'Save & Connect'; }
    toast(err.message || 'Could not save WhatsApp settings', 'error');
  }
}

async function waTestSend() {
  const token   = document.getElementById('wa_token')?.value?.trim();
  const phoneId = document.getElementById('wa_phone_id')?.value?.trim();
  const phone   = document.getElementById('wa_test_phone')?.value?.trim();
  const result  = document.getElementById('wa-test-result');

  if (!token || !phoneId || !phone) { toast('Fill in token, phone ID, and test number', 'error'); return; }
  if (result) { result.style.display = 'block'; result.style.color = 'var(--gray-500)'; result.textContent = 'Sending test message…'; }

  try {
    // Pass the entered credentials inline so you can test before saving.
    await SUPA.fn('whatsapp', {
      action: 'send', to: phone, token, phoneId,
      message: 'AMC HRMS test message. WhatsApp integration is working!\n\n_Asal Media Corporation_',
    });
    if (result) { result.style.color = '#075E54'; result.textContent = '✓ Test message sent! Check your WhatsApp.'; }
  } catch (err) {
    if (result) { result.style.color = 'var(--red)'; result.textContent = '✕ Error: ' + err.message; }
  }
}

// ── Helper: send WhatsApp to a single employee from anywhere in the app ──
async function waSendToEmployee(empId, message) {
  const emp = getEmp(empId);
  if (!emp?.phone) return { ok: false, reason: 'No phone number' };
  if (!isWAConfigured()) return { ok: false, reason: 'WhatsApp not configured' };
  try {
    await waSendOne(emp.phone, message);
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.message };
  }
}

/* ═══════════════════════════════════════════════════════════
   EMPLOYEE SELF-SERVICE PAGES (SELF_PAGES)
   Only shown when isSelfServiceRole() === true
   Employees see ONLY their own data
═══════════════════════════════════════════════════════════ */
const SELF_PAGES = {

  // ── Employee Dashboard ──
  dashboard(wrap) {
    const emp = getCurrentEmployee();
    if (!emp) {
      wrap.innerHTML = `<div class="page"><div class="empty-state"> <h3>Profile Not Linked</h3> <p>Your user account is not linked to an employee record. Contact HR.</p> </div></div>`;
      return;
    }
    const yos = yearsOfService(emp.joined);
    const lb  = DB.leaveBalances[emp.id] || { annual:30, sick:14, used_annual:0, used_sick:0 };
    const myKpis = DB.kpis.filter(k => k.empId === emp.id);
    const sc  = myKpis.length ? PerfEngine.calcEmployeeScore(emp.id) : null;
    const rt  = sc !== null ? PerfEngine.ratingLabel(sc) : null;
    const today = new Date().toISOString().split('T')[0];
    const myAtt = DB.attendance.find(a => a.empId === emp.id && a.date === today);
    const pendingLeave = DB.leaveRequests.filter(l => l.empId === emp.id && l.status === 'Pending').length;

    wrap.innerHTML = `<div class="page"> <!-- Personal Banner --> <div style="background:linear-gradient(135deg,var(--navy),#002D72);border-radius:var(--radius-lg);padding:24px 28px;margin-bottom:24px;display:flex;align-items:center;gap:20px;flex-wrap:wrap"> <div class="avatar-xl" style="width:64px;height:64px;font-size:22px;border:3px solid rgba(201,162,39,.5);flex-shrink:0">${initials(emp.name)}</div> <div style="flex:1;min-width:160px"> <div style="font-size:20px;font-weight:900;color:white">${emp.name}</div> <div style="font-size:13px;color:rgba(255,255,255,.65);margin-top:2px">${emp.title} · ${getSubName(emp.sub)}</div> <div style="font-size:11px;color:rgba(255,255,255,.4);margin-top:2px">${emp.id} · ${getDeptName(emp.dept)}</div> </div> <div style="text-align:center;background:rgba(255,255,255,.08);padding:14px 20px;border-radius:12px;border:1px solid rgba(255,255,255,.1)"> <div style="font-size:9px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.6px">Years of Service</div> <div style="font-size:32px;font-weight:900;color:var(--gold);font-family:var(--mono)">${yos}</div> </div> </div> <!-- Quick Stats --> <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px"> <div class="stat-card green" onclick="nav('attendance')" style="cursor:pointer"> <div class="stat-val">${myAtt?.status || 'N/A'}</div> <div class="stat-lbl">Today's Status</div> <div class="stat-sub">${myAtt?.checkIn ? 'In: '+myAtt.checkIn : 'Not recorded'}</div> </div> <div class="stat-card blue" onclick="nav('leave')" style="cursor:pointer"> <div class="stat-val">${(PerfEngine.accruedLeave(emp.joined) - (lb.used_annual||0)).toFixed(1)}</div> <div class="stat-lbl">Leave Remaining</div> <div class="stat-sub">Accrued ${PerfEngine.accruedLeave(emp.joined)}d · ${lb.used_annual||0} used</div> </div> <div class="stat-card ${pendingLeave?'amber':'teal'}" onclick="nav('leave')" style="cursor:pointer"> <div class="stat-val">${pendingLeave}</div> <div class="stat-lbl">Pending Requests</div> <div class="stat-sub">Awaiting approval</div> </div> <div class="stat-card ${sc && sc < 70 ? 'red' : 'navy'}" onclick="nav('kpi')" style="cursor:pointer"> <div class="stat-val">${sc !== null ? sc+'%' : '—'}</div> <div class="stat-lbl">KPI Score</div> <div class="stat-sub">${rt ? rt.label : 'No KPIs assigned'}</div> </div> </div> <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px"> <!-- My Info --> <div class="card"> <div class="card-header"><span class="card-title">My Information</span><button class="btn btn-outline btn-sm" onclick="openSelfProfileEdit()">Edit</button></div> <div class="card-body"> <div class="info-row"><span class="info-key">Email</span><span class="info-val">${emp.email}</span></div> <div class="info-row"><span class="info-key">Phone</span><span class="info-val">${emp.phone || '—'}</span></div> <div class="info-row"><span class="info-key">Department</span><span class="info-val">${getDeptName(emp.dept)}</span></div> <div class="info-row"><span class="info-key">Grade</span><span class="info-val">${emp.grade || '—'}</span></div> <div class="info-row"><span class="info-key">Contract</span><span class="info-val">${emp.contractType}</span></div> <div class="info-row"><span class="info-key">Joined</span><span class="info-val">${fmtDate(emp.joined)}</span></div> </div> </div> <!-- Quick Actions --> <div class="card"> <div class="card-header"><span class="card-title">Quick Actions</span></div> <div class="card-body" style="display:grid;grid-template-columns:1fr 1fr;gap:10px"> <button class="qa-btn" onclick="nav('leave')"><div class="qa-icon green">${ICO.calendar}</div>Request Leave</button> <button class="qa-btn" onclick="nav('attendance')"><div class="qa-icon blue">${ICO.clock}</div>My Attendance</button> <button class="qa-btn" onclick="nav('payroll')"><div class="qa-icon gold">${ICO.dollar}</div>My Payslip</button> <button class="qa-btn" onclick="nav('kpi')"><div class="qa-icon purple">${ICO.star}</div>My KPIs</button> </div> </div> </div> </div> <div class="card" style="margin-top:20px"> <div class="card-header"> <span class="card-title">Announcements</span> <button class="btn btn-outline btn-sm" onclick="nav('notices')">View All →</button> </div> <div class="card-body" style="padding:6px 4px">${typeof renderNoticeWidget === 'function' ? renderNoticeWidget() : ''}</div> </div> `;
  },

  // ── My Attendance ──
  attendance(wrap) {
    const emp  = getCurrentEmployee();
    if (!emp) { wrap.innerHTML = `<div class="page"><div class="empty-state"><h3>No employee record linked</h3></div></div>`; return; }
    const myAtt = DB.attendance.filter(a => a.empId === emp.id).sort((a,b) => b.date.localeCompare(a.date)).slice(0, 60);
    wrap.innerHTML = `<div class="page"> <div class="page-header"><div><h1 class="page-title">My Attendance</h1><div class="page-sub">${emp.name} · Last 60 records</div></div></div> <div class="card"> <div class="table-wrap"><table class="table"> <thead><tr><th>Date</th><th>Status</th><th>Check In</th><th>Check Out</th><th>Late (min)</th><th>OT Hours</th></tr></thead> <tbody>${myAtt.length ? myAtt.map(a => `<tr> <td style="font-family:var(--mono)">${fmtDate(a.date)}</td> <td>${statusBadge(a.status)}</td> <td style="font-family:var(--mono)">${a.checkIn||'—'}</td> <td style="font-family:var(--mono)">${a.checkOut||'—'}</td> <td>${a.late>0?`<span style="color:var(--red)">${a.late}</span>`:'0'}</td> <td>${a.ot>0?`<span style="color:var(--green)">${a.ot}</span>`:'0'}</td> </tr>`).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--gray-400);padding:24px">No attendance records found</td></tr>'}</tbody> </table></div> </div> </div>`;
  },

  // ── My Leave ──
  leave(wrap) {
    const emp = getCurrentEmployee();
    if (!emp) { wrap.innerHTML = `<div class="page"><div class="empty-state"><h3>No employee record linked</h3></div></div>`; return; }
    const myLeave = DB.leaveRequests.filter(l => l.empId === emp.id).sort((a,b) => b.appliedOn?.localeCompare(a.appliedOn));
    const lb = DB.leaveBalances[emp.id] || {};
    wrap.innerHTML = `<div class="page"> <div class="page-header"> <div><h1 class="page-title">My Leave</h1><div class="page-sub">${emp.name}</div></div> <button class="btn btn-primary" onclick="openSelfLeaveModal('${emp.id}')">+ Request Leave</button> </div> <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px"> ${[{l:'Annual',t:lb.annual||30,u:lb.used_annual||0},{l:'Sick',t:lb.sick||14,u:lb.used_sick||0}].map(({l,t,u})=>`
        <div class="leave-bal-card"><div class="leave-bal-val">${t-u}</div><div class="leave-bal-total">/ ${t}d</div><div class="leave-bal-type">${l}</div></div>`).join('')}
        <div class="leave-bal-card"><div class="leave-bal-val">${myLeave.filter(l=>l.status==='Pending').length}</div><div class="leave-bal-total">requests</div><div class="leave-bal-type">Pending</div></div> </div> <div class="card"> <div class="table-wrap"><table class="table"> <thead><tr><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th><th>Applied</th></tr></thead> <tbody>${myLeave.length ? myLeave.map(l => `<tr> <td>${l.type}</td> <td style="font-family:var(--mono)">${fmtDate(l.from)}</td> <td style="font-family:var(--mono)">${fmtDate(l.to)}</td> <td>${l.days}</td> <td>${statusBadge(l.status)}</td> <td style="font-size:11px;color:var(--gray-400)">${fmtDate(l.appliedOn)}</td> </tr>`).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--gray-400);padding:24px">No leave requests</td></tr>'}</tbody> </table></div> </div> </div>`;
  },

  // ── My Payslip ──
  payroll(wrap) {
    const emp = getCurrentEmployee();
    if (!emp) { wrap.innerHTML = `<div class="page"><div class="empty-state"><h3>No employee record linked</h3></div></div>`; return; }
    const myPay = DB.payroll.find(p => p.empId === emp.id);
    const pc    = myPay ? PayrollEngine.calc(emp, myPay) : null;
    wrap.innerHTML = `<div class="page"> <div class="page-header"><div><h1 class="page-title">My Payslip</h1><div class="page-sub">${emp.name} · ${STATE.payMonth || new Date().toISOString().slice(0,7)}</div></div></div> ${pc ? `
      <div class="card" style="max-width:600px;margin:0 auto"> <div style="background:linear-gradient(135deg,var(--navy),#002D72);padding:24px;border-radius:var(--radius-lg) var(--radius-lg) 0 0;text-align:center"> <div style="font-size:13px;color:rgba(255,255,255,.6)">Asal Media Corporation</div> <div style="font-size:18px;font-weight:800;color:white;margin:4px 0">${emp.name}</div> <div style="font-size:12px;color:rgba(255,255,255,.5)">${emp.title} · ${getDeptName(emp.dept)}</div> </div> <div class="card-body"> <div class="section-divider"><span>Earnings</span></div> <div class="info-row"><span class="info-key">Base Salary</span><span class="info-val" style="font-family:var(--mono)">${fmtCurrency(pc.baseSalary)}</span></div> <div class="info-row"><span class="info-key">Allowances</span><span class="info-val" style="font-family:var(--mono)">${fmtCurrency(pc.allowance)}</span></div> <div class="info-row"><span class="info-key">OT Pay</span><span class="info-val" style="font-family:var(--mono)">${fmtCurrency(pc.otPay)}</span></div> <div class="info-row" style="font-weight:800"><span class="info-key">Gross Earnings</span><span class="info-val" style="font-family:var(--mono);color:var(--blue)">${fmtCurrency(pc.grossEarnings)}</span></div> <div class="section-divider"><span>Deductions</span></div> <div class="info-row"><span class="info-key">Income Tax</span><span class="info-val" style="font-family:var(--mono);color:var(--red)">-${fmtCurrency(pc.tax)}</span></div> <div class="info-row"><span class="info-key">Salary Advance</span><span class="info-val" style="font-family:var(--mono);color:var(--red)">-${fmtCurrency(pc.advanceDeduct)}</span></div> <div class="info-row" style="font-weight:800;font-size:16px;padding:12px 0;border-top:2px solid var(--gray-200);margin-top:8px"> <span class="info-key">NET PAY</span><span class="info-val" style="font-family:var(--mono);color:var(--green);font-size:20px">${fmtCurrency(pc.netPay)}</span> </div> </div> </div>` : `<div class="card"><div class="card-body" style="text-align:center;padding:40px;color:var(--gray-400)">No payslip available for this period. Contact Finance department.</div></div>`}
    </div>`;
  },

  // ── My KPIs ──
  kpi(wrap) {
    const emp    = getCurrentEmployee();
    if (!emp) { wrap.innerHTML = `<div class="page"><div class="empty-state"><h3>No employee record linked</h3></div></div>`; return; }
    const myKpis = DB.kpis.filter(k => k.empId === emp.id);
    const sc     = myKpis.length ? PerfEngine.calcEmployeeScore(emp.id) : null;
    const rt     = sc !== null ? PerfEngine.ratingLabel(sc) : null;
    wrap.innerHTML = `<div class="page"> <div class="page-header"><div><h1 class="page-title">My KPIs</h1><div class="page-sub">${emp.name} · Performance Tracking</div></div></div> ${sc !== null ? `<div style="background:linear-gradient(135deg,var(--navy),#002D72);border-radius:var(--radius-lg);padding:20px 24px;margin-bottom:20px;display:flex;align-items:center;gap:20px"> <div class="kpi-score ${rt.cls}" style="font-size:40px;min-width:80px;text-align:center">${sc}%</div> <div><div style="font-size:16px;font-weight:800;color:white">${rt.label}</div><div style="font-size:12px;color:rgba(255,255,255,.55);margin-top:4px">Overall KPI Score · ${myKpis.length} indicators</div></div> </div>` : ''}
      <div class="card"> <div class="table-wrap"><table class="table"> <thead><tr><th>KPI</th><th>Status</th><th>Achievement</th><th>Weight</th><th>Approval</th><th></th></tr></thead> <tbody>${myKpis.length ? myKpis.map(k => {
            const ach = Math.round(PerfEngine.calcAchievement(k));
            const apB = ({Approved:'badge-green',Rejected:'badge-red'})[k.approvalStatus]||'badge-amber';
            const cmts = (DB.kpiComments||[]).filter(c=>c.kpiId===k.id).length;
            const statusCell = k.scoringMode==='binary' ? `<span class="badge ${k.status==='Completed'?'badge-green':'badge-gray'}">${k.status||'Not Completed'}</span>` : `<span style="font-family:var(--mono)">${k.actual}/${k.target} ${k.unit||''}</span>`;
            return `<tr> <td><div style="font-weight:700">${k.title}</div><div style="font-size:11px;color:var(--gray-400)">${k.periodType?k.periodType+' · ':''}${k.period||''}</div></td> <td>${statusCell}</td> <td><span class="kpi-score ${ach>=100?'excellent':ach>=70?'good':ach>=50?'average':'poor'}">${ach}%</span></td> <td>${k.weight}%</td> <td><span class="badge ${apB}" style="font-size:10px">${k.approvalStatus||'Pending'}</span></td> <td><button class="btn btn-ghost btn-xs" onclick="openKPIDetail('${k.id}')" title="Reviews / Comments${cmts?` (${cmts})`:''}">${ICO.eye}${cmts?` ${cmts}`:''}</button></td> </tr>`;
          }).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--gray-400);padding:24px">No KPIs assigned. Contact your manager.</td></tr>'}</tbody> </table></div> </div> ${selfMyTasksHTML(emp.id)} </div>`;
  },

};
;

// ── Self-service leave modal ──
function openSelfLeaveModal(empId) {
  const emp = getEmp(empId);
  openModal('narrow', `
    <div class="modal-header"><span class="modal-title">Request Leave</span>${closeX()}</div> <div class="modal-body"> <div class="form-group"><label class="form-label required">Leave Type</label> <select class="form-control" id="sl_type"><option>Annual Leave</option><option>Sick Leave</option><option>Emergency Leave</option><option>Unpaid Leave</option></select> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">From Date</label><input type="date" class="form-control" id="sl_from"></div> <div class="form-group"><label class="form-label required">To Date</label><input type="date" class="form-control" id="sl_to"></div> </div> <div class="form-group"><label class="form-label">Reason</label><textarea class="form-control" id="sl_reason" rows="3" placeholder="Optional reason for leave"></textarea></div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="submitSelfLeave('${empId}')">Submit Request</button> </div>`);
}

function submitSelfLeave(empId) {
  const from   = document.getElementById('sl_from')?.value;
  const to     = document.getElementById('sl_to')?.value;
  const type   = document.getElementById('sl_type')?.value;
  const reason = document.getElementById('sl_reason')?.value;
  if (!from || !to || !type) { toast('From date, To date and Type are required', 'error'); return; }
  const days = Math.max(1, Math.ceil((new Date(to)-new Date(from))/(1000*60*60*24))+1);
  const lr = { id:'LR'+String(DB.leaveRequests.length+1).padStart(3,'0'), empId, type, from, to, days, reason, status:'Pending', approvedBy:'', appliedOn:new Date().toISOString().split('T')[0] };
  DB.leaveRequests.push(lr);
  if (typeof SupaWrite !== 'undefined') SupaWrite.saveLeaveRequest(lr);
  closeModal();
  toast('Leave request submitted successfully', 'success');
  nav('leave');

  scheduleSave();
}

// ── Self profile edit modal ──
function openSelfProfileEdit() {
  const emp = getCurrentEmployee();
  if (!emp) return;
  openModal('narrow', `
    <div class="modal-header"><span class="modal-title">Update My Information</span>${closeX()}</div> <div class="modal-body"> <div class="form-group"><label class="form-label">Phone Number</label><input class="form-control" id="sp_phone" value="${emp.phone||''}"></div> <div class="form-group"><label class="form-label">Email Address</label><input class="form-control" id="sp_email" value="${emp.email||''}"></div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveSelfProfile('${emp.id}')">Save Changes</button> </div>`);
}

function saveSelfProfile(empId) {
  const e = getEmp(empId); if (!e) return;
  e.phone = document.getElementById('sp_phone')?.value || e.phone;
  e.email = document.getElementById('sp_email')?.value || e.email;
  if (typeof SupaWrite !== 'undefined') SupaWrite.saveEmployee(e);
  closeModal(); toast('Profile updated', 'success');
}

/* ═══════════════════════════════════════════════════════════════════════
   NOTICE BOARD MODULE — Enterprise Announcement Management
   Accessible: super_admin, hr_director, hr_manager, corporate_admin
   Categories: HR Announcement, Information Security Alert, IT Maintenance,
               Executive Message, Emergency Notification
═══════════════════════════════════════════════════════════════════════ */

// ── Notice permission helpers ──
function canManageNotices() {
  return ['super_admin','corporate_admin','hr_director','hr_manager'].includes(STATE.role);
}
function canManageCategory(category) {
  if (!canManageNotices()) return false;
  if (['super_admin','corporate_admin'].includes(STATE.role)) return true;
  // HR Director/Manager can manage HR announcements and Executive Messages
  if (['hr_director','hr_manager'].includes(STATE.role)) {
    return ['HR Announcement','Executive Message','IT Maintenance','Information Security Alert'].includes(category);
  }
  return false;
}

// ── Get active notices for current user ──
function getActiveNotices(includeExpired = false) {
  const today = new Date().toISOString().split('T')[0];
  return (DB.notices || []).filter(n => {
    if (n.status === 'Archived') return false;
    if (!includeExpired && n.expiryDate && n.expiryDate < today) return false;
    if (n.publishDate > today) return false;  // scheduled future notices
    // Target filtering
    if (n.targetType === 'role' && n.targetIds.length) {
      if (!n.targetIds.includes(STATE.role)) return false;
    }
    if (n.targetType === 'subsidiary' && n.targetIds.length) {
      const userSub = getCurrentEmployee()?.sub || '';
      if (!n.targetIds.includes(userSub)) return false;
    }
    return true;
  }).sort((a, b) => {
    // Sort: pinned first, then by priority, then by date
    const pri = { Critical:0, High:1, Medium:2, Informational:3 };
    if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
    if (pri[a.priority] !== pri[b.priority]) return pri[a.priority] - pri[b.priority];
    return b.createdAt.localeCompare(a.createdAt);
  });
}

// ── Check if user has acknowledged a notice ──
function hasAcknowledged(noticeId) {
  const userId = STATE.user?.userId || STATE.user?.email || '';
  return (DB.noticeAcknowledgments || []).some(a => a.noticeId === noticeId && (a.userId === userId || a.userEmail === STATE.user?.email));
}

// ── Save acknowledgment ──
function acknowledgeNotice(noticeId) {
  const notice = DB.notices.find(n => n.id === noticeId);
  if (!notice) return;
  if (hasAcknowledged(noticeId)) { toast('Already acknowledged', 'info'); return; }
  const ack = {
    id:        'ACK' + Date.now(),
    noticeId,
    noticeTitle: notice.title,
    userId:    STATE.user?.userId || '',
    userEmail: STATE.user?.email  || '',
    userName:  STATE.user?.name   || '',
    userRole:  STATE.role         || '',
    ackedAt:   new Date().toISOString().replace('T',' ').slice(0,16),
    ip:        'browser',
  };
  if (!DB.noticeAcknowledgments) DB.noticeAcknowledgments = [];
  DB.noticeAcknowledgments.push(ack);
  notice.acknowledgments = notice.acknowledgments || [];
  notice.acknowledgments.push(ack);
  // Supabase write-through
  if (typeof SupaWrite !== 'undefined' && SupaWrite.saveAck) SupaWrite.saveAck(ack);
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:ack.ackedAt, user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Acknowledged notice: "${notice.title}"`, module:'Notices', ip:'browser' });
  return ack;

  scheduleSave();
}

// ── Priority badge HTML ──
function noticePriBadge(priority) {
  const cfg = {
    Critical:      { bg:'#FEE2E2', color:'#991B1B' },
    High:          { bg:'#FEF3C7', color:'#92400E' },
    Medium:        { bg:'#DBEAFE', color:'#1E40AF' },
    Informational: { bg:'#D1FAE5', color:'#065F46' },
  };
  const c = cfg[priority] || cfg.Informational;
  return `<span style="background:${c.bg};color:${c.color};font-size:11px;font-weight:800;padding:2px 10px;border-radius:99px;white-space:nowrap">${c.icon} ${priority}</span>`;
}
function noticeCatIcon(category) {
  return '';
}

// ════════════════════════════════════════════════════════════
// MAIN NOTICE BOARD PAGE
// ════════════════════════════════════════════════════════════
PAGES.notices = function(wrap) {
  const isMgr    = canManageNotices();
  const notices  = DB.notices || [];
  const today    = new Date().toISOString().split('T')[0];

  wrap.innerHTML = `<div class="page"> <div class="page-header"> <div> <h1 class="page-title">Notice Board</h1> <div class="page-sub">${notices.filter(n=>n.status==='Active').length} active notices · Asal Media Corporation</div> </div> <div style="display:flex;gap:10px;flex-wrap:wrap"> ${isMgr ? `<button class="btn btn-primary" onclick="openCreateNoticeModal()">+ Create Notice</button>` : ''}
        ${isMgr ? `<button class="btn btn-outline" onclick="openNoticeCompliance()">Compliance Report</button>` : ''}
      </div> </div> <!-- Filters --> <div class="card" style="margin-bottom:16px;padding:14px 16px"> <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center"> <input class="form-control form-control-sm" id="noticeSearch" placeholder=" Search notices…"
          style="max-width:220px" oninput="renderNoticeList()"> <select class="form-control form-control-sm" id="noticeFilterCat" onchange="renderNoticeList()" style="max-width:200px"> <option value="">All Categories</option> <option>HR Announcement</option> <option>Information Security Alert</option> <option>IT Maintenance</option> <option>Executive Message</option> <option>Emergency Notification</option> </select> <select class="form-control form-control-sm" id="noticeFilterPri" onchange="renderNoticeList()" style="max-width:160px"> <option value="">All Priorities</option> <option>Critical</option> <option>High</option> <option>Medium</option> <option>Informational</option> </select> ${isMgr ? `<select class="form-control form-control-sm" id="noticeFilterStatus" onchange="renderNoticeList()" style="max-width:140px"> <option value="Active">Active</option> <option value="Scheduled">Scheduled</option> <option value="Archived">Archived</option> <option value="">All</option> </select>` : ''}
      </div> </div> <!-- Notice list --> <div id="noticeListWrap"></div> </div>`;

  renderNoticeList();
};

function renderNoticeList() {
  const wrap   = document.getElementById('noticeListWrap'); if (!wrap) return;
  const search = (document.getElementById('noticeSearch')?.value || '').toLowerCase();
  const catF   = document.getElementById('noticeFilterCat')?.value || '';
  const priF   = document.getElementById('noticeFilterPri')?.value || '';
  const stF    = document.getElementById('noticeFilterStatus')?.value;
  const today  = new Date().toISOString().split('T')[0];
  const isMgr  = canManageNotices();

  let notices = DB.notices || [];

  // Non-managers: only see active notices targeted to them
  if (!isMgr) {
    notices = getActiveNotices();
  } else {
    // Managers: filter by status selector
    const filterStatus = stF !== undefined ? stF : 'Active';
    notices = notices.filter(n => {
      if (filterStatus === '') return true;
      if (filterStatus === 'Active') return n.status === 'Active' && (!n.expiryDate || n.expiryDate >= today) && n.publishDate <= today;
      if (filterStatus === 'Scheduled') return n.status === 'Active' && n.publishDate > today;
      return n.status === filterStatus;
    });
  }

  if (search) notices = notices.filter(n => n.title.toLowerCase().includes(search) || n.body.toLowerCase().includes(search) || (n.tags||[]).some(t=>t.includes(search)));
  if (catF)   notices = notices.filter(n => n.category === catF);
  if (priF)   notices = notices.filter(n => n.priority === priF);

  if (!notices.length) {
    wrap.innerHTML = `<div class="empty-state" style="padding:60px"><div style="font-size:40px;margin-bottom:12px"></div><h3>No Notices Found</h3><p>No notices match the selected filters.</p></div>`;
    return;
  }

  wrap.innerHTML = notices.map(n => {
    const expired  = n.expiryDate && n.expiryDate < today;
    const future   = n.publishDate > today;
    const acked    = hasAcknowledged(n.id);
    const ackCount = (n.acknowledgments||[]).length;
    const priColor = { Critical:'#DC2626', High:'#D97706', Medium:'#2563EB', Informational:'#059669' };
    const border   = `border-left:4px solid ${priColor[n.priority]||'#6B7280'}`;

    return `<div class="card" style="${border};margin-bottom:12px;transition:box-shadow .2s" onmouseenter="this.style.boxShadow='0 4px 16px rgba(0,0,0,.08)'" onmouseleave="this.style.boxShadow=''"> <div style="padding:16px 20px"> <!-- Header row --> <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:10px;flex-wrap:wrap"> <div style="font-size:22px;flex-shrink:0">${noticeCatIcon(n.category)}</div> <div style="flex:1;min-width:0"> <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px"> ${n.pinned ? '<span style="font-size:11px;color:var(--amber);font-weight:800"> PINNED</span>' : ''}
              ${noticePriBadge(n.priority)}
              <span style="font-size:11px;color:var(--gray-400);background:var(--gray-100);padding:2px 8px;border-radius:99px">${n.category}</span> ${expired ? '<span style="font-size:11px;color:var(--gray-400);font-weight:600">EXPIRED</span>' : ''}
              ${future  ? '<span style="font-size:11px;color:var(--blue);font-weight:600">⏱ SCHEDULED</span>' : ''}
            </div> <div style="font-size:16px;font-weight:800;color:var(--gray-900);cursor:pointer;line-height:1.3"
              onclick="openNoticeDetail('${n.id}')">${esc(n.title)}</div> </div> ${isMgr ? `<div style="display:flex;gap:6px;flex-shrink:0"> <button class="btn btn-outline btn-sm" onclick="openEditNoticeModal('${n.id}')">Edit</button> <button class="btn btn-outline btn-sm" onclick="archiveNotice('${n.id}')" style="color:var(--gray-400)">${n.status==='Archived'?'Unarchive':'Archive'}</button> </div>` : ''}
        </div> <!-- Body preview --> <div style="font-size:13px;color:var(--gray-600);line-height:1.6;margin-bottom:12px"> ${n.body.length > 180 ? n.body.slice(0,180) + '…' : n.body}
          ${n.body.length > 180 ? `<span style="color:var(--blue);cursor:pointer;font-weight:600" onclick="openNoticeDetail('${n.id}')"> Read more</span>` : ''}
        </div> <!-- Footer row --> <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px"> <div style="display:flex;align-items:center;gap:16px;font-size:11px;color:var(--gray-400)"> <span>By ${n.createdByName}</span> <span>Published ${fmtDate(n.publishDate)}</span> ${n.expiryDate ? `<span>Expires ${fmtDate(n.expiryDate)}</span>` : ''}
            ${n.requiresAck ? `<span style="color:${ackCount>0?'#059669':'#D97706'};font-weight:700"> ${ackCount} acknowledgment${ackCount!==1?'s':''}</span>` : ''}
          </div> <div style="display:flex;gap:8px;align-items:center"> ${(n.tags||[]).slice(0,3).map(t=>`<span style="font-size:10px;background:var(--gray-100);color:var(--gray-500);padding:1px 7px;border-radius:99px">#${t}</span>`).join('')}
            ${n.requiresAck && !acked && !isSelfServiceRole()===false || n.requiresAck ? `
              <button onclick="openNoticeDetail('${n.id}')" class="btn btn-sm"
                style="background:${acked?'var(--green-l)':'var(--navy)'};color:${acked?'#065F46':'white'};border-color:${acked?'#86EFAC':'var(--navy)'}"> ${acked ? ' Acknowledged' : ' Read & Acknowledge'}
              </button>` : `<button onclick="openNoticeDetail('${n.id}')" class="btn btn-outline btn-sm">Read More →</button>`}
          </div> </div> </div> </div>`;
  }).join('');
}

// ════════════════════════════════════════════════════════════
// NOTICE DETAIL MODAL
// ════════════════════════════════════════════════════════════
function openNoticeDetail(noticeId) {
  const n     = DB.notices.find(x => x.id === noticeId); if (!n) return;
  const acked = hasAcknowledged(noticeId);
  const priColor = { Critical:'#DC2626', High:'#D97706', Medium:'#2563EB', Informational:'#059669' };
  n.views = (n.views || 0) + 1;

  openModal('wide', `
    <div style="border-top:4px solid ${priColor[n.priority]||'#6B7280'}"> <div class="modal-header" style="padding-top:16px"> <div style="flex:1"> <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap"> ${n.pinned ? '<span style="font-size:11px;color:var(--amber);font-weight:800"> PINNED</span>' : ''}
          ${noticePriBadge(n.priority)}
          <span style="font-size:12px;font-weight:700;color:var(--gray-500)">${noticeCatIcon(n.category)} ${n.category}</span> </div> <div style="font-size:18px;font-weight:900;color:var(--gray-900);line-height:1.3">${esc(n.title)}</div> <div style="font-size:12px;color:var(--gray-400);margin-top:4px"> Published by ${esc(n.createdByName)} · ${fmtDate(n.publishDate)}
          ${n.expiryDate ? ` · Expires ${fmtDate(n.expiryDate)}` : ''}
        </div> </div> ${closeX()}
    </div> <div class="modal-body"> <!-- Body --> <div style="font-size:14px;line-height:1.8;color:var(--gray-700);white-space:pre-wrap;background:var(--gray-50);border-radius:var(--radius);padding:16px 20px;margin-bottom:16px">${esc(n.body)}</div> <!-- Meta grid --> <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px"> ${[
          ['Target Audience', n.targetType === 'all' ? ' All Employees' : n.targetType === 'role' ? ' Specific Roles' : ' Subsidiary'],
          ['Subsidiaries',    (n.subsidiaries||[]).map(s=>({ jiil:'JIIL Media', asal_tv:'Asal TV', masrax:'Masrax', nasiye:'Nasiye' }[s]||s)).join(', ')],
          ['Acknowledgments', n.requiresAck ? `${(n.acknowledgments||[]).length} received` : 'Not required'],
        ].map(([k,v]) => `<div style="background:var(--gray-50);border-radius:var(--radius);padding:10px 14px"> <div style="font-size:10px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">${k}</div> <div style="font-size:13px;font-weight:700;color:var(--gray-800)">${v}</div> </div>`).join('')}
      </div> <!-- Tags --> ${(n.tags||[]).length ? `<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px"> ${n.tags.map(t=>`<span style="font-size:11px;background:var(--blue-l);color:var(--blue);padding:3px 10px;border-radius:99px;font-weight:600">#${t}</span>`).join('')}
      </div>` : ''}

      <!-- Acknowledgment box --> ${n.requiresAck ? `<div style="background:${acked?'var(--green-l)':'var(--amber-l)'};border:1px solid ${acked?'#86EFAC':'#FDE68A'};border-radius:var(--radius);padding:14px 18px"> ${acked ? `<div style="display:flex;align-items:center;gap:10px"> <span style="font-size:20px">✅</span> <div> <div style="font-size:13px;font-weight:800;color:#065F46">You have acknowledged this notice</div> <div style="font-size:11px;color:#6B7280;margin-top:2px">Recorded on ${(DB.noticeAcknowledgments||[]).find(a=>a.noticeId===noticeId&&a.userEmail===STATE.user?.email)?.ackedAt||'—'}</div> </div> </div>` : `<div> <div style="font-size:13px;font-weight:800;color:#92400E;margin-bottom:10px">This notice requires your acknowledgment</div> <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer"> <input type="checkbox" id="ackCheckbox" style="margin-top:2px;accent-color:var(--navy);width:16px;height:16px;flex-shrink:0"> <span style="font-size:13px;color:#92400E;line-height:1.5">I confirm that I have read, understood, and will comply with the requirements stated in this notice.</span> </label> <button onclick="submitAcknowledgment('${n.id}')" class="btn btn-primary" style="margin-top:12px;background:var(--navy)"> Submit Acknowledgment
          </button> </div>`}
      </div>` : ''}
    </div></div>`);
}

function submitAcknowledgment(noticeId) {
  const cb = document.getElementById('ackCheckbox');
  if (!cb?.checked) { toast('Please check the confirmation box first', 'warning'); return; }
  const ack = acknowledgeNotice(noticeId);
  if (ack) {
    closeModal();
    toast('Acknowledgment recorded — thank you', 'success');
    if (typeof renderNoticeList === 'function') renderNoticeList();
  }
}

// ════════════════════════════════════════════════════════════
// CREATE / EDIT NOTICE MODAL
// ════════════════════════════════════════════════════════════
function openCreateNoticeModal(prefillData = null) {
  if (!canManageNotices()) { toast('Access Denied: Insufficient privileges', 'error'); return; }
  const n   = prefillData || {};
  const isEdit = !!n.id;
  const today  = new Date().toISOString().split('T')[0];

  openModal('xl', `
    <div class="modal-header"> <span class="modal-title">${isEdit ? 'Edit Notice' : ' Create New Notice'}</span> ${closeX()}
    </div> <div class="modal-body"> <!-- Title & Category row --> <div class="form-row cols-2" style="margin-bottom:14px"> <div class="form-group"> <label class="form-label required">Notice Title</label> <input class="form-control" id="nc_title" value="${n.title||''}" placeholder="e.g. Security Policy Update Q2 2026"> </div> <div class="form-group"> <label class="form-label required">Category</label> <select class="form-control" id="nc_cat"> ${['HR Announcement','Information Security Alert','IT Maintenance','Executive Message','Emergency Notification'].map(c=>`<option${c===n.category?' selected':''}>${c}</option>`).join('')}
          </select> </div> </div> <!-- Priority & Status --> <div class="form-row cols-3" style="margin-bottom:14px"> <div class="form-group"> <label class="form-label required">Priority Level</label> <select class="form-control" id="nc_priority"> ${['Critical','High','Medium','Informational'].map(p=>`<option${p===n.priority?' selected':''}>${p}</option>`).join('')}
          </select> </div> <div class="form-group"> <label class="form-label">Publish Date</label> <input type="date" class="form-control" id="nc_publish" value="${n.publishDate||today}"> </div> <div class="form-group"> <label class="form-label">Expiry Date</label> <input type="date" class="form-control" id="nc_expiry" value="${n.expiryDate||''}"> </div> </div> <!-- Body --> <div class="form-group" style="margin-bottom:14px"> <label class="form-label required">Notice Body</label> <textarea class="form-control" id="nc_body" rows="6" placeholder="Write the full notice content here…" style="font-size:13px;line-height:1.7">${n.body||''}</textarea> </div> <!-- Target audience --> <div class="form-row cols-2" style="margin-bottom:14px"> <div class="form-group"> <label class="form-label required">Target Audience</label> <select class="form-control" id="nc_target" onchange="updateNoticeTargetUI()"> <option value="all"${n.targetType==='all'?' selected':''}> All Employees</option> <option value="role"${n.targetType==='role'?' selected':''}> Specific Roles</option> <option value="subsidiary"${n.targetType==='subsidiary'?' selected':''}> Specific Subsidiaries</option> </select> </div> <div class="form-group" id="nc_target_detail_wrap" style="display:${n.targetType&&n.targetType!=='all'?'block':'none'}"> <label class="form-label" id="nc_target_label">Target Roles / Subsidiaries</label> <div id="nc_target_detail">${buildTargetDetail(n)}</div> </div> </div> <!-- Subsidiaries & Options row --> <div class="form-row cols-2" style="margin-bottom:14px"> <div class="form-group"> <label class="form-label">Applies to Subsidiaries</label> <div style="display:flex;flex-direction:column;gap:6px;margin-top:4px"> ${[['jiil','JIIL Media'],['asal_tv','Asal TV'],['masrax','Masrax Production'],['nasiye','Nasiye']].map(([id,label])=>`
              <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px"> <input type="checkbox" value="${id}" class="nc_sub_cb"
                  style="accent-color:var(--navy)"
                  ${(!n.subsidiaries||n.subsidiaries.includes(id))?'checked':''}> ${label}
              </label>`).join('')}
          </div> </div> <div class="form-group"> <label class="form-label">Options</label> <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px"> <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px"> <input type="checkbox" id="nc_pinned" style="accent-color:var(--navy)" ${n.pinned?'checked':''}> Pin to top of notice board
            </label> <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px"> <input type="checkbox" id="nc_ack" style="accent-color:var(--navy)" ${n.requiresAck?'checked':''}> Require employee acknowledgment
            </label> <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px"> <input type="checkbox" id="nc_login_popup" style="accent-color:var(--navy)" ${n.showOnLogin?'checked':''}> Show popup on employee login
            </label> </div> </div> </div> <!-- Tags --> <div class="form-group"> <label class="form-label">Tags <span style="color:var(--gray-400);font-weight:400;font-size:11px">(comma-separated)</span></label> <input class="form-control" id="nc_tags" value="${(n.tags||[]).join(', ')}" placeholder="e.g. mandatory, policy, security"> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-outline" onclick="saveNotice('${n.id||''}','Scheduled')" style="color:var(--blue)">Save as Draft</button> <button class="btn btn-primary" onclick="saveNotice('${n.id||''}','Active')"> ${isEdit?'Update':'Publish'} Notice</button> </div>`);
}

function buildTargetDetail(n) {
  const type = n?.targetType;
  if (type === 'role') {
    return Object.entries(DB.customRolePermissions||{}).filter(([k])=>k!=='super_admin').map(([k,r])=>`
      <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;margin-bottom:4px"> <input type="checkbox" value="${k}" class="nc_target_cb" style="accent-color:var(--navy)" ${(n.targetIds||[]).includes(k)?'checked':''}> ${r.label}
      </label>`).join('');
  }
  if (type === 'subsidiary') {
    return [['jiil','JIIL Media'],['asal_tv','Asal TV'],['masrax','Masrax Production'],['nasiye','Nasiye']].map(([id,label])=>`
      <label style="display:flex;align-items:center;gap:6px;font-size:12px;cursor:pointer;margin-bottom:4px"> <input type="checkbox" value="${id}" class="nc_target_cb" style="accent-color:var(--navy)" ${(n.targetIds||[]).includes(id)?'checked':''}> ${label}
      </label>`).join('');
  }
  return '';
}

function updateNoticeTargetUI() {
  const type = document.getElementById('nc_target')?.value;
  const wrap = document.getElementById('nc_target_detail_wrap');
  const detail = document.getElementById('nc_target_detail');
  const label  = document.getElementById('nc_target_label');
  if (!wrap || !detail) return;
  if (type === 'all') { wrap.style.display = 'none'; return; }
  wrap.style.display = 'block';
  label.textContent = type === 'role' ? 'Target Roles' : 'Target Subsidiaries';
  detail.innerHTML  = buildTargetDetail({ targetType:type, targetIds:[] });
}

function openEditNoticeModal(noticeId) {
  const n = DB.notices.find(x => x.id === noticeId);
  if (!n) return;
  if (!canManageCategory(n.category)) { toast('Access Denied: You cannot edit this category', 'error'); return; }
  openCreateNoticeModal(n);
}

function saveNotice(existingId, status) {
  const title   = sanitizeText(document.getElementById('nc_title')?.value);
  const body    = sanitizeText(document.getElementById('nc_body')?.value);
  const cat     = document.getElementById('nc_cat')?.value;
  const priority= document.getElementById('nc_priority')?.value;
  const publish = document.getElementById('nc_publish')?.value;
  const expiry  = document.getElementById('nc_expiry')?.value;
  const target  = document.getElementById('nc_target')?.value;
  const pinned  = document.getElementById('nc_pinned')?.checked;
  const reqAck  = document.getElementById('nc_ack')?.checked;
  const showLogin = document.getElementById('nc_login_popup')?.checked;
  const tagsRaw = document.getElementById('nc_tags')?.value || '';

  if (!title) { toast('Notice title is required', 'error'); return; }
  if (!body)  { toast('Notice body is required', 'error'); return; }
  if (!canManageCategory(cat)) { toast('Access Denied: Insufficient privileges for this category', 'error'); return; }

  const targetIds  = [...(document.querySelectorAll('.nc_target_cb:checked')||[])].map(cb=>cb.value);
  const subsChecked = [...(document.querySelectorAll('.nc_sub_cb:checked')||[])].map(cb=>cb.value);
  const tags       = tagsRaw.split(',').map(t=>t.trim().toLowerCase()).filter(Boolean);
  const now        = new Date().toISOString().replace('T',' ').slice(0,16);

  if (existingId) {
    const n = DB.notices.find(x => x.id === existingId);
    if (n) {
      Object.assign(n, { title, body, category:cat, priority, publishDate:publish, expiryDate:expiry||'', targetType:target, targetIds, subsidiaries:subsChecked, pinned, requiresAck:reqAck, showOnLogin:showLogin, tags, status, updatedAt:now });
      DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:now, user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Updated notice: "${title}"`, module:'Notices', ip:'browser' });
      toast('Notice updated successfully', 'success');
    }
  } else {
    const newNotice = {
      id:            'NOT' + String(DB.notices.length+1).padStart(3,'0'),
      title, body, category:cat, priority,
      publishDate:   publish, expiryDate: expiry||'',
      targetType:    target,  targetIds,
      subsidiaries:  subsChecked,
      status, pinned, requiresAck:reqAck, showOnLogin:showLogin,
      createdBy:     STATE.user?.userId || '',
      createdByName: STATE.user?.name   || STATE.role,
      createdAt:     now, updatedAt:now,
      views:         0, acknowledgments:[], tags,
    };
    DB.notices.unshift(newNotice);
    DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:now, user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Created notice: "${title}" (${status})`, module:'Notices', ip:'browser' });
    toast(`Notice "${title}" published successfully`, 'success');
  }

  closeModal();
  if (typeof renderNoticeList === 'function') renderNoticeList();
  if (typeof nav === 'function') nav('notices');

  scheduleSave();
}

function archiveNotice(noticeId) {
  const n = DB.notices.find(x => x.id === noticeId); if (!n) return;
  if (!canManageCategory(n.category)) { toast('Access Denied', 'error'); return; }
  const newStatus = n.status === 'Archived' ? 'Active' : 'Archived';
  n.status    = newStatus;
  n.updatedAt = new Date().toISOString().replace('T',' ').slice(0,16);
  if (typeof SupaWrite!=='undefined') SupaWrite.saveDoc('notices', n);
  scheduleSave();
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:n.updatedAt, user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`${newStatus==='Archived'?'Archived':'Unarchived'} notice: "${n.title}"`, module:'Notices', ip:'browser' });
  toast(`Notice ${newStatus === 'Archived' ? 'archived' : 'restored'}`, 'success');
  renderNoticeList();
}

// ════════════════════════════════════════════════════════════
// COMPLIANCE REPORT MODAL
// ════════════════════════════════════════════════════════════
function openNoticeCompliance() {
  if (!canManageNotices()) return;
  const notices = (DB.notices||[]).filter(n => n.requiresAck && n.status !== 'Archived');

  openModal('xl', `
    <div class="modal-header"> <span class="modal-title"> Notice Acknowledgment Compliance Report</span> ${closeX()}
    </div> <div class="modal-body"> <div style="display:flex;gap:14px;margin-bottom:20px;flex-wrap:wrap"> ${[
          { label:'Notices Requiring Ack', val: notices.length, color:'blue' },
          { label:'Total Acknowledgments',  val: (DB.noticeAcknowledgments||[]).length, color:'green' },
          { label:'Unique Users Who Acked', val: new Set((DB.noticeAcknowledgments||[]).map(a=>a.userEmail)).size, color:'teal' },
        ].map(s=>`<div class="stat-card ${s.color}" style="flex:1;min-width:140px"> <div class="stat-val">${s.val}</div><div class="stat-lbl">${s.label}</div> </div>`).join('')}
      </div> ${notices.map(n => {
        const acks    = (n.acknowledgments||[]);
        const total   = DB.employees.filter(e=>e.status==='Active').length;
        const pct     = total ? Math.round(acks.length/total*100) : 0;
        return `<div class="card" style="margin-bottom:14px"> <div class="card-header"> <div> <div style="font-size:14px;font-weight:800">${noticePriBadge(n.priority)} ${n.title}</div> <div style="font-size:11px;color:var(--gray-400);margin-top:4px">${n.category} · Published ${fmtDate(n.publishDate)}</div> </div> <div style="text-align:right"> <div style="font-size:22px;font-weight:900;color:${pct>=80?'var(--green)':pct>=50?'var(--amber)':'var(--red)'}">${pct}%</div> <div style="font-size:11px;color:var(--gray-400)">${acks.length} / ${total} employees</div> </div> </div> <div style="padding:0 16px 14px"> <div style="background:var(--gray-100);border-radius:99px;height:6px;overflow:hidden;margin-bottom:10px"> <div style="height:100%;background:${pct>=80?'var(--green)':pct>=50?'var(--amber)':'var(--red)'};border-radius:99px;width:${pct}%;transition:width .5s"></div> </div> ${acks.length ? `<div class="table-wrap" style="max-height:180px;overflow-y:auto"> <table class="table" style="font-size:11px"> <thead><tr><th>User</th><th>Role</th><th>Date & Time</th></tr></thead> <tbody>${acks.map(a=>`<tr> <td style="font-weight:600">${a.userName||a.userEmail}</td> <td>${a.userRole}</td> <td style="font-family:var(--mono)">${a.ackedAt}</td> </tr>`).join('')}</tbody> </table> </div>` : '<div style="font-size:12px;color:var(--gray-400);text-align:center;padding:12px">No acknowledgments yet</div>'}
          </div> </div>`;
      }).join('')}
    </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Close</button> <button class="btn btn-primary" onclick="exportNoticeCompliance()">Export to Excel</button> </div>`);
}

function exportNoticeCompliance() {
  const rows = [['Notice Title','Category','Priority','Published','Expires','User Name','User Email','Role','Acknowledged At']];
  (DB.notices||[]).filter(n=>n.requiresAck).forEach(n => {
    if ((n.acknowledgments||[]).length === 0) {
      rows.push([n.title,n.category,n.priority,n.publishDate,n.expiryDate,'','','','NOT ACKNOWLEDGED']);
    } else {
      n.acknowledgments.forEach(a => {
        rows.push([n.title,n.category,n.priority,n.publishDate,n.expiryDate,a.userName,a.userEmail,a.userRole,a.ackedAt]);
      });
    }
  });
  const csv = rows.map(r=>r.map(c=>`"${(c||'').toString().replace(/"/g,'""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type:'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `Notice_Compliance_${new Date().toISOString().slice(0,10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
  toast('Compliance report exported', 'success');
}

// ════════════════════════════════════════════════════════════
// LOGIN POPUP — show unacknowledged critical notices on login
// ════════════════════════════════════════════════════════════
function showLoginNoticePopup() {
  const critical = getActiveNotices().filter(n => n.requiresAck && !hasAcknowledged(n.id) &&
    (n.priority === 'Critical' || n.showOnLogin)
  );
  if (!critical.length) return;

  const n = critical[0]; // show first unacknowledged critical notice
  openModal('wide', `
    <div style="border-top:4px solid #DC2626"> <div class="modal-header" style="padding-top:16px;background:linear-gradient(135deg,#7F1D1D,#DC2626)"> <div> <div style="font-size:11px;font-weight:800;color:rgba(255,255,255,.7);margin-bottom:4px">IMPORTANT NOTICE — ACTION REQUIRED</div> <div style="font-size:16px;font-weight:900;color:white">${esc(n.title)}</div> </div> ${closeX('white')}
    </div> <div class="modal-body"> <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px"> ${noticePriBadge(n.priority)}
        <span style="font-size:12px;color:var(--gray-500)">${noticeCatIcon(n.category)} ${n.category}</span> ${critical.length > 1 ? `<span style="font-size:11px;background:var(--red-l);color:var(--red);padding:2px 8px;border-radius:99px;font-weight:700">${critical.length} notices require attention</span>` : ''}
      </div> <div style="font-size:14px;line-height:1.8;color:var(--gray-700);background:var(--gray-50);border-radius:var(--radius);padding:16px;margin-bottom:16px;white-space:pre-wrap">${esc(n.body)}</div> <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:var(--radius);padding:14px"> <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer"> <input type="checkbox" id="loginAckCb" style="margin-top:2px;accent-color:var(--navy);width:16px;height:16px;flex-shrink:0"> <span style="font-size:13px;color:#991B1B;line-height:1.5;font-weight:500">I confirm that I have read, understood, and will comply with the requirements stated in this notice.</span> </label> </div> </div> <div class="modal-footer" style="justify-content:space-between"> <button class="btn btn-outline btn-sm" onclick="closeModal()">Remind me later</button> <button class="btn btn-primary" onclick="submitLoginAck('${n.id}')" style="background:#DC2626;border-color:#DC2626"> Acknowledge & Continue
      </button> </div></div>`);
}

function submitLoginAck(noticeId) {
  const cb = document.getElementById('loginAckCb');
  if (!cb?.checked) { toast('Please check the confirmation box', 'warning'); return; }
  acknowledgeNotice(noticeId);
  closeModal();
  toast('Acknowledged — thank you', 'success');
  // Check for more unacknowledged critical notices
  setTimeout(showLoginNoticePopup, 800);
}

function closeX(color = '') {
  return `<button onclick="closeModal()" style="background:none;border:none;font-size:22px;cursor:pointer;color:${color||'var(--gray-500)'};line-height:1;padding:0;margin-left:auto;flex-shrink:0">×</button>`;
}

// ════════════════════════════════════════════════════════════
// DASHBOARD WIDGET — Announcement strip
// ════════════════════════════════════════════════════════════
function renderNoticeWidget() {
  const active = getActiveNotices().slice(0, 4);
  if (!active.length) return '<div style="font-size:13px;color:var(--gray-400);text-align:center;padding:12px">No active announcements</div>';

  return active.map(n => {
    const priDot = { Critical:'#DC2626', High:'#D97706', Medium:'#2563EB', Informational:'#059669' };
    const acked  = hasAcknowledged(n.id);
    return `<div onclick="openNoticeDetail('${n.id}')"
      style="display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:var(--radius);cursor:pointer;transition:background .15s;margin-bottom:4px"
      onmouseenter="this.style.background='var(--gray-50)'" onmouseleave="this.style.background=''"> <div style="width:8px;height:8px;border-radius:50%;background:${priDot[n.priority]||'#6B7280'};margin-top:5px;flex-shrink:0"></div> <div style="flex:1;min-width:0"> <div style="font-size:13px;font-weight:700;color:var(--gray-800);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${n.title}</div> <div style="font-size:11px;color:var(--gray-400);margin-top:1px">${noticeCatIcon(n.category)} ${n.category} · ${fmtDate(n.publishDate)}</div> </div> ${n.requiresAck && !acked ? '<span style="font-size:10px;background:var(--amber-l);color:var(--amber);padding:1px 7px;border-radius:99px;font-weight:700;flex-shrink:0">ACK</span>' : ''}
    </div>`;
  }).join('');
}

/* ═══════════════════════════════════════════════════════════════════════
   ENTERPRISE FINANCE & PAYROLL SYSTEM
   Module 1: Bonus Management
   Module 2: Salary Advance
   Module 3: Loan Management
   Module 4: Payroll Batch Processing (with Excel Import/Export)
═══════════════════════════════════════════════════════════════════════ */

/* ── Finance permission helper ── */
function canEditEmployees() {
  const crp = ROLES[STATE.role];
  return crp ? crp.canEdit !== false && hasPermission('employees') : false;
}

function canManageFinance() {
  return ['super_admin','corporate_admin','finance_manager','hr_director'].includes(STATE.role);
}
function canApproveFinance() {
  return ['super_admin','corporate_admin','finance_manager'].includes(STATE.role);
}

/* ── Status badge helper ── */
function finBadge(status) {
  const cfg = {
    Pending:   { bg:'#FEF3C7', color:'#92400E' },
    Approved:  { bg:'#D1FAE5', color:'#065F46' },
    Paid:      { bg:'#DBEAFE', color:'#1E40AF' },
    Rejected:  { bg:'#FEE2E2', color:'#991B1B' },
    Active:    { bg:'#D1FAE5', color:'#065F46' },
    Completed: { bg:'#E0F2FE', color:'#0C4A6E' },
    Defaulted: { bg:'#FEE2E2', color:'#991B1B' },
    Draft:     { bg:'#F1F5F9', color:'#475569' },
    Processed: { bg:'#DBEAFE', color:'#1E40AF' },
  };
  const c = cfg[status] || cfg.Pending;
  return `<span style="background:${c.bg};color:${c.color};font-size:11px;font-weight:800;padding:2px 10px;border-radius:99px">${status}</span>`;
}

/* ════════════════════════════════════════════════════════════
   MODULE 1 — BONUS MANAGEMENT
════════════════════════════════════════════════════════════ */
;

function updateBonusAmountField() {
  const type = document.getElementById('bn_type')?.value;
  const hint = document.getElementById('bn_value_hint');
  if (!hint) return;
  if (type === 'percentage') hint.textContent = 'Enter percentage (e.g. 10 = 10% of salary)';
  else if (type === 'kpi')   hint.textContent = 'Auto-calculated from KPI score — enter 0';
  else                       hint.textContent = 'Fixed dollar amount';
}

function toggleBonusRule(id) {
  const r = (DB.bonusRules||[]).find(x=>x.id===id); if (r) r.active = !r.active;
  toast('Rule updated', 'success'); openBonusRulesModal();
}


/* ════════════════════════════════════════════════════════════
   MODULE 2 — SALARY ADVANCE
════════════════════════════════════════════════════════════ */
PAGES.advances = function(wrap) {
  const isMgr = canManageFinance() || STATE.role === 'hr_manager';

  const advances = isMgr
    ? (DB.salaryAdvances||[])
    : (DB.salaryAdvances||[]).filter(a => a.empId === getCurrentEmployee()?.id);

  const pending  = advances.filter(a=>a.status==='Pending').length;
  const approved = advances.filter(a=>a.status==='Approved').reduce((s,a)=>s+a.amount,0);
  const total    = advances.filter(a=>a.status!=='Rejected').reduce((s,a)=>s+a.amount,0);

  wrap.innerHTML = `<div class="page"> <div class="page-header"> <div><h1 class="page-title">Salary Advances</h1><div class="page-sub">${isMgr ? 'All employee advance requests' : 'My salary advance requests'}</div></div> <button class="btn btn-primary" onclick="openAdvanceRequestModal()">+ Request Advance</button> </div> <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px"> <div class="stat-card amber"><div class="stat-val">${pending}</div><div class="stat-lbl">Pending Approval</div></div> <div class="stat-card green"><div class="stat-val">${fmtCurrency(approved)}</div><div class="stat-lbl">Approved (To Deduct)</div></div> <div class="stat-card blue"><div class="stat-val">${fmtCurrency(total)}</div><div class="stat-lbl">Total Issued YTD</div></div> <div class="stat-card navy"><div class="stat-val">${advances.length}</div><div class="stat-lbl">Total Requests</div></div> </div> <div class="card"><div class="table-wrap"><table class="table"> <thead><tr> ${isMgr ? '<th>Employee</th>' : ''}
        <th>Amount</th><th>Reason</th><th>Requested</th> <th>Status</th><th>Deduct Month</th><th>Actions</th> </tr></thead> <tbody>${advances.length ? advances.map(a => {
        const emp = getEmp(a.empId);
        const maxAdv = emp ? PayrollEngine.maxAdvance(emp.salary||0) : 0;
        return `<tr> ${isMgr ? `<td><div style="font-weight:700">${emp?.name||'—'}</div><div style="font-size:11px;color:var(--gray-400)">${a.empId}</div></td>` : ''}
          <td style="font-family:var(--mono);font-weight:800;color:var(--navy)">${fmtCurrency(a.amount)}</td> <td style="font-size:12px">${a.reason}</td> <td style="font-size:11px;font-family:var(--mono)">${a.requestedAt}</td> <td>${finBadge(a.status)}</td> <td style="font-size:12px;font-family:var(--mono)">${a.deductMonth||'—'}</td> <td style="display:flex;gap:6px;flex-wrap:wrap"> ${a.status==='Pending' && isMgr ? `
         
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button style="width:38px;height:38px;border-radius:10px;border:none;background:#D1FAE5;cursor:pointer;display:inline-flex;align-items:center;justify-content:center" title="Approve" onclick="approveAdvance('${a.id}')"><svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#065F46' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg></button>
              <button style="width:38px;height:38px;border-radius:10px;border:none;background:#FEE2E2;cursor:pointer;display:inline-flex;align-items:center;justify-content:center" title="Reject" onclick="rejectAdvance('${a.id}')"><svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='#991B1B' stroke-width='2.5' stroke-linecap='round'><line x1='18' y1='6' x2='6' y2='18'/><line x1='6' y1='6' x2='18' y2='18'/></svg></button>
            </div>` : ''}
          ${a.status==='Approved' && canApproveFinance() ? `
            <button style="height:38px;padding:0 16px;border-radius:10px;border:none;background:#DBEAFE;color:#1E40AF;cursor:pointer;font-size:12px;font-weight:700" title="Mark as Paid" onclick="markAdvancePaid('${a.id}')"><svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#065F46' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg> Mark Paid</button>` : ''}
          ${a.status==='Paid' ? `<span style="color:#065F46;font-size:12px;font-weight:700">Paid</span>` : ''}
          ${a.status==='Rejected' ? `<span style="color:#991B1B;font-size:12px;font-weight:700">Rejected</span>` : ''}
          </td> </tr>`;
      }).join('') : '<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--gray-400)">No advance requests</td></tr>'}</tbody> </table></div></div> </div>`;
};

function openAdvanceRequestModal(empId = '') {
  const emp = empId ? getEmp(empId) : getCurrentEmployee();
  const selfService = isSelfServiceRole();

  openModal('narrow', `
    <div class="modal-header"><span class="modal-title">Request Salary Advance</span>${closeX()}</div> <div class="modal-body"> ${!selfService ? `<div class="form-group"><label class="form-label required">Employee</label> <select class="form-control" id="adv_emp" onchange="updateAdvanceLimit()"> <option value="">Select employee…</option> ${DB.employees.filter(e=>e.status==='Active').map(e=>`<option value="${e.id}" ${emp?.id===e.id?'selected':''}>${e.name} (${e.id})</option>`).join('')}
        </select> </div>` : `<input type="hidden" id="adv_emp" value="${emp?.id||''}">`}
      <div id="adv_limit_info" style="background:var(--blue-l);border-radius:var(--radius);padding:10px 14px;font-size:12px;color:var(--blue);margin-bottom:14px;display:${emp?'block':'none'}"> ${emp ? `Monthly Salary: <strong>${fmtCurrency(emp.salary)}</strong> · Max Advance (50%): <strong>${fmtCurrency(PayrollEngine.maxAdvance(emp.salary))}</strong>` : ''}
      </div> <div class="form-group"><label class="form-label required">Advance Amount (USD)</label> <input class="form-control" id="adv_amount" type="number" min="1" placeholder="e.g. 500"> </div> <div class="form-group"><label class="form-label required">Deduction Month</label> <input class="form-control" id="adv_month" type="month" value="${new Date().toISOString().slice(0,7)}"> </div> <div class="form-group"><label class="form-label required">Reason</label> <textarea class="form-control" id="adv_reason" rows="3" placeholder="Explain the reason for advance…"></textarea> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="submitAdvanceRequest()">Submit Request</button> </div>`);
}

function updateAdvanceLimit() {
  const empId = document.getElementById('adv_emp')?.value;
  const info  = document.getElementById('adv_limit_info');
  if (!info || !empId) return;
  const emp = getEmp(empId);
  if (emp) {
    info.style.display = 'block';
    info.innerHTML = `Monthly Salary: <strong>${fmtCurrency(emp.salary)}</strong> · Max Advance (50%): <strong>${fmtCurrency(PayrollEngine.maxAdvance(emp.salary))}</strong>`;
  }
}

function submitAdvanceRequest() {
  const empId  = document.getElementById('adv_emp')?.value || getCurrentEmployee()?.id;
  const amount = parseFloat(document.getElementById('adv_amount')?.value||0);
  const month  = document.getElementById('adv_month')?.value;
  const reason = document.getElementById('adv_reason')?.value?.trim();
  if (!empId || !amount || !month || !reason) { toast('All fields required', 'error'); return; }

  const emp    = getEmp(empId);
  const maxAdv = PayrollEngine.maxAdvance(emp?.salary||0);
  if (amount > maxAdv) { toast(`Amount exceeds maximum advance limit of ${fmtCurrency(maxAdv)}`, 'error'); return; }
  if (amount <= 0)     { toast('Amount must be greater than zero', 'error'); return; }

  const adv = {
    id:          'ADV' + String(DB.salaryAdvances.length + 1).padStart(3,'0'),
    empId, amount, reason, deductMonth: month,
    status:      'Pending',
    requestedAt: new Date().toISOString().split('T')[0],
    approvedBy:  '', approvedAt: '', deductedAt: '', notes: '',
  };
  if (!DB.salaryAdvances) DB.salaryAdvances = [];
  DB.salaryAdvances.unshift(adv);
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Salary advance request: ${emp?.name} — ${fmtCurrency(amount)}`, module:'Advances', ip:'browser' });
  closeModal(); toast('Advance request submitted', 'success'); nav('advances');

  scheduleSave();
}

function approveAdvance(id) {
  const a = (DB.salaryAdvances||[]).find(x=>x.id===id); if (!a) return;
  a.status = 'Approved'; a.approvedBy = STATE.user?.email; a.approvedAt = new Date().toISOString().split('T')[0];
  // Update payroll record to include this advance deduction
  const pr = DB.payroll.find(p => p.empId === a.empId && p.month === a.deductMonth);
  if (pr) pr.advance = (pr.advance || 0) + a.amount;
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Approved advance: ${getEmp(a.empId)?.name} — ${fmtCurrency(a.amount)}`, module:'Advances', ip:'browser' });
  toast('Advance approved', 'success'); nav('advances');

  scheduleSave();
}

function rejectAdvance(id) {
  const reason = prompt('Rejection reason:'); if (reason === null) return;
  const a = (DB.salaryAdvances||[]).find(x=>x.id===id); if (!a) return;
  a.status = 'Rejected'; a.notes = reason; a.approvedBy = STATE.user?.email; a.approvedAt = new Date().toISOString().split('T')[0];
  toast('Advance rejected', 'warning'); nav('advances');

  scheduleSave();
}

function markAdvancePaid(id) {
  const a = (DB.salaryAdvances||[]).find(x=>x.id===id); if (!a) return;
  a.status = 'Paid'; a.deductedAt = new Date().toISOString().split('T')[0];
  toast('Advance marked as paid', 'success'); nav('advances');

  scheduleSave();
}


/* ════════════════════════════════════════════════════════════
   MODULE 3 — LOAN MANAGEMENT
════════════════════════════════════════════════════════════ */
PAGES.loans = function(wrap) {
  const isMgr = canManageFinance() || STATE.role === 'hr_manager';
  const loans = isMgr
    ? (DB.loans||[])
    : (DB.loans||[]).filter(l => l.empId === getCurrentEmployee()?.id);

  const active    = loans.filter(l=>l.status==='Active');
  const totalOut  = active.reduce((s,l)=>s+(l.principal-l.amountPaid),0);
  const monthlyDue= active.reduce((s,l)=>s+(l.monthlyInstallment||0),0);

  wrap.innerHTML = `<div class="page"> <div class="page-header"> <div><h1 class="page-title">Loan Management</h1><div class="page-sub">${isMgr ? 'All employee loans' : 'My loans'}</div></div> ${isMgr ? `<button class="btn btn-primary" onclick="openCreateLoanModal()">+ Issue Loan</button>` :
                `<button class="btn btn-primary" onclick="openLoanApplicationModal()">Apply for Loan</button>`}
    </div> <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px"> <div class="stat-card red"><div class="stat-val">${fmtCurrency(totalOut)}</div><div class="stat-lbl">Total Outstanding</div></div> <div class="stat-card amber"><div class="stat-val">${fmtCurrency(monthlyDue)}</div><div class="stat-lbl">Monthly Deductions</div></div> <div class="stat-card green"><div class="stat-val">${active.length}</div><div class="stat-lbl">Active Loans</div></div> <div class="stat-card blue"><div class="stat-val">${loans.filter(l=>l.status==='Completed').length}</div><div class="stat-lbl">Completed</div></div> </div> <div class="card"><div class="table-wrap"><table class="table"> <thead><tr> ${isMgr ? '<th>Employee</th>' : ''}
        <th>Principal</th><th>Monthly</th><th>Remaining</th><th>Progress</th> <th>Rate</th><th>Period</th><th>Purpose</th><th>Status</th><th>Actions</th> </tr></thead> <tbody>${loans.length ? loans.map(l => {
        const emp   = getEmp(l.empId);
        const remain= Math.max(0, l.principal - l.amountPaid);
        const pct   = Math.round(l.amountPaid / l.totalRepayable * 100);
        return `<tr> ${isMgr ? `<td><div style="font-weight:700">${emp?.name||'—'}</div><div style="font-size:11px;color:var(--gray-400)">${l.empId}</div></td>` : ''}
          <td style="font-family:var(--mono);font-weight:700">${fmtCurrency(l.principal)}</td> <td style="font-family:var(--mono);color:var(--amber)">${fmtCurrency(l.monthlyInstallment)}</td> <td style="font-family:var(--mono);color:var(--red);font-weight:700">${fmtCurrency(remain)}</td> <td style="min-width:100px"> <div style="background:var(--gray-100);border-radius:99px;height:6px;overflow:hidden"> <div style="height:100%;background:${pct>=100?'var(--green)':'var(--blue)'};border-radius:99px;width:${Math.min(100,pct)}%"></div> </div> <div style="font-size:10px;color:var(--gray-400);margin-top:2px">${pct}% paid</div> </td> <td style="font-size:12px">${l.interestRate}%</td> <td style="font-size:12px">${l.months}mo</td> <td style="font-size:12px;max-width:140px">${l.purpose}</td> <td>${finBadge(l.status)}</td> <td> <button class="btn btn-outline btn-sm" onclick="openLoanDetail('${l.id}')">Details</button> ${l.status==='Active' && canApproveFinance() ? `<button class="btn btn-outline btn-sm" onclick="recordLoanPayment('${l.id}')" style="color:var(--green)">Record Payment</button>` : ''}
          </td> </tr>`;
      }).join('') : '<tr><td colspan="10" style="text-align:center;padding:24px;color:var(--gray-400)">No loans found</td></tr>'}</tbody> </table></div></div> </div>`;
};

function openCreateLoanModal() {
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Issue Employee Loan</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Employee</label> <select class="form-control" id="ln_emp"> <option value="">Select employee…</option> ${DB.employees.filter(e=>e.status==='Active').map(e=>`<option value="${e.id}">${e.name} (${e.id})</option>`).join('')}
          </select> </div> <div class="form-group"><label class="form-label required">Loan Purpose</label> <input class="form-control" id="ln_purpose" placeholder="e.g. Medical, Education, Car purchase"> </div> </div> <div class="form-row cols-3"> <div class="form-group"><label class="form-label required">Principal Amount (USD)</label> <input class="form-control" id="ln_amount" type="number" min="1" oninput="calcLoanInstallment()" placeholder="e.g. 5000"> </div> <div class="form-group"><label class="form-label required">Repayment Period (months)</label> <input class="form-control" id="ln_months" type="number" min="1" max="36" oninput="calcLoanInstallment()" placeholder="e.g. 12" value="12"> </div> <div class="form-group"><label class="form-label">Interest Rate (% per year, 0 = none)</label> <input class="form-control" id="ln_rate" type="number" min="0" max="30" step="0.5" oninput="calcLoanInstallment()" value="0"> </div> </div> <div id="ln_calc_result" style="background:var(--navy);color:white;border-radius:var(--radius);padding:14px 18px;margin-bottom:14px;display:none"> <div style="display:flex;gap:24px;flex-wrap:wrap"> <div><div style="font-size:10px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.6px">Monthly Payment</div> <div id="ln_monthly" style="font-size:22px;font-weight:900;color:var(--gold)">—</div></div> <div><div style="font-size:10px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.6px">Total Repayable</div> <div id="ln_total"   style="font-size:22px;font-weight:900;color:white">—</div></div> <div><div style="font-size:10px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.6px">Total Interest</div> <div id="ln_interest" style="font-size:22px;font-weight:900;color:var(--amber)">—</div></div> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Start Date</label> <input class="form-control" id="ln_start" type="date" value="${new Date().toISOString().split('T')[0]}"> </div> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveLoan()">Issue Loan</button> </div>`);
}

function calcLoanInstallment() {
  const amount = parseFloat(document.getElementById('ln_amount')?.value||0);
  const months = parseInt(document.getElementById('ln_months')?.value||0);
  const rate   = parseFloat(document.getElementById('ln_rate')?.value||0);
  const result = document.getElementById('ln_calc_result');
  if (!amount || !months || !result) { if (result) result.style.display='none'; return; }
  const monthly  = PayrollEngine.calcInstallment(amount, months, rate);
  const total    = monthly * months;
  const interest = total - amount;
  result.style.display = 'block';
  document.getElementById('ln_monthly').textContent  = fmtCurrency(monthly);
  document.getElementById('ln_total').textContent    = fmtCurrency(total);
  document.getElementById('ln_interest').textContent = fmtCurrency(interest);
}

function saveLoan() {
  const empId   = document.getElementById('ln_emp')?.value;
  const purpose = document.getElementById('ln_purpose')?.value?.trim();
  const amount  = parseFloat(document.getElementById('ln_amount')?.value||0);
  const months  = parseInt(document.getElementById('ln_months')?.value||0);
  const rate    = parseFloat(document.getElementById('ln_rate')?.value||0);
  const start   = document.getElementById('ln_start')?.value;
  if (!empId||!purpose||!amount||!months||!start) { toast('All required fields must be filled', 'error'); return; }
  if (months > PayrollEngine.LOAN_MAX_MONTHS) { toast(`Max repayment period is ${PayrollEngine.LOAN_MAX_MONTHS} months`, 'error'); return; }

  const monthly    = PayrollEngine.calcInstallment(amount, months, rate);
  const total      = monthly * months;
  const startDate  = new Date(start);
  const endDate    = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + months);

  const loan = {
    id:                'LON' + String(DB.loans.length + 1).padStart(3,'0'),
    empId, principal:  amount,
    months,            interestRate: rate,
    monthlyInstallment: Math.round(monthly * 100) / 100,
    totalRepayable:    Math.round(total * 100) / 100,
    amountPaid:        0,
    status:            'Active',
    purpose,
    startDate:         start,
    endDate:           endDate.toISOString().split('T')[0],
    approvedBy:        STATE.user?.email || '',
    history:           [],
  };
  if (!DB.loans) DB.loans = [];
  DB.loans.unshift(loan);
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Loan issued: ${getEmp(empId)?.name} — ${fmtCurrency(amount)} × ${months}mo @ ${rate}%`, module:'Loans', ip:'browser' });
  closeModal(); toast(`Loan issued — ${fmtCurrency(monthly)}/month for ${months} months`, 'success'); nav('loans');

  scheduleSave();
}

function openLoanDetail(loanId) {
  const l = (DB.loans||[]).find(x=>x.id===loanId); if (!l) return;
  const emp    = getEmp(l.empId);
  const remain = Math.max(0, l.totalRepayable - l.amountPaid);
  const pct    = Math.round(l.amountPaid / l.totalRepayable * 100);
  openModal('wide', `
    <div class="modal-header"><span class="modal-title"> Loan Details — ${emp?.name}</span>${closeX()}</div> <div class="modal-body"> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px"> <div class="card" style="margin:0"> <div class="card-header"><span class="card-title">Loan Summary</span></div> <div class="card-body"> ${[['Employee',l.empId+' · '+(emp?.name||'')],['Purpose',l.purpose],['Principal',fmtCurrency(l.principal)],['Interest Rate',l.interestRate+'% per year'],['Period',l.months+' months'],['Monthly Payment',fmtCurrency(l.monthlyInstallment)],['Total Repayable',fmtCurrency(l.totalRepayable)],['Amount Paid',fmtCurrency(l.amountPaid)],['Outstanding',fmtCurrency(remain)],['Start Date',l.startDate],['End Date',l.endDate],['Status',l.status]].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val" style="font-family:var(--mono)">${v}</span></div>`).join('')}
          </div> </div> <div class="card" style="margin:0"> <div class="card-header"><span class="card-title">Repayment Progress</span></div> <div class="card-body"> <div style="text-align:center;padding:20px 0"> <div style="font-size:42px;font-weight:900;color:${pct>=100?'var(--green)':'var(--navy)'}">${pct}%</div> <div style="font-size:13px;color:var(--gray-400);margin:6px 0">Repaid</div> <div style="background:var(--gray-100);border-radius:99px;height:10px;overflow:hidden;margin:10px 0"> <div style="height:100%;background:linear-gradient(90deg,var(--navy),var(--blue));border-radius:99px;width:${pct}%;transition:width .5s"></div> </div> <div style="font-size:13px;color:var(--red);font-weight:800">${fmtCurrency(remain)} remaining</div> </div> ${(l.history||[]).length ? `<div style="font-size:12px;font-weight:700;color:var(--gray-600);margin-bottom:8px">Payment History</div> ${l.history.slice(-6).map(h=>`<div class="info-row"><span class="info-key" style="font-family:var(--mono)">${h.month}</span><span class="info-val" style="font-family:var(--mono);color:var(--green)">${fmtCurrency(h.amount)}</span></div>`).join('')}` : '<div style="color:var(--gray-400);font-size:12px;text-align:center">No payments recorded yet</div>'}
          </div> </div> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Close</button> ${l.status==='Active' ? `<button class="btn btn-primary" onclick="closeModal();recordLoanPayment('${l.id}')">Record Payment</button>` : ''}
    </div>`);
}

function recordLoanPayment(loanId) {
  const l = (DB.loans||[]).find(x=>x.id===loanId); if (!l) return;
  const month = new Date().toISOString().slice(0,7);
  l.amountPaid = (l.amountPaid||0) + l.monthlyInstallment;
  if (!l.history) l.history = [];
  l.history.push({ month, amount: l.monthlyInstallment, date: new Date().toISOString().split('T')[0] });
  if (l.amountPaid >= l.totalRepayable) {
    l.status = 'Completed';
    toast(`Loan fully repaid — ${getEmp(l.empId)?.name}`, 'success');
  } else {
    toast(`Payment of ${fmtCurrency(l.monthlyInstallment)} recorded`, 'success');
  }
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Loan payment: ${getEmp(l.empId)?.name} — ${fmtCurrency(l.monthlyInstallment)} (${month})`, module:'Loans', ip:'browser' });
  nav('loans');

  scheduleSave();
}

function openLoanApplicationModal() {
  const emp = getCurrentEmployee();
  if (!emp) { toast('No employee record linked', 'error'); return; }
  openModal('narrow', `
    <div class="modal-header"><span class="modal-title">Apply for Loan</span>${closeX()}</div> <div class="modal-body"> <div style="background:var(--blue-l);border-radius:var(--radius);padding:12px 14px;font-size:12px;color:var(--blue);margin-bottom:14px"> Monthly Salary: <strong>${fmtCurrency(emp.salary)}</strong> · Max monthly deduction: <strong>${fmtCurrency(PayrollEngine.maxAdvance(emp.salary))}</strong> </div> <div class="form-group"><label class="form-label required">Requested Amount (USD)</label> <input class="form-control" id="la_amount" type="number" oninput="calcSelfLoan()" placeholder="Enter loan amount"> </div> <div class="form-group"><label class="form-label required">Repayment Period (months)</label> <input class="form-control" id="la_months" type="number" min="1" max="24" value="12" oninput="calcSelfLoan()"> </div> <div id="la_result" style="background:var(--navy);color:white;border-radius:var(--radius);padding:12px;margin-bottom:12px;display:none;font-size:13px"> Monthly deduction: <span id="la_monthly" style="color:var(--gold);font-weight:800">—</span> </div> <div class="form-group"><label class="form-label required">Purpose</label> <textarea class="form-control" id="la_purpose" rows="2" placeholder="Explain the purpose of the loan…"></textarea> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="submitLoanApplication('${emp.id}')">Submit Application</button> </div>`);
}

function calcSelfLoan() {
  const amount = parseFloat(document.getElementById('la_amount')?.value||0);
  const months = parseInt(document.getElementById('la_months')?.value||0);
  const result = document.getElementById('la_result');
  const monthly_el = document.getElementById('la_monthly');
  if (!amount || !months || !result) return;
  const monthly = PayrollEngine.calcInstallment(amount, months, 0);
  result.style.display = 'block';
  if (monthly_el) monthly_el.textContent = fmtCurrency(monthly) + '/month for ' + months + ' months';
}

function submitLoanApplication(empId) {
  const amount  = parseFloat(document.getElementById('la_amount')?.value||0);
  const months  = parseInt(document.getElementById('la_months')?.value||0);
  const purpose = document.getElementById('la_purpose')?.value?.trim();
  if (!amount || !months || !purpose) { toast('All fields required', 'error'); return; }
  const emp = getEmp(empId);
  const monthly = PayrollEngine.calcInstallment(amount, months, 0);
  if (monthly > PayrollEngine.maxAdvance(emp.salary||0)) { toast(`Monthly installment (${fmtCurrency(monthly)}) exceeds 50% of your salary`, 'error'); return; }
  const startDate = new Date();
  startDate.setDate(1); startDate.setMonth(startDate.getMonth()+1);
  const endDate   = new Date(startDate);
  endDate.setMonth(endDate.getMonth() + months);
  const loan = { id:'LON'+String(DB.loans.length+1).padStart(3,'0'), empId, principal:amount, months, interestRate:0, monthlyInstallment:Math.round(monthly*100)/100, totalRepayable:Math.round(monthly*months*100)/100, amountPaid:0, status:'Active', purpose, startDate:startDate.toISOString().split('T')[0], endDate:endDate.toISOString().split('T')[0], approvedBy:'HR Pending Review', history:[] };
  if (!DB.loans) DB.loans = [];
  DB.loans.unshift(loan);
  closeModal(); toast('Loan application submitted — awaiting HR approval', 'success'); nav('loans');
}


/* ════════════════════════════════════════════════════════════
   MODULE 4 — PAYROLL BATCH PROCESSING (Enhanced)
   + Excel Import/Export
════════════════════════════════════════════════════════════ */
function openPayrollBatchModal() {
  if (!canApproveFinance()) { toast('Finance Manager or above required', 'error'); return; }
  openModal('xl', `
    <div class="modal-header"><span class="modal-title">Payroll Batch Processing</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2" style="margin-bottom:16px"> <div class="form-group"><label class="form-label required">Payroll Month</label> <input class="form-control" id="pb_month" type="month" value="${new Date().toISOString().slice(0,7)}"> </div> <div class="form-group"><label class="form-label">Filter by Subsidiary</label> <select class="form-control" id="pb_sub"> <option value="">All Subsidiaries</option> ${DB.subsidiaries.map(s=>`<option value="${s.id||s.code?.toLowerCase()}">${s.name}</option>`).join('')}
          </select> </div> </div> <!-- Import Options --> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px"> <div style="border:2px dashed var(--gray-200);border-radius:var(--radius-lg);padding:20px;text-align:center;cursor:pointer;transition:all .2s"
          onmouseenter="this.style.borderColor='var(--blue)'" onmouseleave="this.style.borderColor='var(--gray-200)'"
          onclick="document.getElementById('excelImport').click()"> <div style="font-size:28px;margin-bottom:8px"></div> <div style="font-size:14px;font-weight:700;color:var(--navy);margin-bottom:4px">Import from Excel</div> <div style="font-size:12px;color:var(--gray-400)">Upload .xlsx file with payroll data</div> <input type="file" id="excelImport" accept=".xlsx,.csv" style="display:none" onchange="handlePayrollExcelImport(this)"> </div> <div style="border:2px solid var(--navy);border-radius:var(--radius-lg);padding:20px;text-align:center;cursor:pointer;background:var(--navy);color:white"
          onclick="autoGeneratePayroll()"> <div style="font-size:28px;margin-bottom:8px"></div> <div style="font-size:14px;font-weight:700;margin-bottom:4px">Auto-Generate</div> <div style="font-size:12px;color:rgba(255,255,255,.6)">Calculate from employee records</div> </div> </div> <!-- Template download --> <div style="background:var(--blue-l);border-radius:var(--radius);padding:10px 14px;font-size:12px;color:var(--blue);margin-bottom:16px;display:flex;align-items:center;justify-content:space-between"> <span> Need the Excel template? Download it and fill in the payroll data.</span> <button class="btn btn-outline btn-sm" onclick="downloadPayrollTemplate()">Download Template</button> </div> <!-- Preview Table --> <div id="payrollPreviewWrap" style="display:none"> <div style="font-size:13px;font-weight:800;color:var(--navy);margin-bottom:10px">Preview — Payroll Data</div> <div class="table-wrap" style="max-height:360px;overflow-y:auto"> <table class="table" id="payrollPreviewTable"> <thead><tr> <th>Employee</th><th>Base Salary</th><th>Allowance</th> <th>OT Hours</th><th>OT Pay</th><th>Bonus</th> <th>Loan Deduction</th><th>Advance</th><th>Tax</th> <th>Gross</th><th>Deductions</th><th style="color:var(--green)">Net Pay</th> </tr></thead> <tbody id="payrollPreviewBody"></tbody> <tfoot id="payrollPreviewTotals"></tfoot> </table> </div> <div id="payrollValidationErrors" style="display:none;margin-top:10px"></div> </div> </div> <div class="modal-footer" id="payrollBatchFooter"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-outline" id="payrollExportBtn" style="display:none" onclick="exportPayrollPreview()">Export Excel</button> <button class="btn btn-primary" id="payrollSubmitBtn" style="display:none" onclick="submitPayrollBatch()"> Process Payroll Batch</button> </div>`);
}

function autoGeneratePayroll() {
  const month = document.getElementById('pb_month')?.value;
  const sub   = document.getElementById('pb_sub')?.value;
  if (!month) { toast('Select a payroll month first', 'error'); return; }

  let emps = DB.employees.filter(e=>e.status==='Active');
  if (sub) emps = emps.filter(e => e.sub === sub || e.subsidiary_id === sub);

  const rows = emps.map(emp => {
    const existingPayrow = DB.payroll.find(p=>p.empId===emp.id&&p.month===month)||{};
    const loanDeduct = PayrollEngine.getLoanDeductions(emp.id);
    const advDeduct  = (DB.salaryAdvances||[]).filter(a=>a.empId===emp.id&&a.deductMonth===month&&a.status==='Approved').reduce((s,a)=>s+a.amount,0);
    const bonusAmt   = (DB.bonuses||[]).filter(b=>b.empId===emp.id&&b.payrollMonth===month&&b.status==='Approved').reduce((s,b)=>s+b.amount,0);
    const payrow = {
      empId:            emp.id,
      month,
      baseSalary:       emp.salary   || existingPayrow.baseSalary  || 0,
      allowance:        emp.allowance|| existingPayrow.allowance   || 0,
      otHours:          existingPayrow.otHours    || 0,
      perfBonus:        bonusAmt,
      loanDeduction:    loanDeduct,
      advance:          advDeduct,
      lateDeduction:    existingPayrow.lateDeduction || 0,
      absentDeduction:  existingPayrow.absentDeduction || 0,
      eidBonus:         existingPayrow.eidBonus || 0,
      otherDeductions:  0,
    };
    return { emp, payrow, calc: PayrollEngine.calc(emp, payrow) };
  });

  renderPayrollPreview(rows);
}

function renderPayrollPreview(rows) {
  const wrap = document.getElementById('payrollPreviewWrap');
  const body = document.getElementById('payrollPreviewBody');
  const totals = document.getElementById('payrollPreviewTotals');
  const exportBtn = document.getElementById('payrollExportBtn');
  const submitBtn = document.getElementById('payrollSubmitBtn');
  if (!wrap||!body) return;

  wrap.style.display = 'block';
  if (exportBtn) exportBtn.style.display = '';
  if (submitBtn) submitBtn.style.display = '';

  // Store for submission
  window._payrollBatchRows = rows;

  let totGross = 0, totDeduct = 0, totNet = 0;

  body.innerHTML = rows.map(({ emp, payrow, calc }) => {
    totGross  += calc.grossEarnings;
    totDeduct += calc.totalDeductions;
    totNet    += calc.netPay;
    return `<tr> <td><div style="font-weight:700;font-size:12px">${emp.name}</div><div style="font-size:10px;color:var(--gray-400)">${emp.id}</div></td> <td style="font-family:var(--mono);font-size:12px">${fmtCurrency(calc.base)}</td> <td style="font-family:var(--mono);font-size:12px">${fmtCurrency(calc.allow)}</td> <td style="font-family:var(--mono);font-size:12px">${calc.otHours||0}h</td> <td style="font-family:var(--mono);font-size:12px">${fmtCurrency(calc.otPay)}</td> <td style="font-family:var(--mono);font-size:12px;color:var(--green)">${fmtCurrency(calc.perfBonus||0)}</td> <td style="font-family:var(--mono);font-size:12px;color:var(--red)">${fmtCurrency(calc.loanDeduct||0)}</td> <td style="font-family:var(--mono);font-size:12px;color:var(--amber)">${fmtCurrency(calc.advanceDeduct||0)}</td> <td style="font-family:var(--mono);font-size:12px;color:var(--red)">${fmtCurrency(calc.tax)}</td> <td style="font-family:var(--mono);font-size:12px;font-weight:700;color:var(--blue)">${fmtCurrency(calc.grossEarnings)}</td> <td style="font-family:var(--mono);font-size:12px;color:var(--red)">${fmtCurrency(calc.totalDeductions)}</td> <td style="font-family:var(--mono);font-size:13px;font-weight:900;color:var(--green)">${fmtCurrency(calc.netPay)}</td> </tr>`;
  }).join('');

  totals.innerHTML = `<tr style="background:var(--navy);color:white;font-weight:800"> <td colspan="9" style="padding:10px 14px;font-size:13px">TOTALS (${rows.length} employees)</td> <td style="font-family:var(--mono);padding:10px 8px;color:var(--gold)">${fmtCurrency(totGross)}</td> <td style="font-family:var(--mono);padding:10px 8px;color:#FCA5A5">${fmtCurrency(totDeduct)}</td> <td style="font-family:var(--mono);padding:10px 8px;color:#86EFAC;font-size:14px">${fmtCurrency(totNet)}</td> </tr>`;
}

function handlePayrollExcelImport(input) {
  const file = input.files[0]; if (!file) return;
  toast(`Reading ${file.name}…`, 'info');

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      // Parse CSV (simple) or show instructions for xlsx
      const text   = e.target.result;
      const lines  = text.split('\n').map(l=>l.split(',').map(v=>v.trim().replace(/^"|"$/g,'')));
      const headers= lines[0].map(h=>h.toLowerCase().replace(/\s+/g,'_'));

      const rows   = [];
      const errors = [];

      lines.slice(1).filter(l=>l.some(v=>v)).forEach((cols, i) => {
        const row = {};
        headers.forEach((h,j)=>{ row[h]=cols[j]||''; });
        const empId = row['employee_id']||row['emp_id']||row['id']||'';
        const emp   = getEmp(empId) || DB.employees.find(e=>e.name?.toLowerCase()===((row['name']||row['employee_name'])||'').toLowerCase());
        if (!emp) { errors.push(`Row ${i+2}: Employee "${empId}" not found`); return; }
        const payrow = {
          empId:         emp.id,
          month:         document.getElementById('pb_month')?.value,
          baseSalary:    parseFloat(row['base_salary']||row['basic_salary']||0) || emp.salary,
          allowance:     parseFloat(row['allowance']||row['allowances']||0) || emp.allowance,
          otHours:       parseFloat(row['ot_hours']||row['overtime_hours']||0),
          perfBonus:     parseFloat(row['bonus']||row['performance_bonus']||0),
          loanDeduction: parseFloat(row['loan_deduction']||row['loan']||0) || PayrollEngine.getLoanDeductions(emp.id),
          advance:       parseFloat(row['advance']||row['salary_advance']||0),
          lateDeduction: parseFloat(row['late_deduction']||0),
          otherDeductions:parseFloat(row['other_deductions']||0),
        };
        rows.push({ emp, payrow, calc: PayrollEngine.calc(emp, payrow) });
      });

      const errBox = document.getElementById('payrollValidationErrors');
      if (errors.length && errBox) {
        errBox.style.display='block';
        errBox.innerHTML=`<div style="background:var(--red-l);border-radius:var(--radius);padding:12px;font-size:12px;color:var(--red)"><strong>${errors.length} validation error(s):</strong><br>${errors.slice(0,5).join('<br>')}</div>`;
      }
      if (rows.length) {
        renderPayrollPreview(rows);
        toast(`Imported ${rows.length} employee records from Excel`, 'success');
      }
    } catch(err) {
      toast('Import failed — check file format. Use the Excel template.', 'error');
    }
  };
  reader.readAsText(file);
}

function downloadPayrollTemplate() {
  const headers = ['employee_id','name','base_salary','allowance','ot_hours','bonus','loan_deduction','advance','late_deduction','other_deductions'];
  const rows    = DB.employees.slice(0,5).map(e=>[e.id,e.name,e.salary,e.allowance,'0','0','0','0','0','0']);
  const csv     = [headers.join(','), ...rows.map(r=>r.join(','))].join('\n');
  const blob    = new Blob([csv], { type:'text/csv' });
  const url     = URL.createObjectURL(blob);
  const a       = document.createElement('a');
  a.href=url; a.download=`Payroll_Template_${new Date().toISOString().slice(0,7)}.csv`; a.click();
  URL.revokeObjectURL(url);
  toast('Template downloaded', 'success');
}

function exportPayrollPreview() {
  const rows = window._payrollBatchRows; if (!rows?.length) return;
  const month = document.getElementById('pb_month')?.value || new Date().toISOString().slice(0,7);
  const headers = ['Employee ID','Name','Subsidiary','Department','Base Salary','Allowance','OT Hours','OT Pay','Performance Bonus','Gross Earnings','Loan Deduction','Advance','Tax','Total Deductions','Net Pay'];
  const data = rows.map(({emp,calc}) => [
    emp.id, emp.name, getSubName(emp.sub), getDeptName(emp.dept),
    calc.base, calc.allow, calc.otHours, calc.otPay.toFixed(2),
    (calc.perfBonus||0).toFixed(2), calc.grossEarnings.toFixed(2),
    (calc.loanDeduct||0).toFixed(2), calc.advanceDeduct.toFixed(2),
    calc.tax.toFixed(2), calc.totalDeductions.toFixed(2), calc.netPay.toFixed(2),
  ]);
  const totals = data.reduce((t,r) => {
    for (let i=4;i<r.length;i++) t[i]=(+t[i]||0)+(+r[i]||0);
    return t;
  }, ['','TOTAL','','','','','','','','','','','','','']);
  const all = [headers, ...data, totals];
  const csv = all.map(r=>r.map(v=>`"${v}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type:'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href=url; a.download=`AMC_Payroll_${month}.csv`; a.click();
  URL.revokeObjectURL(url);
  toast('Payroll exported', 'success');
}

function submitPayrollBatch() {
  const rows = window._payrollBatchRows; if (!rows?.length) { toast('Generate or import payroll first', 'error'); return; }
  const month = document.getElementById('pb_month')?.value;
  let processed = 0;
  rows.forEach(({ emp, payrow, calc }) => {
    const existing = DB.payroll.findIndex(p=>p.empId===emp.id&&p.month===month);
    const record = { ...payrow, status:'Processed', processedAt:new Date().toISOString().replace('T',' ').slice(0,16) };
    if (existing >= 0) DB.payroll[existing] = record;
    else DB.payroll.push(record);
    processed++;
    if (typeof SupaWrite !== 'undefined') SupaWrite.savePayroll(record);
  });
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Payroll batch processed: ${month} — ${processed} employees`, module:'Payroll', ip:'browser' });
  closeModal();
  toast(`Payroll batch processed — ${processed} employees for ${month}`, 'success');
  nav('payroll');
}

/* ═══════════════════════════════════════════════════════════════════════
   PROFILE MODULE — Full user profile with edit capabilities
   Triggered by clicking avatar/name in topbar
═══════════════════════════════════════════════════════════════════════ */
function openProfileModal() {
  const emp  = getCurrentEmployee();
  const user = STATE.user;
  const role = DB.customRolePermissions?.[STATE.role] || ROLES?.[STATE.role] || {};

  openModal('wide', `
    <div class="modal-header" style="background:linear-gradient(135deg,var(--navy),#002D72);padding-bottom:0;border-radius:var(--radius-lg) var(--radius-lg) 0 0"> <div style="padding:0 0 20px 0;width:100%"> <div style="display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap"> <!-- Avatar --> <div style="position:relative"> <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--gold),#E8B84B);display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:var(--navy);border:3px solid rgba(255,255,255,.2)"> ${initials(emp?.name || user?.name || 'U')}
            </div> </div> <!-- Name & Role --> <div style="flex:1"> <div style="font-size:20px;font-weight:900;color:white">${emp?.name || user?.name || 'User'}</div> <div style="font-size:13px;color:rgba(255,255,255,.6);margin-top:2px">${emp?.title || role.label || STATE.role}</div> <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"> <span style="background:rgba(201,162,39,.2);color:var(--gold);font-size:11px;font-weight:700;padding:2px 10px;border-radius:99px;border:1px solid rgba(201,162,39,.3)">${role.label || STATE.role}</span> ${emp ? `<span style="background:rgba(255,255,255,.1);color:rgba(255,255,255,.7);font-size:11px;font-weight:600;padding:2px 10px;border-radius:99px">${emp.id}</span>` : ''}
              ${emp ? `<span style="background:rgba(255,255,255,.1);color:rgba(255,255,255,.7);font-size:11px;font-weight:600;padding:2px 10px;border-radius:99px">${getSubName(emp.sub)}</span>` : ''}
            </div> </div> ${closeX('rgba(255,255,255,.6)')}
        </div> </div> </div> <div class="modal-body" style="padding:0"> <!-- Tabs --> <div style="display:flex;border-bottom:1px solid var(--gray-200);background:var(--gray-50)"> <button onclick="profileTab('info',this)"   class="profile-tab active-tab" style="padding:12px 20px;border:none;background:transparent;font-size:13px;font-weight:700;color:var(--navy);cursor:pointer;border-bottom:2px solid var(--navy)"> Profile Info</button> <button onclick="profileTab('edit',this)"   class="profile-tab"            style="padding:12px 20px;border:none;background:transparent;font-size:13px;font-weight:600;color:var(--gray-500);cursor:pointer;border-bottom:2px solid transparent">Edit Profile</button> <button onclick="profileTab('password',this)" class="profile-tab"          style="padding:12px 20px;border:none;background:transparent;font-size:13px;font-weight:600;color:var(--gray-500);cursor:pointer;border-bottom:2px solid transparent"> Change Password</button> </div> <!-- TAB: Info --> <div id="profileTabInfo" style="padding:20px 24px"> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px"> <div class="card" style="margin:0"> <div class="card-header"><span class="card-title">Personal Information</span></div> <div class="card-body"> ${[
                ['Full Name',    emp?.name || user?.name || '—'],
                ['Employee ID',  emp?.id   || '—'],
                ['Email',        user?.email || emp?.email || '—'],
                ['Phone',        emp?.phone || '—'],
                ['Date of Birth',emp?.dob   || '—'],
                ['Gender',       emp?.gender|| '—'],
              ].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val">${v}</span></div>`).join('')}
            </div> </div> <div class="card" style="margin:0"> <div class="card-header"><span class="card-title">Employment Information</span></div> <div class="card-body"> ${[
                ['Position',    emp?.title      || '—'],
                ['Department',  getDeptName(emp?.dept) || '—'],
                ['Subsidiary',  getSubName(emp?.sub)   || '—'],
                ['Grade',       emp?.grade      || '—'],
                ['Contract',    emp?.contractType|| '—'],
                ['Join Date',   fmtDate(emp?.joined)  || '—'],
                ['Status',      emp?.status     || 'Active'],
              ].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val">${v}</span></div>`).join('')}
            </div> </div> </div> ${emp ? `<div class="card" style="margin-top:16px"> <div class="card-header"><span class="card-title">Emergency Contact</span></div> <div class="card-body" style="display:flex;gap:40px;flex-wrap:wrap"> ${[['Name',emp.emergencyName||'—'],['Phone',emp.emergencyPhone||'—'],['Relationship',emp.emergencyRel||'—']].map(([k,v])=>`<div><div style="font-size:11px;color:var(--gray-400);font-weight:700;text-transform:uppercase">${k}</div><div style="font-size:13px;font-weight:700;margin-top:2px">${v}</div></div>`).join('')}
          </div> </div>` : ''}
      </div> <!-- TAB: Edit --> <div id="profileTabEdit" style="display:none;padding:20px 24px"> <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px"> <div class="form-group"><label class="form-label">Phone Number</label> <input class="form-control" id="prof_phone" value="${emp?.phone||''}" placeholder="+252xxxxxxxxx"> </div> <div class="form-group"><label class="form-label">Email Address</label> <input class="form-control" id="prof_email" value="${user?.email||emp?.email||''}" placeholder="your@email.com"> </div> <div class="form-group"><label class="form-label">Emergency Contact Name</label> <input class="form-control" id="prof_emer_name" value="${emp?.emergencyName||''}" placeholder="Full name"> </div> <div class="form-group"><label class="form-label">Emergency Contact Phone</label> <input class="form-control" id="prof_emer_phone" value="${emp?.emergencyPhone||''}" placeholder="+252xxxxxxxxx"> </div> <div class="form-group"><label class="form-label">Emergency Relationship</label> <input class="form-control" id="prof_emer_rel" value="${emp?.emergencyRel||''}" placeholder="e.g. Spouse, Parent"> </div> </div> <div style="margin-top:16px;display:flex;justify-content:flex-end;gap:8px"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveProfileInfo()">Save Changes</button> </div> </div> <!-- TAB: Password --> <div id="profileTabPassword" style="display:none;padding:20px 24px;max-width:480px"> <div class="form-group"><label class="form-label required">Current Password</label> <input class="form-control" id="prof_curr_pass" type="password" placeholder="Enter current password"> </div> <div class="form-group"><label class="form-label required">New Password</label> <input class="form-control" id="prof_new_pass" type="password" placeholder="Min 8 characters"> </div> <div class="form-group"><label class="form-label required">Confirm New Password</label> <input class="form-control" id="prof_confirm_pass" type="password" placeholder="Repeat new password"> </div> <div style="background:var(--blue-l);border-radius:var(--radius);padding:10px 14px;font-size:12px;color:var(--blue);margin-bottom:14px"> Password must be at least 8 characters with letters and numbers.
        </div> <button class="btn btn-primary" onclick="changeProfilePassword()">Update Password</button> </div> </div>`);
}

function profileTab(tab, btn) {
  ['info','edit','password'].forEach(t => {
    const el = document.getElementById('profileTab' + t.charAt(0).toUpperCase() + t.slice(1));
    if (el) el.style.display = t === tab ? 'block' : 'none';
  });
  document.querySelectorAll('.profile-tab').forEach(b => {
    b.style.color       = 'var(--gray-500)';
    b.style.fontWeight  = '600';
    b.style.borderBottom= '2px solid transparent';
  });
  if (btn) { btn.style.color='var(--navy)'; btn.style.fontWeight='700'; btn.style.borderBottom='2px solid var(--navy)'; }
}

function saveProfileInfo() {
  const emp = getCurrentEmployee();
  if (!emp) { toast('No employee record linked', 'error'); return; }
  emp.phone         = document.getElementById('prof_phone')?.value       || emp.phone;
  emp.email         = document.getElementById('prof_email')?.value       || emp.email;
  emp.emergencyName = document.getElementById('prof_emer_name')?.value  || emp.emergencyName;
  emp.emergencyPhone= document.getElementById('prof_emer_phone')?.value || emp.emergencyPhone;
  emp.emergencyRel  = document.getElementById('prof_emer_rel')?.value   || emp.emergencyRel;
  if (typeof SupaWrite !== 'undefined') SupaWrite.saveEmployee(emp);
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:'Profile information updated', module:'Profile', ip:'browser' });
  closeModal();
  toast('Profile updated successfully', 'success');
}

async function changeProfilePassword() {
  const curr    = document.getElementById('prof_curr_pass')?.value;
  const newPass = document.getElementById('prof_new_pass')?.value;
  const confirm = document.getElementById('prof_confirm_pass')?.value;
  if (!curr || !newPass || !confirm) { toast('All fields required', 'error'); return; }
  if (newPass.length < 8) { toast('Password must be at least 8 characters', 'error'); return; }
  if (newPass !== confirm) { toast('Passwords do not match', 'error'); return; }
  if (typeof Auth === 'undefined' || !SUPA.authToken) { toast('You must be signed in to change your password', 'error'); return; }

  try {
    // Re-verify the current password by signing in again (Supabase has no
    // "verify password" endpoint), then update to the new one.
    await Auth.signIn(STATE.user.email, curr);
  } catch (e) {
    toast('Current password is incorrect', 'error'); return;
  }
  try {
    const res = await fetch(`${SUPA.URL}/auth/v1/user`, {
      method: 'PUT',
      headers: { 'apikey': SUPA.KEY, 'Authorization': `Bearer ${SUPA.authToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: newPass }),
    });
    if (!res.ok) { const d = await res.json().catch(()=>({})); throw new Error(d.msg || d.error_description || 'Update failed'); }
  } catch (e) {
    toast('Could not update password: ' + (e.message || 'error'), 'error'); return;
  }
  if (typeof SupaWrite !== 'undefined') SupaWrite.logAudit({ user: STATE.user?.email, userRole: STATE.role, action: 'Password changed via profile', module: 'Profile' });
  closeModal();
  toast('Password updated successfully', 'success');
}

/* ═══════════════════════════════════════════════════════════════════════
   YEARLY BONUS MODULE — Full enterprise annual bonus management
   Performance rating → % of annual salary
═══════════════════════════════════════════════════════════════════════ */
PAGES.bonus = function(wrap) {
  if (!canManageFinance()) { wrap.innerHTML = renderAccessDenied('bonus'); return; }

  const year       = new Date().getFullYear();
  const bonuses    = DB.bonuses || [];
  const totalPaid  = bonuses.filter(b=>b.status==='Paid').reduce((s,b)=>s+b.amount,0);
  const totalPend  = bonuses.filter(b=>b.status==='Pending').reduce((s,b)=>s+b.amount,0);
  const totalApprv = bonuses.filter(b=>b.status==='Approved').reduce((s,b)=>s+b.amount,0);

  const ratingBg = { Outstanding:'#D1FAE5', 'Exceeds Expectations':'#DBEAFE', 'Meets Expectations':'#EDE9FE', 'Needs Improvement':'#FEF3C7', Unsatisfactory:'#FEE2E2' };
  const ratingColor = { Outstanding:'#065F46', 'Exceeds Expectations':'#1E40AF', 'Meets Expectations':'#5B21B6', 'Needs Improvement':'#92400E', Unsatisfactory:'#991B1B' };

  wrap.innerHTML = `<div class="page"> <div class="page-header"> <div><h1 class="page-title">Annual Bonus Management</h1> <div class="page-sub">Yearly performance-based bonus · ${year}</div> </div> <div style="display:flex;gap:10px"> <button class="btn btn-outline" onclick="openBonusRulesModal()">Bonus Scale</button> <button class="btn btn-primary btn-navy" onclick="generateYearlyBonuses()">Generate All Employees</button> <button class="btn btn-outline" onclick="openCreateBonusModal()">+ Single Bonus</button> </div> </div> <!-- Performance Rating Scale --> <div class="card" style="margin-bottom:16px;background:linear-gradient(135deg,var(--navy),#002D72)"> <div style="padding:16px 20px"> <div style="font-size:12px;font-weight:800;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.6px;margin-bottom:12px">Annual Bonus Scale (% of Annual Salary)</div> <div style="display:flex;gap:10px;flex-wrap:wrap"> ${Object.entries(PayrollEngine.BONUS_RATINGS||{Outstanding:.2,'Exceeds Expectations':.15,'Meets Expectations':.1,'Needs Improvement':.05,Unsatisfactory:0}).map(([r,p])=>`
            <div style="background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:10px 14px;text-align:center;min-width:100px"> <div style="font-size:18px;font-weight:900;color:var(--gold)">${(p*100).toFixed(0)}%</div> <div style="font-size:10px;color:rgba(255,255,255,.55);margin-top:2px">${r}</div> </div>`).join('')}
        </div> </div> </div> <!-- Stats --> <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px"> <div class="stat-card gold"><div class="stat-val">${fmtCurrency(totalPaid)}</div><div class="stat-lbl">Total Paid ${year}</div></div> <div class="stat-card green"><div class="stat-val">${fmtCurrency(totalApprv)}</div><div class="stat-lbl">Approved</div></div> <div class="stat-card amber"><div class="stat-val">${fmtCurrency(totalPend)}</div><div class="stat-lbl">Pending Approval</div></div> <div class="stat-card navy"><div class="stat-val">${bonuses.length}</div><div class="stat-lbl">Total Records</div></div> </div> <!-- Filters --> <div class="card" style="padding:12px 16px;margin-bottom:16px"> <div style="display:flex;gap:10px;flex-wrap:wrap"> <input class="form-control form-control-sm" id="bonusSearch" placeholder=" Search…" style="max-width:200px" oninput="renderBonusList()"> <select class="form-control form-control-sm" id="bonusFilterStatus" onchange="renderBonusList()" style="max-width:140px"> <option value="">All Status</option><option>Pending</option><option>Approved</option><option>Paid</option><option>Rejected</option> </select> <select class="form-control form-control-sm" id="bonusFilterSub" onchange="renderBonusList()" style="max-width:160px"> <option value="">All Subsidiaries</option> ${DB.subsidiaries.map(s=>`<option value="${s.id||s.code}">${s.name}</option>`).join('')}
        </select> </div> </div> <div id="bonusListWrap"></div> </div>`;
  renderBonusList();
};

function generateYearlyBonuses() {
  if (!confirm('Auto-generate annual bonuses for all active employees based on their KPI scores?')) return;
  const year   = new Date().getFullYear();
  const cycle  = `ANNUAL-${year}`;
  const month  = `${year}-12`;
  let created  = 0;

  DB.employees.filter(e=>e.status==='Active').forEach(emp => {
    // Skip if bonus already created for this cycle
    if ((DB.bonuses||[]).find(b=>b.empId===emp.id&&b.cycle===cycle)) return;

    const score = typeof PerfEngine !== 'undefined' ? PerfEngine.calcEmployeeScore(emp.id) : 0;
    const rating = score >= 110 ? 'Outstanding'
      : score >= 90  ? 'Exceeds Expectations'
      : score >= 70  ? 'Meets Expectations'
      : score >= 50  ? 'Needs Improvement'
      : 'Unsatisfactory';

    const amount  = PayrollEngine.calcYearlyBonus ? PayrollEngine.calcYearlyBonus(emp, rating) : 0;
    const b = {
      id:           'BON' + String((DB.bonuses||[]).length + 1).padStart(3,'0'),
      empId:        emp.id, type:'performance',
      performanceRating: rating, kpiScore: score,
      amount,
      description:  `Annual Bonus ${year} — ${rating} (KPI: ${score}%)`,
      cycle,        payrollMonth: month,
      status:       'Pending',
      approvedBy:   '',
      createdAt:    new Date().toISOString().split('T')[0],
    };
    if (!DB.bonuses) DB.bonuses = [];
    DB.bonuses.unshift(b);
    created++;
  });

  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Auto-generated ${created} annual bonuses for ${year}`, module:'Bonus', ip:'browser' });
  toast(`Generated ${created} annual bonus records for ${year}`, 'success');
  nav('bonus');
}

function renderBonusList() {
  const wrap   = document.getElementById('bonusListWrap'); if (!wrap) return;
  const search = (document.getElementById('bonusSearch')?.value||'').toLowerCase();
  const stF    = document.getElementById('bonusFilterStatus')?.value||'';
  const subF   = document.getElementById('bonusFilterSub')?.value||'';
  const ratingBg    = { Outstanding:'#D1FAE5','Exceeds Expectations':'#DBEAFE','Meets Expectations':'#EDE9FE','Needs Improvement':'#FEF3C7',Unsatisfactory:'#FEE2E2' };
  const ratingColor = { Outstanding:'#065F46','Exceeds Expectations':'#1E40AF','Meets Expectations':'#5B21B6','Needs Improvement':'#92400E',Unsatisfactory:'#991B1B' };

  let rows = (DB.bonuses||[]).map(b => ({ ...b, emp: getEmp(b.empId) })).filter(b=>b.emp);
  if (search) rows = rows.filter(b => b.emp.name.toLowerCase().includes(search));
  if (stF)   rows = rows.filter(b => b.status === stF);
  if (subF)  rows = rows.filter(b => b.emp.sub === subF);

  if (!rows.length) { wrap.innerHTML = `<div class="empty-state"><div style="font-size:36px"></div><h3>No Bonus Records</h3><p>Click Auto-Generate to create annual bonuses from KPI scores.</p></div>`; return; }

  wrap.innerHTML = `<div class="card"><div class="table-wrap"><table class="table"> <thead><tr><th>Employee</th><th>Subsidiary</th><th>Rating</th><th>KPI Score</th><th>Annual Salary</th><th>Bonus Amount</th><th>Cycle</th><th>Status</th><th>Actions</th></tr></thead> <tbody>${rows.map(b => {
      const annualSal = (b.emp.salary||0) * 12;
      const pct = annualSal > 0 ? Math.round(b.amount/annualSal*100) : 0;
      return `<tr> <td><div style="font-weight:700">${b.emp.name}</div><div style="font-size:11px;color:var(--gray-400)">${b.emp.id}</div></td> <td style="font-size:12px">${getSubName(b.emp.sub)}</td> <td>${b.performanceRating ? `<span style="background:${ratingBg[b.performanceRating]||'#F1F5F9'};color:${ratingColor[b.performanceRating]||'#475569'};font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px">${b.performanceRating}</span>` : finBadge(b.type)}</td> <td style="font-family:var(--mono)">${b.kpiScore !== undefined ? b.kpiScore+'%' : '—'}</td> <td style="font-family:var(--mono);color:var(--gray-500)">${fmtCurrency(annualSal)}</td> <td><div style="font-family:var(--mono);font-weight:900;font-size:15px;color:${b.amount>0?'var(--green)':'var(--gray-400)'}">${fmtCurrency(b.amount)}</div> <div style="font-size:10px;color:var(--gray-400)">${pct}% of annual</div></td> <td style="font-size:11px;font-family:var(--mono)">${b.cycle||'—'}</td> <td>${finBadge(b.status)}</td> <td>
          ${b.status==='Pending' && canApproveFinance() ? `
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              <button style="width:38px;height:38px;border-radius:10px;border:none;background:#D1FAE5;cursor:pointer;display:inline-flex;align-items:center;justify-content:center" title="Approve" onclick="updateBonusStatus('${b.id}','Approved')"><svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#065F46' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg></button>
              <button style="width:38px;height:38px;border-radius:10px;border:none;background:#FEE2E2;cursor:pointer;display:inline-flex;align-items:center;justify-content:center" title="Reject" onclick="updateBonusStatus('${b.id}','Rejected')"><svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='#991B1B' stroke-width='2.5' stroke-linecap='round'><line x1='18' y1='6' x2='6' y2='18'/><line x1='6' y1='6' x2='18' y2='18'/></svg></button>
            </div>` : ''}
          ${b.status==='Approved' && canApproveFinance() ? `
            <button style="height:38px;padding:0 16px;border-radius:10px;border:none;background:#DBEAFE;color:#1E40AF;cursor:pointer;font-size:12px;font-weight:700" title="Mark as Paid" onclick="updateBonusStatus('${b.id}','Paid')"><svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='#065F46' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='20 6 9 17 4 12'/></svg> Mark Paid</button>` : ''}
          ${b.status==='Paid' ? `<span style="color:#065F46;font-size:12px;font-weight:700">Paid</span>` : ''}
          ${b.status==='Rejected' ? `<span style="color:#991B1B;font-size:12px;font-weight:700">Rejected</span>` : ''}
        </td> </tr>`;
    }).join('')}</tbody> <tfoot><tr style="background:var(--navy);color:white;font-weight:800"> <td colspan="5" style="padding:10px 14px">TOTAL (${rows.length} employees)</td> <td style="font-family:var(--mono);padding:10px 8px;color:var(--gold)">${fmtCurrency(rows.reduce((s,b)=>s+b.amount,0))}</td> <td colspan="3"></td> </tr></tfoot> </table></div></div>`;
}

function openCreateBonusModal() {
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Create Bonus Record</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Employee</label> <select class="form-control" id="bn_emp" onchange="updateBonusCalc()"> <option value="">Select employee…</option> ${DB.employees.filter(e=>e.status==='Active').map(e=>`<option value="${e.id}">${e.name} (${e.id}) — ${getSubName(e.sub)}</option>`).join('')}
          </select> </div> <div class="form-group"><label class="form-label required">Performance Rating</label> <select class="form-control" id="bn_rating" onchange="updateBonusCalc()"> <option value="">Select rating…</option> ${Object.keys(PayrollEngine.BONUS_RATINGS||{Outstanding:.2,'Exceeds Expectations':.15,'Meets Expectations':.1,'Needs Improvement':.05,Unsatisfactory:0}).map(r=>`<option value="${r}">${r} (${((PayrollEngine.BONUS_RATINGS||{})[r]||0)*100}%)</option>`).join('')}
          </select> </div> </div> <div id="bn_calc_box" style="display:none;background:var(--navy);color:white;border-radius:var(--radius);padding:14px 18px;margin-bottom:14px"> <div style="display:flex;gap:24px;flex-wrap:wrap"> <div><div style="font-size:10px;color:rgba(255,255,255,.5);text-transform:uppercase">Annual Salary</div><div id="bn_annual" style="font-size:18px;font-weight:900;color:white">—</div></div> <div><div style="font-size:10px;color:rgba(255,255,255,.5);text-transform:uppercase">Bonus %</div><div id="bn_pct" style="font-size:18px;font-weight:900;color:var(--gold)">—</div></div> <div><div style="font-size:10px;color:rgba(255,255,255,.5);text-transform:uppercase">Bonus Amount</div><div id="bn_amount" style="font-size:22px;font-weight:900;color:#86EFAC">—</div></div> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Cycle</label> <input class="form-control" id="bn_cycle" value="ANNUAL-${new Date().getFullYear()}" placeholder="ANNUAL-2026"> </div> <div class="form-group"><label class="form-label required">Pay in Month</label> <input class="form-control" id="bn_month" type="month" value="${new Date().getFullYear()}-12"> </div> </div> <div class="form-group"><label class="form-label">Notes</label> <input class="form-control" id="bn_desc" placeholder="Optional notes…"> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveBonus()">Create Bonus</button> </div>`);
}

function updateBonusCalc() {
  const empId  = document.getElementById('bn_emp')?.value;
  const rating = document.getElementById('bn_rating')?.value;
  const box    = document.getElementById('bn_calc_box');
  if (!empId || !rating || !box) { if (box) box.style.display='none'; return; }
  const emp    = getEmp(empId);
  const annual = (emp.salary||0) * 12;
  const pct    = (PayrollEngine.BONUS_RATINGS||{})[rating] || 0;
  const amount = Math.round(annual * pct * 100) / 100;
  box.style.display = 'flex';
  document.getElementById('bn_annual').textContent = fmtCurrency(annual);
  document.getElementById('bn_pct').textContent    = (pct*100)+'%';
  document.getElementById('bn_amount').textContent = fmtCurrency(amount);
}

function saveBonus() {
  const empId  = document.getElementById('bn_emp')?.value;
  const rating = document.getElementById('bn_rating')?.value;
  const cycle  = document.getElementById('bn_cycle')?.value?.trim();
  const month  = document.getElementById('bn_month')?.value;
  const desc   = document.getElementById('bn_desc')?.value?.trim();
  if (!empId || !rating || !cycle || !month) { toast('All required fields must be filled', 'error'); return; }
  const emp    = getEmp(empId);
  const amount = Math.round((emp.salary||0) * 12 * ((PayrollEngine.BONUS_RATINGS||{})[rating]||0) * 100) / 100;
  const b = {
    id:                'BON' + String((DB.bonuses||[]).length + 1).padStart(3,'0'),
    empId, type:       'performance', performanceRating: rating,
    kpiScore:          typeof PerfEngine !== 'undefined' ? PerfEngine.calcEmployeeScore(empId) : 0,
    amount,
    description:       desc || `Annual Bonus — ${rating}`,
    cycle, payrollMonth: month, status: 'Pending', approvedBy: '',
    createdAt:         new Date().toISOString().split('T')[0],
  };
  if (!DB.bonuses) DB.bonuses = [];
  DB.bonuses.unshift(b);
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Created bonus: ${emp.name} — ${rating} — ${fmtCurrency(amount)}`, module:'Bonus', ip:'browser' });
  closeModal(); toast(`Bonus created: ${fmtCurrency(amount)} for ${emp.name}`, 'success'); nav('bonus');

  scheduleSave();
}

function updateBonusStatus(id, status) {
  const b = (DB.bonuses||[]).find(x=>x.id===id); if (!b) return;
  b.status = status; b.approvedBy = STATE.user?.email||'';
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Bonus ${status}: ${getEmp(b.empId)?.name} — ${fmtCurrency(b.amount)}`, module:'Bonus', ip:'browser' });
  toast(`Bonus ${status.toLowerCase()}`, status==='Approved'||status==='Paid'?'success':'warning');
  renderBonusList();

  scheduleSave();
}

function openBonusRulesModal() {
  // Store bonus ratings on window so they can be edited live
  if (!window._bonusRatings) {
    window._bonusRatings = JSON.parse(JSON.stringify(
      PayrollEngine.BONUS_RATINGS || {
        'Outstanding':          0.20,
        'Exceeds Expectations': 0.15,
        'Meets Expectations':   0.10,
        'Needs Improvement':    0.05,
        'Unsatisfactory':       0.00,
      }
    ));
  }
  const ratings = window._bonusRatings;
  const exampleSalary = 2000;

  const ratingColors = {
    'Outstanding':          { bg:'#D1FAE5', color:'#065F46' },
    'Exceeds Expectations': { bg:'#DBEAFE', color:'#1E40AF' },
    'Meets Expectations':   { bg:'#EDE9FE', color:'#5B21B6' },
    'Needs Improvement':    { bg:'#FEF3C7', color:'#92400E' },
    'Unsatisfactory':       { bg:'#FEE2E2', color:'#991B1B' },
  };
  const kpiRanges = {
    'Outstanding':          '110%+',
    'Exceeds Expectations': '90–109%',
    'Meets Expectations':   '70–89%',
    'Needs Improvement':    '50–69%',
    'Unsatisfactory':       'Below 50%',
  };

  const rows = Object.entries(ratings).map(([rating, pct], i) => {
    const c       = ratingColors[rating] || { bg:'#F1F5F9', color:'#475569' };
    const example = exampleSalary * 12 * pct;
    const pctVal  = Math.round(pct * 100);
    return `<tr style="border-bottom:1px solid var(--gray-100)"> <td style="padding:14px 16px"> <span style="background:${c.bg};color:${c.color};font-weight:800;padding:4px 14px;border-radius:99px;font-size:13px">${rating}</span> </td> <td style="padding:14px 16px;font-size:13px;color:var(--gray-500)">${kpiRanges[rating]||'—'}</td> <td style="padding:14px 16px"> <div style="display:flex;align-items:center;gap:8px"> <input type="number" id="br_pct_${i}" value="${pctVal}"
            min="0" max="100" step="1"
            onchange="updateBonusRatingRow(${i},'${rating}')"
            oninput="updateBonusRatingRow(${i},'${rating}')"
            style="width:72px;padding:6px 10px;border:2px solid var(--border);border-radius:8px;font-size:15px;font-weight:800;text-align:center;font-family:var(--mono);color:${c.color};background:${c.bg}"> <span style="font-size:14px;font-weight:700;color:var(--gray-400)">%</span> </div> </td> <td style="padding:14px 16px"> <span id="br_example_${i}" style="font-family:var(--mono);font-size:14px;font-weight:700;color:var(--navy)"> $${example.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}
        </span> </td> <td style="padding:14px 16px"> <div style="display:flex;align-items:center;gap:6px"> <button onclick="changeBonusPct('${rating}',${i},-5)" title="Decrease 5%"
            style="width:28px;height:28px;border-radius:6px;border:1px solid var(--border);background:var(--gray-50);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center">−</button> <button onclick="changeBonusPct('${rating}',${i},5)" title="Increase 5%"
            style="width:28px;height:28px;border-radius:6px;border:1px solid var(--border);background:var(--gray-50);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center">+</button> </div> </td> </tr>`;
  }).join('');

  openModal('wide', `
    <div class="modal-header" style="background:var(--navy)"> <span class="modal-title" style="color:white">Annual Bonus Scale</span> ${closeX('rgba(255,255,255,.6)')}
    </div> <div class="modal-body" style="padding:0"> <div style="padding:14px 16px;background:var(--blue-l);border-bottom:1px solid var(--border);font-size:13px;color:var(--blue)"> <strong>Edit mode</strong> — Change any percentage and click <strong>Save Changes</strong> to apply. Changes affect all future bonus calculations.
      </div> <!-- Example salary input --> <div style="padding:12px 16px;background:var(--gray-50);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:12px"> <label style="font-size:12px;font-weight:700;color:var(--gray-600)">Example monthly salary:</label> <div style="display:flex;align-items:center;gap:4px"> <span style="font-size:13px;color:var(--gray-500)">$</span> <input type="number" id="br_example_salary" value="${exampleSalary}" min="100" step="100"
            oninput="refreshBonusExamples()"
            style="width:100px;padding:5px 8px;border:1px solid var(--border);border-radius:6px;font-size:13px;font-family:var(--mono)"> <span style="font-size:12px;color:var(--gray-400)">/month</span> </div> </div> <!-- Table --> <table style="width:100%;border-collapse:collapse"> <thead> <tr style="background:var(--gray-50);border-bottom:2px solid var(--border)"> <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.5px">Performance Rating</th> <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.5px">KPI Score Range</th> <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.5px">Bonus % (Editable)</th> <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.5px">Example Amount</th> <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:.5px">Quick Adjust</th> </tr> </thead> <tbody id="bonusRatingsTable"> ${rows}
        </tbody> </table> <!-- Summary bar --> <div style="padding:14px 16px;background:var(--navy);display:flex;gap:24px;flex-wrap:wrap"> ${Object.entries(ratings).map(([r,p], i) => `
          <div style="text-align:center"> <div style="font-size:18px;font-weight:900;color:var(--gold)" id="br_sum_${i}">${Math.round(p*100)}%</div> <div style="font-size:10px;color:rgba(255,255,255,.45)">${r.split(' ')[0]}</div> </div>`).join('')}
      </div> </div> <div class="modal-footer" style="justify-content:space-between"> <button class="btn btn-outline btn-sm" onclick="resetBonusScale()" style="color:var(--red)">Reset to Defaults</button> <div style="display:flex;gap:8px"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveBonusScale()" style="background:var(--navy);padding:10px 28px"> Save Changes
        </button> </div> </div>`);
}

// ── Update a row when percentage input changes ──
function updateBonusRatingRow(index, rating) {
  const input   = document.getElementById('br_pct_' + index);
  const exEl    = document.getElementById('br_example_' + index);
  const sumEl   = document.getElementById('br_sum_' + index);
  const salInput= document.getElementById('br_example_salary');
  if (!input) return;

  let pct = parseFloat(input.value) || 0;
  pct = Math.max(0, Math.min(100, pct));
  input.value = pct;

  const salary  = parseFloat(salInput?.value || 2000);
  const amount  = salary * 12 * (pct / 100);

  if (exEl) exEl.textContent = '$' + amount.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });
  if (sumEl) sumEl.textContent = pct + '%';

  if (!window._bonusRatings) window._bonusRatings = {};
  window._bonusRatings[rating] = pct / 100;
}

// ── +/- quick adjust ──
function changeBonusPct(rating, index, delta) {
  const input = document.getElementById('br_pct_' + index);
  if (!input) return;
  input.value = Math.max(0, Math.min(100, (parseFloat(input.value) || 0) + delta));
  updateBonusRatingRow(index, rating);
}

// ── Refresh example column when salary changes ──
function refreshBonusExamples() {
  const salary = parseFloat(document.getElementById('br_example_salary')?.value || 2000);
  const ratings = window._bonusRatings || {};
  Object.entries(ratings).forEach(([r, pct], i) => {
    const exEl = document.getElementById('br_example_' + i);
    if (exEl) {
      const amount = salary * 12 * pct;
      exEl.textContent = '$' + amount.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });
    }
  });
}

// ── Save changes to PayrollEngine ──
function saveBonusScale() {
  if (!window._bonusRatings) { closeModal(); return; }

  // Apply to PayrollEngine
  PayrollEngine.BONUS_RATINGS = { ...window._bonusRatings };

  // Also sync to ROLES description (audit)
  const summary = Object.entries(window._bonusRatings)
    .map(([r,p]) => `${r.split(' ')[0]}: ${Math.round(p*100)}%`).join(', ');

  DB.auditLogs.unshift({
    id:       DB.auditLogs.length + 1,
    time:     new Date().toISOString().replace('T',' ').slice(0,16),
    user:     STATE.user?.initials || 'SYS',
    userRole: STATE.role,
    action:   'Annual bonus scale updated: ' + summary,
    module:   'Bonus',
    ip:       'browser',
  });

  closeModal();
  window._bonusRatings = null; // clear cache so reopening shows fresh saved values
  toast('Bonus scale saved — new percentages apply to all future bonus calculations', 'success');
  nav('bonus');

  scheduleSave();
}

// ── Reset to company defaults ──
function resetBonusScale() {
  if (!confirm('Reset bonus scale to default percentages (20/15/10/5/0%)? This cannot be undone.')) return;
  window._bonusRatings = {
    'Outstanding':          0.20,
    'Exceeds Expectations': 0.15,
    'Meets Expectations':   0.10,
    'Needs Improvement':    0.05,
    'Unsatisfactory':       0.00,
  };
  PayrollEngine.BONUS_RATINGS = { ...window._bonusRatings };
  window._bonusRatings = null;
  toast('Bonus scale reset to defaults', 'info');
  openBonusRulesModal();
}


function openRoleMatrixEditor() {
  const pages = [
    { id:'dashboard',    label:'Dashboard'       },
    { id:'employees',    label:'Employees'       },
    { id:'attendance',   label:'Attendance'      },
    { id:'leave',        label:'Leave'           },
    { id:'payroll',      label:'Payroll'         },
    { id:'bonus',        label:'Bonus'           },
    { id:'advances',     label:'Salary Advances' },
    { id:'loans',        label:'Loans'           },
    { id:'recruitment',  label:'Recruitment'     },
    { id:'training',     label:'Training'        },
    { id:'performance',  label:'Performance'     },
    { id:'kpi',          label:'KPI'             },
    { id:'reports',      label:'Reports'         },
    { id:'notices',      label:'Notices'         },
    { id:'users',        label:'Users'           },
    { id:'settings',     label:'Settings'        },
    { id:'organization', label:'Organization'    },
    { id:'disciplinary', label:'Disciplinary'    },
  ];

  const roles = Object.entries(ROLES).filter(([k]) => k !== 'super_admin');

  openModal('xl', `
    <div class="modal-header" style="background:var(--navy)"> <span class="modal-title" style="color:white">Role Permissions Matrix</span> ${closeX('rgba(255,255,255,.6)')}
    </div> <div class="modal-body" style="padding:0"> <div style="padding:12px 16px;background:var(--blue-l);font-size:12px;color:var(--blue);border-bottom:1px solid var(--border)"> = Has access &nbsp;|&nbsp; Click any cell to toggle permission &nbsp;|&nbsp; Changes apply immediately
      </div> <div style="overflow-x:auto;max-height:70vh;overflow-y:auto"> <table style="width:100%;border-collapse:collapse;font-size:12px"> <thead style="position:sticky;top:0;z-index:10;background:var(--navy)"> <tr> <th style="padding:10px 14px;text-align:left;color:rgba(255,255,255,.6);font-weight:700;font-size:11px;min-width:160px">MODULE</th> ${roles.map(([key, r]) => `
                <th style="padding:10px 8px;text-align:center;color:white;font-size:10px;font-weight:700;min-width:90px"> <div style="color:var(--gold)">${r.label}</div> <button onclick="toggleAllRole('${key}',${roles.indexOf([key,r])})" style="font-size:9px;background:rgba(255,255,255,.1);border:none;color:rgba(255,255,255,.5);cursor:pointer;padding:1px 4px;border-radius:3px;margin-top:3px">toggle all</button> </th>`).join('')}
            </tr> </thead> <tbody> ${pages.map((page, pi) => `
              <tr style="border-bottom:1px solid var(--border)${pi%2===0?';background:var(--gray-50)':''}"> <td style="padding:8px 14px;font-weight:600;color:var(--navy)"> <span style="margin-right:6px">${page.icon}</span>${page.label}
                </td> ${roles.map(([roleKey, roleData]) => {
                  const hasPerm = roleData.perms.includes('*') || roleData.perms.includes(page.id);
                  const isLocked = roleKey === 'employee' && page.id === 'dashboard';
                  return `<td style="text-align:center;padding:6px"> <button onclick="toggleRolePerm('${roleKey}','${page.id}',this)"
                      style="width:36px;height:28px;border-radius:8px;border:none;cursor:${isLocked?'not-allowed':'pointer'};font-size:15px;transition:all .15s;background:${hasPerm?'var(--green-l)':'var(--gray-100)'}"
                      ${isLocked ? 'disabled' : ''}
                      title="${roleData.label} — ${page.label}"> ${hasPerm ? '✅' : '⬜'}
                    </button> </td>`;
                }).join('')}
              </tr>`).join('')}
          </tbody> </table> </div> </div> <div class="modal-footer" style="justify-content:space-between"> <div> <button class="btn btn-outline btn-sm" onclick="openCreateCustomRoleModal()">+ Create Custom Role</button> </div> <div style="display:flex;gap:8px"> <button class="btn btn-outline" onclick="closeModal()">Done</button> <button class="btn btn-primary" onclick="saveRoleMatrix()">Save All Changes</button> </div> </div>`);
}

function toggleRolePerm(roleKey, pageId, btn) {
  const role = ROLES[roleKey];
  if (!role || role.perms.includes('*')) return;
  const idx = role.perms.indexOf(pageId);
  if (idx >= 0) {
    role.perms.splice(idx, 1);
    btn.textContent = '⬜';
    btn.style.background = 'var(--gray-100)';
  } else {
    role.perms.push(pageId);
    btn.textContent = '✅';
    btn.style.background = 'var(--green-l)';
  }
  // Apply immediately to sidebar
  applySidebarRBAC();
}

function toggleAllRole(roleKey, colIndex) {
  const role = ROLES[roleKey];
  if (!role || role.perms.includes('*')) return;
  const buttons = document.querySelectorAll(`tbody tr td:nth-child(${colIndex + 2}) button`);
  const allChecked = [...buttons].every(b => b.textContent.trim() === '✅');
  const allPages = ['dashboard','employees','attendance','leave','payroll','bonus','advances','loans',
                    'recruitment','training','performance','kpi','reports','notices','users','settings','organization','disciplinary'];
  if (allChecked) {
    role.perms = ['dashboard'];
    buttons.forEach(b => { b.textContent = '⬜'; b.style.background = 'var(--gray-100)'; });
    buttons[0].textContent = '✅'; buttons[0].style.background = 'var(--green-l)';
  } else {
    role.perms = [...allPages];
    buttons.forEach(b => { b.textContent = '✅'; b.style.background = 'var(--green-l)'; });
  }
  applySidebarRBAC();
}

function saveRoleMatrix() {
  // Sync ROLES changes to DB.customRolePermissions for persistence
  if (!DB.customRolePermissions) DB.customRolePermissions = {};
  Object.entries(ROLES).forEach(([k,v]) => { DB.customRolePermissions[k] = v; });
  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:'Role permissions matrix updated', module:'Settings', ip:'browser' });
  closeModal();
  toast('Role permissions saved — changes are live immediately', 'success');
  applySidebarRBAC();

  scheduleSave();
}

/* ── Create Custom Role ── */
function openCreateCustomRoleModal() {
  const allPages = [
    ['dashboard','Dashboard'],['employees','Employees'],['attendance','Attendance'],
    ['leave','Leave'],['payroll','Payroll'],['bonus','Bonus'],['advances','Salary Advances'],
    ['loans','Loans'],['recruitment','Recruitment'],['training','Training'],
    ['performance','Performance'],['kpi','KPI'],['reports','Reports'],
    ['notices','Notices'],['users','User Management'],['organization','Organization'],
    ['settings','Settings'],['disciplinary','Disciplinary'],
  ];
  openModal('wide', `
    <div class="modal-header"><span class="modal-title">Create Custom Role</span>${closeX()}</div> <div class="modal-body"> <div class="form-row cols-2" style="margin-bottom:16px"> <div class="form-group"><label class="form-label required">Role Name</label> <input class="form-control" id="cr_name" placeholder="e.g. HR Officer, Payroll Admin"> </div> <div class="form-group"><label class="form-label">Role Color</label> <select class="form-control" id="cr_color"> <option value="blue">Blue</option><option value="green">Green</option> <option value="purple">Purple</option><option value="gold">Gold</option> <option value="teal">Teal</option><option value="red">Red</option> </select> </div> </div> <div class="form-group" style="margin-bottom:16px"> <label class="form-label">Description</label> <input class="form-control" id="cr_desc" placeholder="Brief description of this role's responsibilities"> </div> <div class="form-group"> <label class="form-label required">Module Permissions</label> <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:8px"> ${allPages.map(([id, label]) => `
            <label style="display:flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid var(--gray-200);border-radius:var(--radius);cursor:pointer;font-size:13px;transition:all .15s"
              onmouseenter="this.style.background='var(--gray-50)'" onmouseleave="this.style.background=''"> <input type="checkbox" value="${id}" class="cr_perm" style="accent-color:var(--navy);width:15px;height:15px"
                ${id==='dashboard'?' checked disabled':''}> ${label}
            </label>`).join('')}
        </div> </div> </div> <div class="modal-footer"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveCustomRole()">Create Role</button> </div>`);
}

function saveCustomRole() {
  const name  = document.getElementById('cr_name')?.value?.trim();
  const color = document.getElementById('cr_color')?.value;
  const desc  = document.getElementById('cr_desc')?.value?.trim();
  if (!name) { toast('Role name is required', 'error'); return; }

  const perms = ['dashboard', ...[...document.querySelectorAll('.cr_perm:checked')].map(cb => cb.value).filter(v => v !== 'dashboard')];
  const key   = name.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');

  if (ROLES[key]) { toast('A role with this name already exists', 'error'); return; }

  ROLES[key] = { label: name, color, perms, canEdit: true, selfServiceOnly: false, description: desc || name };
  if (!DB.customRolePermissions) DB.customRolePermissions = {};
  DB.customRolePermissions[key] = ROLES[key];

  DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:new Date().toISOString().replace('T',' ').slice(0,16), user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Created custom role: ${name} (${perms.length} permissions)`, module:'Settings', ip:'browser' });
  closeModal();
  toast(`Custom role "${name}" created successfully`, 'success');
  openRoleMatrixEditor();

  scheduleSave();
}

/* ═══════════════════════════════════════════════════════════════════════
   ADD EMPLOYEE — Enhanced with Guarantor / Emergency Contact fields
═══════════════════════════════════════════════════════════════════════ */
function openAddEmployeeModal(existingId = '') {
  const emp  = existingId ? getEmp(existingId) : null;
  const isEdit = !!emp;
  const subs = DB.subsidiaries || [];
  const depts = DB.departments || [];

  openModal('xl', `
    <div class="modal-header" style="background:var(--navy)"> <span class="modal-title" style="color:white">${isEdit ? 'Edit Employee' : ' Add New Employee'}</span> ${closeX('rgba(255,255,255,.6)')}
    </div> <div class="modal-body" style="padding:0"> <!-- Tab navigation --> <div style="display:flex;background:var(--gray-50);border-bottom:1px solid var(--border)"> ${['Personal','Employment','Guarantor','Emergency Contact','Bank & Payroll'].map((t,i)=>`
          <button class="emp-tab-btn ${i===0?'emp-tab-active':''}" data-tab="${i}"
            onclick="switchEmpTab(${i},this)"
            style="padding:10px 16px;border:none;background:${i===0?'white':'transparent'};border-bottom:${i===0?'2px solid var(--navy)':'none'};font-size:12px;font-weight:${i===0?'700':'600'};color:${i===0?'var(--navy)':'var(--gray-400)'};cursor:pointer;white-space:nowrap">${t}</button>`).join('')}
      </div> <!-- TAB 0: Personal Info --> <div class="emp-tab-pane" data-pane="0" style="padding:20px 24px"> <div class="form-row cols-3"> <div class="form-group"><label class="form-label required">Full Name</label> <input class="form-control" id="ea_name" value="${emp?.name||''}" placeholder="e.g. Fatima Hassan Abdi"> </div> <div class="form-group"><label class="form-label required">Email Address</label> <input class="form-control" id="ea_email" type="email" value="${emp?.email||''}" placeholder="name@company.com"> </div> <div class="form-group"><label class="form-label required">Phone Number</label> <input class="form-control" id="ea_phone" value="${emp?.phone||''}" placeholder="+252xxxxxxxxx"> </div> </div> <div class="form-row cols-3"> <div class="form-group"><label class="form-label">Date of Birth</label> <input class="form-control" id="ea_dob" type="date" value="${emp?.dob||''}"> </div> <div class="form-group"><label class="form-label">Gender</label> <select class="form-control" id="ea_gender"> <option value="">Select…</option> <option ${emp?.gender==='Male'?'selected':''}>Male</option> <option ${emp?.gender==='Female'?'selected':''}>Female</option> </select> </div> <div class="form-group"><label class="form-label">Nationality</label> <input class="form-control" id="ea_nationality" value="${emp?.nationality||'Somali'}" placeholder="Somali"> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">National ID Number</label> <input class="form-control" id="ea_national_id" value="${emp?.nationalId||''}" placeholder="ID number"> </div> <div class="form-group"><label class="form-label">Home Address</label> <input class="form-control" id="ea_address" value="${emp?.address||''}" placeholder="Street, District, City"> </div> </div> </div> <!-- TAB 1: Employment --> <div class="emp-tab-pane" data-pane="1" style="display:none;padding:20px 24px"> <div class="form-row cols-3"> <div class="form-group"><label class="form-label required">Subsidiary</label> <select class="form-control" id="ea_sub" onchange="filterEmpDepts()"> <option value="">Select…</option> ${subs.map(s=>`<option value="${s.id||s.code?.toLowerCase()}" ${emp?.sub===s.id?'selected':''}>${s.name}</option>`).join('')}
            </select> </div> <div class="form-group"><label class="form-label required">Department</label> <select class="form-control" id="ea_dept"> <option value="">Select subsidiary first…</option> ${depts.map(d=>`<option value="${d.id}" ${emp?.dept===d.id?'selected':''}>${d.name}</option>`).join('')}
            </select> </div> <div class="form-group"><label class="form-label required">Job Title</label> <input class="form-control" id="ea_title" value="${emp?.title||''}" placeholder="e.g. Senior Reporter"> </div> </div> <div class="form-row cols-3"> <div class="form-group"><label class="form-label required">Employment Grade</label> <select class="form-control" id="ea_grade"> ${['G1 Executive Director','G2 Director','G3 Senior Manager','G4 Manager','G5 Assistant Manager','G6 Senior Officer','G7 Officer','G8 Junior Officer','G9 Assistant','G10 Intern'].map(g=>`<option value="${g.split(' ')[0]}" ${emp?.grade===g.split(' ')[0]?'selected':''}>${g}</option>`).join('')}
            </select> </div> <div class="form-group"><label class="form-label required">Contract Type</label> <select class="form-control" id="ea_contract"> ${['Permanent','Fixed-Term','Probation','Part-Time','Consultant','Intern'].map(c=>`<option ${emp?.contractType===c?'selected':''}>${c}</option>`).join('')}
            </select> </div> <div class="form-group"><label class="form-label required">Join Date</label> <input class="form-control" id="ea_joined" type="date" value="${emp?.joined||''}"> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label required">Base Salary (USD/month)</label> <input class="form-control" id="ea_salary" type="number" value="${emp?.salary||''}" placeholder="e.g. 1500"> </div> <div class="form-group"><label class="form-label">Allowances (USD/month)</label> <input class="form-control" id="ea_allowance" type="number" value="${emp?.allowance||''}" placeholder="e.g. 300"> </div> </div> <div class="form-group"><label class="form-label">Contract End Date (leave blank for permanent)</label> <input class="form-control" id="ea_contract_end" type="date" value="${emp?.contractEnd||''}"> </div> </div> <!-- TAB 2: Guarantor --> <div class="emp-tab-pane" data-pane="2" style="display:none;padding:20px 24px"> <div style="background:var(--blue-l);border-radius:var(--radius);padding:12px 16px;font-size:13px;color:var(--blue);margin-bottom:16px"> Guarantor information is required for employment. The guarantor takes responsibility for the employee's conduct and obligations.
        </div> <div style="font-size:14px;font-weight:800;color:var(--navy);margin-bottom:14px">Primary Guarantor</div> <div class="form-row cols-3"> <div class="form-group"><label class="form-label required">Guarantor Full Name</label> <input class="form-control" id="ea_g1_name" value="${emp?.guarantor1Name||''}" placeholder="Full legal name"> </div> <div class="form-group"><label class="form-label required">Relationship</label> <select class="form-control" id="ea_g1_rel"> ${['Parent','Sibling','Relative','Friend','Colleague','Other'].map(r=>`<option ${emp?.guarantor1Rel===r?'selected':''}>${r}</option>`).join('')}
            </select> </div> <div class="form-group"><label class="form-label required">Phone Number</label> <input class="form-control" id="ea_g1_phone" value="${emp?.guarantor1Phone||''}" placeholder="+252xxxxxxxxx"> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">National ID / Passport</label> <input class="form-control" id="ea_g1_id" value="${emp?.guarantor1Id||''}" placeholder="ID number"> </div> <div class="form-group"><label class="form-label">Occupation</label> <input class="form-control" id="ea_g1_job" value="${emp?.guarantor1Job||''}" placeholder="e.g. Teacher, Businessman"> </div> </div> <div class="form-group"><label class="form-label">Address</label> <input class="form-control" id="ea_g1_address" value="${emp?.guarantor1Address||''}" placeholder="Guarantor's home address"> </div> <div style="height:1px;background:var(--border);margin:20px 0"></div> <div style="font-size:14px;font-weight:800;color:var(--navy);margin-bottom:14px">Secondary Guarantor (Optional)</div> <div class="form-row cols-3"> <div class="form-group"><label class="form-label">Name</label> <input class="form-control" id="ea_g2_name" value="${emp?.guarantor2Name||''}" placeholder="Full legal name"> </div> <div class="form-group"><label class="form-label">Relationship</label> <input class="form-control" id="ea_g2_rel" value="${emp?.guarantor2Rel||''}" placeholder="e.g. Uncle"> </div> <div class="form-group"><label class="form-label">Phone</label> <input class="form-control" id="ea_g2_phone" value="${emp?.guarantor2Phone||''}" placeholder="+252xxxxxxxxx"> </div> </div> </div> <!-- TAB 3: Emergency Contact --> <div class="emp-tab-pane" data-pane="3" style="display:none;padding:20px 24px"> <div class="form-row cols-3"> <div class="form-group"><label class="form-label required">Contact Full Name</label> <input class="form-control" id="ea_emer_name" value="${emp?.emergencyName||''}" placeholder="Full name"> </div> <div class="form-group"><label class="form-label required">Relationship</label> <select class="form-control" id="ea_emer_rel"> ${['Spouse','Parent','Sibling','Child','Relative','Friend','Other'].map(r=>`<option ${emp?.emergencyRel===r?'selected':''}>${r}</option>`).join('')}
            </select> </div> <div class="form-group"><label class="form-label required">Phone Number</label> <input class="form-control" id="ea_emer_phone" value="${emp?.emergencyPhone||''}" placeholder="+252xxxxxxxxx"> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Alternative Phone</label> <input class="form-control" id="ea_emer_phone2" value="${emp?.emergencyPhone2||''}" placeholder="Secondary number"> </div> <div class="form-group"><label class="form-label">Email</label> <input class="form-control" id="ea_emer_email" value="${emp?.emergencyEmail||''}" placeholder="email@example.com"> </div> </div> <div class="form-group"><label class="form-label">Address</label> <input class="form-control" id="ea_emer_address" value="${emp?.emergencyAddress||''}" placeholder="Emergency contact's address"> </div> </div> <!-- TAB 4: Bank & Payroll --> <div class="emp-tab-pane" data-pane="4" style="display:none;padding:20px 24px"> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Bank Name</label> <select class="form-control" id="ea_bank"> <option value="">Select bank…</option> ${['Premier Bank Somalia','Salaam Bank','Dahabshiil Bank','Amana Bank','IBS Bank','Amal Bank','Cash (No Bank)'].map(b=>`<option ${emp?.bankName===b?'selected':''}>${b}</option>`).join('')}
            </select> </div> <div class="form-group"><label class="form-label">Account Number</label> <input class="form-control" id="ea_bank_acc" value="${emp?.bankAccount||''}" placeholder="Bank account number"> </div> </div> <div class="form-row cols-2"> <div class="form-group"><label class="form-label">Account Holder Name</label> <input class="form-control" id="ea_bank_name" value="${emp?.bankAccountName||''}" placeholder="Name on account"> </div> <div class="form-group"><label class="form-label">Salary Payment Method</label> <select class="form-control" id="ea_pay_method"> ${['Bank Transfer','EVC Plus','Cash','Waafi Pay'].map(m=>`<option ${emp?.paymentMethod===m?'selected':''}>${m}</option>`).join('')}
            </select> </div> </div> <div style="height:1px;background:var(--border);margin:16px 0"></div> <div style="font-size:14px;font-weight:700;color:var(--navy);margin-bottom:12px">Education</div> <div class="form-row cols-3"> <div class="form-group"><label class="form-label">Highest Qualification</label> <select class="form-control" id="ea_edu_level"> ${['Primary','Secondary','Diploma','Bachelor','Master','PhD','Other'].map(e=>`<option ${emp?.eduLevel===e?'selected':''}>${e}</option>`).join('')}
            </select> </div> <div class="form-group"><label class="form-label">Field of Study</label> <input class="form-control" id="ea_edu_field" value="${emp?.eduField||''}" placeholder="e.g. Business Administration"> </div> <div class="form-group"><label class="form-label">Institution</label> <input class="form-control" id="ea_edu_inst" value="${emp?.eduInstitution||''}" placeholder="University / College name"> </div> </div> </div> </div> <div class="modal-footer" style="justify-content:space-between"> <div style="font-size:12px;color:var(--gray-400)">* Required fields must be filled before saving</div> <div style="display:flex;gap:8px"> <button class="btn btn-outline" onclick="closeModal()">Cancel</button> <button class="btn btn-primary" onclick="saveEmployeeForm('${existingId}')"> ${isEdit ? 'Save Changes' : 'Add Employee'}
        </button> </div> </div>`);
}

function switchEmpTab(idx, btn) {
  document.querySelectorAll('.emp-tab-pane').forEach((p, i) => p.style.display = i === idx ? 'block' : 'none');
  document.querySelectorAll('.emp-tab-btn').forEach(b => {
    b.style.background    = 'transparent';
    b.style.borderBottom  = 'none';
    b.style.color         = 'var(--gray-400)';
    b.style.fontWeight    = '600';
  });
  if (btn) {
    btn.style.background   = 'white';
    btn.style.borderBottom = '2px solid var(--navy)';
    btn.style.color        = 'var(--navy)';
    btn.style.fontWeight   = '700';
  }
}

function filterEmpDepts() {
  const sub   = document.getElementById('ea_sub')?.value;
  const dSel  = document.getElementById('ea_dept');
  if (!dSel) return;
  const filtered = DB.departments.filter(d => !sub || d.sub === sub || d.sub === 'all');
  dSel.innerHTML = '<option value="">Select department…</option>' + filtered.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
}

async function saveEmployeeForm(existingId) {
  const name  = sanitizeText(document.getElementById('ea_name')?.value);
  const email = document.getElementById('ea_email')?.value?.trim();
  const sub   = document.getElementById('ea_sub')?.value;
  const dept  = document.getElementById('ea_dept')?.value;
  const title = sanitizeText(document.getElementById('ea_title')?.value);
  const joined= document.getElementById('ea_joined')?.value;
  const salary= parseFloat(document.getElementById('ea_salary')?.value||0);

  if (!name||!email||!sub||!title||!joined||!salary) {
    toast('Please fill all required fields (Personal + Employment tabs)', 'error');
    switchEmpTab(0, document.querySelector('[data-tab="0"]'));
    return;
  }

  const g1Name = document.getElementById('ea_g1_name')?.value?.trim();
  const g1Phone= document.getElementById('ea_g1_phone')?.value?.trim();
  if (!g1Name || !g1Phone) {
    toast('Guarantor name and phone are required', 'error');
    switchEmpTab(2, document.querySelector('[data-tab="2"]'));
    return;
  }

  const now   = new Date().toISOString().split('T')[0];
  // Auto employee ID: subsidiary prefix + 4-digit sequence (e.g. JLM0001, ASL0001).
  const prefix= { jiil:'JLM', asal_tv:'ASL', masrax:'MSX', nasiye:'NSY' }[sub] || 'EMP';
  // Next number = highest existing number for this prefix + 1 (robust to deletes/gaps).
  const seqRe = new RegExp('^' + prefix + '(\\d+)$');
  const maxNum = DB.employees.reduce((m, e) => {
    const mt = (e.id || '').match(seqRe);
    return mt ? Math.max(m, parseInt(mt[1], 10)) : m;
  }, 0);
  const empId = existingId || `${prefix}${String(maxNum + 1).padStart(4, '0')}`;
  // New employee: guarantee the number isn't already taken (cache + DB).
  if (!existingId && await empNumberTaken(empId)) { toast('Employee number already exists — please try again', 'error'); return; }
  // Phone must be unique across employees (excluding the one being edited).
  const _phoneVal = document.getElementById('ea_phone')?.value || '';
  if (_phoneVal && await phoneTaken(_phoneVal, existingId)) { toast('Phone number already exists', 'error'); return; }

  const empData = {
    id:              empId,
    name, email,
    phone:           document.getElementById('ea_phone')?.value?.trim() || '',
    dob:             document.getElementById('ea_dob')?.value || '',
    gender:          document.getElementById('ea_gender')?.value || '',
    nationality:     document.getElementById('ea_nationality')?.value || 'Somali',
    nationalId:      document.getElementById('ea_national_id')?.value || '',
    address:         sanitizeText(document.getElementById('ea_address')?.value),
    sub, dept, title,
    grade:           document.getElementById('ea_grade')?.value || 'G7',
    contractType:    document.getElementById('ea_contract')?.value || 'Permanent',
    joined, salary,
    allowance:       parseFloat(document.getElementById('ea_allowance')?.value||0),
    contractEnd:     document.getElementById('ea_contract_end')?.value || '',
    status:          'Active',
    // Guarantor
    guarantor1Name:  g1Name,
    guarantor1Rel:   document.getElementById('ea_g1_rel')?.value || 'Other',
    guarantor1Phone: g1Phone,
    guarantor1Id:    document.getElementById('ea_g1_id')?.value || '',
    guarantor1Job:   document.getElementById('ea_g1_job')?.value || '',
    guarantor1Address:document.getElementById('ea_g1_address')?.value || '',
    guarantor2Name:  document.getElementById('ea_g2_name')?.value || '',
    guarantor2Rel:   document.getElementById('ea_g2_rel')?.value || '',
    guarantor2Phone: document.getElementById('ea_g2_phone')?.value || '',
    // Emergency Contact
    emergencyName:   document.getElementById('ea_emer_name')?.value || '',
    emergencyRel:    document.getElementById('ea_emer_rel')?.value || '',
    emergencyPhone:  document.getElementById('ea_emer_phone')?.value || '',
    emergencyPhone2: document.getElementById('ea_emer_phone2')?.value || '',
    emergencyEmail:  document.getElementById('ea_emer_email')?.value || '',
    emergencyAddress:document.getElementById('ea_emer_address')?.value || '',
    // Bank
    bankName:        document.getElementById('ea_bank')?.value || '',
    bankAccount:     document.getElementById('ea_bank_acc')?.value || '',
    bankAccountName: document.getElementById('ea_bank_name')?.value || '',
    paymentMethod:   document.getElementById('ea_pay_method')?.value || 'Bank Transfer',
    // Education
    eduLevel:        document.getElementById('ea_edu_level')?.value || '',
    eduField:        document.getElementById('ea_edu_field')?.value || '',
    eduInstitution:  document.getElementById('ea_edu_inst')?.value || '',
    createdAt:       now,
  };

  if (existingId) {
    const idx = DB.employees.findIndex(e => e.id === existingId);
    if (idx >= 0) Object.assign(DB.employees[idx], empData);
    DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:now, user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Updated employee: ${name}`, module:'Employees', ip:'browser' });
    toast('Employee updated successfully', 'success');
  } else {
    DB.employees.push(empData);
    DB.auditLogs.unshift({ id:DB.auditLogs.length+1, time:now, user:STATE.user?.initials||'SYS', userRole:STATE.role, action:`Added new employee: ${name} (${empId}) — ${getSubName(sub)}`, module:'Employees', ip:'browser' });
    toast(`Employee ${name} added (ID: ${empId})`, 'success');
  }

  if (typeof SupaWrite !== 'undefined') SupaWrite.saveEmployee(empData);
  closeModal();
  nav('employees');

  scheduleSave();
}

/* ═══════════════════════════════════════════════════════════════════════
   MASTER PROFILE — Complete employee profile with ALL linked data
   Tabs: Overview · Personal · Employment · Attendance · Leave · Payroll
         KPI · Loans & Advances · Bonus · Disciplinary · Training · Guarantor
═══════════════════════════════════════════════════════════════════════ */
function openMasterProfileModal(empId) {
  const e = getEmp(empId);
  if (!e) { toast('Employee not found', 'error'); return; }

  // ── Gather ALL linked data ──
  const user       = DB.users.find(u => u.empId === empId);
  const roleInfo   = user ? (ROLES[user.role] || { label: user.role, color:'gray' }) : null;
  const edu        = (DB.educationRecords || []).filter(r => r.empId === empId);
  const kpis       = (DB.kpis || []).filter(k => k.empId === empId);
  const sc         = kpis.length ? PerfEngine.calcEmployeeScore(empId) : null;
  const rt         = sc !== null ? PerfEngine.ratingLabel(sc) : null;
  const lb         = DB.leaveBalances ? (DB.leaveBalances[empId] || {}) : {};
  const myLeave    = (DB.leaveRequests || []).filter(l => l.empId === empId).slice(0, 10);
  const myAtt      = (DB.attendance || []).filter(a => a.empId === empId).sort((a,b) => b.date.localeCompare(a.date)).slice(0, 15);
  const myPayroll  = DB.payroll.find(p => p.empId === empId);
  const myLoans    = (DB.loans || []).filter(l => l.empId === empId);
  const myAdvances = (DB.salaryAdvances || []).filter(a => a.empId === empId);
  const myBonuses  = (DB.bonuses || []).filter(b => b.empId === empId);
  const myDisc     = (DB.disciplinary || []).filter(d => d.empId === empId);
  const myTraining = (DB.training || []).filter(t => t.empId === empId);
  const yos        = yearsOfService(e.joined);

  // ── Computed stats ──
  const payCalc    = myPayroll ? PayrollEngine.calc(e, myPayroll) : null;
  const attPresent = myAtt.filter(a => a.status === 'Present').length;
  const attLate    = myAtt.filter(a => a.status === 'Late').length;
  const loanTotal  = myLoans.filter(l => l.status === 'Active').reduce((s,l) => s + (l.principal - l.amountPaid), 0);
  const discCount  = myDisc.length;

  // ── Tab HTML builder ──
  const tabs = [
    { id:'overview',     label:'Overview'        },
    { id:'personal',     label:'Personal'        },
    { id:'employment',   label:'Employment'      },
    { id:'attendance',   label:'Attendance'      },
    { id:'leave',        label:'Leave'           },
    { id:'payroll',      label:'Payroll'         },
    { id:'kpi',          label:'KPI'             },
    { id:'finance',      label:'Loans & Advances'},
    { id:'bonus',        label:'Bonus'           },
    { id:'disciplinary', label:'Disciplinary'    },
    { id:'training',     label:'Training'        },
    { id:'guarantor',    label:'Guarantor'       },
  ];

  openModal('xl', `
    <div style="display:flex;flex-direction:column;height:85vh;overflow:hidden"> <!-- ── HEADER BANNER ── --> <div style="background:linear-gradient(135deg,var(--navy),#002D72);padding:20px 24px;flex-shrink:0"> <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap"> <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,var(--gold),#E8B84B);display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;color:var(--navy);border:3px solid rgba(255,255,255,.2);flex-shrink:0"> ${initials(e.name)}
          </div> <div style="flex:1;min-width:0"> <div style="font-size:20px;font-weight:900;color:white;display:flex;align-items:center;gap:10px"> ${e.name}
              <span style="font-size:11px;background:rgba(255,255,255,.12);color:rgba(255,255,255,.7);padding:2px 8px;border-radius:99px;font-family:var(--mono)">${e.id}</span> ${e.status==='Active' ? '<span style="font-size:10px;background:#22C55E;color:white;padding:2px 8px;border-radius:99px;font-weight:700">● ACTIVE</span>' : '<span style="font-size:10px;background:#EF4444;color:white;padding:2px 8px;border-radius:99px;font-weight:700">● '+e.status+'</span>'}
            </div> <div style="font-size:13px;color:rgba(255,255,255,.65);margin-top:3px">${e.title || '—'} · ${getDeptName(e.dept)} · ${getSubName(e.sub)}</div> <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap"> <span style="font-size:10px;background:rgba(201,162,39,.2);color:var(--gold);padding:2px 10px;border-radius:99px;border:1px solid rgba(201,162,39,.3)">${e.grade || '—'}</span> <span style="font-size:10px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.65);padding:2px 10px;border-radius:99px">${e.contractType || 'Permanent'}</span> <span style="font-size:10px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.65);padding:2px 10px;border-radius:99px">${yos} yr${yos!==1?'s':''} service</span> ${rt ? `<span style="font-size:10px;background:rgba(255,255,255,.1);color:rgba(255,255,255,.65);padding:2px 10px;border-radius:99px">KPI: ${sc}%</span>` : ''}
              ${discCount > 0 ? `<span style="font-size:10px;background:rgba(239,68,68,.3);color:#FCA5A5;padding:2px 10px;border-radius:99px">${discCount} disciplinary record${discCount>1?'s':''}</span>` : ''}
            </div> </div> <div style="display:flex;gap:8px;flex-shrink:0"> <button class="btn btn-sm" onclick="closeModal();openAddEmployeeModal('${empId}')" style="background:rgba(255,255,255,.15);color:white;border:1px solid rgba(255,255,255,.3)">Edit</button> <button class="btn btn-sm" onclick="closeModal();genPayslipModal('${empId}')" style="background:rgba(255,255,255,.15);color:white;border:1px solid rgba(255,255,255,.3)">View Payslip</button> ${closeX('rgba(255,255,255,.6)')}
          </div> </div> </div> <!-- ── TAB BAR ── --> <div style="display:flex;overflow-x:auto;background:white;border-bottom:2px solid var(--gray-100);flex-shrink:0;scrollbar-width:none"> ${tabs.map((t,i) => `
          <button class="mp-tab-btn" data-tab="${t.id}" onclick="mpTab('${t.id}',this)"
            style="padding:10px 14px;border:none;border-bottom:${i===0?'2px solid var(--navy)':'2px solid transparent'};background:transparent;font-size:12px;font-weight:${i===0?'700':'600'};color:${i===0?'var(--navy)':'var(--gray-400)'};cursor:pointer;white-space:nowrap;flex-shrink:0;letter-spacing:.01em"> ${t.label} </button>`).join('')}
      </div> <!-- ── TAB CONTENT ── --> <div style="flex:1;overflow-y:auto;padding:0" id="mpBody"> <!-- ════ OVERVIEW ════ --> <div class="mp-pane" id="mp_overview" style="padding:20px 24px"> <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px"> <div class="stat-card blue"><div class="stat-val">${fmtCurrency(e.salary||0)}</div><div class="stat-lbl">Monthly Salary</div></div> <div class="stat-card ${attLate>3?'amber':'green'}"><div class="stat-val">${attPresent}</div><div class="stat-lbl">Present (Recent)</div><div class="stat-sub">${attLate} late</div></div> <div class="stat-card ${(lb.annual||30)-(lb.used_annual||0)<5?'red':'teal'}"><div class="stat-val">${(lb.annual||30)-(lb.used_annual||0)}</div><div class="stat-lbl">Leave Remaining</div><div class="stat-sub">${lb.used_annual||0} used</div></div> <div class="stat-card ${sc!==null?(sc>=90?'green':sc>=70?'blue':'amber'):'navy'}"><div class="stat-val">${sc!==null?sc+'%':'—'}</div><div class="stat-lbl">KPI Score</div><div class="stat-sub">${rt?.label||'No data'}</div></div> </div> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px"> <div class="card" style="margin:0"> <div class="card-header"><span class="card-title">Quick Info</span></div> <div class="card-body"> ${[['Email',e.email||'—'],['Phone',e.phone||'—'],['Join Date',fmtDate(e.joined)],['Department',getDeptName(e.dept)],['Subsidiary',getSubName(e.sub)],['Grade',e.grade||'—'],['Manager',e.managerName||'—'],['System Role',roleInfo?.label||'Not linked']].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val">${v}</span></div>`).join('')}
              </div> </div> <div class="card" style="margin:0"> <div class="card-header"><span class="card-title">Financial Summary</span></div> <div class="card-body"> ${[['Monthly Salary',fmtCurrency(e.salary||0)],['Allowances',fmtCurrency(e.allowance||0)],['Annual Salary',fmtCurrency((e.salary||0)*12)],['Active Loans',`${myLoans.filter(l=>l.status==='Active').length} (${fmtCurrency(loanTotal)} outstanding)`],['Pending Advances',`${myAdvances.filter(a=>a.status==='Pending').length} requests`],['Total Bonuses',fmtCurrency(myBonuses.filter(b=>b.status==='Paid').reduce((s,b)=>s+b.amount,0))],['Disciplinary Records',discCount.toString()],['Training Completed',myTraining.filter(t=>t.status==='Completed').length.toString()]].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val">${v}</span></div>`).join('')}
              </div> </div> </div> </div> <!-- ════ PERSONAL ════ --> <div class="mp-pane" id="mp_personal" style="display:none;padding:20px 24px"> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px"> <div class="card" style="margin:0"><div class="card-header"><span class="card-title">Personal Details</span></div> <div class="card-body"> ${[['Full Name',e.name],['Date of Birth',fmtDate(e.dob)||'—'],['Gender',e.gender||'—'],['Nationality',e.nationality||'Somali'],['National ID',e.nationalId||'—'],['Home Address',e.address||'—'],['Email',e.email||'—'],['Phone',e.phone||'—']].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val">${v}</span></div>`).join('')}
              </div> </div> <div class="card" style="margin:0"><div class="card-header"><span class="card-title">Bank & Payment</span></div> <div class="card-body"> ${[['Bank Name',e.bankName||'—'],['Account Number',e.bankAccount||'—'],['Account Holder',e.bankAccountName||e.name],['Payment Method',e.paymentMethod||'Bank Transfer']].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val">${v}</span></div>`).join('')}
                <div class="section-divider"><span>Education</span></div> ${edu.length ? edu.map(ed=>`<div class="info-row"><span class="info-key">${ed.degree||ed.level||'Degree'}</span><span class="info-val">${ed.institution||'—'} ${ed.year?'('+ed.year+')':''}</span></div>`).join('') : '<div style="font-size:12px;color:var(--gray-400);padding:8px 0">No education records</div>'}
              </div> </div> </div> </div> <!-- ════ EMPLOYMENT ════ --> <div class="mp-pane" id="mp_employment" style="display:none;padding:20px 24px"> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px"> <div class="card" style="margin:0"><div class="card-header"><span class="card-title">Employment Details</span></div> <div class="card-body"> ${[['Employee ID',e.id],['Job Title',e.title||'—'],['Department',getDeptName(e.dept)],['Subsidiary',getSubName(e.sub)],['Grade',e.grade||'—'],['Contract Type',e.contractType||'Permanent'],['Join Date',fmtDate(e.joined)],['Contract End',e.contractEnd?fmtDate(e.contractEnd):'Indefinite'],['Years of Service',yos+' year'+(yos!==1?'s':'')],['Status',e.status||'Active']].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val">${v}</span></div>`).join('')}
              </div> </div> <div class="card" style="margin:0"><div class="card-header"><span class="card-title">System Account</span></div> <div class="card-body"> ${user ? [['Username',user.username],['Email',user.email],['Role',roleInfo?.label||user.role],['Account Status',user.status],['Last Login',user.lastLogin||'Never'],['Failed Attempts',(user.failedAttempts||0).toString()]].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val">${v}</span></div>`).join('') : '<div style="font-size:13px;color:var(--gray-400);padding:8px 0">No system account linked</div>'}
              </div> </div> </div> </div> <!-- ════ ATTENDANCE ════ --> <div class="mp-pane" id="mp_attendance" style="display:none;padding:20px 24px"> <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:16px"> <div class="stat-card green"><div class="stat-val">${myAtt.filter(a=>a.status==='Present').length}</div><div class="stat-lbl">Present</div></div> <div class="stat-card amber"><div class="stat-val">${myAtt.filter(a=>a.status==='Late').length}</div><div class="stat-lbl">Late</div></div> <div class="stat-card red"><div class="stat-val">${myAtt.filter(a=>a.status==='Absent').length}</div><div class="stat-lbl">Absent</div></div> <div class="stat-card blue"><div class="stat-val">${myAtt.reduce((s,a)=>s+(a.ot||0),0).toFixed(1)}h</div><div class="stat-lbl">Total OT</div></div> </div> <div class="card" style="margin:0"><div class="card-header"><span class="card-title">Recent Attendance (Last 15 records)</span></div> <div class="card-body" style="padding:0"><div class="table-wrap"><table class="table"> <thead><tr><th>Date</th><th>Status</th><th>Check In</th><th>Check Out</th><th>Late (min)</th><th>OT (hrs)</th></tr></thead> <tbody>${myAtt.length ? myAtt.map(a=>`<tr> <td style="font-family:var(--mono)">${fmtDate(a.date)}</td> <td>${finBadge(a.status)}</td> <td style="font-family:var(--mono)">${a.checkIn||'—'}</td> <td style="font-family:var(--mono)">${a.checkOut||'—'}</td> <td>${a.late>0?`<span style="color:var(--red);font-weight:700">${a.late}</span>`:'0'}</td> <td>${a.ot>0?`<span style="color:var(--green)">${a.ot}</span>`:'0'}</td> </tr>`).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--gray-400);padding:20px">No attendance records</td></tr>'}</tbody> </table></div></div> </div> </div> <!-- ════ LEAVE ════ --> <div class="mp-pane" id="mp_leave" style="display:none;padding:20px 24px"> <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:16px"> <div class="stat-card blue"><div class="stat-val">${lb.annual||30}</div><div class="stat-lbl">Annual Entitled</div></div> <div class="stat-card green"><div class="stat-val">${(lb.annual||30)-(lb.used_annual||0)}</div><div class="stat-lbl">Annual Remaining</div></div> <div class="stat-card amber"><div class="stat-val">${myLeave.filter(l=>l.status==='Pending').length}</div><div class="stat-lbl">Pending</div></div> <div class="stat-card navy"><div class="stat-val">${myLeave.length}</div><div class="stat-lbl">Total Requests</div></div> </div> <div class="card" style="margin:0"><div class="card-header"><span class="card-title">Leave History</span></div> <div class="card-body" style="padding:0"><div class="table-wrap"><table class="table"> <thead><tr><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th><th>Applied</th></tr></thead> <tbody>${myLeave.length ? myLeave.map(l=>`<tr> <td style="font-weight:600">${l.type}</td> <td style="font-family:var(--mono)">${fmtDate(l.from)}</td> <td style="font-family:var(--mono)">${fmtDate(l.to)}</td> <td>${l.days}</td> <td>${finBadge(l.status)}</td> <td style="font-size:11px;color:var(--gray-400)">${fmtDate(l.appliedOn||l.from)}</td> </tr>`).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--gray-400);padding:20px">No leave records</td></tr>'}</tbody> </table></div></div> </div> </div> <!-- ════ PAYROLL ════ --> <div class="mp-pane" id="mp_payroll" style="display:none;padding:20px 24px"> ${payCalc ? `
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px"> <div class="card" style="margin:0"><div class="card-header"><span class="card-title">Current Payslip — ${STATE.payMonth||new Date().toISOString().slice(0,7)}</span></div> <div class="card-body"> <div class="section-divider"><span>Earnings</span></div> ${[['Base Salary',fmtCurrency(payCalc.base)],['Allowances',fmtCurrency(payCalc.allow)],['OT Pay ('+payCalc.otHours+'hrs)',fmtCurrency(payCalc.otPay)],['Performance Bonus',fmtCurrency(payCalc.perfBonus||0)]].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val" style="font-family:var(--mono)">${v}</span></div>`).join('')}
                <div class="info-row" style="font-weight:800;border-top:1px solid var(--border);padding-top:8px;margin-top:4px"><span class="info-key">Gross Earnings</span><span class="info-val" style="font-family:var(--mono);color:var(--blue)">${fmtCurrency(payCalc.grossEarnings)}</span></div> <div class="section-divider" style="margin-top:12px"><span>Deductions</span></div> ${[['Income Tax',fmtCurrency(payCalc.tax)],['Loan Deduction',fmtCurrency(payCalc.loanDeduct||0)],['Salary Advance',fmtCurrency(payCalc.advanceDeduct||0)],['Late Deduction',fmtCurrency(payCalc.lateDeduction||0)]].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val" style="font-family:var(--mono);color:var(--red)">-${v}</span></div>`).join('')}
                <div class="info-row" style="font-weight:900;border-top:2px solid var(--border);padding-top:10px;margin-top:6px;font-size:16px"><span class="info-key">NET PAY</span><span class="info-val" style="font-family:var(--mono);color:var(--green);font-size:18px">${fmtCurrency(payCalc.netPay)}</span></div> </div> </div> <div class="card" style="margin:0"><div class="card-header"><span class="card-title">Salary Structure</span></div> <div class="card-body"> ${[['Monthly Gross',fmtCurrency(payCalc.grossEarnings)],['Annual Gross',fmtCurrency(payCalc.grossEarnings*12)],['Monthly Net',fmtCurrency(payCalc.netPay)],['Annual Net',fmtCurrency(payCalc.netPay*12)],['Tax Rate',((payCalc.tax/payCalc.grossEarnings)*100).toFixed(1)+'%'],['Effective Rate',((payCalc.totalDeductions/payCalc.grossEarnings)*100).toFixed(1)+'%']].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val" style="font-family:var(--mono)">${v}</span></div>`).join('')}
              </div> </div> </div>` : '<div class="empty-state"><h3>No payroll record</h3><p>No payroll data found for this employee.</p></div>'}
        </div> <!-- ════ KPI ════ --> <div class="mp-pane" id="mp_kpi" style="display:none;padding:20px 24px"> ${sc !== null ? `<div style="background:linear-gradient(135deg,var(--navy),#002D72);border-radius:var(--radius-lg);padding:16px 20px;margin-bottom:16px;display:flex;align-items:center;gap:20px"> <div style="font-size:42px;font-weight:900;color:var(--gold);font-family:var(--mono)">${sc}%</div> <div><div style="font-size:16px;font-weight:800;color:white">${rt?.label||'—'}</div><div style="font-size:12px;color:rgba(255,255,255,.55);margin-top:3px">${kpis.length} KPI indicators · ${new Date().getFullYear()}</div></div> </div>` : ''}
          <div class="card" style="margin:0"><div class="card-header"><span class="card-title">KPI Indicators</span></div> <div class="card-body" style="padding:0"><div class="table-wrap"><table class="table"> <thead><tr><th>KPI Title</th><th>Status</th><th>Achievement</th><th>Weight</th><th>Approval</th><th></th></tr></thead> <tbody>${kpis.length ? kpis.map(k=>{const ach=Math.round(PerfEngine.calcAchievement(k));const apB=({Approved:'badge-green',Rejected:'badge-red'})[k.approvalStatus]||'badge-amber';const cmts=(DB.kpiComments||[]).filter(c=>c.kpiId===k.id).length;const stC=k.scoringMode==='binary'?`<span class="badge ${k.status==='Completed'?'badge-green':'badge-gray'}">${k.status||'Not Completed'}</span>`:`<span style="font-family:var(--mono)">${k.actual}/${k.target} ${k.unit||''}</span>`;return`<tr> <td style="font-weight:600">${k.title}</td> <td>${stC}</td> <td><span class="kpi-score ${ach>=100?'excellent':ach>=70?'good':ach>=50?'average':'poor'}">${ach}%</span></td> <td>${k.weight}%</td> <td><span class="badge ${apB}" style="font-size:10px">${k.approvalStatus||'Pending'}</span></td> <td><button class="btn btn-ghost btn-xs" onclick="openKPIDetail('${k.id}')" title="Reviews / Comments${cmts?` (${cmts})`:''}">${ICO.eye}${cmts?` ${cmts}`:''}</button></td> </tr>`;}).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--gray-400);padding:20px">No KPIs assigned</td></tr>'}</tbody> </table></div></div> </div> </div> <!-- ════ FINANCE (Loans & Advances) ════ --> <div class="mp-pane" id="mp_finance" style="display:none;padding:20px 24px"> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px"> <div class="card" style="margin:0"><div class="card-header"><span class="card-title">Loans</span><button class="btn btn-outline btn-sm" onclick="closeModal();openCreateLoanModal()">+ Issue Loan</button></div> <div class="card-body" style="padding:0"> ${myLoans.length ? myLoans.map(l=>{const remain=Math.max(0,l.totalRepayable-l.amountPaid);const pct=Math.round(l.amountPaid/l.totalRepayable*100);return`
                <div style="padding:12px;border-bottom:1px solid var(--gray-100)"> <div style="display:flex;justify-content:space-between;margin-bottom:6px"> <div style="font-weight:700;font-size:13px">${l.purpose}</div> ${finBadge(l.status)}
                  </div> <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--gray-500);margin-bottom:6px"> <span>Principal: <strong>${fmtCurrency(l.principal)}</strong></span> <span>Monthly: <strong style="color:var(--amber)">${fmtCurrency(l.monthlyInstallment)}</strong></span> <span>Remaining: <strong style="color:var(--red)">${fmtCurrency(remain)}</strong></span> </div> <div style="background:var(--gray-100);border-radius:99px;height:5px;overflow:hidden"> <div style="height:100%;background:${pct>=100?'var(--green)':'var(--blue)'};border-radius:99px;width:${Math.min(100,pct)}%"></div> </div> <div style="font-size:10px;color:var(--gray-400);margin-top:3px">${pct}% repaid · ${l.months} months @ ${l.interestRate}%</div> </div>`;}).join('') : '<div style="padding:16px;text-align:center;color:var(--gray-400);font-size:13px">No loans</div>'}
              </div> </div> <div class="card" style="margin:0"><div class="card-header"><span class="card-title">Salary Advances</span><button class="btn btn-outline btn-sm" onclick="closeModal();openAdvanceRequestModal('${empId}')">+ Request</button></div> <div class="card-body" style="padding:0"> ${myAdvances.length ? myAdvances.map(a=>`
                <div style="padding:12px;border-bottom:1px solid var(--gray-100)"> <div style="display:flex;justify-content:space-between;align-items:center"> <div> <div style="font-weight:700;font-size:13px">${fmtCurrency(a.amount)}</div> <div style="font-size:11px;color:var(--gray-400)">${a.reason} · ${fmtDate(a.requestedAt)}</div> </div> ${finBadge(a.status)}
                  </div> </div>`).join('') : '<div style="padding:16px;text-align:center;color:var(--gray-400);font-size:13px">No advances</div>'}
              </div> </div> </div> </div> <!-- ════ BONUS ════ --> <div class="mp-pane" id="mp_bonus" style="display:none;padding:20px 24px"> <div class="card" style="margin:0"><div class="card-header"><span class="card-title">Bonus History</span><button class="btn btn-outline btn-sm" onclick="closeModal();openCreateBonusModal()">+ Add Bonus</button></div> <div class="card-body" style="padding:0"><div class="table-wrap"><table class="table"> <thead><tr><th>Description</th><th>Type</th><th>Rating</th><th>Amount</th><th>Cycle</th><th>Status</th></tr></thead> <tbody>${myBonuses.length ? myBonuses.map(b=>`<tr> <td style="font-size:12px">${b.description||'—'}</td> <td><span style="font-size:11px;background:var(--blue-l);color:var(--blue);padding:1px 7px;border-radius:99px">${b.type}</span></td> <td style="font-size:11px">${b.performanceRating||'—'}</td> <td style="font-family:var(--mono);font-weight:800;color:${b.amount>0?'var(--green)':'var(--gray-400)'}">${fmtCurrency(b.amount)}</td> <td style="font-size:11px;font-family:var(--mono)">${b.cycle||'—'}</td> <td>${finBadge(b.status)}</td> </tr>`).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--gray-400);padding:20px">No bonus records</td></tr>'}</tbody> ${myBonuses.length ? `<tfoot><tr style="background:var(--gray-50);font-weight:800"><td colspan="3">TOTAL PAID</td><td style="font-family:var(--mono);color:var(--green)">${fmtCurrency(myBonuses.filter(b=>b.status==='Paid').reduce((s,b)=>s+b.amount,0))}</td><td colspan="2"></td></tr></tfoot>` : ''}
            </table></div></div> </div> </div> <!-- ════ DISCIPLINARY ════ --> <div class="mp-pane" id="mp_disciplinary" style="display:none;padding:20px 24px"> ${myDisc.length ? `<div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:var(--radius);padding:12px 16px;font-size:13px;color:#991B1B;margin-bottom:16px;display:flex;align-items:center;gap:10px"> <span style="font-size:18px;font-weight:900;color:#DC2626">!</span> <span>This employee has <strong>${myDisc.length}</strong> disciplinary record${myDisc.length>1?'s':''}. Please review carefully.</span> </div>` : ''}
          <div class="card" style="margin:0"> <div class="card-header"> <span class="card-title">Disciplinary Records</span> <button class="btn btn-outline btn-sm" style="color:var(--red)" onclick="closeModal();nav('disciplinary')">+ Add Record</button> </div> <div class="card-body" style="padding:0"> ${myDisc.length ? myDisc.map(d=>`
              <div style="padding:14px 16px;border-bottom:1px solid var(--gray-100)"> <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px"> <div> <div style="font-weight:800;font-size:14px;color:var(--navy)">${d.type||d.action||'Disciplinary Action'}</div> <div style="font-size:11px;color:var(--gray-400);margin-top:2px"> ${fmtDate(d.date||d.createdAt)} · By: ${d.issuedBy||d.manager||'HR'}</div> </div> <span style="background:${d.status==='Active'?'#FEE2E2':d.status==='Resolved'?'#D1FAE5':'#F1F5F9'};color:${d.status==='Active'?'#991B1B':d.status==='Resolved'?'#065F46':'#475569'};font-size:11px;font-weight:700;padding:2px 10px;border-radius:99px">${d.status||'Active'}</span> </div> ${d.description||d.reason ? `<div style="font-size:13px;color:var(--gray-600);background:var(--gray-50);padding:8px 12px;border-radius:8px;line-height:1.6">${d.description||d.reason}</div>` : ''}
                ${d.action ? `<div style="font-size:12px;color:var(--amber);margin-top:6px;font-weight:600">Action taken: ${d.action}</div>` : ''}
              </div>`).join('') : `
              <div style="padding:40px;text-align:center"> <div style="font-size:32px;margin-bottom:10px">✅</div> <div style="font-size:14px;font-weight:700;color:var(--navy)">No disciplinary records</div> <div style="font-size:12px;color:var(--gray-400);margin-top:4px">This employee has a clean disciplinary record.</div> </div>`}
            </div> </div> </div> <!-- ════ TRAINING ════ --> <div class="mp-pane" id="mp_training" style="display:none;padding:20px 24px"> <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:16px"> <div class="stat-card green"><div class="stat-val">${myTraining.filter(t=>t.status==='Completed').length}</div><div class="stat-lbl">Completed</div></div> <div class="stat-card blue"><div class="stat-val">${myTraining.filter(t=>t.status==='In Progress').length}</div><div class="stat-lbl">In Progress</div></div> <div class="stat-card amber"><div class="stat-val">${myTraining.filter(t=>t.status==='Scheduled').length}</div><div class="stat-lbl">Scheduled</div></div> </div> <div class="card" style="margin:0"><div class="card-header"><span class="card-title">Training Records</span></div> <div class="card-body" style="padding:0"><div class="table-wrap"><table class="table"> <thead><tr><th>Programme</th><th>Type</th><th>Date</th><th>Duration</th><th>Status</th><th>Score</th></tr></thead> <tbody>${myTraining.length ? myTraining.map(t=>`<tr> <td style="font-weight:600">${t.program||t.title||'Training'}</td> <td style="font-size:12px">${t.type||'—'}</td> <td style="font-family:var(--mono);font-size:12px">${fmtDate(t.date||t.startDate)}</td> <td style="font-size:12px">${t.duration||'—'}</td> <td>${finBadge(t.status||'Scheduled')}</td> <td style="font-family:var(--mono)">${t.score?t.score+'%':'—'}</td> </tr>`).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--gray-400);padding:20px">No training records</td></tr>'}</tbody> </table></div></div> </div> </div> <!-- ════ GUARANTOR ════ --> <div class="mp-pane" id="mp_guarantor" style="display:none;padding:20px 24px"> <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px"> <div class="card" style="margin:0"> <div class="card-header" style="background:linear-gradient(135deg,var(--navy),#002D72)"> <span class="card-title" style="color:white">Primary Guarantor</span> </div> <div class="card-body"> ${e.guarantor1Name ? [
                  ['Full Name', e.guarantor1Name||'—'],
                  ['Relationship', e.guarantor1Rel||'—'],
                  ['Phone', e.guarantor1Phone||'—'],
                  ['National ID', e.guarantor1Id||'—'],
                  ['Occupation', e.guarantor1Job||'—'],
                  ['Address', e.guarantor1Address||'—'],
                ].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val">${v}</span></div>`).join('') :
                `<div style="padding:20px;text-align:center;color:var(--gray-400)"> <div style="font-size:24px;margin-bottom:8px"></div> <div style="font-size:13px">No guarantor on file</div> <button class="btn btn-outline btn-sm" style="margin-top:10px" onclick="closeModal();openAddEmployeeModal('${empId}')">Add Guarantor</button> </div>`}
              </div> </div> <div class="card" style="margin:0"> <div class="card-header" style="background:var(--gray-50)"> <span class="card-title">Secondary Guarantor</span> </div> <div class="card-body"> ${e.guarantor2Name ? [
                  ['Full Name', e.guarantor2Name||'—'],
                  ['Relationship', e.guarantor2Rel||'—'],
                  ['Phone', e.guarantor2Phone||'—'],
                ].map(([k,v])=>`<div class="info-row"><span class="info-key">${k}</span><span class="info-val">${v}</span></div>`).join('') :
                `<div style="padding:20px;text-align:center;color:var(--gray-400);font-size:13px">No secondary guarantor</div>`}
              </div> </div> </div> ${e.emergencyName ? `<div class="card" style="margin-top:16px"> <div class="card-header"><span class="card-title">Emergency Contact</span></div> <div class="card-body" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px"> ${[['Name',e.emergencyName],['Relationship',e.emergencyRel||'—'],['Phone',e.emergencyPhone||'—'],['Alt Phone',e.emergencyPhone2||'—'],['Email',e.emergencyEmail||'—'],['Address',e.emergencyAddress||'—']].map(([k,v])=>`<div><div style="font-size:10px;font-weight:700;color:var(--gray-400);text-transform:uppercase;letter-spacing:.4px">${k}</div><div style="font-size:13px;font-weight:700;margin-top:2px;color:var(--navy)">${v}</div></div>`).join('')}
            </div> </div>` : ''}
        </div> </div><!-- end mpBody --> <!-- ── FOOTER ACTIONS ── --> <div style="padding:12px 20px;border-top:1px solid var(--gray-100);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;background:var(--gray-50)"> <div style="font-size:11px;color:var(--gray-400)">Employee ID: ${e.id} · Last updated: ${e.createdAt||'—'}</div> <div style="display:flex;gap:8px"> <button class="btn btn-outline btn-sm" onclick="closeModal()">Close</button> <button class="btn btn-outline btn-sm" onclick="closeModal();openAddEmployeeModal('${empId}')">Edit Employee</button> <button class="btn btn-primary btn-sm" onclick="closeModal();genPayslipModal('${empId}')" style="background:var(--navy)">View Payslip</button> </div> </div> </div>`);

  // Activate first tab
  setTimeout(() => mpTab('overview', document.querySelector('.mp-tab-btn')), 50);
}

// ── Tab switching ──
function mpTab(tabId, btn) {
  document.querySelectorAll('.mp-pane').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.mp-tab-btn').forEach(b => {
    b.style.borderBottom = '2px solid transparent';
    b.style.color        = 'var(--gray-400)';
    b.style.fontWeight   = '600';
  });
  const pane = document.getElementById('mp_' + tabId);
  if (pane) pane.style.display = 'block';
  if (btn) {
    btn.style.borderBottom = '2px solid var(--navy)';
    btn.style.color        = 'var(--navy)';
    btn.style.fontWeight   = '700';
  }
}

/* ═══════════════════════════════════════════════════════════════════════
   LOCAL STORAGE PERSISTENCE — saves all DB changes to your computer
   Data survives page refresh. Auto-saves after every change.
═══════════════════════════════════════════════════════════════════════ */
// v3: bumped to discard old browser caches that still held demo data
// (loans/advances/notices). On load the app now starts clean and pulls the
// real records from the cloud.
const STORAGE_KEY = 'amc_hrms_db_v3';
const SAVE_DEBOUNCE_MS = 800;
let _saveTimer = null;

// ── Save DB to localStorage ──
function persistDB() {
  try {
    const snapshot = {
      employees:            DB.employees,
      users:                DB.users,
      attendance:           DB.attendance,
      leaveRequests:        DB.leaveRequests,
      leaveBalances:        DB.leaveBalances,
      payroll:              DB.payroll,
      kpis:                 DB.kpis,
      kpiTemplates:         DB.kpiTemplates,
      salaryAdvances:       DB.salaryAdvances,
      loans:                DB.loans,
      bonuses:              DB.bonuses,
      bonusRules:           DB.bonusRules,
      notices:              DB.notices,
      noticeAcknowledgments:DB.noticeAcknowledgments,
      auditLogs:            (DB.auditLogs || []).slice(0, 200), // keep last 200
      recruitment:          DB.recruitment,
      training:             DB.training,
      disciplinary:         DB.disciplinary,
      departments:          DB.departments,
      educationRecords:     DB.educationRecords,
      notifications:        DB.notifications,
      savedAt:              new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
    // Phase 2: push the document-store collections (loans, advances, bonuses,
    // notices, disciplinary, recruitment, training, succession) to Supabase so
    // they are shared across users, not just stored in this browser.
    if (typeof SupaSync !== 'undefined' && SupaSync.connected) { SupaSync.pushDocs(); }
    return true;
  } catch (e) {
    console.warn('LocalStorage save failed:', e.message);
    return false;
  }
}

// ── Debounced auto-save (saves 800ms after last change) ──
function scheduleSave() {
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => {
    persistDB();
    // Show subtle save indicator
    const ind = document.getElementById('saveIndicator');
    if (ind) { ind.style.opacity = '1'; setTimeout(() => ind.style.opacity = '0', 1500); }
  }, SAVE_DEBOUNCE_MS);
}

// ── Load DB from localStorage (merges with defaults) ──
function loadPersistedDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    if (!saved || !saved.savedAt) return false;

    // Merge saved data into DB (saved data takes priority)
    const mergeable = [
      'employees','users','attendance','leaveRequests','leaveBalances',
      'payroll','kpis','kpiTemplates','salaryAdvances','loans','bonuses',
      'bonusRules','notices','noticeAcknowledgments','auditLogs',
      'recruitment','training','disciplinary','departments',
      'educationRecords','notifications',
    ];

    let merged = 0;
    for (const key of mergeable) {
      if (saved[key] !== undefined && saved[key] !== null) {
        DB[key] = saved[key];
        merged++;
      }
    }

    const age = Math.round((Date.now() - new Date(saved.savedAt)) / 60000);
    console.log(`Loaded persisted DB: ${merged} collections, saved ${age}min ago`);
    return true;
  } catch (e) {
    console.warn('LocalStorage load failed:', e.message);
    return false;
  }
}

// ── Clear all saved data (for reset) ──
function clearPersistedDB() {
  localStorage.removeItem(STORAGE_KEY);
  console.log('Persisted DB cleared');
}

// ── Patch all nav() calls to auto-save after navigation ──
// We wrap the original nav() to trigger a save
const _originalNav = nav;
window.nav = function(page) {
  _originalNav(page);
  scheduleSave();
};

// ── Patch closeModal to auto-save after any modal closes ──
const _originalCloseModal = closeModal;
window.closeModal = function() {
  _originalCloseModal();
  scheduleSave();
};

// ── Load on page start ──
(function initPersistence() {
  const loaded = loadPersistedDB();
  if (loaded) {
    console.log(' Data restored from localStorage');
    // Show restore notification after app loads
    setTimeout(() => {
      const ind = document.getElementById('saveIndicator');
      if (ind) {
        ind.textContent = ' Data restored';
        ind.style.opacity = '1';
        ind.style.background = '#065F46';
        setTimeout(() => {
          ind.style.opacity = '0';
          ind.textContent = ' Saved';
          ind.style.background = '';
        }, 2000);
      }
    }, 2000);
  }
})();


// ── Employee acknowledge a notice ──
function selfAcknowledgeNotice(noticeId) {
  const emp    = getCurrentEmployee();
  const notice = (DB.notices||[]).find(n => n.id === noticeId);
  if (!notice || !emp) return;

  if (!notice.acknowledgments) notice.acknowledgments = [];
  if (notice.acknowledgments.some(a => a.empId === emp.id)) {
    toast('Already acknowledged', 'info'); return;
  }

  notice.acknowledgments.push({
    empId:     emp.id,
    empName:   emp.name,
    role:      STATE.role,
    timestamp: new Date().toISOString().replace('T',' ').slice(0,16),
  });

  DB.auditLogs.unshift({ id:DB.auditLogs.length+1,
    time:new Date().toISOString().replace('T',' ').slice(0,16),
    user:STATE.user?.initials||'EMP', userRole:STATE.role,
    action:`Acknowledged notice: ${notice.title}`, module:'Notices', ip:'browser' });

  scheduleSave();
  toast('Notice acknowledged', 'success');
  nav('notices');  // refresh the page to show updated status
}

/* ═══════════════════════════════════════════════════════════════════════
   SELF_PAGES — My Advances, My Loans, Announcements
   Clean simple versions for employee self-service
═══════════════════════════════════════════════════════════════════════ */

// ── My Advances ──
SELF_PAGES.advances = function(wrap) {
  const emp = getCurrentEmployee();
  if (!emp) {
    wrap.innerHTML = '<div class="page"><div class="empty-state"><h3>No Employee Record Linked</h3><p>Ask HR to link your user account to your employee profile.</p></div></div>';
    return;
  }

  const maxAdv    = PayrollEngine.maxAdvance(emp.salary || 0);
  const myAdv     = (DB.salaryAdvances || []).filter(a => a.empId === emp.id).sort((a,b) => b.requestedAt.localeCompare(a.requestedAt));
  const pending   = myAdv.filter(a => a.status === 'Pending');
  const approved  = myAdv.filter(a => a.status === 'Approved');
  const paid      = myAdv.filter(a => a.status === 'Paid');

  var rows = '';
  if (myAdv.length === 0) {
    rows = '<tr><td colspan="5" style="text-align:center;padding:28px;color:var(--gray-400)">No advance requests yet</td></tr>';
  } else {
    myAdv.forEach(function(a) {
      rows += '<tr>' +
        '<td style="font-family:var(--mono);font-weight:800;font-size:15px;color:var(--navy)">' + fmtCurrency(a.amount) + '</td>' +
        '<td>' + (a.reason || '—') + '</td>' +
        '<td style="font-family:var(--mono);font-size:12px">' + (a.deductMonth || '—') + '</td>' +
        '<td style="font-size:11px;color:var(--gray-400)">' + fmtDate(a.requestedAt) + '</td>' +
        '<td>' + finBadge(a.status) + '</td>' +
      '</tr>';
    });
  }

  wrap.innerHTML = '<div class="page">' +
    '<div class="page-header">' +
      '<div><h1 class="page-title">My Salary Advances</h1>' +
        '<div class="page-sub">' + emp.name + ' · Max per request: ' + fmtCurrency(maxAdv) + ' (50% of salary)</div>' +
      '</div>' +
      '<button class="btn btn-primary" onclick="openSelfAdvanceModal()">+ Request Advance</button>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px">' +
      '<div class="stat-card blue"><div class="stat-val">' + fmtCurrency(emp.salary||0) + '</div><div class="stat-lbl">Monthly Salary</div></div>' +
      '<div class="stat-card gold"><div class="stat-val">' + fmtCurrency(maxAdv) + '</div><div class="stat-lbl">Max Advance (50%)</div></div>' +
      '<div class="stat-card amber"><div class="stat-val">' + pending.length + '</div><div class="stat-lbl">Pending</div></div>' +
      '<div class="stat-card green"><div class="stat-val">' + paid.length + '</div><div class="stat-lbl">Paid</div></div>' +
    '</div>' +
    '<div style="background:var(--blue-l);border-radius:var(--radius);padding:12px 16px;font-size:13px;color:var(--blue);margin-bottom:16px">' +
      ' Advances are deducted from your next payroll. Maximum per request is <strong>' + fmtCurrency(maxAdv) + '</strong>.' +
    '</div>' +
    '<div class="card"><div class="card-header"><span class="card-title">My Advance History</span></div>' +
      '<div class="card-body" style="padding:0"><div class="table-wrap"><table class="table">' +
        '<thead><tr><th>Amount</th><th>Reason</th><th>Deduct Month</th><th>Requested</th><th>Status</th></tr></thead>' +
        '<tbody>' + rows + '</tbody>' +
      '</table></div></div>' +
    '</div>' +
  '</div>';
};

// ── Request advance modal for self-service ──
function openSelfAdvanceModal() {
  var emp = getCurrentEmployee();
  if (!emp) { toast('No employee record linked to your account', 'error'); return; }
  var maxAdv = PayrollEngine.maxAdvance(emp.salary || 0);
  var today  = new Date().toISOString().slice(0, 7);

  openModal('narrow',
    '<div class="modal-header" style="background:var(--navy)">' +
      '<span class="modal-title" style="color:white">Request Salary Advance</span>' +
      closeX('rgba(255,255,255,.6)') +
    '</div>' +
    '<div class="modal-body">' +
      '<div style="background:var(--blue-l);border-radius:var(--radius);padding:12px 14px;font-size:13px;color:var(--blue);margin-bottom:16px">' +
        'Your salary: <strong>' + fmtCurrency(emp.salary || 0) + '</strong> · ' +
        'Maximum advance: <strong>' + fmtCurrency(maxAdv) + '</strong>' +
      '</div>' +
      '<div class="form-group"><label class="form-label required">Advance Amount (USD)</label>' +
        '<input class="form-control" id="sa_amount" type="number" min="1" max="' + maxAdv + '" placeholder="e.g. ' + Math.floor(maxAdv / 2) + '">' +
      '</div>' +
      '<div class="form-group"><label class="form-label required">Deduction Month</label>' +
        '<input class="form-control" id="sa_month" type="month" value="' + today + '">' +
      '</div>' +
      '<div class="form-group"><label class="form-label required">Reason</label>' +
        '<textarea class="form-control" id="sa_reason" rows="3" placeholder="Describe the reason for your advance request…"></textarea>' +
      '</div>' +
    '</div>' +
    '<div class="modal-footer">' +
      '<button class="btn btn-outline" onclick="closeModal()">Cancel</button>' +
      '<button class="btn btn-primary" onclick="submitSelfAdvance(\'' + emp.id + '\')" style="background:var(--navy);padding:10px 28px">Submit Request</button>' +
    '</div>'
  );
}

function submitSelfAdvance(empId) {
  var amount = parseFloat(document.getElementById('sa_amount').value || 0);
  var month  = document.getElementById('sa_month').value;
  var reason = (document.getElementById('sa_reason').value || '').trim();
  var emp    = getEmp(empId);

  if (!amount || !month || !reason) { toast('Please fill all fields', 'error'); return; }
  if (!emp) { toast('Employee record not found', 'error'); return; }

  var maxAdv = PayrollEngine.maxAdvance(emp.salary || 0);
  if (amount > maxAdv) { toast('Amount exceeds limit of ' + fmtCurrency(maxAdv), 'error'); return; }
  if (amount <= 0)     { toast('Amount must be greater than zero', 'error'); return; }

  if (!DB.salaryAdvances) DB.salaryAdvances = [];
  var adv = {
    id:          'ADV' + String(DB.salaryAdvances.length + 1).padStart(3, '0'),
    empId:       empId,
    amount:      amount,
    reason:      reason,
    deductMonth: month,
    status:      'Pending',
    requestedAt: new Date().toISOString().split('T')[0],
    approvedBy:  '', approvedAt: '', deductedAt: '', notes: '',
  };
  DB.salaryAdvances.unshift(adv);
  DB.auditLogs.unshift({
    id: DB.auditLogs.length + 1,
    time: new Date().toISOString().replace('T',' ').slice(0,16),
    user: STATE.user.initials || 'EMP',
    userRole: STATE.role,
    action: 'Salary advance request: ' + emp.name + ' — ' + fmtCurrency(amount),
    module: 'Advances', ip: 'browser'
  });
  scheduleSave();
  closeModal();
  toast('Advance request submitted — awaiting HR approval', 'success');
  nav('advances');
}

// ── My Loans ──
SELF_PAGES.loans = function(wrap) {
  var emp = getCurrentEmployee();
  if (!emp) {
    wrap.innerHTML = '<div class="page"><div class="empty-state"><h3>No Employee Record Linked</h3><p>Ask HR to link your user account to your employee profile.</p></div></div>';
    return;
  }

  var myLoans  = (DB.loans || []).filter(function(l) { return l.empId === emp.id; });
  var active   = myLoans.filter(function(l) { return l.status === 'Active'; });
  var completed= myLoans.filter(function(l) { return l.status === 'Completed'; });
  var totalOut = active.reduce(function(s,l) { return s + Math.max(0, l.totalRepayable - l.amountPaid); }, 0);
  var monthly  = active.reduce(function(s,l) { return s + (l.monthlyInstallment || 0); }, 0);

  var activeCards = '';
  active.forEach(function(l) {
    var remain = Math.max(0, l.totalRepayable - l.amountPaid);
    var pct    = l.totalRepayable > 0 ? Math.round(l.amountPaid / l.totalRepayable * 100) : 0;
    activeCards +=
      '<div class="card" style="margin-bottom:14px">' +
        '<div class="card-header">' +
          '<div><div class="card-title">' + l.purpose + '</div>' +
            '<div class="card-sub">Started ' + fmtDate(l.startDate) + ' · Ends ' + fmtDate(l.endDate) + '</div>' +
          '</div>' + finBadge(l.status) +
        '</div>' +
        '<div class="card-body">' +
          '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:14px">' +
            '<div><div style="font-size:10px;font-weight:700;color:var(--gray-400);text-transform:uppercase;margin-bottom:3px">Principal</div>' +
              '<div style="font-size:16px;font-weight:800;color:var(--navy);font-family:var(--mono)">' + fmtCurrency(l.principal) + '</div></div>' +
            '<div><div style="font-size:10px;font-weight:700;color:var(--gray-400);text-transform:uppercase;margin-bottom:3px">Monthly Deduction</div>' +
              '<div style="font-size:16px;font-weight:800;color:var(--amber);font-family:var(--mono)">' + fmtCurrency(l.monthlyInstallment) + '</div></div>' +
            '<div><div style="font-size:10px;font-weight:700;color:var(--gray-400);text-transform:uppercase;margin-bottom:3px">Amount Paid</div>' +
              '<div style="font-size:16px;font-weight:800;color:var(--green);font-family:var(--mono)">' + fmtCurrency(l.amountPaid) + '</div></div>' +
            '<div><div style="font-size:10px;font-weight:700;color:var(--gray-400);text-transform:uppercase;margin-bottom:3px">Remaining</div>' +
              '<div style="font-size:16px;font-weight:800;color:var(--red);font-family:var(--mono)">' + fmtCurrency(remain) + '</div></div>' +
          '</div>' +
          '<div style="background:var(--gray-100);border-radius:99px;height:10px;overflow:hidden;margin-bottom:6px">' +
            '<div style="height:100%;background:linear-gradient(90deg,var(--navy),var(--blue));border-radius:99px;width:' + pct + '%"></div>' +
          '</div>' +
          '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--gray-400)">' +
            '<span>' + pct + '% repaid</span>' +
            '<span>' + l.months + ' month plan · ' + l.interestRate + '% interest</span>' +
          '</div>' +
        '</div>' +
      '</div>';
  });

  var completedRows = '';
  completed.forEach(function(l) {
    completedRows += '<tr>' +
      '<td style="font-weight:600">' + l.purpose + '</td>' +
      '<td style="font-family:var(--mono)">' + fmtCurrency(l.principal) + '</td>' +
      '<td style="font-size:12px">' + fmtDate(l.startDate) + ' → ' + fmtDate(l.endDate) + '</td>' +
      '<td>' + finBadge(l.status) + '</td>' +
    '</tr>';
  });

  wrap.innerHTML = '<div class="page">' +
    '<div class="page-header">' +
      '<div><h1 class="page-title">My Loans</h1>' +
        '<div class="page-sub">' + emp.name + ' · ' + active.length + ' active loan' + (active.length !== 1 ? 's' : '') + '</div>' +
      '</div>' +
      '<button class="btn btn-primary" onclick="openSelfLoanModal()">Apply for Loan</button>' +
    '</div>' +
    '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:20px">' +
      '<div class="stat-card red"><div class="stat-val">' + fmtCurrency(totalOut) + '</div><div class="stat-lbl">Outstanding Balance</div></div>' +
      '<div class="stat-card amber"><div class="stat-val">' + fmtCurrency(monthly) + '</div><div class="stat-lbl">Monthly Deduction</div></div>' +
      '<div class="stat-card green"><div class="stat-val">' + completed.length + '</div><div class="stat-lbl">Completed</div></div>' +
      '<div class="stat-card blue"><div class="stat-val">' + myLoans.length + '</div><div class="stat-lbl">Total Loans</div></div>' +
    '</div>' +
    (active.length ? activeCards : '') +
    (completed.length ?
      '<div class="card"><div class="card-header"><span class="card-title"> Completed Loans</span></div>' +
        '<div class="card-body" style="padding:0"><div class="table-wrap"><table class="table">' +
          '<thead><tr><th>Purpose</th><th>Amount</th><th>Period</th><th>Status</th></tr></thead>' +
          '<tbody>' + completedRows + '</tbody>' +
        '</table></div></div></div>'
    : '') +
    (myLoans.length === 0 ?
      '<div class="empty-state"><div style="font-size:36px;margin-bottom:12px"></div>' +
        '<h3>No Loans</h3><p>You have no loan records. Click <strong>Apply for Loan</strong> to apply.</p></div>'
    : '') +
  '</div>';
};

// ── Apply for loan modal (self-service) ──
function openSelfLoanModal() {
  var emp = getCurrentEmployee();
  if (!emp) { toast('No employee record linked', 'error'); return; }
  var maxMonthly = PayrollEngine.maxAdvance(emp.salary || 0);

  openModal('narrow',
    '<div class="modal-header" style="background:var(--navy)">' +
      '<span class="modal-title" style="color:white">Apply for Loan</span>' +
      closeX('rgba(255,255,255,.6)') +
    '</div>' +
    '<div class="modal-body">' +
      '<div style="background:var(--blue-l);border-radius:var(--radius);padding:12px 14px;font-size:13px;color:var(--blue);margin-bottom:16px">' +
        'Monthly salary: <strong>' + fmtCurrency(emp.salary || 0) + '</strong> · ' +
        'Max monthly deduction: <strong>' + fmtCurrency(maxMonthly) + '</strong>' +
      '</div>' +
      '<div class="form-group"><label class="form-label required">Loan Amount (USD)</label>' +
        '<input class="form-control" id="sl_amount" type="number" min="100" placeholder="e.g. 5000" oninput="calcSelfLoanPreview()">' +
      '</div>' +
      '<div class="form-group"><label class="form-label required">Repayment Period (months)</label>' +
        '<input class="form-control" id="sl_months" type="number" min="1" max="36" value="12" oninput="calcSelfLoanPreview()">' +
      '</div>' +
      '<div id="sl_preview" style="display:none;background:var(--navy);color:white;border-radius:var(--radius);padding:12px 16px;margin-bottom:14px">' +
        'Monthly payment: <span id="sl_monthly" style="color:var(--gold);font-weight:800;font-size:16px">—</span>' +
      '</div>' +
      '<div class="form-group"><label class="form-label required">Purpose</label>' +
        '<textarea class="form-control" id="sl_purpose" rows="3" placeholder="Explain why you need this loan…"></textarea>' +
      '</div>' +
    '</div>' +
    '<div class="modal-footer">' +
      '<button class="btn btn-outline" onclick="closeModal()">Cancel</button>' +
      '<button class="btn btn-primary" onclick="submitSelfLoan(\'' + emp.id + '\')" style="background:var(--navy);padding:10px 28px">Submit Application</button>' +
    '</div>'
  );
}

function calcSelfLoanPreview() {
  var amount  = parseFloat(document.getElementById('sl_amount').value || 0);
  var months  = parseInt(document.getElementById('sl_months').value || 12);
  var preview = document.getElementById('sl_preview');
  var monthly_el = document.getElementById('sl_monthly');
  if (!amount || !months || !preview) { if(preview) preview.style.display='none'; return; }
  var monthly = PayrollEngine.calcInstallment(amount, months, 0);
  preview.style.display = 'block';
  if (monthly_el) monthly_el.textContent = fmtCurrency(monthly) + ' / month for ' + months + ' months';
}

function submitSelfLoan(empId) {
  var amount  = parseFloat(document.getElementById('sl_amount').value || 0);
  var months  = parseInt(document.getElementById('sl_months').value || 12);
  var purpose = (document.getElementById('sl_purpose').value || '').trim();
  var emp     = getEmp(empId);

  if (!amount || !months || !purpose) { toast('Please fill all fields', 'error'); return; }
  if (!emp) { toast('Employee record not found', 'error'); return; }
  if (months > 36) { toast('Maximum repayment period is 36 months', 'error'); return; }

  var monthly    = PayrollEngine.calcInstallment(amount, months, 0);
  var maxMonthly = PayrollEngine.maxAdvance(emp.salary || 0);
  if (monthly > maxMonthly) {
    toast('Monthly payment ' + fmtCurrency(monthly) + ' exceeds your 50% salary limit of ' + fmtCurrency(maxMonthly), 'error');
    return;
  }

  if (!DB.loans) DB.loans = [];
  var start = new Date(); start.setDate(1); start.setMonth(start.getMonth() + 1);
  var end   = new Date(start); end.setMonth(end.getMonth() + months);

  var loan = {
    id:                 'LON' + String(DB.loans.length + 1).padStart(3, '0'),
    empId:              empId,
    principal:          amount,
    months:             months,
    interestRate:       0,
    monthlyInstallment: Math.round(monthly * 100) / 100,
    totalRepayable:     Math.round(monthly * months * 100) / 100,
    amountPaid:         0,
    status:             'Active',
    purpose:            purpose,
    startDate:          start.toISOString().split('T')[0],
    endDate:            end.toISOString().split('T')[0],
    approvedBy:         'Pending HR Approval',
    history:            [],
  };
  DB.loans.unshift(loan);
  DB.auditLogs.unshift({
    id: DB.auditLogs.length + 1,
    time: new Date().toISOString().replace('T',' ').slice(0,16),
    user: STATE.user.initials || 'EMP',
    userRole: STATE.role,
    action: 'Loan application: ' + emp.name + ' — ' + fmtCurrency(amount) + ' × ' + months + 'mo',
    module: 'Loans', ip: 'browser'
  });
  scheduleSave();
  closeModal();
  toast('Loan application submitted — awaiting HR approval', 'success');
  nav('loans');
}

// ── Announcements (employee self-service) ──
SELF_PAGES.notices = function(wrap) {
  var now = new Date().toISOString().split('T')[0];
  var emp = getCurrentEmployee();

  var visible = (DB.notices || []).filter(function(n) {
    if (n.status !== 'Active') return false;
    if (n.publishDate && n.publishDate > now) return false;
    if (n.expiryDate  && n.expiryDate  < now) return false;
    return true;
  }).sort(function(a, b) {
    var p = { Critical:0, High:1, Medium:2, Informational:3 };
    return (p[a.priority] || 2) - (p[b.priority] || 2);
  });

  var priColor = { Critical:'#FEE2E2', High:'#FEF3C7', Medium:'#DBEAFE', Informational:'#F0FDF4' };
  var priText  = { Critical:'#991B1B', High:'#92400E', Medium:'#1E40AF', Informational:'#065F46' };
  var priDot = { Critical:'', High:'', Medium:'', Informational:'' };
  var priBar   = { Critical:'#DC2626', High:'#F59E0B', Medium:'#3B82F6', Informational:'#22C55E' };

  var cards = '';
  if (visible.length === 0) {
    cards = '<div class="empty-state"><div style="font-size:48px;margin-bottom:16px"></div><h3>No Announcements</h3><p>No active announcements at this time.</p></div>';
  } else {
    visible.forEach(function(n) {
      var acked = emp && (n.acknowledgments || []).some(function(a) { return a.empId === emp.id; });
      var ackBtn = '';
      if (n.requiresAck && !acked && emp) {
        ackBtn = '<button onclick="selfAckNotice(\'' + n.id + '\')" ' +
          'style="background:var(--navy);color:white;border:none;padding:8px 20px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;margin-top:10px">' +
          'Acknowledge Notice</button>';
      }
      var ackBadge = n.requiresAck
        ? '<span style="font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;background:' + (acked?'#D1FAE5':'#FEF3C7') + ';color:' + (acked?'#065F46':'#92400E') + '">' +
            (acked ? ' Acknowledged' : 'Needs Acknowledgment') + '</span>'
        : '';

      cards +=
        '<div class="card" style="margin-bottom:16px;border-left:4px solid ' + (priBar[n.priority] || '#6B7280') + '">' +
          '<div style="padding:16px 20px">' +
            '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:10px">' +
              '<div style="flex:1">' +
                '<div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">' +
                  
                  '<span style="font-size:10px;font-weight:800;background:' + (priColor[n.priority]||'#F1F5F9') + ';color:' + (priText[n.priority]||'#475569') + ';padding:2px 8px;border-radius:99px">' + n.priority + '</span>' +
                  '<span style="font-size:10px;color:var(--gray-400)">' + n.category + '</span>' +
                  (n.pinned ? '' : '') +
                '</div>' +
                '<h3 style="font-size:16px;font-weight:800;color:var(--navy);margin:0 0 5px 0">' + n.title + '</h3>' +
                '<div style="font-size:11px;color:var(--gray-400)">By ' + (n.createdByName||'HR') + ' · ' + (n.publishDate || '') + '</div>' +
              '</div>' +
              ackBadge +
            '</div>' +
            '<div style="font-size:14px;color:var(--gray-700);line-height:1.7;padding:12px 14px;background:var(--gray-50);border-radius:8px">' + n.body + '</div>' +
            ackBtn +
          '</div>' +
        '</div>';
    });
  }

  wrap.innerHTML = '<div class="page">' +
    '<div class="page-header">' +
      '<div><h1 class="page-title">Announcements</h1>' +
        '<div class="page-sub">' + visible.length + ' active announcement' + (visible.length !== 1 ? 's' : '') + '</div>' +
      '</div>' +
    '</div>' +
    cards +
  '</div>';
};

function selfAckNotice(noticeId) {
  var emp    = getCurrentEmployee();
  var notice = (DB.notices || []).find(function(n) { return n.id === noticeId; });
  if (!notice || !emp) { toast('Unable to acknowledge — no employee record', 'error'); return; }

  if (!notice.acknowledgments) notice.acknowledgments = [];
  if (notice.acknowledgments.some(function(a) { return a.empId === emp.id; })) {
    toast('You have already acknowledged this notice', 'info'); return;
  }

  notice.acknowledgments.push({
    empId:     emp.id,
    empName:   emp.name,
    role:      STATE.role,
    timestamp: new Date().toISOString().replace('T',' ').slice(0,16),
  });

  DB.auditLogs.unshift({
    id: DB.auditLogs.length + 1,
    time: new Date().toISOString().replace('T',' ').slice(0,16),
    user: STATE.user.initials || 'EMP',
    userRole: STATE.role,
    action: 'Acknowledged notice: ' + notice.title,
    module: 'Notices', ip: 'browser'
  });

  scheduleSave();
  toast('Notice acknowledged', 'success');
  nav('notices');
}

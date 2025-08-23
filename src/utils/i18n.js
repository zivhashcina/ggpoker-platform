export const LANGS = { he: 'he', en: 'en' };

export function setDirByLang(lang) {
  const dir = lang === LANGS.he ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
  document.documentElement.dir = dir;
}

export function t(lang, key) {
  const dict = {
    he: {
      appTitle: 'GG Poker Platform',
      landingTitle: 'השאר פרטים ונחזור אליך',
      name: 'שם',
      phone: 'טלפון',
      email: 'אימייל',
      submit: 'שליחה',
      thanks: 'תודה! נשמר בהצלחה.',
      agentLogin: 'כניסת סוכנים',
      password: 'סיסמה',
      login: 'התחברות',
      otpTitle: 'אימות שלב 2',
      otpPlaceholder: 'הכנס קוד בן 6 ספרות',
      verifyOtp: 'אימות',
      dashboard: 'לוח בקרה',
      exportCsv: 'ייצוא CSV',
      recentLeads: '10 הלידים האחרונים',
      total: 'סה"כ לידים',
      langSwitch: 'עברית/English',
    },
    en: {
      appTitle: 'GG Poker Platform',
      landingTitle: 'Leave your details and we’ll get back to you',
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      submit: 'Submit',
      thanks: 'Thanks! Saved successfully.',
      agentLogin: 'Agent Login',
      password: 'Password',
      login: 'Sign in',
      otpTitle: 'Step-2 Verification',
      otpPlaceholder: 'Enter 6-digit code',
      verifyOtp: 'Verify',
      dashboard: 'Dashboard',
      exportCsv: 'Export CSV',
      recentLeads: 'Last 10 leads',
      total: 'Total leads',
      langSwitch: 'עברית/English',
    },
  };
  return dict[lang][key] ?? key;
}

export function getReferralFromLocation() {
  try {
    const hash = location.hash || '';
    const i = hash.indexOf('?');
    if (i === -1) return null;
    const qs = new URLSearchParams(hash.slice(i + 1));
    return qs.get('ref');
  } catch {
    return null;
  }
}

export const formatDate = (d) => new Date(d).toLocaleString();

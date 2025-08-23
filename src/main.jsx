import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import LandingForm from './components/LandingForm';
import AgentLogin from './components/AgentLogin';
import Dashboard from './components/Dashboard';
import { LANGS, setDirByLang, t, getReferralFromLocation } from './utils/i18n';
import { logReferralClick } from './services/firestore';
import './index.css';

function Shell() {
  const [lang, setLang] = React.useState(LANGS.he);
  const nav = useNavigate();
  React.useEffect(() => setDirByLang(lang), [lang]);
  React.useEffect(() => {
    const r = getReferralFromLocation();
    if (r) {
      logReferralClick(r).catch(() => {});
    }
  }, []);
  return (
    <div className="min-h-dvh bg-white text-neutral-900">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/70 border-b">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to="/" className="font-bold">
            {t(lang, 'appTitle')}
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/agent" className="hover:underline">
              {t(lang, 'agentLogin')}
            </Link>
            <button
              className="text-sm px-3 py-1 rounded-lg border"
              onClick={() => setLang((l) => (l === LANGS.he ? LANGS.en : LANGS.he))}
              title={t(lang, 'langSwitch')}
            >
              {lang.toUpperCase()}
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<LandingForm lang={lang} />} />
          <Route
            path="/agent"
            element={<AgentLogin lang={lang} onVerified={() => nav('/dashboard')} />}
          />
          <Route path="/dashboard" element={<Dashboard lang={lang} />} />
        </Routes>
      </main>
      <footer className="py-8 text-center opacity-60 text-sm">
        © {new Date().getFullYear()} GG Poker Platform
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Shell />
    </HashRouter>
  </React.StrictMode>,
);

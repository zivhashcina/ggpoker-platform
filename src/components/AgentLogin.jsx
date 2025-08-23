import { useState } from 'react';
import { auth } from '../firebase/init';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { saveOtpForUser } from '../services/firestore';
import { t } from '../utils/i18n';

export default function AgentLogin({ lang, onVerified }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [phase, setPhase] = useState('login');
  const [issued, setIssued] = useState('');
  const [otp, setOtp] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const cred = await signInWithEmailAndPassword(auth, email, pass);
    const code = '' + Math.floor(100000 + Math.random() * 900000);
    setIssued(code);
    console.log('[OTP DEMO] code:', code);
    await saveOtpForUser(cred.user.uid, code, 120);
    setPhase('otp');
  }

  function verifyOtp(e) {
    e.preventDefault();
    if (otp === issued) {
      localStorage.setItem('mfaVerified', '1');
      onVerified?.();
    } else alert('OTP לא תואם (בדמו הקוד מופיע גם בקונסול)');
  }

  if (phase === 'otp') {
    return (
      <div className="max-w-md mx-auto p-6">
        <h2 className="text-xl font-bold mb-4">{t(lang, 'otpTitle')}</h2>
        <p className="text-sm opacity-70 mb-2">
          [DEMO] הקוד שלך: <b>{issued}</b>
        </p>
        <form onSubmit={verifyOtp} className="space-y-3">
          <input
            className="w-full border rounded-xl p-3 tracking-widest"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder={t(lang, 'otpPlaceholder')}
          />
          <button className="w-full rounded-xl py-3 font-semibold bg-black text-white hover:opacity-90">
            {t(lang, 'verifyOtp')}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">{t(lang, 'agentLogin')}</h2>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          className="w-full border rounded-xl p-3"
          required
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border rounded-xl p-3"
          required
          type="password"
          placeholder={t(lang, 'password')}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button className="w-full rounded-xl py-3 font-semibold bg-black text-white hover:opacity-90">
          {t(lang, 'login')}
        </button>
      </form>
    </div>
  );
}

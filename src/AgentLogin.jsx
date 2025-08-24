import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export default function AgentLogin() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [msg, setMsg] = useState('');

  async function onLogin(e) {
    e.preventDefault();
    setMsg('');
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, pwd);
      localStorage.setItem('agentUid', user.uid); // חשוב עבור ref
      setMsg('✅ מחובר');
    } catch (err) {
      console.error(err);
      setMsg('❌ התחברות נכשלה');
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-4">כניסת סוכן</h1>
      <form onSubmit={onLogin} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="סיסמה"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button className="px-4 py-2 rounded bg-black text-white">כניסה</button>
      </form>
      {msg && <div className="mt-3 text-sm">{msg}</div>}
    </main>
  );
}

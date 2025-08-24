import React, { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from './firebase';

export default function LandingPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (!name || !phone || !email) {
      setMsg('נא למלא שם/טלפון/אימייל');
      return;
    }
    setBusy(true);
    setMsg('');
    try {
      const params = new URLSearchParams(window.location.search);
      const campaignRef = params.get('ref');
      const agentLocalRef = localStorage.getItem('agentUid');
      const agentUid = auth.currentUser?.uid || agentLocalRef || null;

      await addDoc(collection(db, 'registrations'), {
        name,
        phone,
        email,
        ref: agentUid || campaignRef || null,
        createdAt: serverTimestamp(),
      });

      setMsg('✅ נרשמת בהצלחה! נחזור אליך בהקדם.');
      setName('');
      setPhone('');
      setEmail('');
    } catch (err) {
      console.error('register error', err);
      setMsg('❌ שגיאה בשליחה. נסה/י שוב');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg p-6">
      <h1 className="text-2xl font-bold mb-4">הרשמה</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border p-2 rounded"
          placeholder="שם מלא"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="טלפון"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          disabled={busy}
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
        >
          {busy ? 'שולח...' : 'שליחה'}
        </button>
        {msg && <div className="text-sm mt-2">{msg}</div>}
      </form>
    </main>
  );
}

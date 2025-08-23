import { useState } from 'react';
import { saveRegistration } from '../services/firestore';
import { getReferralFromLocation, t } from '../utils/i18n';

export default function LandingForm({ lang }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [done, setDone] = useState(false);
  const ref = getReferralFromLocation();

  async function onSubmit(e) {
    e.preventDefault();
    await saveRegistration({ ...form, ref });
    setForm({ name: '', phone: '', email: '' });
    setDone(true);
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t(lang, 'landingTitle')}</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border rounded-xl p-3"
          required
          placeholder={t(lang, 'name')}
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
        <input
          className="w-full border rounded-xl p-3"
          required
          placeholder={t(lang, 'phone')}
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
        />
        <input
          className="w-full border rounded-xl p-3"
          required
          type="email"
          placeholder={t(lang, 'email')}
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />
        <button className="w-full rounded-xl py-3 font-semibold bg-black text-white hover:opacity-90">
          {t(lang, 'submit')}
        </button>
      </form>
      {done && <p className="mt-3 text-green-600">{t(lang, 'thanks')}</p>}
    </div>
  );
}

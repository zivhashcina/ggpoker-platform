import { useEffect, useState } from 'react';
import { getRegistrationsCount, getRecentRegistrations } from '../services/firestore';
import { t, formatDate } from '../utils/i18n';

export default function Dashboard({ lang }) {
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    (async () => {
      setTotal(await getRegistrationsCount());
      setRows(await getRecentRegistrations(10));
    })();
  }, []);

  function toCsv() {
    const header = ['name', 'phone', 'email', 'ref', 'createdAt'].join(',');
    const body = rows
      .map((r) => [r.name, r.phone, r.email, r.ref ?? '', r.createdAt?.toDate?.() ?? ''].join(','))
      .join('\n');
    const blob = new Blob([header + '\n' + body], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'registrations.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t(lang, 'dashboard')}</h1>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-neutral-100">
            {t(lang, 'total')}: {total}
          </span>
          <button
            onClick={toCsv}
            className="rounded-xl px-4 py-2 bg-black text-white hover:opacity-90"
          >
            {t(lang, 'exportCsv')}
          </button>
        </div>
      </div>
      <div className="overflow-x-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-50">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Email</th>
              <th className="p-2">Ref</th>
              <th className="p-2">Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="odd:bg-white even:bg-neutral-50">
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.phone}</td>
                <td className="p-2">{r.email}</td>
                <td className="p-2">{r.ref ?? ''}</td>
                <td className="p-2">
                  {r.createdAt?.toDate ? formatDate(r.createdAt.toDate()) : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

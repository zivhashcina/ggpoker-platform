import React, { useEffect, useMemo, useState } from 'react';
import { auth, db } from './firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  getCountFromServer,
  where,
  Timestamp,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return Timestamp.fromDate(d);
}
function startOfWeek() {
  const d = new Date();
  const day = d.getDay(); // 0=Sun
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return Timestamp.fromDate(d);
}
function fmt(ts) {
  if (!ts) return '';
  const d = ts.toDate ? ts.toDate() : ts;
  const dd = d.toLocaleDateString('he-IL');
  const tt = d.toLocaleTimeString('he-IL', { hour12: false });
  return `${tt} ,${dd}`;
}
function downloadCSV(filename, rows) {
  const header = ['Created', 'Ref', 'Email', 'Phone', 'Name'];
  const lines = [
    header,
    ...rows.map((r) => [fmt(r.createdAt), r.ref || '', r.email || '', r.phone || '', r.name || '']),
  ];
  const csv = lines
    .map((cols) => cols.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
    .join('\r\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    today: 0,
    week: 0,
    mine: 0,
  });

  useEffect(() => {
    const off = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => off();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const col = collection(db, 'registrations');

        // --- סיכומים מהירים עם Count Aggregation ---
        const totalSnap = await getCountFromServer(col);
        const todaySnap = await getCountFromServer(
          query(col, where('createdAt', '>=', startOfToday())),
        );
        const weekSnap = await getCountFromServer(
          query(col, where('createdAt', '>=', startOfWeek())),
        );

        let mineCount = 0;
        if (user?.uid) {
          const mineSnap = await getCountFromServer(query(col, where('ref', '==', user.uid)));
          mineCount = mineSnap.data().count || 0;
        }

        setSummary({
          total: totalSnap.data().count || 0,
          today: todaySnap.data().count || 0,
          week: weekSnap.data().count || 0,
          mine: mineCount,
        });

        // --- 10 אחרונים למסך ---
        const recentQ = query(col, orderBy('createdAt', 'desc'), limit(10));
        const recentDocs = await getDocs(recentQ);
        const rows = recentDocs.docs.map((d) => ({ id: d.id, ...d.data() }));
        setRecent(rows);
      } catch (e) {
        console.error('Dashboard load error:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.uid]);

  const hasData = useMemo(() => summary.total > 0 || recent.length > 0, [summary, recent]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">לוח בקרה</h1>
        <div className="text-sm opacity-70">
          {user?.email ? `מחובר: ${user.email}` : 'לא מחובר'}
        </div>
      </header>

      {/* כרטיסי סיכום */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'סה״כ לידים', value: summary.total },
          { label: 'היום', value: summary.today },
          { label: 'השבוע', value: summary.week },
          { label: 'שלי', value: summary.mine },
        ].map((c, i) => (
          <div key={i} className="rounded-2xl shadow p-4 bg-white border">
            <div className="text-sm opacity-70">{c.label}</div>
            <div className="text-3xl font-extrabold mt-1">{c.value}</div>
          </div>
        ))}
      </section>

      {/* 10 אחרונים + יצוא */}
      <section className="rounded-2xl shadow border bg-white">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">10 אחרונים</h2>
          <button
            className="px-3 py-1.5 rounded-lg border hover:bg-gray-50"
            onClick={() =>
              downloadCSV(`leads_${new Date().toISOString().slice(0, 10)}.csv`, recent)
            }
            disabled={!recent.length}
          >
            יצוא CSV
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-right">
                <th>Created</th>
                <th>Ref</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id} className="border-t [&>td]:px-3 [&>td]:py-2">
                  <td className="whitespace-nowrap">{fmt(r.createdAt)}</td>
                  <td className="truncate max-w-[160px]">{r.ref || ''}</td>
                  <td className="truncate max-w-[220px]">{r.email || ''}</td>
                  <td className="ltr:font-mono">{r.phone || ''}</td>
                  <td>{r.name || ''}</td>
                </tr>
              ))}
              {!recent.length && !loading && (
                <tr>
                  <td colSpan={5} className="text-center py-6 opacity-60">
                    אין נתונים להצגה
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={5} className="text-center py-6 opacity-60">
                    טוען…
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* קרדיט קטן */}
      <footer className="text-xs opacity-60 mt-6 text-center">
        GG Poker Platform © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

// src/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { db, auth, signOut } from "./firebase";
import {
  collection, getCountFromServer, query, orderBy, limit, getDocs, getDocsFromServer
} from "firebase/firestore";
import { PUBLIC_BASE_URL } from "./config";

export default function Dashboard() {
  const [count, setCount] = useState(0);
  const [recent, setRecent] = useState([]);
  const user = auth.currentUser;

  const referralLink = useMemo(() => {
    const ref = user?.uid || "public";
    return `${PUBLIC_BASE_URL}/?ref=${encodeURIComponent(ref)}`;
  }, [user]);

  useEffect(() => {
    (async () => {
      const coll = collection(db, "registrations");
      const snapshot = await getCountFromServer(coll);
      setCount(snapshot.data().count);

      const q = query(coll, orderBy("createdAt", "desc"), limit(10));
      const docs = await getDocs(q);
      setRecent(docs.docs.map(d => ({ id: d.id, ...d.data() })));
    })();
  }, []);

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(referralLink); alert("לינק ההפניה הועתק ✅"); }
    catch { alert("לא הצלחתי להעתיק, נסה ידנית."); }
  };

  const exportCSV = async () => {
    const rows = [["fullName","phone","email","ref","createdAt","docId"]];
    const coll = collection(db, "registrations");
    const q = query(coll, orderBy("createdAt", "desc"));
    const snap = await getDocsFromServer(q);
    snap.forEach(d => {
      const v = d.data();
      const ts = v.createdAt?.toDate?.() ? v.createdAt.toDate().toISOString() : "";
      rows.push([v.fullName||"", v.phone||"", v.email||"", v.ref||"", ts, d.id]);
    });
    const csv = rows.map(r => r.map(f => `"${String(f).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "registrations.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-blue-900">דשבורד סוכן</h1>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-emerald-600 text-white px-3 py-2 rounded">ייצוא CSV</button>
          <button onClick={() => signOut(auth)} className="bg-gray-800 text-white px-4 py-2 rounded">התנתק</button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white shadow rounded p-6">
          <div className="text-lg">סה״כ נרשמים: <span className="font-bold">{count}</span></div>
        </div>

        <div className="bg-white shadow rounded p-6">
          <div className="font-semibold mb-2">לינק הפניה אישי</div>
          <div className="flex gap-2">
            <input className="flex-1 border rounded px-2 py-1" readOnly value={referralLink} />
            <button onClick={copyLink} className="bg-blue-700 text-white px-3 py-1 rounded">העתק</button>
          </div>
          <p className="text-sm text-gray-500 mt-2">שתף את הקישור הזה. קליקים יתועדו ב-Firestore.</p>
        </div>
      </div>

      <div className="bg-white shadow rounded p-6 mt-6">
        <h2 className="font-semibold mb-3">10 האחרונים</h2>
        <div className="space-y-2">
          {recent.map(r => (
            <div key={r.id} className="border rounded p-3">
              <div className="font-medium">{r.fullName || "ללא שם"}</div>
              <div className="text-sm text-gray-600">{r.email} • {r.phone}</div>
            </div>
          ))}
          {recent.length === 0 && <div className="text-sm text-gray-500">אין נתונים להצגה.</div>}
        </div>
      </div>
    </div>
  );
}

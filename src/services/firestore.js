import { db, ts } from '../firebase/init';
import {
  addDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore';

export async function saveRegistration({ name, phone, email, ref }) {
  await addDoc(collection(db, 'registrations'), {
    name,
    phone,
    email,
    ref: ref ?? null,
    createdAt: serverTimestamp(),
    ua: navigator.userAgent,
  });
}

export async function getRecentRegistrations(n = 10) {
  const q = query(collection(db, 'registrations'), orderBy('createdAt', 'desc'), limit(n));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getRegistrationsCount() {
  const snap = await getDocs(collection(db, 'registrations'));
  return snap.size;
}

export async function logReferralClick(ref) {
  if (!ref) return;
  await addDoc(collection(db, 'clicks'), {
    ref,
    path: location.hash || '/',
    ts: serverTimestamp(),
    ua: navigator.userAgent,
  });
}

// OTP DEMO ONLY – לא לפרודקשן
export async function saveOtpForUser(uid, code, ttlSeconds = 120) {
  await addDoc(collection(db, 'agentOtpLogs'), {
    uid,
    code,
    expiresAt: Date.now() + ttlSeconds * 1000,
    createdAt: ts(),
  });
}

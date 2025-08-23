// src/AgentLogin.jsx
import React, { useState } from "react";
import { db, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "./firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export default function AgentLogin({ onLoggedIn }) {
  const [mode, setMode] = useState("login"); // login | register
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("מתחבר...");
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = cred.user;
      await setDoc(doc(db, "agents", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        role: "agent",
        lastLoginAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      }, { merge: true });
      setStatus("התחברת כסוכן ✅");
      onLoggedIn?.(user);
    } catch (err) {
      console.error(err);
      setStatus("שגיאה בהתחברות: " + (err?.message || ""));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus("יוצר סוכן...");
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      await updateProfile(cred.user, { displayName: displayName.trim() });
      await setDoc(doc(db, "agents", cred.user.uid), {
        uid: cred.user.uid,
        email: cred.user.email,
        displayName: displayName.trim(),
        role: "agent",
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
      });
      setStatus("סוכן נוצר והתחבר ✅");
      onLoggedIn?.(cred.user);
    } catch (err) {
      console.error(err);
      setStatus("שגיאה ביצירת סוכן: " + (err?.message || ""));
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">כניסת סוכן</h1>

      <div className="flex gap-2 mb-3">
        <button className={"px-3 py-1 rounded " + (mode==="login"?"bg-blue-700 text-white":"bg-gray-200")} onClick={()=>setMode("login")}>התחברות</button>
        <button className={"px-3 py-1 rounded " + (mode==="register"?"bg-blue-700 text-white":"bg-gray-200")} onClick={()=>setMode("register")}>יצירת סוכן</button>
      </div>

      <form onSubmit={mode==="login" ? handleLogin : handleRegister} className="bg-white shadow-md rounded p-6 w-full max-w-md space-y-4">
        {mode === "register" && (
          <input
            type="text"
            placeholder="שם תצוגה (לא חובה)"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        )}
        <input
          type="email"
          placeholder="אימייל (שם משתמש)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
        <button className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">
          {mode === "login" ? "כניסה" : "יצירת סוכן"}
        </button>
        <div className="text-sm text-center">{status}</div>
      </form>
    </div>
  );
}

// src/App.jsx
import React, { useEffect, useState } from "react";
import LandingPage from "./LandingPage";
import AgentLogin from "./AgentLogin";
import Dashboard from "./Dashboard";
import { auth, onAuthStateChanged } from "./firebase";

export default function App() {
  const [tab, setTab] = useState("landing"); // landing | agent | dashboard
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setTab(u ? "dashboard" : "landing");
    });
    return () => unsub();
  }, []);

  return (
    <div>
      <nav dir="rtl" className="flex gap-3 justify-center p-3">
        <button className={"px-3 py-1 rounded " + (tab==="landing"?"bg-blue-700 text-white":"bg-gray-200")} onClick={()=>setTab("landing")}>עמוד הרשמה</button>
        {!user && <button className={"px-3 py-1 rounded " + (tab==="agent"?"bg-blue-700 text-white":"bg-gray-200")} onClick={()=>setTab("agent")}>כניסת סוכן</button>}
        {user && <button className={"px-3 py-1 rounded " + (tab==="dashboard"?"bg-blue-700 text-white":"bg-gray-200")} onClick={()=>setTab("dashboard")}>דשבורד</button>}
      </nav>

      {tab === "landing" && <LandingPage />}
      {tab === "agent" && <AgentLogin onLoggedIn={()=>setTab("dashboard")} />}
      {tab === "dashboard" && user && <Dashboard />}
    </div>
  );
}

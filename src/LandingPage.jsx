// src/LandingPage.jsx
import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function LandingPage() {
  const [formData, setFormData] = useState({ fullName: "", phone: "", email: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("שולח...");
    try {
      await addDoc(collection(db, "registrations"), { ...formData, createdAt: serverTimestamp() });
      setStatus("🟢 ההרשמה בוצעה בהצלחה!");
      setFormData({ fullName: "", phone: "", email: "" });
    } catch (error) {
      console.error(error);
      setStatus("🔴 שגיאה בשליחה");
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-900">הרשמה לפלטפורמת GG Poker</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-6 w-full max-w-md space-y-4">
        <input name="fullName" placeholder="שם מלא" value={formData.fullName} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" required />
        <input name="phone" placeholder="מספר טלפון" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" required />
        <input type="email" name="email" placeholder="כתובת אימייל" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded p-2" required />
        <button type="submit" className="bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800">שלח טופס</button>
        <div className="text-sm text-center">{status}</div>
      </form>
    </div>
  );
}

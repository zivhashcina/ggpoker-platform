# GG Poker Platform

Landing & agent platform for GGPoker affiliates.

## ✨ Features
- **Landing form**: name, phone, email → saved to Firestore (`registrations`)
- **Agent auth**: email + password (Firebase Auth)
- **Dashboard**: total leads, last 10, **CSV export**
- **Referral tracking**: `/?ref=<agentUid>` logs clicks to Firestore (`clicks`)
- **TailwindCSS v4** styling
- **Vite** starter + GitHub Pages deploy

## 🧱 Tech Stack
React + Vite • TailwindCSS v4 • Firebase Auth + Firestore

## 🔥 Firebase setup
- Enable **Auth → Email/Password**
- Recommended Firestore rules (Rules tab):

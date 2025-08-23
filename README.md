# GG Poker Platform

[![Deploy](https://github.com/zivhashcina/ggpoker-platform/actions/workflows/deploy.yml/badge.svg)](https://github.com/zivhashcina/ggpoker-platform/actions/workflows/deploy.yml) [![Website](https://img.shields.io/website?url=https%3A%2F%2Fzivhashcina.github.io%2Fggpoker-platform%2F)](https://zivhashcina.github.io/ggpoker-platform/)
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


# GG Poker Platform

[![Deploy](https://github.com/zivhashcina/ggpoker-platform/actions/workflows/deploy.yml/badge.svg)](https://github.com/zivhashcina/ggpoker-platform/actions/workflows/deploy.yml) [![CI](https://github.com/zivhashcina/ggpoker-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/zivhashcina/ggpoker-platform/actions/workflows/ci.yml) [![CodeQL](https://github.com/zivhashcina/ggpoker-platform/actions/workflows/codeql.yml/badge.svg)](https://github.com/zivhashcina/ggpoker-platform/actions/workflows/codeql.yml) [![Website](https://img.shields.io/website?url=https%3A%2F%2Fzivhashcina.github.io%2Fggpoker-platform%2F)](https://zivhashcina.github.io/ggpoker-platform/) ![License](https://img.shields.io/github/license/zivhashcina/ggpoker-platform) ![Node](https://img.shields.io/badge/node-20.x-339933?logo=node.js&logoColor=white) ![Repo size](https://img.shields.io/github/repo-size/zivhashcina/ggpoker-platform) ![Top language](https://img.shields.io/github/languages/top/zivhashcina/ggpoker-platform) ![Last commit](https://img.shields.io/github/last-commit/zivhashcina/ggpoker-platform)
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



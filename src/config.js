// src/config.js
// כתובת יעד האפיליאייט (עדכן לכתובת האמיתית שלך)
export const AFFILIATE_BASE = "https://ggpoker.com/?ref=";

// בסיס פומבי של האתר שלך
// בפיתוח: localhost, בפרודקשן: עדכן ל-URL של GitHub Pages שלך
export const PUBLIC_BASE_URL =
  (typeof location !== "undefined" && location.origin) || "http://localhost:5173";

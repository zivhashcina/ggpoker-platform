import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  // התעלמות גלובלית מכל מה שלא צריך לסרוק
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "dist-ssr/**",
      ".husky/**",
      ".github/**",
      "coverage/**"
    ],
  },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      // גלובלס של דפדפן + ES2021 (כולל window/document/console/URL/Blob/alert וכו')
      globals: { ...globals.browser, ...globals.es2021, JSX: "readonly" },
    },
    plugins: { react, "react-hooks": reactHooks },
    rules: {
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
    settings: { react: { version: "detect" } }
  }
];

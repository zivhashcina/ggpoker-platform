/* eslint config (flat) */
const eslint = require("@eslint/js");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");

module.exports = [
  eslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["dist/**","node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },  // JSX ✅
      globals: { window: "readonly", document: "readonly", JSX: "readonly" }
    },
    plugins: { react, "react-hooks": reactHooks },
    rules: {
      "no-unused-vars": ["warn",{ "argsIgnorePattern":"^_" }],
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
    settings: { react: { version: "detect" } }
  }
];

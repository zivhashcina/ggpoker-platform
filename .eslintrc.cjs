/* eslint config */
const eslint = require("@eslint/js");
module.exports = [
  eslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["dist/**","node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { window: "readonly", document: "readonly", JSX: "readonly" }
    },
    plugins: {
      react: require("eslint-plugin-react"),
      "react-hooks": require("eslint-plugin-react-hooks")
    },
    rules: {
      "no-unused-vars": ["warn",{ "argsIgnorePattern":"^_" }],
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    },
    settings: { react: { version: "detect" } }
  }
];

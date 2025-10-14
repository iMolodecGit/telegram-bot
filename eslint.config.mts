import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
    rules: {
      // проверка отступов (2 пробела)
      indent: ["error", 2, { SwitchCase: 1 }],

      // пустые строки между блоками
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
      ],
    },
  },
  {
    files: ["src/**/*.{ts,mts,cts}"],
    extends: [tseslint.configs.recommended],
    rules: {
      // отключаем ругань на any
      "@typescript-eslint/no-explicit-any": "off",

      // проверка отступов
      indent: ["error", 2, { SwitchCase: 1 }],

      // пустые строки между блоками
      "padding-line-between-statements": [
        "error",
        // пустая строка перед и после return
        { blankLine: "always", prev: "*", next: "return" },

        // пустая строка перед и после переменных
        // { blankLine: "always", prev: "*", next: ["const", "let", "var"] },
        // { blankLine: "always", prev: ["const", "let", "var"], next: "*" },

        // пустая строка перед и после if, for, while, switch
        { blankLine: "always", prev: "*", next: ["if", "for", "while", "switch"] },
        { blankLine: "always", prev: ["if", "for", "while", "switch"], next: "*" },

      ],
    },
  },
]);

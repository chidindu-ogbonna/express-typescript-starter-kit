/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-extraneous-dependencies */
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.env({ es2020: true, node: true }),

  eslintPluginPrettierRecommended,

  ...compat.config({
    extends: ["airbnb-base", "airbnb-typescript/base"],
    parserOptions: {
      project: "./tsconfig.json",
      ecmaVersion: "latest",
    },
    env: {
      es2020: true,
      node: true,
    },
    rules: {
      quotes: ["error", "double"],
      "@typescript-eslint/quotes": ["error", "double"],
      "import/extensions": [
        "off",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
        },
      ],
      "import/prefer-default-export": "off",
      "max-len": ["error", { code: 120 }],
      "arrow-body-style": "off",
      "no-underscore-dangle": "warn",
      "@typescript-eslint/naming-convention": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  }),
];

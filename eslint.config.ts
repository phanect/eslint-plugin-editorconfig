import { core, nodejs, unbundled } from "@phanect/lint";
import epec from "eslint-plugin-editorconfig";
import type { Linter } from "eslint";

const configs: Linter.Config[] = [
  {
    ignores: [
      "**/dist/**",
      "./example/**", // This workspace has its own eslint.config.js
      "./workspace/src/rules/charset.ts", // ignore until this rule is released again.
    ],
  },

  ...core,
  ...nodejs,
  ...unbundled,
  epec.configs.all,

  {
    // Do not add `files: [ "*" ],` here.

    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  {
    files: [ "**/*.ts" ],
    rules: {
      // TODO Add this rule to @phanect/lint later
      "n/no-unpublished-import": [ "error", {
        ignoreTypeImport: true,
      }],
    },
  },
];

export default configs;

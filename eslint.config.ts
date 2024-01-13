import { core, nodejs, unbundled } from "@phanect/lint";
import epec from "./dist/main.mjs";
import type { Linter } from "eslint";

const configs: Linter.Config[] = [
  {
    ignores: [
      "./test-packages/**",
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
];

export default configs;

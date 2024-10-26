import { core, nodejs, unbundled } from "@phanect/lint";
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

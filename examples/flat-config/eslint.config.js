import { join } from "node:path";
import js from "@eslint/js";
import editorconfig from "../../src/main.ts"; // TODO Replace package name with `eslint-plugin-editorconfig`

/** @type { import("eslint").Linter.Config[] } */
export default [{
  files: [ "**/*" ],
  ignores: [ join(import.meta.dirname, "src/invalid.ts") ],

  ...js.configs.recommended,
  ...editorconfig.configs.all,

  rules: {
    "no-console": "off",
  },
}];

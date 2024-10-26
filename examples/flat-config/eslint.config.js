import { join } from "node:path";
import editorconfig from "../../main.js";

/** @type { import("eslint").Linter.Config[] } */
export default [{
  files: [ "**/*" ],
  ignores: [ join(import.meta.dirname, "src/invalid.ts") ],

  plugins: {
    editorconfig,
  },
  rules: {
    ...editorconfig.configs.all.rules,
  },
}];

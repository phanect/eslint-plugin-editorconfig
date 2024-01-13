import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import epec from "eslint-plugin-editorconfig";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  js.configs.recommended,
  epec.configs.all,
  {
    files: [ "*" ],
    rules: {
      "no-console": "off",
    },
  },
].map(config => ({
  ...config,
  ignores: [ join(__dirname, "src/invalid.ts") ]
}));

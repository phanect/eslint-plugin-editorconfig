import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const __dirname = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  ...compat.config({
    extends: [ "plugin:editorconfig/all" ],
    plugins: [ "editorconfig" ],
  }).map(config => ({
    ...config,
    ignores: [ join(__dirname, "src/invalid.ts") ],
  })),
];

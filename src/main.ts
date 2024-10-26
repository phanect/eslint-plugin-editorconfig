import charset from "./rules/charset.ts";
import eolLast from "./rules/eol-last.ts";
import indent from "./rules/indent.ts";
import linebreakStyle from "./rules/linebreak-style.ts";
import noTrailingSpaces from "./rules/no-trailing-spaces.ts";
import { name, version } from "../package.json";
import type { ESLint, Linter } from "eslint";
import type { Merge } from "type-fest";

const targetFiles = [
  "**/*.js", "**/*.mjs", "**/*.cjs",
  "**/*.ts", "**/*.mts", "**/*.cts",
  "**/*/.jsx", "**/*.tsx",
  "**/*.vue",
  "**/*.svelte",
  "**/*.astro",
];

const conflictingRules: Linter.RulesRecord = {
  "unicode-bom": "off",

  "@stylistic/eol-last": "off",
  "@stylistic/indent": "off",
  "@stylistic/linebreak-style": "off",
  "@stylistic/no-trailing-spaces": "off",

  "@stylistic/js/eol-last": "off",
  "@stylistic/js/indent": "off",
  "@stylistic/ts/indent": "off",
  "@stylistic/js/linebreak-style": "off",
  "@stylistic/js/no-trailing-spaces": "off",
};

type PublicESLintPlugin = Merge<ESLint.Plugin, {
  configs: Record<string, Linter.Config>;
}>;

const pluginWithoutConfigs: ESLint.Plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    charset,
    "eol-last": eolLast,
    indent,
    "linebreak-style": linebreakStyle,
    "no-trailing-spaces": noTrailingSpaces,
  },
};

const plugin: PublicESLintPlugin = {
  ...pluginWithoutConfigs,

  configs: {
    noconflict: {
      files: targetFiles,
      rules: conflictingRules,
    },
    all: {
      files: targetFiles,
      rules: {
        ...conflictingRules,
        "editorconfig/charset": "error",
        "editorconfig/eol-last": "error",
        "editorconfig/indent": "error",
        "editorconfig/linebreak-style": "error",
        "editorconfig/no-trailing-spaces": "error",
      },
      plugins: {
        editorconfig: pluginWithoutConfigs,
      },
    },
  },
};

export default plugin;

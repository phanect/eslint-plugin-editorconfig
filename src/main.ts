import deepmerge from "deepmerge";
import charset from "./rules/charset.js";
import eolLast from "./rules/eol-last.js";
import indent from "./rules/indent.js";
import lineBreakStyle from "./rules/linebreak-style.js";
import noTrailingSpaces from "./rules/no-trailing-spaces.js";
import { name, version } from "../package.json";
import type { ESLint, Linter } from "eslint";

const conflictingRules: Linter.RulesRecord = {
  // Disable built-in rules from ESLint 8.x
  "eol-last": "off",
  indent: "off",
  "linebreak-style": "off",
  "no-trailing-spaces": "off",
  "unicode-bom": "off",

  // Disable a built-in rule from TypeScript-ESLint 6.x
  "@typescript-eslint/indent": "off",

  // Disable rules from ESLint Stylistic
  "@stylistic/js/eol-last": "off",
  "@stylistic/js/indent": "off",
  "@stylistic/ts/indent": "off",
  "@stylistic/js/linebreak-style": "off",
  "@stylistic/js/no-trailing-spaces": "off",
  "@stylistic/js/unicode-bom": "off",
};

type EditorConfigPlugin = ESLint.Plugin &
  Required<Pick<ESLint.Plugin, "rules" | "configs">> &
  { configs: Record<string, Linter.FlatConfig> };

let plugin: EditorConfigPlugin = {
  meta: {
    name,
    version,
  },
  rules: {
    charset,
    "eol-last": eolLast,
    indent,
    "linebreak-style": lineBreakStyle,
    "no-trailing-spaces": noTrailingSpaces,
  },
  configs: {
    noconflict: {
      rules: conflictingRules,
    },
    all: {
      rules: {
        ...conflictingRules,
        "editorconfig/charset": "error",
        "editorconfig/eol-last": "error",
        "editorconfig/indent": "error",
        "editorconfig/linebreak-style": "error",
        "editorconfig/no-trailing-spaces": "error",
      },
    },
  },
};

plugin = deepmerge(plugin, {
  configs: {
    all: {
      plugins: {
        editorconfig: plugin,
      }
    }
  }
});

export default plugin;

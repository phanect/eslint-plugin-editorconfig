import charset from "./rules/charset.ts";
import eolLast from "./rules/eol-last.ts";
import indent from "./rules/indent.ts";
import lineBreakStyle from "./rules/linebreak-style.ts";
import noTrailingSpaces from "./rules/no-trailing-spaces.ts";
import type { ESLint, Linter } from "eslint";

type EditorConfigPlugin = ESLint.Plugin &
  Required<Pick<ESLint.Plugin, "rules" | "configs">> &
  { configs: Record<string, Linter.FlatConfig> };

const plugin: EditorConfigPlugin = {
  rules: {
    charset,
    "eol-last": eolLast,
    indent,
    "linebreak-style": lineBreakStyle,
    "no-trailing-spaces": noTrailingSpaces,
  },
  configs: {
    noconflict: {
      rules: {
        "eol-last": "off",
        indent: "off",
        "linebreak-style": "off",
        "no-trailing-spaces": "off",
        "unicode-bom": "off",
        "@typescript-eslint/indent": "off",
      },
    },
    all: {
      rules: {
        "eol-last": "off",
        indent: "off",
        "linebreak-style": "off",
        "no-trailing-spaces": "off",
        "unicode-bom": "off",
        "@typescript-eslint/indent": "off",

        "editorconfig/charset": "error",
        "editorconfig/eol-last": "error",
        "editorconfig/indent": "error",
        "editorconfig/linebreak-style": "error",
        "editorconfig/no-trailing-spaces": "error",
      },
    },
  },
};

export default plugin;
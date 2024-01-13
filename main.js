import charset from "./lib/rules/charset.js";
import eolLast from "./lib/rules/eol-last.js";
import indent from "./lib/rules/indent.js";
import lineBreakStyle from "./lib/rules/linebreak-style.js";
import noTrailingSpaces from "./lib/rules/no-trailing-spaces.js";

const plugin = {
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

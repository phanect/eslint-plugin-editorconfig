import charset from "./rules/charset.ts";
import eolLast from "./rules/eol-last.ts";
import indent from "./rules/indent.ts";
import linebreakStyle from "./rules/linebreak-style.ts";
import noTrailingSpaces from "./rules/no-trailing-spaces.ts";

export default {
  rules: {
    charset,
    "eol-last": eolLast,
    indent,
    "linebreak-style": linebreakStyle,
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
        "@typescript-eslint/eol-last": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/linebreak-style": "off",
        "@typescript-eslint/no-trailing-spaces": "off",
        "@typescript-eslint/unicode-bom": "off",
      },
    },
    all: {
      rules: {
        "eol-last": "off",
        indent: "off",
        "linebreak-style": "off",
        "no-trailing-spaces": "off",
        "unicode-bom": "off",
        "@typescript-eslint/eol-last": "off",
        "@typescript-eslint/indent": "off",
        "@typescript-eslint/linebreak-style": "off",
        "@typescript-eslint/no-trailing-spaces": "off",
        "@typescript-eslint/unicode-bom": "off",

        "editorconfig/charset": "error",
        "editorconfig/eol-last": "error",
        "editorconfig/indent": "error",
        "editorconfig/linebreak-style": "error",
        "editorconfig/no-trailing-spaces": "error",
      },
    },
  },
};

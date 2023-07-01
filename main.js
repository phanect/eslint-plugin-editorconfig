"use strict";


const noConflictRules = {
  "eol-last": "off",
  indent: "off",
  "linebreak-style": "off",
  "max-len": "off",
  "no-trailing-spaces": "off",
  "unicode-bom": "off",
  "@typescript-eslint/eol-last": "off",
  "@typescript-eslint/indent": "off",
  "@typescript-eslint/linebreak-style": "off",
  "@typescript-eslint/no-trailing-spaces": "off",
  "@typescript-eslint/unicode-bom": "off",
};


module.exports = {
  rules: {
    charset: require("./lib/rules/charset"),
    "eol-last": require("./lib/rules/eol-last"),
    indent: require("./lib/rules/indent"),
    "linebreak-style": require("./lib/rules/linebreak-style"),
    "max-len": require("./lib/rules/max-len"),
    "no-trailing-spaces": require("./lib/rules/no-trailing-spaces"),
  },
  configs: {
    noconflict: {
      rules: noConflictRules,
    },
    all: {
      rules: {
        ...noConflictRules,

        "editorconfig/charset": "error",
        "editorconfig/eol-last": "error",
        "editorconfig/indent": "error",
        "editorconfig/linebreak-style": "error",
        "editorconfig/max-len": "error",
        "editorconfig/no-trailing-spaces": "error",
      },
    },
  },
};

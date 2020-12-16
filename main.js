"use strict";

module.exports = {
  rules: {
    charset: require("./lib/rules/charset"),
    "eol-last": require("./lib/rules/eol-last"),
    indent: require("./lib/rules/indent"),
    "linebreak-style": require("./lib/rules/linebreak-style"),
    "no-trailing-spaces": require("./lib/rules/no-trailing-spaces"),
  },
  configs: {
    noconflict: {
      rules: {
        "eol-last": "off",
        indent: "off",
        "linebreak-style": "off",
        "no-trailing-spaces": "off",
        "unicode-bom": "off",
      },
    },
    all: {
      rules: {
        "eol-last": "off",
        indent: "off",
        "linebreak-style": "off",
        "no-trailing-spaces": "off",
        "unicode-bom": "off",

        "editorconfig/charset": "error",
        "editorconfig/eol-last": "error",
        "editorconfig/indent": "error",
        "editorconfig/linebreak-style": "error",
        "editorconfig/no-trailing-spaces": "error",
      },
    },
  },
};

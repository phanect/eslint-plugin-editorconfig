"use strict";

module.exports = {
  rules: {
    editorconfig: require("./lib/rules/editorconfig"),
  },
  configs: {
    "editorconfig-noconflict": {
      rules: {
        "eol-last": "off",
        indent: "off",
        "linebreak-style": "off",
        "no-trailing-spaces": "off",
        "unicode-bom": "off",
      },
    },
  },
};

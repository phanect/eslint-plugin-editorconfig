"use strict";

module.exports = {
  root: true,

  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion:  2020,
  },
  plugins: [ "editorconfig" ],
  rules: {
    "unicode-bom": [ "error", "never" ],
    "eol-last": [ "error", "always" ],
    indent: [ "error", 2, {
      SwitchCase: 1,
    }],
    "linebreak-style": [ "error", "unix" ],
    "no-trailing-spaces": [ "error", {
      skipBlankLines: false,
    }],
    "editorconfig/charset": "error",
    "editorconfig/eol-last": "error",
    "editorconfig/indent": "error",
    "editorconfig/linebreak-style": "error",
    "editorconfig/no-trailing-spaces": "error",
  },
};

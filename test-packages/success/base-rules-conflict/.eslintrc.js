"use strict";

module.exports = {
  root: true,
  extends: "plugin:editorconfig/noconflict",

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
    "max-len": [ "error", {
      tabWidth: 2,
    }],
    "no-trailing-spaces": [ "error", {
      skipBlankLines: false,
    }],
    "editorconfig/charset": "error",
    "editorconfig/eol-last": "error",
    "editorconfig/indent": "error",
    "editorconfig/linebreak-style": "error",
    "editorconfig/max-len": "error",
    "editorconfig/no-trailing-spaces": "error",
  },
};

"use strict";

module.exports = {
  root: true,
  extends: "plugin:editorconfig/noconflict",

  env: {
    es6: true,
    node: true,
  },
  plugins: [ "editorconfig" ],
  rules: {
    "editorconfig/charset": "error",
    "editorconfig/eol-last": "error",
    "editorconfig/indent": "error",
    "editorconfig/linebreak-style": "error",
    "editorconfig/no-trailing-spaces": "error",
  },
};

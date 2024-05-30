"use strict";

const { join } = require("node:path");
module.exports = {
  root: true,
  extends: "phanective/node",

  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    project: join(__dirname, "tsconfig.json"),
  },
  ignorePatterns: [ "test-packages/**" ],
  rules: {
    "node/no-unpublished-require": "off",
  },

  overrides: [
    {
      files: [ "tsconfig.json" ],
      rules: {
        "jsonc/no-comments": "off",
      }
    }
  ]
};

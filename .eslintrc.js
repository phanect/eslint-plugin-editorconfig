"use strict";

module.exports = {
  root: true,
  extends: "phanective/node",

  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  ignorePatterns: [
    "test-packages/**",
    "./workspace/src/rules/charset.ts", // ignore until this rule is released again.
  ],
  rules: {
    "node/no-unpublished-require": "off",
  },
};

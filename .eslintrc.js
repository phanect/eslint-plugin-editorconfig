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
  ignorePatterns: [ "test-packages/**" ],
};

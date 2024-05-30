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
  rules: {
    "node/no-unpublished-require": "off",
  },
  overrides: [
    {
      files: [ "examples/flat-config/**/*" ],
      parserOptions: {
        sourceType: "module",
        project: "./examples/flat-config/tsconfig.json",
      },
    },
  ],
};

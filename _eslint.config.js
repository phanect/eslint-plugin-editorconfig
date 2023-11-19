"use strict";

const eslintPluginEditorConfig = require("./main.js");

module.exports = [
  {
    ...eslintPluginEditorConfig.configs.all,
    plugins: { "editorconfig": eslintPluginEditorConfig },
  },
  {
    files: [ "**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.vue" ],
    ignores: [ "test-packages/**" ],

    languageOptions: {
      ecmaVersion: "latest",
      globals: {
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "node/no-unpublished-require": "off",
    },
  }
];

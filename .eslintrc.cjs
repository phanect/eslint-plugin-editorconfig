"use strict";

const { join } = require("node:path");
const deepmerge = require("deepmerge");
const configs = require("eslint-config-phanective/node.json");

delete configs.rules["editorconfig/charset"];
delete configs.rules["editorconfig/eol-last"];
delete configs.rules["editorconfig/indent"];
delete configs.rules["editorconfig/linebreak-style"];
delete configs.rules["editorconfig/no-trailing-spaces"];

module.exports = deepmerge({
  ...configs,
  extends: configs.extends.filter(extended => !extended.startsWith("plugin:editorconfig")),
  plugins: configs.plugins.filter(plugin => plugin !== "editorconfig")
}, {
  root: true,

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
});

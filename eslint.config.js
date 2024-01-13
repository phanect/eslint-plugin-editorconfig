import epec from "./dist/main.mjs";

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  {
    files: [ "*" ],
    ignores: [ "test-packages/**" ],

    languageOptions: {
      ecmaVersion: "latest",
    },
    rules: {
      "node/no-unpublished-require": "off",
    },
  },
  epec.configs.all,
];

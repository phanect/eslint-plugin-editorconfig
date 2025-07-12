import stylistic from "@stylistic/eslint-plugin";
import editorconfig from "eslint-plugin-editorconfig";

/** @type { import("eslint").Linter.Config[] } */
export default [
  {
    files: [ "./**/*" ],

    ...stylistic.configs.recommended,

    rules: {
      // These rules should be overwritten by editorconfig.configs.all
      "@stylistic/eol-last": [ "error", "never" ],
      "@stylistic/indent": [ "error", 4 ],
      "@stylistic/linebreak-style": [ "error", "windows" ],
      "@stylistic/no-trailing-spaces": [ "warn", { "ignoreComments": true }],
    },
  },

  editorconfig.configs.all,
];

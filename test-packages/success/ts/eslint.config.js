import parser from "@typescript-eslint/parser";
// @ts-ignore
import epec from "eslint-plugin-editorconfig";

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  epec.configs.noconflict,
  {
    files: [ "*.js", "*.ts" ],

    languageOptions: {
      parser,
      sourceType: "module",
    },
    plugins: {
      editorconfig: epec,
    },
    rules: {
      "editorconfig/charset": "error",
      "editorconfig/eol-last": "error",
      "editorconfig/indent": "error",
      "editorconfig/linebreak-style": "error",
      "editorconfig/no-trailing-spaces": "error",
    },
  },
];

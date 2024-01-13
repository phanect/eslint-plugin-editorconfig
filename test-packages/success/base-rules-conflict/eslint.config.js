// @ts-ignore
import epec from "eslint-plugin-editorconfig";

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  epec.configs.noconflict,
  {
    files: [ "*.js", "*.ts" ],

    languageOptions: {
      ecmaVersion: 2020,
    },
    plugins: {
      editorconfig: epec,
    },
    rules: {
      "unicode-bom": [ "error", "never" ],
      "eol-last": [ "error", "always" ],
      indent: [ "error", 2, {
        SwitchCase: 1,
      }],
      "linebreak-style": [ "error", "unix" ],
      "no-trailing-spaces": [ "error", {
        skipBlankLines: false,
      }],
      "editorconfig/charset": "error",
      "editorconfig/eol-last": "error",
      "editorconfig/indent": "error",
      "editorconfig/linebreak-style": "error",
      "editorconfig/no-trailing-spaces": "error",
    },
  },
];

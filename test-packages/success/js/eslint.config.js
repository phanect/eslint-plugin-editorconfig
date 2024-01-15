import epec from "eslint-plugin-editorconfig";

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  epec.configs.noconflict,
  {
    files: [ "*.js", "*.ts" ],

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

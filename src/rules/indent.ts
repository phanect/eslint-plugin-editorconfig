"use strict";

const { buildRule } = require("../base");

module.exports = buildRule({
  baseRuleName: "indent",
  description: "Enforce EditorConfig rules for indentation",
  getESLintOption: (ecParams) => {
    if (ecParams.indent_style === "space") {
      return { enabled: true, eslintOption: ecParams.indent_size };
    } else if (ecParams.indent_style === "tab") {
      return { enabled: true, eslintOption: "tab" };
    } else {
      return { enabled: false };
    }
  },
});

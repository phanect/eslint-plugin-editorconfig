"use strict";

const { buildRule } = require("../base");

module.exports = buildRule({
  baseRuleName: "indent",
  description: "Enforce EditorConfig rules for indentation",
  getESLintOption: (ecParams) => {
    if (ecParams.indent_style === "space") {
      if (ecParams.indent_size === 0) {
        return { message: "indent_size = 0 is not supported by this plugin." };
      } else if (!ecParams.indent_size || ecParams.indent_size === "unset") {
        return { message: "When indent_style = space, you have to set indent_size." };
      } else if (isNaN(ecParams.indent_size)) {
        return { message: "indent_size must be a number" };
      } else {
        return { enabled: true, eslintOption: ecParams.indent_size };
      }
    } else if (ecParams.indent_style === "tab") {
      return { enabled: true, eslintOption: "tab" };
    } else {
      return { enabled: false };
    }
  },
});

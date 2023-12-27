"use strict";

const { buildRule } = require("../base");

module.exports = buildRule({
  baseRuleName: "linebreak-style",
  description: "Enforce EditorConfig rules for linebreak style",
  getESLintOption: (ecParams) => {
    if (ecParams.end_of_line === "lf") {
      return { enabled: true, eslintOption: "unix" };
    } else if (ecParams.end_of_line === "crlf") {
      return { enabled: true, eslintOption: "windows" };
    } else {
      return { enabled: false };
    }
  },
});

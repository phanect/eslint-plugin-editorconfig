"use strict";

const { buildRule } = require("../base");

module.exports = buildRule({
  baseRuleName: "unicode-bom",
  description: "Enforce EditorConfig rules for charset",
  getESLintOption: (ecParams) => {
    if (ecParams.charset === "utf-8") {
      return { enabled: true, eslintOption: "never" };
    } else if (ecParams.charset === "utf-8-bom") {
      return { enabled: true, eslintOption: "always" };
    } else {
      return { enabled: false };
    }
  },
});

"use strict";

const { buildRule } = require("../base");

module.exports = buildRule({
  baseRuleName: "no-trailing-spaces",
  description: "Enforce EditorConfig rules for trailing spaces",
  getESLintOption: (ecParams) => ({ enabled: ecParams.trim_trailing_whitespace }),
});

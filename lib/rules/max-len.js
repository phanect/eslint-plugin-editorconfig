"use strict";

const { buildRule } = require("../base");

module.exports = buildRule({
  baseRuleName: "max-len",
  description: "Enforce a maximum line length",
  getESLintOption: ({ indent_size }) => ({ enabled: indent_size != null, eslintOption: [ null, indent_size ]}) });

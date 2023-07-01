"use strict";

const { buildRule } = require("../base");

module.exports = buildRule({
  baseRuleName: "max-len",
  description: "Enforce a maximum line length",
  getESLintOption({ indent_size, max_line_length }) {
    return {
      enabled: max_line_length !== "off",
      eslintOption: [ max_line_length, indent_size ],
    };
  },
});

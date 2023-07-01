"use strict";

const { ok } = require("node:assert/strict");

const { buildRule } = require("../base");

module.exports = buildRule({
  baseRuleName: "max-len",
  description: "Enforce a maximum line length",
  getESLintOption({ indent_size, max_line_length }) {
    ok(
      indent_size == null ||
      (typeof indent_size === "number" && 0 <= indent_size),
      "indent_size must be a number.",
    );
    ok(
      max_line_length == null ||
      max_line_length === "off" ||
      (typeof max_line_length === "number" && 0 <= max_line_length),
      "max_line_length must be a number or 'off'.",
    );

    return {
      enabled: max_line_length !== "off",
      eslintOption: [ max_line_length, indent_size ],
    };
  },
});

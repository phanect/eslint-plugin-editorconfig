"use strict";

const { ok } = require("node:assert/strict");

const { buildRule } = require("../base");

module.exports = buildRule({
  baseRuleName: "max-len",
  description: "Enforce a maximum line length",
  getESLintOption({ indent_size, max_line_length, tab_width }) {
    ok(
      indent_size === undefined ||
      indent_size === "tab" ||
      (typeof indent_size === "number" && 0 <= indent_size),
      "indent_size must be zero or a positive number or 'tab'.",
    );

    ok(
      max_line_length === undefined ||
      max_line_length === "off" ||
      (typeof max_line_length === "number" && 0 <= max_line_length),
      "max_line_length must be zero or a positive number or 'off'.",
    );

    ok(
      tab_width === undefined ||
      (typeof tab_width === "number" && 0 <= tab_width),
      "tab_width must be zero or a positive number.",
    );

    return {
      enabled: max_line_length !== "off",
      eslintOption: [
        max_line_length,
        tab_width ??
          (typeof indent_size === "number") ? indent_size : undefined,
      ],
    };
  },
});

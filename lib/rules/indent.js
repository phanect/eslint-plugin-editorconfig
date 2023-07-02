"use strict";

const { ok } = require("node:assert/strict");

const { buildRule } = require("../base");

module.exports = buildRule({
  baseRuleName: "indent",
  description: "Enforce EditorConfig rules for indentation",
  // HACK: if `tab_width` is `undefined`, use `eslint` default 4 characters.
  getESLintOption: ({ indent_size, indent_style, tab_width = 4 }) => {
    ok(
      indent_size === undefined ||
      indent_size === "tab" ||
      (typeof indent_size === "number" && 0 <= indent_size),
      "indent_size must be zero or a positive number or 'tab'.",
    );

    ok(
      indent_style === undefined ||
      indent_style === "tab" ||
      indent_style === "space",
      "indent_style must be 'tab' or 'space'.",
    );

    ok(
      typeof tab_width === "number" && 0 <= tab_width,
      "tab_width must be zero or a positive number.",
    );

    if (indent_style === "space") {
      return {
        enabled: true,
        eslintOption: (indent_size === "tab") ? tab_width : indent_size,
      };
    } else if (indent_style === "tab") {
      return { enabled: true, eslintOption: "tab" };
    } else {
      return { enabled: false };
    }
  },
});

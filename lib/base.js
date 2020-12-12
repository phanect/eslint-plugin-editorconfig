/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
"use strict";

const editorconfig = require("editorconfig");
const { Linter } = require("eslint");
const { klona } = require("klona/lite");

module.exports.buildRule = ({ baseRuleName, description, omitFirstOption, getESLintOption }) => {
  const baseRule = new Linter().getRules().get(baseRuleName);

  // Remove first option
  if (omitFirstOption !== false) {
    baseRule.meta.schema.shift();
  }

  return {
    meta: {
      ...baseRule.meta,

      docs: {
        ...baseRule.meta.docs,
        description,
        url: "https://github.com/phanect/eslint-plugin-editorconfig",
      },
    },

    create: function(context) {
      const ecParams = editorconfig.parseSync(context.getFilename());
      const { enabled, eslintOption } = getESLintOption(ecParams);
      const _context = klona(context);

      if (eslintOption) {
        _context.options.unshift(eslintOption);
      }

      return enabled ? baseRule.create(_context) : {};
    },
  };
};

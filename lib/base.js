/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
"use strict";

const { rules } = require("@typescript-eslint/eslint-plugin");
const editorconfig = require("editorconfig");
const { Linter } = require("eslint");
const { klona } = require("klona/lite");

module.exports.buildRule = ({ baseRuleName, description, omitFirstOption, getESLintOption }) => {
  const jsBaseRule = new Linter().getRules().get(baseRuleName);
  const tsBaseRule = rules[baseRuleName] ? rules[baseRuleName] : jsBaseRule;

  // Remove first option
  if (omitFirstOption !== false) {
    jsBaseRule.meta.schema.shift();
  }

  return {
    meta: {
      ...jsBaseRule.meta,

      docs: {
        ...jsBaseRule.meta.docs,
        description,
        url: "https://github.com/phanect/eslint-plugin-editorconfig",
      },
    },

    create: function(context) {
      const filename = context.getFilename();
      const ecParams = editorconfig.parseSync(context.getFilename(filename));
      const { enabled, eslintOption } = getESLintOption(ecParams);
      const baseRule = filename.endsWith(".ts") ? tsBaseRule : jsBaseRule;
      const _context = klona(context);

      if (eslintOption) {
        _context.options.unshift(eslintOption);
      }

      return enabled ? baseRule.create(_context) : {};
    },
  };
};

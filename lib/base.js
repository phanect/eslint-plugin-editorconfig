/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
"use strict";
const editorconfig = require("editorconfig");
const { Linter } = require("eslint");
const { klona } = require("klona/lite");

module.exports.buildRule = ({ baseRuleName, description, getESLintOption }) => {
  const jsBaseRule = klona(new Linter().getRules().get(baseRuleName));

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
      const _context = klona(context);

      let baseRule;

      if (filename.endsWith(".ts")) {
        const { rules } = require("@typescript-eslint/eslint-plugin");
        baseRule = rules[baseRuleName] ? klona(rules[baseRuleName]) : jsBaseRule;
      } else {
        baseRule = jsBaseRule;
      }

      if (eslintOption) {
        // Overwrite first option if found in editorconfig
        _context.options[0] = eslintOption
      }


      // Only enable rule when option is specified in .editorconfig or .eslintrc
      return enabled || (enabled !== false && _context.options.length > 0) ? baseRule.create(_context) : {};
    },
  };
};

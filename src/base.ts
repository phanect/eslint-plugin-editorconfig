/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
"use strict";

const editorconfig = require("editorconfig");
const { Linter } = require("eslint");
const { klona } = require("klona/lite");
const { clone } = require("./clone.js");

module.exports.buildRule = ({ baseRuleName, description, omitFirstOption, getESLintOption }) => {
  const jsBaseRule = klona(new Linter().getRules().get(baseRuleName));

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
        url: `https://github.com/phanect/eslint-plugin-editorconfig/blob/main/docs/rules/${baseRuleName}.md`,
      },
    },

    create: function(context) {
      const filename = context.getFilename();
      const ecParams = editorconfig.parseSync(context.getFilename(filename));
      const { enabled, eslintOption } = getESLintOption(ecParams);

      let baseRule;

      if (filename.endsWith(".ts")) {
        try {
          const { rules } = require("@typescript-eslint/eslint-plugin");
          baseRule = rules[baseRuleName] ? klona(rules[baseRuleName]) : jsBaseRule;
        } catch (err) {
          if (err.code === "MODULE_NOT_FOUND") {
            throw new Error("eslint-plugin-editorconfig requires typescript and @typescript-eslint/eslint-plugin to lint *.ts files. Run `npm install typescript @typescript-eslint/eslint-plugin`.");
          } else {
            throw err;
          }
        }
      } else {
        baseRule = jsBaseRule;
      }

      const _context = eslintOption ? clone(context, { options: [ eslintOption, ...context.options ]}) : context;

      return enabled ? baseRule.create(_context) : {};
    },
  };
};

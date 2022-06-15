/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
"use strict";

const editorconfig = require("editorconfig");
const { Linter } = require("eslint");
const { klona } = require("klona/lite");

module.exports.buildRule = ({ baseRuleName, description, omitFirstOption, getESLintOption }) => {
  const jsBaseRule = klona(new Linter().getRules().get(baseRuleName));
  let firstOption;

  // Remove first option
  if (omitFirstOption !== false) {
    firstOption = jsBaseRule.meta.schema.shift();

    if (jsBaseRule.meta.schema[0]) {
      jsBaseRule.meta.schema[0].properties.fallback = firstOption;
    } else {
      jsBaseRule.meta.schema.push({
        type: "object",
        properties: {
          fallback: firstOption,
        },
        additionalProperties: false,
      });
    }
  } else {
    jsBaseRule.meta.schema[0].properties.fallback = {
      type: "boolean",
    };
  }

console.log(JSON.stringify(jsBaseRule.meta, null, 2))

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
      const ecExists = !!ecParams;
      const { enabled, eslintOption } = getESLintOption(ecParams);
      const _context = klona(context);
console.log(ecParams)
console.log("------")
      let baseRule;

      if (filename.endsWith(".ts")) {
        const { rules } = require("@typescript-eslint/eslint-plugin");
        baseRule = rules[baseRuleName] ? klona(rules[baseRuleName]) : jsBaseRule;
      } else {
        baseRule = jsBaseRule;
      }

      if (eslintOption) {
        _context.options.unshift(eslintOption);
      }

      return enabled ? baseRule.create(_context) : {};
    },
  };
};

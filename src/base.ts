/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
import editorconfig from "editorconfig";
import { Linter } from "eslint";
import { klona } from "klona/lite";
import { clone } from "./clone.ts";
import type { BuildRule } from "./types.ts";
import type { Rule } from "eslint";

export const buildRule: BuildRule = ({ baseRuleName, description, omitFirstOption, getESLintOption }) => {
  const jsBaseRule: Rule.RuleModule = klona(new Linter().getRules().get(baseRuleName));

  // Remove first option
  if (omitFirstOption !== false) {
    jsBaseRule.meta.schema.shift();
  }

  return {
    meta: {
      ...jsBaseRule.meta,

      docs: {
        ...jsBaseRule.meta?.docs,
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

          if (!rules?.[baseRuleName]) {
            throw new Error(`Unexpected rule name "${baseRuleName}" not found in @typescript-eslint/eslint-plugin. Sorry, this may be a bug.`);
          }

          baseRule = klona(rules[baseRuleName]);
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

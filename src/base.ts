/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
import editorconfig, { Props } from "editorconfig";
import { Linter } from "eslint";
import { rules as tsLintRules } from "@typescript-eslint/eslint-plugin";
import { klona } from "klona/lite";
import { clone } from "./clone";
import type { Rule } from 'eslint';

type BuildRuleOptions = {
  baseRuleName: string,
  description: string,
  omitFirstOption: boolean,
  getESLintOption: (ecParams: Props) => { enabled: boolean, eslintOption: string | number },
};

export const buildRule = ({ baseRuleName, description, omitFirstOption, getESLintOption }: BuildRuleOptions): Rule.RuleModule => {
  const jsBaseRule = klona(new Linter().getRules().get(baseRuleName));

  if (!jsBaseRule) {
    throw new Error(`Rule "${baseRuleName}" was not found. Sorry, this is probably a bug in eslint-plugin-editorconfig. Please report at https://github.com/phanect/eslint-plugin-editorconfig/issues`);
  }
  if (!jsBaseRule.meta) {
    jsBaseRule.meta = {
      schema: [],
    };
  }
  if (!jsBaseRule.meta.schema) {
    jsBaseRule.meta.schema = [];
  }

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
          baseRule = tsLintRules[baseRuleName] ? klona(tsLintRules[baseRuleName]) : jsBaseRule;
        } catch (err) {
          if (err.code === "MODULE_NOT_FOUND") {
            throw new Error("eslint-plugin-editorconfig requires typescript and @typescript-eslint/eslint-plugin to lint *.ts files. Run `npm install -D typescript @typescript-eslint/eslint-plugin`.");
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

/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
import { camelCase } from "change-case";
import editorconfig from "editorconfig";
import { clone } from "./clone.ts";
import type { BuildRule } from "./types.ts";
import type { Rule } from "eslint";

export const buildRule: BuildRule = async ({ baseRuleName, description, omitFirstOption, getESLintOption }) => {
  let jsBaseRule: Rule.RuleModule;
  let tsBaseRule: Rule.RuleModule;

  try {
    jsBaseRule = (await import(`@stylistic/eslint-plugin-js/rules/${baseRuleName}`))[camelCase(baseRuleName)];

    if (!jsBaseRule) {
      const err: NodeJS.ErrnoException = new Error();
      err.code = "ERR_INVALID_RULE_NAME";
      throw err;
    }
  } catch (err) {
    if (
      err.code === "MODULE_NOT_FOUND" ||
      err.code === "ERR_PACKAGE_PATH_NOT_EXPORTED" ||
      err.code === "ERR_INVALID_RULE_NAME"
    ) {
      throw new Error(`Could not import rule "${baseRuleName}" from @stylistic/eslint-plugin-js. This may be a bug of eslint-plugin-editorconfig. Sorry for the inconvenience.`);
    } else {
      throw err;
    }
  }

  try {
    tsBaseRule = (await import(`@stylistic/eslint-plugin-ts/rules/${baseRuleName}`)).default;

    if (!tsBaseRule) {
      const err: NodeJS.ErrnoException = new Error();
      err.code = "ERR_INVALID_RULE_NAME";
      throw err;
    }
  } catch (err) {
    if (
      err.code === "MODULE_NOT_FOUND" ||
      err.code === "ERR_PACKAGE_PATH_NOT_EXPORTED" ||
      err.code === "ERR_INVALID_RULE_NAME"
    ) {
      throw new Error(`Could not import rule "${baseRuleName}" from @stylistic/eslint-plugin-ts. This may be a bug of eslint-plugin-editorconfig. Sorry for the inconvenience.`);
    } else {
      throw err;
    }
  }

  // Remove first option
  if (omitFirstOption !== false) {
    jsBaseRule.meta?.schema?.shift();
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
      const baseRule = filename.endsWith(".ts") ? tsBaseRule : jsBaseRule;
      const _context = eslintOption ? clone(context, { options: [ eslintOption, ...context.options ]}) : context;

      return enabled ? baseRule.create(_context) : {};
    },
  };
};

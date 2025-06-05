import editorconfig, { type Props as EditorConfigProps } from "editorconfig";
import { isNodeJsError } from "../utils.ts";
import type { Rule } from "eslint";
import { eolLast as jsBaseRule } from "@stylistic/eslint-plugin-js/rules/eol-last";

const baseRuleName = "eol-last";
const getESLintOption = (ecParams: EditorConfigProps) => {
  if (ecParams.insert_final_newline === true) {
    return { enabled: true, eslintOption: "always" };
  } else if (ecParams.insert_final_newline === false) {
    return { enabled: true, eslintOption: "never" };
  } else {
    return { enabled: false };
  }
};

try {
  if (!jsBaseRule) {
    const err: NodeJS.ErrnoException = new Error(undefined, { cause: "ERR_INVALID_RULE_NAME" });
    throw err;
  }
} catch (err) {
  if (
    isNodeJsError(err) && (
      err.code === "MODULE_NOT_FOUND" ||
      err.code === "ERR_PACKAGE_PATH_NOT_EXPORTED" ||
      err.cause === "ERR_INVALID_RULE_NAME"
    )
  ) {
    throw new Error(`Could not import rule "${baseRuleName}" from @stylistic/eslint-plugin-js. This may be a bug of eslint-plugin-editorconfig. Sorry for the inconvenience.`);
  } else {
    throw err;
  }
}

// Remove first option
jsBaseRule.meta?.schema?.shift();

const ruleModule: Rule.RuleModule = {
  meta: {
    ...jsBaseRule.meta,

    docs: {
      ...jsBaseRule.meta?.docs,
      description: "Enforce EditorConfig rules for the newlines at the end of files",
      url: `https://github.com/phanect/eslint-plugin-editorconfig/blob/main/docs/rules/${baseRuleName}.md`,
    },
  },

  create(context) {
    const ecParams = editorconfig.parseSync(context.filename);
    const { enabled, eslintOption } = getESLintOption(ecParams);
    const _context = eslintOption ? clone(context, { options: [ eslintOption, ...context.options ]}) : context;

    return enabled ? jsBaseRule.create(_context) : {};
  },
};

export default ruleModule;

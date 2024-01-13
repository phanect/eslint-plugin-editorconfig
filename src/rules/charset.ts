import editorconfig from "editorconfig";
import { Linter, type Rule } from "eslint";
import { klona } from "klona/lite";
import { clone } from "../clone.js";

const getESLintOption = (fileName: string) => {
  const ecParams = editorconfig.parseSync(fileName);

  if (ecParams.charset === "utf-8") {
    return { enabled: true, eslintOption: "never" };
  } else if (ecParams.charset === "utf-8-bom") {
    return { enabled: true, eslintOption: "always" };
  } else {
    return { enabled: false };
  }
};

const baseRuleName = "unicode-bom";
const baseRule: Rule.RuleModule | undefined = klona(new Linter().getRules().get(baseRuleName));

if (!baseRule?.meta) {
  throw new Error("Could not get `meta` information from ESLint. This is probably a bug of eslint-plugin-editorconfig. Sorry for inconvenience.")
}

// Remove first option
baseRule.meta.schema?.shift();

const rule: Rule.RuleModule = {
  meta: {
    ...baseRule.meta,

    docs: {
      ...baseRule.meta.docs,
      description: "Enforce EditorConfig rules for charset",
      url: `https://github.com/phanect/eslint-plugin-editorconfig/blob/main/docs/rules/${baseRuleName}.md`,
    },
  },

  create(context) {
    const { enabled, eslintOption } = getESLintOption(context.filename);
    const _context = eslintOption ? clone(context, { options: [ eslintOption, ...context.options ]}) : context;

    return enabled ? baseRule.create(_context) : {};
  },
};

export default rule;

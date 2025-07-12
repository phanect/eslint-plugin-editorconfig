import deepmerge from "deepmerge";
import editorconfig, { type Props } from "editorconfig";
import { getLastElementOf } from "@phanect/utils";
import type { Rule } from "eslint";
import type { JSONSchema4 } from "json-schema";

type BuildRuleOptions = {
  baseRule: Rule.RuleModule;
  baseRuleName: string;
  description: string;
  omitFirstOption?: boolean;
  getESLintOption: (ecParams: Props) => { enabled: boolean; eslintOption?: string | number; };
};

export const buildRule = async ({
  baseRule,
  baseRuleName,
  description,
  omitFirstOption = true,
  getESLintOption,
}: BuildRuleOptions): Promise<Rule.RuleModule> => {
  if (!baseRule) {
    throw new Error(`Could not import rule "${ baseRuleName }". Sorry, this is probably a bug in eslint-plugin-editorconfig.`, {
      cause: "ERR_INVALID_RULE_NAME",
    });
  }

  const meta = structuredClone(baseRule.meta);

  if (!meta?.schema) {
    throw new Error(`meta.schema is not defined in ${ baseRuleName }. Sorry, this is probably a bug of eslint-plugin-editorconfig.`);
  }
  if (!Array.isArray(meta.schema)) {
    throw new Error(`meta.schema is not an array in ${ baseRuleName }. Sorry, this is probably a bug of eslint-plugin-editorconfig.`);
  }

  if (omitFirstOption === true) {
    // Remove first option
    meta.schema.shift();
  }

  const lastSchema: JSONSchema4 | undefined = !meta?.schema ? undefined
    : Array.isArray(meta.schema) ? getLastElementOf(meta.schema)
      : meta.schema;

  if (lastSchema) {
    meta.schema.push({
      type: "object",
      properties: {
        fallback: lastSchema,
      },
    });
  }

  return {
    meta: deepmerge(baseRule.meta ?? {}, {
      docs: {
        description,
        url: `https://github.com/phanect/eslint-plugin-editorconfig/blob/main/docs/rules/${ baseRuleName }.md`,
      },
    }),

    create: function(context) {
      const ecParams = editorconfig.parseSync(context.filename);
      const { enabled, eslintOption } = getESLintOption(ecParams);

      context.options[0] = eslintOption;

      return enabled ? baseRule.create(context) : {};
    },
  };
};

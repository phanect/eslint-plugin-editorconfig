import { camelCase } from "change-case";
import editorconfig, { type Props } from "editorconfig";
import { isNodeJsError, arr } from "./utils.ts";
import type { Rule } from "eslint";
import type { JSONSchema4 } from "json-schema";
import deepmerge from "deepmerge";
import { getLastElementOf } from "@phanect/utils";
import type { BaseRuleName } from "./types.ts";

type Fallback = "useFirstOption" | [ "on", "off" ];
// type BuildFallbackSchemaOptions = { baseRuleName: BaseRuleName, fallback: Fallback };

// const buildFallbackSchema = (
//   originalSchema: JSONSchema4[],
//   { baseRuleName, fallback }: BuildFallbackSchemaOptions
// ): JSONSchema4 => {
//   if (fallback === "useFirstOption") {
//     if (originalSchema[0] === undefined) {
//       throw new Error(`Could not retrieve the first option from meta.schema of ${baseRuleName}. Sorry, this is probably a bug of eslint-plugin-editorconfig.`);
//     }

//     return {
//       ...originalSchema[0],
//       enum: [
//         ...(originalSchema[0].enum ?? []),
//         "off",
//       ],
//     };
//   } else if (originalSchema.length === 1 && originalSchema[0].type === "object" && originalSchema[0]?.properties?.fallback) {
//     return {
//       ...originalSchema[0],
//       enum: [
//         ...(fallbackSchema.enum ?? []),
//         "off",
//       ],
//     }
//   } else {
//     {}
//   }
// };

type BuildRuleOptions = {
  baseRule: Rule.RuleModule,
  baseRuleName: BaseRuleName;
  description: string;
  omitFirstOption?: boolean;
  fallbackSchema: JSONSchema4;
  useTsRule: boolean;
  getESLintOption: (ecParams: Props) => { enabled: boolean, eslintOption?: string | number };
};

export const buildRule = async ({ baseRule, baseRuleName, description, omitFirstOption = true, fallbackSchema, useTsRule, getESLintOption }: BuildRuleOptions): Promise<Rule.RuleModule> => {
  let jsBaseRule: Rule.RuleModule;
  let tsBaseRule: Rule.RuleModule;

  try {
    jsBaseRule = (await import(`@stylistic/eslint-plugin-js/rules/${baseRuleName}`))[camelCase(baseRuleName)];

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

  try {
    if (useTsRule === true) {
      tsBaseRule = (await import(`@stylistic/eslint-plugin-ts/rules/${baseRuleName}`)).default;

      if (!tsBaseRule) {
        const err: NodeJS.ErrnoException = new Error(undefined, { cause: "ERR_INVALID_RULE_NAME" });
        throw err;
      }
    }
  } catch (err) {
    if (
      isNodeJsError(err) && (
        err.code === "MODULE_NOT_FOUND" ||
        err.code === "ERR_PACKAGE_PATH_NOT_EXPORTED" ||
        err.cause === "ERR_INVALID_RULE_NAME"
      )
    ) {
      throw new Error(`Could not import rule "${baseRuleName}" from @stylistic/eslint-plugin-ts. This may be a bug of eslint-plugin-editorconfig. Sorry for the inconvenience.`);
    } else {
      throw err;
    }
  }

  const meta = structuredClone(jsBaseRule.meta);

  if (!meta?.schema) {
    throw new Error(`meta.schema is not defined in ${baseRuleName}. Sorry, this is probably a bug of eslint-plugin-editorconfig.`);
  }
  if (!Array.isArray(meta.schema)) {
    throw new Error(`meta.schema is not an array in ${baseRuleName}. Sorry, this is probably a bug of eslint-plugin-editorconfig.`);
  }

  if (omitFirstOption === true) {
    // Remove first option
    meta.schema.shift();
  }

  if (meta.schema.length <= 0) {
    meta.schema = [{
      type: "object",
      properties: {
        fallback: fallbackSchema,
      },
    }];
  } else if (lastSchema?.type === "object" && lastSchema.properties?.fallback) {
    lastSchema.properties.fallback = fallbackSchema;
  }

  return {
    meta: deepmerge(jsBaseRule.meta ?? {}, {
      schema: [
      ],

      docs: {
        description,
        url: `https://github.com/phanect/eslint-plugin-editorconfig/blob/main/docs/rules/${baseRuleName}.md`,
      },
    }),

    create: function(context) {
      const ecParams = editorconfig.parseSync(context.filename);
      const { enabled, eslintOption } = getESLintOption(ecParams);
      const baseRule = context.filename.endsWith(".ts") && useTsRule ? tsBaseRule : jsBaseRule;
      const _context: Rule.RuleContext = eslintOption
        ? Object.create(context, {
          options: {
            writable: false,
            configurable: false,
            value: {
              options: [
                eslintOption,
                ...context.options
              ]
            },
          },
        }) : context;

      return enabled ? baseRule.create(_context) : {};
    },
  };
};

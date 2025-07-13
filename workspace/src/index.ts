import editorConfigEngine, { type Props as EditorConfigProps } from "editorconfig";
import type { Linter } from "eslint";
import type { ESLintRules } from "eslint/rules";
import type { UnprefixedRuleOptions } from "@stylistic/eslint-plugin/rule-options";

type RuleOptions = {
  "unicode-bom": [ Exclude<ESLintRules["unicode-bom"], number | string>[1] ];
  "eol-last": UnprefixedRuleOptions["eol-last"];
  indent: UnprefixedRuleOptions["indent"];
  "jsx-indent-props": UnprefixedRuleOptions["jsx-indent-props"];
  "linebreak-style": UnprefixedRuleOptions["linebreak-style"];
  "no-trailing-spaces": UnprefixedRuleOptions["no-trailing-spaces"];
};

type ConvertibleESLintParam<ESLintRuleName extends keyof RuleOptions>
  = ESLintRuleName extends "no-trailing-spaces" ? never : RuleOptions[ESLintRuleName][0];

type ESLintOptions<ESLintRuleName extends keyof RuleOptions>
  = ESLintRuleName extends "no-trailing-spaces" ? RuleOptions[ESLintRuleName][0]
    : RuleOptions[ESLintRuleName][1] extends never ? never
      : RuleOptions[ESLintRuleName][1];

type ESLintRuleEntry<ESLintRuleName extends keyof RuleOptions>
  = Linter.RuleEntry<RuleOptions[ESLintRuleName]>;

const getEolLastEntry = ({ severity, ecParam, default: defaultParam }: {
  severity: Linter.StringSeverity;
  ecParam: EditorConfigProps["insert_final_newline"];
  default?: ConvertibleESLintParam<"eol-last">;
}): ESLintRuleEntry<"eol-last"> => {
  if (ecParam === true) {
    return [ severity, "always" ];
  } else if (ecParam === false) {
    return [ severity, "never" ];
  } else if (ecParam === undefined) {
    if (defaultParam) {
      return [ severity, defaultParam ];
    } else {
      return [ "off" ];
    }
  } else if (ecParam === "unset") {
    return "off";
  } else {
    throw new Error(`Unexpected value ${ ecParam } is set to insert_final_newline.`);
  }
};

const getIndentEntry = ({
  severity,
  ecParams: {
    indentStyle,
    indentSize,
  },
  default: defaultParam,
  options = {},
}: {
  severity: Linter.StringSeverity;
  ecParams: {
    indentStyle: EditorConfigProps["indent_style"];
    indentSize: EditorConfigProps["indent_size"];
  };
  default?: ConvertibleESLintParam<"indent">;
  options?: ESLintOptions<"indent">;
}): ESLintRuleEntry<"indent"> => {
  if (indentStyle === "space" && typeof indentSize === "number") {
    return [ severity, indentSize, options ];
  } else if (indentStyle === "tab") {
    return [ severity, "tab", options ];
  } else if (indentStyle === undefined && indentSize === undefined) {
    if (defaultParam) {
      return [ severity, defaultParam, options ];
    } else {
      return "off";
    }
  } else if (indentStyle === "unset" || indentSize === "unset") {
    return "off";
  } else {
    if (indentStyle === "space" && !indentSize) {
      throw new Error("indent_size is required but not set. Please set any number to indent_size in your .editorconfig.");
    } else { // if (ecParams.indent_size === "tab" || ecParams.indent_size === "unset")
      throw new Error(`indent_style (${ indentStyle }) and indent_size (${ indentSize }) are mismatched in your .editorconfig.`);
    }
  }
};

const getLinebreakStyleEntry = ({ severity, ecParam, default: defaultParam }: {
  severity: Linter.StringSeverity;
  ecParam: EditorConfigProps["end_of_line"];
  default?: ConvertibleESLintParam<"linebreak-style">;
}): ESLintRuleEntry<"linebreak-style"> => {
  if (ecParam === "lf") {
    return [ severity, "unix" ];
  } else if (ecParam === "crlf") {
    return [ severity, "windows" ];
  } else if (ecParam === undefined) {
    if (defaultParam) {
      return [ severity, defaultParam ];
    } else {
      return "off";
    }
  } else if (ecParam === "unset") {
    return "off";
  } else {
    throw new Error(`Unexpected value ${ ecParam } is set to end_of_line.`);
  }
};

const getNoTrailingSpacesEntry = ({ severity, ecParam, default: defaultParam, options = {}}: {
  severity: Linter.StringSeverity;
  ecParam: EditorConfigProps["trim_trailing_whitespace"];
  default?: "enabled" | "disabled";
  options?: ESLintOptions<"no-trailing-spaces">;
}): ESLintRuleEntry<"no-trailing-spaces"> => {
  if (ecParam === true) {
    return [ severity, options ];
  } else if (ecParam === false || ecParam === "unset") {
    return "off";
  } else if (ecParam === undefined) {
    return [ defaultParam === "enabled" ? severity : "off" ];
  } else {
    throw new Error(`Unexpected value ${ ecParam } is set to trim_trailing_whitespace in your .editorconfig.`);
  }
};

type UserConfigs = {
  "unicode-bom"?: [ Linter.StringSeverity, { default?: RuleOptions["unicode-bom"][0]; }? ];
  "eol-last"?: [ Linter.StringSeverity, { default?: RuleOptions["eol-last"][0]; }? ];
  indent?: [
    Linter.StringSeverity,
    {
      default?: RuleOptions["indent"][0];
      options?: RuleOptions["indent"][1];
    }?,
  ];
  "linebreak-style"?: [ Linter.StringSeverity, { default?: RuleOptions["linebreak-style"][0]; }? ];
  "no-trailing-spaces"?: [ Linter.StringSeverity, {
    default: "enabled" | "disabled";
    options?: RuleOptions["no-trailing-spaces"][0];
  }? ];
};

export const editorconfig = async (configPath: string, {
  "eol-last": eolLast = [ "error" ],
  indent = [ "error" ],
  "linebreak-style": linebreakStyle = [ "error" ],
  "no-trailing-spaces": noTrailingSpaces = [ "error" ],
}: UserConfigs = {}): Promise<Linter.Config> => {
  const ecParams = await editorConfigEngine.parse(configPath);

  return {
    files: [
      "**/*.js", "**/*.mjs", "**/*.cjs",
      "**/*.ts", "**/*.mts", "**/*.cts",
      "**/*.jsx", "**/*.tsx",
      // TODO
      // "**/*.vue", "**/*.svelte", "**/*.astro",
      // "**/*.json", "**/*.jsonc", "**/*.json5",
      // "**/*.css", "**/*.scss", "**/*.sass", "**/*.less", "**/*.postcss",
    ],
    rules: {
      "@stylistic/eol-last": getEolLastEntry({
        severity: eolLast[0],
        ecParam: ecParams.insert_final_newline,
        default: eolLast[1]?.default,
      }),
      "@stylistic/indent": getIndentEntry({
        severity: indent[0],
        ecParams: {
          indentStyle: ecParams.indent_style,
          indentSize: ecParams.indent_size,
        },
        default: indent[1]?.default,
        options: indent[1]?.options,
      }),
      "@stylistic/linebreak-style": getLinebreakStyleEntry({
        severity: linebreakStyle[0],
        ecParam: ecParams.end_of_line,
        default: linebreakStyle[1]?.default,
      }),
      "@stylistic/no-trailing-spaces": getNoTrailingSpacesEntry({
        severity: noTrailingSpaces[0],
        ecParam: ecParams.trim_trailing_whitespace,
        default: noTrailingSpaces[1]?.default,
        options: noTrailingSpaces[1]?.options,
      }),
    },
  };
};

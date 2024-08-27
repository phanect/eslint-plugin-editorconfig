import deepmerge from "deepmerge";
import charset from "./rules/charset.ts";
import eolLast from "./rules/eol-last.ts";
import indent from "./rules/indent.ts";
import lineBreakStyle from "./rules/linebreak-style.ts";
import noTrailingSpaces from "./rules/no-trailing-spaces.ts";
import { name, version } from "../package.json";
import stylistic, { type RuleOptions } from "@stylistic/eslint-plugin";
import type { ESLint, Linter } from "eslint";
import type { ESLintRules } from "eslint/rules";

const conflictingRules: Linter.RulesRecord = {
  // Disable built-in rules from ESLint 8.x
  "eol-last": "off",
  indent: "off",
  "linebreak-style": "off",
  "no-trailing-spaces": "off",
  "unicode-bom": "off",

  // Disable a built-in rule from TypeScript-ESLint 6.x
  "@typescript-eslint/indent": "off",

  // Disable rules from ESLint Stylistic
  "@stylistic/js/eol-last": "off",
  "@stylistic/js/indent": "off",
  "@stylistic/ts/indent": "off",
  "@stylistic/js/linebreak-style": "off",
  "@stylistic/js/no-trailing-spaces": "off",
  "@stylistic/js/unicode-bom": "off",
};
stylistic.default.rules.indent.meta?.schema

type RuleSeverities = {
  "unicode-bom"?: Linter.RuleSeverity | [
    Linter.RuleSeverity,
    { fallback?: "never" | "always" },
  ],
  "eol-last"?: Linter.RuleSeverity | [
    Linter.RuleSeverity,
    { fallback?: Omit<RuleOptions["@stylistic/eol-last"][0], "unix" | "windows"> },
  ],
  "indent"?: Linter.RuleSeverity | [
    Linter.RuleSeverity,
    RuleOptions["@stylistic/indent"][1] & { fallback?: RuleOptions["@stylistic/indent"][0] | "off" },
  ],
  "linebreak-style"?: Linter.RuleSeverity | [
    Linter.RuleSeverity,
    { fallback?: RuleOptions["@stylistic/linebreak-style"][0] },
  ],
  "no-trailing-spaces"?: Linter.RuleSeverity | [
    Linter.RuleSeverity,
    RuleOptions["@stylistic/no-trailing-spaces"][0] & { fallback?: "enabled" | "off" },
  ],
};

const plugin = (severities?: RuleSeverities): Linter.Config => {
  const [ unicodeBomSeverity, { fallback: unicodeBomFallback }] = Array.isArray(severities?.["unicode-bom"]) ?
    severities?.["unicode-bom"] :
    [ severities?.["unicode-bom"] ?? "error", {}];
  const [ eolLastSeverity, { fallback: eolLastFallback }] = Array.isArray(severities?.["eol-last"]) ?
    severities?.["eol-last"] :
    [ severities?.["eol-last"] ?? "error", {}];
  const [ indentSeverity, { fallback: indentFallback, ...indentOptions } ] = Array.isArray(severities?.["indent"]) ?
    severities["indent"] :
    [ severities?.["indent"] ?? "error", {}];
  const [ lineBreakStyleSeverity, { fallback: lineBreakStyleFallback } ] = Array.isArray(severities?.["linebreak-style"]) ?
    severities["linebreak-style"] :
    [ severities?.["linebreak-style"] ?? "error", {}];
  const [ noTrailingSpacesSeverity, { fallback: noTrailingSpacesFallback, ...noTrailingSpacesOptions }] = Array.isArray(severities?.["no-trailing-spaces"]) ?
    severities["no-trailing-spaces"] :
    [ severities?.["no-trailing-spaces"] ?? "error", {}];

  const config: Linter.Config = {
    files: [ "*.js", "*.mjs", "*.cjs", "*.ts", "*.jsx", "*.tsx", "*.vue", "*.svelte", "*.astro" ],
    plugins: {
      stylisticForEditorConfig: stylistic,
    },
    rules: {
      "unicode-bom": [ unicodeBomSeverity, "TODO_always_or_never" ?? unicodeBomFallback ],
      "stylisticForEditorConfig/eol-last": [ eolLastSeverity, "TODO_always_or_never" ?? eolLastFallback ],
      "stylisticForEditorConfig/indent": [ indentSeverity, "TODO_tab_or_number" ?? indentFallback, indentOptions ],
      "stylisticForEditorConfig/linebreak-style": [ lineBreakStyleSeverity, "TODO_unix_OR_windows" ?? lineBreakStyleFallback ],
      "stylisticForEditorConfig/no-trailing-spaces": [ noTrailingSpacesSeverity ? ("TODO_noTrailingSpacesSeverity_OR_off" ?? (noTrailingSpacesFallback === "enabled" ? "error" : noTrailingSpacesFallback)) : "off", noTrailingSpacesOptions],
    }
  };

  return config;
}

export default plugin;

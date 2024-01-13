import type { Props } from "editorconfig";
import type { Rule } from "eslint";

type BuildRuleOptions = {
  baseRuleName: "unicode-bom" | "eol-last" | "indent" | "linebreak-style" | "no-trailing-spaces";
  description: string;
  omitFirstOption?: boolean;
  useTsRule: boolean;
  getESLintOption: (ecParams: Props) => { enabled: boolean, eslintOption?: string | number };
}
export type BuildRule = ({ baseRuleName, description, omitFirstOption, useTsRule, getESLintOption }: BuildRuleOptions) => Promise<Rule.RuleModule>;

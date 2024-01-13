import { buildRule } from "../base.js";

export default await buildRule({
  baseRuleName: "no-trailing-spaces",
  description: "Enforce EditorConfig rules for trailing spaces",
  omitFirstOption: false,
  useTsRule: false,
  getESLintOption: (ecParams) => ({ enabled: !!ecParams.trim_trailing_whitespace }),
});

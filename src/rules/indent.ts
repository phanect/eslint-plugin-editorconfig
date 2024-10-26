import stylistic from "@stylistic/eslint-plugin";
import { buildRule } from "../base.ts";

export default await buildRule({
  baseRule: stylistic.rules.indent,
  baseRuleName: "indent",
  description: "Enforce EditorConfig rules for indentation",
  getESLintOption: (ecParams) => {
    if (ecParams.indent_style === "space") {
      if (typeof ecParams.indent_size !== "number") {
        console.warn("Sorry, `indent_size` only supports number currently.");
        return { enabled: false };
      }

      return { enabled: true, eslintOption: ecParams.indent_size };
    } else if (ecParams.indent_style === "tab") {
      return { enabled: true, eslintOption: "tab" };
    } else {
      return { enabled: false };
    }
  },
});

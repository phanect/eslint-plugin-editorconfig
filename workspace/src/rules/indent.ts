import stylistic from "@stylistic/eslint-plugin";
import { buildRule } from "../base.ts";

export default await buildRule({
  baseRule: stylistic.rules.indent,
  baseRuleName: "indent",
  description: "Enforce EditorConfig rules for indentation",
  getESLintOption: ({ indent_style: indentStyle, indent_size: indentSize }) => {
    if (indentStyle === "space") {
      if (typeof indentSize !== "number") {
        console.warn("Sorry, `indent_size` only supports number currently.");
        return { enabled: false };
      }

      return { enabled: true, eslintOption: indentSize };
    } else if (indentStyle === "tab") {
      return { enabled: true, eslintOption: "tab" };
    } else {
      return { enabled: false };
    }
  },
});

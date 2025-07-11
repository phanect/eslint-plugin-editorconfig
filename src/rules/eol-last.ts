import stylistic from "@stylistic/eslint-plugin";
import { buildRule } from "../base.ts";

export default await buildRule({
  baseRule: stylistic.rules["eol-last"],
  baseRuleName: "eol-last",
  description: "Enforce EditorConfig rules for the newlines at the end of files",
  getESLintOption: ({ insert_final_newline: insertFinalNewLine }) => {
    if (insertFinalNewLine === true) {
      return { enabled: true, eslintOption: "always" };
    } else if (insertFinalNewLine === false) {
      return { enabled: true, eslintOption: "never" };
    } else {
      return { enabled: false };
    }
  },
});

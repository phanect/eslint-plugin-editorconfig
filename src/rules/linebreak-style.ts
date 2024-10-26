import stylistic from "@stylistic/eslint-plugin";
import { buildRule } from "../base.ts";

export default await buildRule({
  baseRule: stylistic.rules["linebreak-style"],
  baseRuleName: "linebreak-style",
  description: "Enforce EditorConfig rules for linebreak style",
  getESLintOption: (ecParams) => {
    if (ecParams.end_of_line === "lf") {
      return { enabled: true, eslintOption: "unix" };
    } else if (ecParams.end_of_line === "crlf") {
      return { enabled: true, eslintOption: "windows" };
    } else {
      return { enabled: false };
    }
  },
});

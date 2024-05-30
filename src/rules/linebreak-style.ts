import { buildRule } from "../base";

export const linebreakStyle = buildRule({
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

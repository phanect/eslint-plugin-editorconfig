import type { Props as EditorConfigProps } from "editorconfig";
import { buildRule } from "../base.js";

type ESLintOption = {
  enabled: true,
  eslintOption: "always" | "never",
} | {
  enabled: false,
  eslintOption?: undefined,
};

export default buildRule({
  baseRuleName: "unicode-bom",
  description: "Enforce EditorConfig rules for charset",
  getESLintOption: (ecParams: EditorConfigProps): ESLintOption => {
    if (ecParams.charset === "utf-8") {
      return { enabled: true, eslintOption: "never" };
    } else if (ecParams.charset === "utf-8-bom") {
      return { enabled: true, eslintOption: "always" };
    } else {
      return { enabled: false };
    }
  },
});

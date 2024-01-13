import { getLastElementOf } from "@phanect/utils";
import { eolLast } from "@stylistic/eslint-plugin-js/rules/eol-last";
import { buildRule } from "../base.ts";

const lastSchema: JSONSchema4 | undefined = getLastElementOf(Array.isArray(eolLast.meta?.schema) ? eolLast.meta.schema : [ eolLast.meta?.schema ?? ...[]]);

export default await buildRule({
  baseRuleName: "eol-last",
  description: "Enforce EditorConfig rules for the newlines at the end of files",
  useTsRule: false,
  getESLintOption: (ecParams) => {
    if (ecParams.insert_final_newline === true) {
      return { enabled: true, eslintOption: "always" };
    } else if (ecParams.insert_final_newline === false) {
      return { enabled: true, eslintOption: "never" };
    } else {
      return { enabled: false };
    }
  },
});

import { join } from "node:path";
import { RuleTester } from "eslint";
import tsParser from "@typescript-eslint/parser";

export const ruleTesterTs = new RuleTester({
  languageOptions: {
    parser: tsParser,
  },
});
export const ruleTesterJs = new RuleTester();

export const commonValidTsTests = [
  {
    filename: join(import.meta.dirname, "configs/default/target.ts"),
    code: `'use strict';
const foo: number = 0;
`,
  },
];

export const commonValidJsTests = [
  {
    filename: join(import.meta.dirname, "configs/default/target.js"),
    code: `'use strict';
const foo = 0;
`,
  },
];

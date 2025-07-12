import { join } from "node:path";
import { ruleTesterTs, ruleTesterJs, commonValidTsTests, commonValidJsTests } from "./shared.ts";
import eolLast from "../src/rules/eol-last.ts";

ruleTesterTs.run("editorconfig/eol-last (typescript)", eolLast, {
  valid: commonValidTsTests,
  invalid: [{
    filename: join(import.meta.dirname, "./configs/default/target.ts"),
    code: `'use strict';
const foo: number = 0;`,
    output: `'use strict';
const foo: number = 0;
`,
    errors: [{
      message: "Newline required at end of file but not found.",
      line: 2,
    }],
  }],
});

ruleTesterJs.run("editorconfig/eol-last (javascript)", eolLast, {
  valid: commonValidJsTests,
  invalid: [{
    filename: join(import.meta.dirname, "./configs/default/target.js"),
    code: `'use strict';
const foo = 0;`,
    output: `'use strict';
const foo = 0;
`,
    errors: [{
      message: "Newline required at end of file but not found.",
      line: 2,
    }],
  }],
});

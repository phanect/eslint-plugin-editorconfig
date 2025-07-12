import { join } from "node:path";
import { ruleTesterTs, ruleTesterJs, commonValidTsTests, commonValidJsTests } from "./shared.ts";
import linebreakStyle from "../src/rules/linebreak-style.ts";

ruleTesterTs.run("editorconfig/linebreak-style (typescript)", linebreakStyle, {
  valid: commonValidTsTests,
  invalid: [{
    filename: join(import.meta.dirname, "./configs/default/target.ts"),
    code: "'use strict';\r\nconst foo: number = 0;\n",
    output: "'use strict';\nconst foo: number = 0;\n",
    errors: [{
      message: "Expected linebreaks to be 'LF' but found 'CRLF'.",
      line: 1,
    }],
  }],
});

ruleTesterJs.run("editorconfig/linebreak-style (javascript)", linebreakStyle, {
  valid: commonValidJsTests,
  invalid: [{
    filename: join(import.meta.dirname, "./configs/default/target.js"),
    code: "'use strict';\r\nconst foo = 0;\n",
    output: "'use strict';\nconst foo = 0;\n",
    errors: [{
      message: "Expected linebreaks to be 'LF' but found 'CRLF'.",
      line: 1,
    }],
  }],
});

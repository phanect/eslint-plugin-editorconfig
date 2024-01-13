// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { RuleTester, type Rule } from "eslint";
import parser from "@typescript-eslint/parser";
import epec from "../src/main.js";


// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const {
  charset,
  "eol-last": eolLast,
  indent,
  "linebreak-style": linebreakStyle,
  "no-trailing-spaces": noTrailingSpaces
} = epec.rules as Record<string, Rule.RuleModule>;

const ruleTester = new RuleTester({
  languageOptions: {
    parser,
    ecmaVersion: 2019,
  },
});

const commonValidTests = [
  {
    filename: join(__dirname, "../../configs/default/target.ts"),
    code: `'use strict';
const foo: number = 0;
`,
  },
];

ruleTester.run("editorconfig/charset (typescript)", charset, {
  valid: commonValidTests,
  invalid: [], // TODO
});

ruleTester.run("editorconfig/eol-last (typescript)", eolLast, {
  valid: commonValidTests,
  invalid: [{
    filename: join(__dirname, "../../configs/default/target.ts"),
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

ruleTester.run("editorconfig/indent (typescript)", indent, {
  valid: [
    ...commonValidTests,
    {
      // Passing Options (indent)
      filename: join(__dirname, "../../configs/default/target.ts"),
      options: [{ VariableDeclarator: { var: 2, let: 2, const: 3 }}],
      code: `'use strict';
const foo: string = 'foo',
      bar: string = 'bar',
      hoge: { fuga: string } = {
        fuga: 'fuga',
      };
let a: string = 'a',
    b: string = 'b',
    c: { d: string } = {
      d: 'd',
    };
var e: string = 'e',
    s: string = 's',
    l: { i: string, n: string, t: string } = {
      i: 'i',
      n: 'n',
      t: 't',
    };
`,
    },
  ],
  invalid: [
    {
      filename: join(__dirname, "../../configs/default/target.ts"),
      code: `'use strict';
    const foo: number = 0;
`,
      output: `'use strict';
const foo: number = 0;
`,
      errors: [{
        message: "Expected indentation of 0 spaces but found 4.",
        line: 2,
        column: 1,
      }],
    },
    {
      // Passing Options
      filename: join(__dirname, "../../configs/default/target.ts"),
      options: [{ VariableDeclarator: { var: 2, let: 2, const: 3 }}],
      code: `'use strict';
const foo: string = 'foo',
  bar: string = 'bar';
let a: string = 'a',
  b: string = 'b';
var e: string = 'e',
  s: string = 's';
`,
      output: `'use strict';
const foo: string = 'foo',
      bar: string = 'bar';
let a: string = 'a',
    b: string = 'b';
var e: string = 'e',
    s: string = 's';
`,
      errors: [
        {
          message: "Expected indentation of 6 spaces but found 2.",
          line: 3,
        },
        {
          message: "Expected indentation of 4 spaces but found 2.",
          line: 5,
        },
        {
          message: "Expected indentation of 4 spaces but found 2.",
          line: 7,
        },
      ],
    },
  ],
});

ruleTester.run("editorconfig/linebreak-style (typescript)", linebreakStyle, {
  valid: commonValidTests,
  invalid: [{
    filename: join(__dirname, "../../configs/default/target.ts"),
    code: "'use strict';\r\nconst foo: number = 0;\n",
    output: "'use strict';\nconst foo: number = 0;\n",
    errors: [{
      message: "Expected linebreaks to be 'LF' but found 'CRLF'.",
      line: 1,
    }],
  }],
});

ruleTester.run("editorconfig/no-trailing-space (typescript)", noTrailingSpaces, {
  valid: [
    ...commonValidTests,
    {
      filename: join(__dirname, "../../configs/default/target.ts"),
      code:`'use strict';

// comment
const foo: string = 'foo';`,
    },
    {
      // Passing Options
      filename: join(__dirname, "../../configs/default/target.ts"),
      options: [{ skipBlankLines: true, ignoreComments: true }],
      code: [
        "'use strict';",
        "  ",
        "// comment   ",
        "const foo: string = 'foo';",
      ].join("\n"),
    },
  ],
  invalid: [
    {
      filename: join(__dirname, "../../configs/default/target.ts"),
      code: "'use strict';" + "        \nconst foo: number = 0;\n",
      output: `'use strict';
const foo: number = 0;
`,
      errors: [{
        message: "Trailing spaces not allowed.",
        line: 1,
      }],
    },
    {
      // Passing Options
      filename: join(__dirname, "../../configs/default/target.ts"),
      options: [{ skipBlankLines: true, ignoreComments: true }],
      code: [
        "'use strict';",
        "  ",
        "// comment   ",
        "const foo: string = 'foo';   ",
      ].join("\n"),
      output: [
        "'use strict';",
        "  ",
        "// comment   ",
        "const foo: string = 'foo';",
      ].join("\n"),
      errors: [{
        message: "Trailing spaces not allowed.",
        line: 4,
      }],
    },
  ],
});

/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
"use strict";

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const rule = require("../../../lib/rules/editorconfig");
const path = require("path");
const RuleTester = require("eslint").RuleTester;


// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 2019,
  },
});

ruleTester.run("editorconfig (typescript)", rule, {
  valid: [
    {
      filename: path.join(__dirname, "../../configs/default/target.ts"),
      code: `'use strict';
const foo: number = 0;
`,
    },
    {
      // Passing Options (indent)
      filename: path.join(__dirname, "../../configs/default/target.ts"),
      options: [{ indent: { VariableDeclarator: { var: 2, let: 2, const: 3 }}}],
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
    {
      // Passing Options (no-trailing-spaces)
      filename: path.join(__dirname, "../../configs/default/target.ts"),
      options: [{ "no-trailing-spaces": { skipBlankLines: true, ignoreComments: true }}],
      code: "'use strict'; console.log('foo')\n    \n// bar    \n",
    },
    {
      // Passing Options (options for multiple rules)
      filename: path.join(__dirname, "../../configs/default/target.ts"),
      options: [{
        indent: { VariableDeclarator: { var: 2, let: 2, const: 3 }},
        "no-trailing-spaces": { skipBlankLines: true, ignoreComments: true },
      }],
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
    l: { i: string , n: string, t: string } = {
      i: 'i',
      n: 'n',
      t: 't',
    };
` + "console.log('foo')\n    \n// bar    \n",
    },
  ],

  invalid: [
    {
      // Indents
      filename: path.join(__dirname, "../../configs/default/target.ts"),
      code: `'use strict';
    const foo: number = 0;
`,
      output: `'use strict';
const foo: number = 0;
`,
      errors: [{
        message: "EditorConfig: Expected indentation of 0 spaces but found 4.",
        line: 2,
        column: 2,
      }],
    },
    {
      // Trailing line break at EOF
      filename: path.join(__dirname, "../../configs/default/target.ts"),
      code: `'use strict';
const foo: number = 0;`,
      output: `'use strict';
const foo: number = 0;
`,
      errors: [{
        message: "EditorConfig: Newline required at end of file but not found.",
        line: 2,
      }],
    },
    {
      // Trailing whitespace
      filename: path.join(__dirname, "../../configs/default/target.ts"),
      code: "'use strict';" + "        \nconst foo: number = 0;\n",
      output: `'use strict';
const foo: number = 0;
`,
      errors: [{
        message: "EditorConfig: Trailing spaces not allowed.",
        line: 1,
      }],
    },
    {
      // CRLF
      filename: path.join(__dirname, "../../configs/default/target.ts"),
      code: "'use strict';\r\nconst foo: number = 0;\n",
      output: "'use strict';\nconst foo: number = 0;\n",
      errors: [{
        message: "EditorConfig: Expected linebreaks to be 'LF' but found 'CRLF'.",
        line: 1,
      }],
    },
    {
      // Passing Options (indent)
      filename: path.join(__dirname, "../../configs/default/target.ts"),
      options: [{ indent: { VariableDeclarator: { var: 2, let: 2, const: 3 }}}],
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
          message: "EditorConfig: Expected indentation of 6 spaces but found 2.",
          line: 3,
        },
        {
          message: "EditorConfig: Expected indentation of 4 spaces but found 2.",
          line: 5,
        },
        {
          message: "EditorConfig: Expected indentation of 4 spaces but found 2.",
          line: 7,
        },
      ],
    },
    {
      // Passing Options (options for multiple rules)
      filename: path.join(__dirname, "../../configs/default/target.ts"),
      options: [{
        indent: { VariableDeclarator: { var: 2, let: 2, const: 3 }},
        "no-trailing-spaces": { skipBlankLines: true, ignoreComments: true },
      }],
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
          message: "EditorConfig: Expected indentation of 6 spaces but found 2.",
          line: 3,
        },
        {
          message: "EditorConfig: Expected indentation of 4 spaces but found 2.",
          line: 5,
        },
        {
          message: "EditorConfig: Expected indentation of 4 spaces but found 2.",
          line: 7,
        },
      ],
    },
    {
      filename: path.join(__dirname, "../../configs/indent-space-no-indent-size/target.ts"),

      code: `'use strict';
const foo: string = "bar";
if (true) {
  console.log("foo");
}
`,
      errors: [{
        message: "EditorConfig: indent_size is not set in .editorconfig",
        line: 1,
      }],
    },
  ],
});

/**
 * @fileoverview Report and fix EditorConfig rule violation
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

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2019 }});

ruleTester.run("editorconfig", rule, {
  valid: [
    {
      filename: path.join(__dirname, "../../configs/default/target.js"),
      code: `'use strict';
const foo = 0;
`,
    },
    {
      // Passing Options (indent)
      filename: path.join(__dirname, "../../configs/default/target.js"),
      options: [{ indent: { VariableDeclarator: { var: 2, let: 2, const: 3 }}}],
      code: `'use strict';
const foo = 'foo',
      bar = 'bar',
      hoge = {
        fuga: 'fuga',
      };
let a = 'a',
    b = 'b',
    c = {
      d: 'd',
    };
var e = 'e',
    s = 's',
    l = {
      i: 'i',
      n: 'n',
      t: 't',
    };
`,
    },
    {
      // Passing Options (no-trailing-spaces)
      filename: path.join(__dirname, "../../configs/default/target.js"),
      options: [{ "no-trailing-spaces": { skipBlankLines: true, ignoreComments: true }}],
      code: "'use strict'; console.log('foo')\n    \n// bar    \n",
    },
    {
      // Passing Options (options for multiple rules)
      filename: path.join(__dirname, "../../configs/default/target.js"),
      options: [{
        indent: { VariableDeclarator: { var: 2, let: 2, const: 3 }},
        "no-trailing-spaces": { skipBlankLines: true, ignoreComments: true },
      }],
      code: `'use strict';
const foo = 'foo',
      bar = 'bar',
      hoge = {
        fuga: 'fuga',
      };
let a = 'a',
    b = 'b',
    c = {
      d: 'd',
    };
var e = 'e',
    s = 's',
    l = {
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
      filename: path.join(__dirname, "../../configs/default/target.js"),
      code: `'use strict';
    const foo = 0;
`,
      output: `'use strict';
const foo = 0;
`,
      errors: [{
        message: "EditorConfig: Expected indentation of 0 spaces but found 4.",
        line: 2,
        column: 2,
      }],
    },
    {
      // Trailing line break at EOF
      filename: path.join(__dirname, "../../configs/default/target.js"),
      code: `'use strict';
const foo = 0;`,
      output: `'use strict';
const foo = 0;
`,
      errors: [{
        message: "EditorConfig: Newline required at end of file but not found.",
        line: 2,
      }],
    },
    {
      // Trailing whitespace
      filename: path.join(__dirname, "../../configs/default/target.js"),
      code: "'use strict';" + "        \nconst foo = 0;\n",
      output: `'use strict';
const foo = 0;
`,
      errors: [{
        message: "EditorConfig: Trailing spaces not allowed.",
        line: 1,
      }],
    },
    {
      // CRLF
      filename: path.join(__dirname, "../../configs/default/target.js"),
      code: "'use strict';\r\nconst foo = 0;\n",
      output: "'use strict';\nconst foo = 0;\n",
      errors: [{
        message: "EditorConfig: Expected linebreaks to be 'LF' but found 'CRLF'.",
        line: 1,
      }],
    },
    {
      // Passing Options (indent)
      filename: path.join(__dirname, "../../configs/default/target.js"),
      options: [{ indent: { VariableDeclarator: { var: 2, let: 2, const: 3 }}}],
      code: `'use strict';
const foo = 'foo',
  bar = 'bar';
let a = 'a',
  b = 'b';
var e = 'e',
  s = 's';
`,
      output: `'use strict';
const foo = 'foo',
      bar = 'bar';
let a = 'a',
    b = 'b';
var e = 'e',
    s = 's';
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
      filename: path.join(__dirname, "../../configs/default/target.js"),
      options: [{
        indent: { VariableDeclarator: { var: 2, let: 2, const: 3 }},
        "no-trailing-spaces": { skipBlankLines: true, ignoreComments: true },
      }],
      code: `'use strict';
const foo = 'foo',
  bar = 'bar';
let a = 'a',
  b = 'b';
var e = 'e',
  s = 's';
`,
      output: `'use strict';
const foo = 'foo',
      bar = 'bar';
let a = 'a',
    b = 'b';
var e = 'e',
    s = 's';
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
  ],
});

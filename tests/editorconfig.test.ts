// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { RuleTester, type Rule } from "eslint";
import epec from "../src/main.ts";

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const {
  charset,
  "eol-last": eolLast,
  indent, "linebreak-style":
  linebreakStyle,
  "no-trailing-spaces": noTrailingSpaces,
} = epec.rules as Record<string, Rule.RuleModule>;
const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2019,
  },
});

const commonValidTests = [
  {
    filename: join(__dirname, "../../configs/default/target.js"),
    code: `'use strict';
const foo = 0;
`,
  },
];

ruleTester.run("editorconfig/charset (javascript)", charset, {
  valid: commonValidTests,
  invalid: [], // TODO
});

ruleTester.run("editorconfig/eol-last (javascript)", eolLast, {
  valid: commonValidTests,
  invalid: [{
    filename: join(__dirname, "../../configs/default/target.js"),
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

ruleTester.run("editorconfig/indent (javascript)", indent, {
  valid: [
    ...commonValidTests,
    {
      // Passing Options (indent)
      filename: join(__dirname, "../../configs/default/target.js"),
      options: [{ VariableDeclarator: { var: 2, let: 2, const: 3 }}],
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
  ],
  invalid: [
    {
      filename: join(__dirname, "../../configs/default/target.js"),
      code: `'use strict';
    const foo = 0;
`,
      output: `'use strict';
const foo = 0;
`,
      errors: [{
        message: "Expected indentation of 0 spaces but found 4.",
        line: 2,
        column: 1,
      }],
    },
    {
      // Passing Options
      filename: join(__dirname, "../../configs/default/target.js"),
      options: [{ VariableDeclarator: { var: 2, let: 2, const: 3 }}],
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

ruleTester.run("editorconfig/linebreak-style (javascript)", linebreakStyle, {
  valid: commonValidTests,
  invalid: [{
    filename: join(__dirname, "../../configs/default/target.js"),
    code: "'use strict';\r\nconst foo = 0;\n",
    output: "'use strict';\nconst foo = 0;\n",
    errors: [{
      message: "Expected linebreaks to be 'LF' but found 'CRLF'.",
      line: 1,
    }],
  }],
});

ruleTester.run("editorconfig/no-trailing-space (javascript)", noTrailingSpaces, {
  valid: [
    ...commonValidTests,
    {
      filename: join(__dirname, "../../configs/default/target.js"),
      code:`'use strict';

// comment
const foo = 'foo';`,
    },
    {
      // Passing Options
      filename: join(__dirname, "../../configs/default/target.js"),
      options: [{ skipBlankLines: true, ignoreComments: true }],
      code: [
        "'use strict';",
        "  ",
        "// comment   ",
        "const foo = 'foo';",
      ].join("\n"),
    },
  ],
  invalid: [
    {
      filename: join(__dirname, "../../configs/default/target.js"),
      code: "'use strict';" + "        \nconst foo = 0;\n",
      output: `'use strict';
const foo = 0;
`,
      errors: [{
        message: "Trailing spaces not allowed.",
        line: 1,
      }],
    },
    {
      // Passing Options
      filename: join(__dirname, "../../configs/default/target.js"),
      options: [{ skipBlankLines: true, ignoreComments: true }],
      code: [
        "'use strict';",
        "  ",
        "// comment   ",
        "const foo = 'foo';   ",
      ].join("\n"),
      output: [
        "'use strict';",
        "  ",
        "// comment   ",
        "const foo = 'foo';",
      ].join("\n"),
      errors: [{
        message: "Trailing spaces not allowed.",
        line: 4,
      }],
    },
  ],
});

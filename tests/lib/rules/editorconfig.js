"use strict";

const path = require("path");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2019 }});

const commonValidTests = [
  {
    filename: path.join(__dirname, "../../configs/default/target.js"),
    code: `'use strict';
const foo = 0;
`,
  },
];

ruleTester.run("editorconfig/charset (javascript)", require("../../../lib/rules/charset"), {
  valid: commonValidTests,
  invalid: [], // TODO
});

ruleTester.run("editorconfig/eol-last (javascript)", require("../../../lib/rules/eol-last"), {
  valid: commonValidTests,
  invalid: [{
    filename: path.join(__dirname, "../../configs/default/target.js"),
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

ruleTester.run("editorconfig/indent (javascript)", require("../../../lib/rules/indent"), {
  valid: [
    ...commonValidTests,
    {
      // Passing Options (indent)
      filename: path.join(__dirname, "../../configs/default/target.js"),
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
      filename: path.join(__dirname, "../../configs/default/target.js"),
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
      filename: path.join(__dirname, "../../configs/default/target.js"),
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

ruleTester.run("editorconfig/linebreak-style (javascript)", require("../../../lib/rules/linebreak-style"), {
  valid: commonValidTests,
  invalid: [{
    filename: path.join(__dirname, "../../configs/default/target.js"),
    code: "'use strict';\r\nconst foo = 0;\n",
    output: "'use strict';\nconst foo = 0;\n",
    errors: [{
      message: "Expected linebreaks to be 'LF' but found 'CRLF'.",
      line: 1,
    }],
  }],
});

ruleTester.run("editorconfig/no-trailing-space (javascript)", require("../../../lib/rules/no-trailing-spaces"), {
  valid: [
    ...commonValidTests,
    {
      filename: path.join(__dirname, "../../configs/default/target.js"),
      code:`'use strict';

// comment
const foo = 'foo';`,
    },
    {
      // Passing Options
      filename: path.join(__dirname, "../../configs/default/target.js"),
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
      filename: path.join(__dirname, "../../configs/default/target.js"),
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
      filename: path.join(__dirname, "../../configs/default/target.js"),
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

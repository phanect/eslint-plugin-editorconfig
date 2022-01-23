/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
"use strict";

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const { join } = require("path");

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2022 }});

const testConfigs = [
  {
    name: "The plugin enforces rules configured in .editorconfig",
    filename: join(__dirname, "../../configs/default/target.js"), // With .editorconfig
  },
  {
    name: "The plugin enforces fallback rules",
    filename: "/target.js", // no .editorconfig
    fallback: true,
  },
  {
     name: "The plugin does not enforce fallback rules when .editorconfig present",
    filename: join(__dirname, "../../configs/default/target.js"), // With .editorconfig
    fallback: true,
  },
];

for (const testConfig of testConfigs) {
  const commonValidTest = {
    filename: testConfig.filename,
    code: `'use strict';
const foo = 0;
`,
  };

  ruleTester.run(`${testConfig.name} - editorconfig/charset (javascript)`, require("../../../lib/rules/charset"), {
    valid: [{
      ...commonValidTest,
      ...(testConfig.fallback ? { options: [{ fallback: "utf-8" }]} : {}),
    }],
    invalid: [], // TODO
  });

  ruleTester.run(`${testConfig.name} - editorconfig/eol-last (javascript)`, require("../../../lib/rules/eol-last"), {
    valid: [{
      ...commonValidTest,
      ...(testConfig.fallback ? { options: [{ fallback: "always" }]} : {}),
    }],
    invalid: [{
      filename: testConfig.filename,
      ...(testConfig.fallback ? { options: [{ fallback: "always" }]} : {}),
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

  ruleTester.run(`${testConfig.name} - editorconfig/indent (javascript)`, require("../../../lib/rules/indent"), {
    valid: [
      {
        ...commonValidTest,
        ...(testConfig.fallback ? { options: [{ fallback: 2 }]} : {}),
      },
      {
        // Passing Options (indent)
        filename: testConfig.filename,
        options: [{
          VariableDeclarator: { var: 2, let: 2, const: 3 },
          ...(testConfig.fallback ? { fallback: 2 } : {}),
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
`,
      },
    ],
    invalid: [
      {
        filename: testConfig.filename,
        ...(testConfig.fallback ? { options: [{ fallback: 2 }]} : {}),
        code: `'use strict';
if (true) {
    const foo = 0;
}
`,
        output: `'use strict';
if (true) {
  const foo = 0;
}
`,
        errors: [{
          message: "Expected indentation of 2 spaces but found 4.",
          line: 3,
          column: 1,
        }],
      },
      {
        // Passing Options
        filename: testConfig.filename,
        options: [{
          VariableDeclarator: { var: 2, let: 2, const: 3 },
          ...(testConfig.fallback ? { fallback: 2 } : {}),
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

  ruleTester.run(`${testConfig.name} - editorconfig/linebreak-style (javascript)`, require("../../../lib/rules/linebreak-style"), {
    valid: [{
      ...commonValidTest,
      ...(testConfig.fallback ? { options: [{ fallback: "unix" }]} : {}),
    }],
    invalid: [{
      filename: testConfig.filename,
      ...(testConfig.fallback ? { options: [{ fallback: "unix" }]} : {}),
      code: "'use strict';\r\nconst foo = 0;\n",
      output: "'use strict';\nconst foo = 0;\n",
      errors: [{
        message: "Expected linebreaks to be 'LF' but found 'CRLF'.",
        line: 1,
      }],
    }],
  });

  ruleTester.run(`${testConfig.name} - editorconfig/no-trailing-space (javascript)`, require("../../../lib/rules/no-trailing-spaces"), {
    valid: [
      {
        ...commonValidTest,
        ...(testConfig.fallback ? { options: [{ fallback: true }]} : {}),
      },
      {
        filename: testConfig.filename,
        ...(testConfig.fallback ? { options: [{ fallback: true }]} : {}),
        code:`'use strict';
// comment
const foo = 'foo';`,
      },
      {
        // Passing Options
        filename: testConfig.filename,
        options: [{
          skipBlankLines: true,
          ignoreComments: true,
          ...(testConfig.fallback ? { fallback: true } : {}),
        }],
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
        filename: testConfig.filename,
        ...(testConfig.fallback ? { options: [{ fallback: true }]} : {}),
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
        filename: testConfig.filename,
        options: [{ skipBlankLines: true, ignoreComments: true, fallback: testConfig.fallback }],
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
}

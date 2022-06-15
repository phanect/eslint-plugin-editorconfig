/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
"use strict";

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const { resolve } = require("path");

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2022 }});

for (const lang of [ "js", "ts" ]) {
  const filename = resolve(__dirname, `../../configs/default/target.${ lang }`)

  ruleTester.run(`EditorConfig should have priority to fallback - editorconfig/charset (${ lang })`, require("../../../lib/rules/charset"), {
    valid: [{
      filename,
      code: `'use strict';
const foo = 0;
`,
      options: [{ fallback: "utf-8-bom" }],
    }],
    invalid: [], // TODO
  });

  ruleTester.run(`EditorConfig should have priority to fallback - editorconfig/eol-last (${ lang })`, require("../../../lib/rules/eol-last"), {
    valid: [{
      filename,
      code: `'use strict';
const foo = 0;
`,
      options: [{ fallback: "never" }],
    }],
    invalid: [],
  });

  ruleTester.run(`EditorConfig should have priority to fallback - editorconfig/indent (${ lang })`, require("../../../lib/rules/indent"), {
    valid: [
      {
        filename,
        code: `'use strict';
if (true) {
  const foo = 0;
}
`,
        options: [{ fallback: 4 }],
      },
      {
        // Passing fallback with other options (indent)
        filename,
        options: [{
          VariableDeclarator: { var: 2, let: 2, const: 3 },
          fallback: 4,
        }],
        code: `'use strict';
const foo = 'foo',
      hoge = {
        fuga: 'fuga',
      };
if (true) {
  const foo = 0;
}
`,
      },
    ],
    invalid: [],
  });

  ruleTester.run(`EditorConfig should have priority to fallback - editorconfig/linebreak-style (${ lang })`, require("../../../lib/rules/linebreak-style"), {
    valid: [{
      filename,
      code: "'use strict';\nconst foo = 0;\n",
      options: [{ fallback: "windows" }],
    }],
    invalid: [],
  });

  ruleTester.run(`EditorConfig should have priority to fallback - editorconfig/no-trailing-space (${ lang })`, require("../../../lib/rules/no-trailing-spaces"), {
    valid: [],
    invalid: [
      {
        filename,
        options: [{ fallback: false }],
        code: "'use strict';" + "        \nconst foo = 0;\n",
        output: `'use strict';
const foo = 0;
`,
        errors: [{
          message: "Trailing spaces not allowed.",
          line: 1,
        }],
      },
    ],
  });
}

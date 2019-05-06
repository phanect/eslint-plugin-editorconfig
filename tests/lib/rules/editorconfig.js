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
  ],
});

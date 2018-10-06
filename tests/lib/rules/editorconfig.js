/**
 * @fileoverview Report and fix EditorConfig rule violation
 * @author Jumpei Ogawa
 */
"use strict";

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const rule = require("../../../lib/rules/editorconfig"),
      path = require("path"),
      RuleTester = require("eslint").RuleTester;


// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const configDir = path.join(__dirname, "../../configs"),
      ruleTester = new RuleTester(),

      combinations = {
        default: {
          filename: path.join(configDir, "default/target.js"),
          validCode: `'use strict';
console.log('failure');
`,
        },
      };

ruleTester.run("editorconfig", rule, {
  valid: [
    {
      filename: combinations.default.filename,
      code: combinations.default.validCode,
    },
  ],

  invalid: [
    {
      // Indents
      filename: combinations.default.filename,
      code: `'use strict';
    console.log('failure');
`,
      output: combinations.default.validCode,
      errors: [{
        message: "EditorConfig: Expected indentation of 0 spaces but found 4.",
        line: 2,
        column: 2,
      }],
    },
    {
      // Trailing line break at EOF
      filename: combinations.default.filename,
      code: `'use strict';
console.log('failure');`,
      output: combinations.default.validCode,
      errors: [{
        message: "EditorConfig: Newline required at end of file but not found.",
        line: 2,
      }],
    },
    {
      // Trailing whitespace
      filename: combinations.default.filename,
      code: "'use strict';" + "        \nconsole.log('failure');\n",
      output: combinations.default.validCode,
      errors: [{
        message: "EditorConfig: Trailing spaces not allowed.",
        line: 1,
      }],
    },
  ],
});

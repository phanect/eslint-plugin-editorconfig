/**
 * @fileoverview Report and fix EditorConfig rule violation
 * @author Jumpei Ogawa
 */
"use strict";

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const rule = require("../../../lib/rules/editorconfig"),

      RuleTester = require("eslint").RuleTester;


// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("editorconfig", rule, {

  valid: [

    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "    console.log(\"failure\");",
      errors: [{
        message: "Fill me in.",
        type: "Me too",
      }],
    },
  ],
});

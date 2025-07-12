import { join } from "node:path";
import { ruleTesterTs, ruleTesterJs, commonValidTsTests, commonValidJsTests } from "./shared.ts";
import noTrailingSpaces from "../src/rules/no-trailing-spaces.ts";

ruleTesterTs.run("editorconfig/no-trailing-space (typescript)", noTrailingSpaces, {
  valid: [
    ...commonValidTsTests,
    {
      filename: join(import.meta.dirname, "./configs/default/target.ts"),
      code: `'use strict';

// comment
const foo: string = 'foo';`,
    },
    {
      // Passing Options
      filename: join(import.meta.dirname, "./configs/default/target.ts"),
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
      filename: join(import.meta.dirname, "./configs/default/target.ts"),
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
      filename: join(import.meta.dirname, "./configs/default/target.ts"),
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

ruleTesterJs.run("editorconfig/no-trailing-space (javascript)", noTrailingSpaces, {
  valid: [
    ...commonValidJsTests,
    {
      filename: join(import.meta.dirname, "./configs/default/target.js"),
      code: `'use strict';

// comment
const foo = 'foo';`,
    },
    {
      // Passing Options
      filename: join(import.meta.dirname, "./configs/default/target.js"),
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
      filename: join(import.meta.dirname, "./configs/default/target.js"),
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
      filename: join(import.meta.dirname, "./configs/default/target.js"),
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

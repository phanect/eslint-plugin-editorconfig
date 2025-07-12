import { join } from "node:path";
import { ruleTesterTs, ruleTesterJs, commonValidTsTests, commonValidJsTests } from "./shared.ts";
import indent from "../src/rules/indent.ts";

ruleTesterTs.run("editorconfig/indent (typescript)", indent, {
  valid: [
    ...commonValidTsTests,
    {
      // Passing Options (indent)
      filename: join(import.meta.dirname, "./configs/default/target.ts"),
      options: [{ VariableDeclarator: { var: 2, let: 2, const: 3 }}],
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
  ],
  invalid: [
    {
      filename: join(import.meta.dirname, "./configs/default/target.ts"),
      code: `'use strict';
    const foo: number = 0;
`,
      output: `'use strict';
const foo: number = 0;
`,
      errors: [{
        message: "Expected indentation of 0 spaces but found 4.",
        line: 2,
        column: 1,
      }],
    },
    {
      // Passing Options
      filename: join(import.meta.dirname, "./configs/default/target.ts"),
      options: [{ VariableDeclarator: { var: 2, let: 2, const: 3 }}],
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

ruleTesterJs.run("editorconfig/indent (javascript)", indent, {
  valid: [
    ...commonValidJsTests,
    {
      // Passing Options (indent)
      filename: join(import.meta.dirname, "./configs/default/target.js"),
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
      filename: join(import.meta.dirname, "./configs/default/target.js"),
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
      filename: join(import.meta.dirname, "./configs/default/target.js"),
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

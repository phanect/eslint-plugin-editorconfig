// import { ruleTesterTs, ruleTesterJs, commonValidTsTests, commonValidJsTests } from "./shared.ts";
// import charset from "../src/rules/charset.ts";

// ruleTesterTs.run("editorconfig/charset (typescript)", charset, {
//   valid: commonValidTsTests,
//   invalid: [], // TODO
// });

// ruleTesterJs.run("editorconfig/charset (javascript)", charset, {
//   valid: commonValidJsTests,
//   invalid: [], // TODO
// });

import { ok } from "node:assert";
import { test } from "vitest";

test("Dummy test for charset", () => ok(true));

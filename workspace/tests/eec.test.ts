import { join } from "node:path";
import { expect, test } from "vitest";
import { editorconfig } from "../src/index.ts";

test("with no config", async () => {
  const configs = await editorconfig(join(import.meta.dirname, "configs/default/eslint.config.js"));

  expect(configs).toStrictEqual({
    files: [
      "**/*.js", "**/*.mjs", "**/*.cjs",
      "**/*.ts", "**/*.mts", "**/*.cts",
      "**/*.jsx", "**/*.tsx",
    ],
    rules: {
      "@stylistic/eol-last": [ "error", "always" ],
      "@stylistic/indent": [ "error", 2, {}],
      "@stylistic/linebreak-style": [ "error", "unix" ],
      "@stylistic/no-trailing-spaces": [ "error", {}],
    },
  });
});

// test("warnings", async () => {

// });

// test("with defaults", async () => {

// });

// test("with options", async () => {

// });

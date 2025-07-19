import { join } from "node:path";
import { expect, test } from "vitest";
import { editorconfig } from "../src/index.ts";

test("with no config", async () => {
  const config = await editorconfig(join(import.meta.dirname, "configs/standard/eslint.config.js"));

  expect(config).toStrictEqual({
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

test("warnings", async () => {
  const config = await editorconfig(
    join(import.meta.dirname, "configs/standard/eslint.config.js"),
    {
      "eol-last": [ "warn" ],
      indent: [ "warn" ],
      "linebreak-style": [ "warn" ],
      "no-trailing-spaces": [ "warn" ],
    }
  );

  expect(config).toStrictEqual({
    files: [
      "**/*.js", "**/*.mjs", "**/*.cjs",
      "**/*.ts", "**/*.mts", "**/*.cts",
      "**/*.jsx", "**/*.tsx",
    ],
    rules: {
      "@stylistic/eol-last": [ "warn", "always" ],
      "@stylistic/indent": [ "warn", 2, {}],
      "@stylistic/linebreak-style": [ "warn", "unix" ],
      "@stylistic/no-trailing-spaces": [ "warn", {}],
    },
  });
});

test("with defaults", async () => {
  const config = await editorconfig(
    join(import.meta.dirname, "configs/default/eslint.config.js"),
    {
      "eol-last": [ "error", { default: "never" }],
      indent: [ "error", { default: "tab" }],
      "linebreak-style": [ "error", { default: "windows" }],
      "no-trailing-spaces": [ "error", { default: "disabled" }],
    }
  );

  expect(config).toStrictEqual({
    files: [
      "**/*.js", "**/*.mjs", "**/*.cjs",
      "**/*.ts", "**/*.mts", "**/*.cts",
      "**/*.jsx", "**/*.tsx",
    ],
    rules: {
      "@stylistic/eol-last": [ "error", "never" ],
      "@stylistic/indent": [ "error", "tab", {}],
      "@stylistic/linebreak-style": [ "error", "windows" ],
      "@stylistic/no-trailing-spaces": [ "off" ],
    },
  });
});

test("with options", async () => {

});

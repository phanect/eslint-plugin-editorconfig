# eslint-plugin-editorconfig

An ESLint plugin to enforce EditorConfig rules

[![GitHub Actions Status](https://github.com/phanect/eslint-plugin-editorconfig/actions/workflows/actions.yml/badge.svg)](https://github.com/phanect/eslint-plugin-editorconfig/actions/workflows/actions.yml) [![NPM Version](https://img.shields.io/npm/v/eslint-plugin-editorconfig.svg)](https://npmjs.org/package/eslint-plugin-editorconfig)

**This is a document for v5.x and it is currently beta.**  
**Please refer [v4.0.3 tag](https://github.com/phanect/eslint-plugin-editorconfig/tree/v4.0.3) for the docs for the stable version.**

## Requirements

- ESLint v9
- Node.js v{18, 20, 22}

## Install

```bash
$ npm install --save-dev eslint@8 eslint-plugin-editorconfig
```

or

```bash
$ yarn add --dev eslint@8 eslint-plugin-editorconfig
```

If you use [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint), you need to install `@typescript-eslint/eslint-plugin` too.

```bash
$ npm install --save-dev @typescript-eslint/eslint-plugin
```

## Usage

Since version 5.0.0, eslint-plugin-editorconfig dropped CommonJS support and it only supports JSM (JavaScript modules aka. ES modules) packages.
If your project is CommonJS-based (i.e. `"type": "module"` does not exist in your package.json), rename your eslint.config.js to eslint.config.mjs (use .mjs file extension).

If you still need to use .eslintrc* as a configuration file, use [v4.x](https://github.com/phanect/eslint-plugin-editorconfig/tree/v4.0.3) with ESLint 8.

-----

To add this plugin, add `configs.all`.

eslint.config.[js|mjs]

```js
import epec from "eslint-plugin-editorconfig";

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  epec.configs.all,
  {
    files: [ "*" ],
    // ...
  },
];
```

Or you can manually add rules: 

```js
import epec from "eslint-plugin-editorconfig";

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  {
    files: [ "*" ],
    rules: {
      "editorconfig/charset": "error",
      "editorconfig/eol-last": "error",
      "editorconfig/indent": "error",
      "editorconfig/linebreak-style": "error",
      "editorconfig/no-trailing-spaces": "error",
    },
    plugins: {
      editorconfig: epec,
    },
    // ...
  },
];
```

## Conflicting ESLint rules

Following rules may conflict `editorconfig/*` rule.
It is recommended to disable them.

- Rules included in ESLint
  - `unicode-bom`
- Rules included in ESLint Stylistic
  - `@stylistic/js/eol-last`
  - `@stylistic/js/indent`
  - `@stylistic/ts/indent`
  - `@stylistic/js/linebreak-style`
  - `@stylistic/js/no-trailing-spaces`
- Rules included in legacy ESLint (v8 or lower)
  - `eol-last`
  - `indent`
  - `linebreak-style`
  - `no-trailing-spaces`
- Rules included in legacy `@typescript-eslint/eslint-plugin` (v6 or lower)
  - `@typescript-eslint/indent`

If above rules are specified in your eslint.config.*, just remove them.
If they are specified in the extended config, consider adding `epec.configs.noconflict`.

```js
import js from "@eslint/js";
import epec from "eslint-plugin-editorconfig";

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  js.configs.recommended,
  epec.configs.noconflict,
  {
    files: [ "*" ],
    // ...
  },
];
```

`epec.configs.all` also includes `epec.configs.noconflict` and disables the conflicting rules.

```js
import js from "@eslint/js";
import epec from "eslint-plugin-editorconfig";

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  js.configs.recommended,
  // epec.configs.noconflict, // Not required.
  epec.configs.all,
  {
    files: [ "*" ],
    // ...
  },
];
```

### Rules

Internally, eslint-plugin-editorconfig extends the existing rules from ESLint and ESLint Stylistic to verify/fix the code.
Some rules allow passing options.

All the citation in the docs is from the backend ESLint rule document otherwise noted.

| Rule                                                                | Description                                                     | Fixable |
| ------------------------------------------------------------------- | --------------------------------------------------------------- | -- |
| [editorconfig/charset](docs/rules/charset.md)                       | Enforce EditorConfig rules for charset                          | ✅ |
| [editorconfig/eol-last](docs/rules/eol-last.md)                     | Enforce EditorConfig rules for the newlines at the end of files | ✅ |
| [editorconfig/indent](docs/rules/indent.md)                         | Enforce EditorConfig rules for indentation                      | ✅ |
| [editorconfig/linebreak-style](docs/rules/linebreak-style.md)       | Enforce EditorConfig rules for linebreak style                  | ✅ |
| [editorconfig/no-trailing-spaces](docs/rules/no-trailing-spaces.md) | Enforce EditorConfig rules for trailing spaces                  | ✅ |

## License & Credit

[MIT](./LICENSE)

This plugin includes code derived from [klona](https://github.com/lukeed/klona).

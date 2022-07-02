# eslint-plugin-editorconfig

An ESLint plugin to enforce EditorConfig rules

[![CircleCI](https://circleci.com/gh/phanect/eslint-plugin-editorconfig.svg?style=svg)](https://circleci.com/gh/phanect/eslint-plugin-editorconfig) [![NPM Version](https://img.shields.io/npm/v/eslint-plugin-editorconfig.svg)](https://npmjs.org/package/eslint-plugin-editorconfig)

## Install

```bash
$ npm install --save-dev eslint eslint-plugin-editorconfig
```

or

```bash
$ yarn add --dev eslint eslint-plugin-editorconfig
```

If you use [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint), you need to install `@typescript-eslint/eslint-plugin` too.

```bash
$ npm install --save-dev @typescript-eslint/eslint-plugin
```

## Usage

Like other ESLint plugins,

- add rules in the `rules`
- add `"editorconfig"` in the `plugins`

in your .eslintrc*

```json
{
  // ...
  "rules": {
    "editorconfig/charset": "error",
    "editorconfig/eol-last": "error",
    "editorconfig/indent": "error",
    "editorconfig/linebreak-style": "error",
    "editorconfig/no-trailing-spaces": "error"
  },
  "plugins": [ "editorconfig" ]
}
```

Or you can extend `plugin:editorconfig/all` instead of adding rules.

```json
{
  // ...
  "extends": [ "plugin:editorconfig/all" ],
  "plugins": [ "editorconfig" ]
}
```

## Conflicting ESLint rules

Following rules may conflict `editorconfig/*` rule.
It is recommended to disable them.

- `eol-last`
- `indent`
- `linebreak-style`
- `no-trailing-spaces`
- `unicode-bom`
- `@typescript-eslint/eol-last`
- `@typescript-eslint/indent`
- `@typescript-eslint/linebreak-style`
- `@typescript-eslint/no-trailing-spaces`
- `@typescript-eslint/unicode-bom`

If above rules are specified in your .eslintrc, just remove them.
If they are specified in the extended config, consider adding `plugin:editorconfig/noconflict` to your `extends`.

```json
{
  "extends": [
    "@phanect/phanective",
    "plugin:editorconfig/noconflict"
  ],
  // ...
}
```

If you extend `plugin:editorconfig/all`, the rules above are turned off too, so you don't have to add `plugin:editorconfig/noconflict` in addition to `plugin:editorconfig/all`.

### Rules

Internally, eslint-plugin-editorconfig uses the existing ESLint and typescript-eslint rules to verify/fix the code.
Some rules allow passing options.

All the citation in the docs is from the backend ESLint rule document otherwise noted.

| Rule                                                                | Description                                                     | Fixable |
| ------------------------------------------------------------------- | --------------------------------------------------------------- | -- |
| [editorconfig/charset](docs/rules/charset.md)                       | Enforce EditorConfig rules for charset                          | ✅ |
| [editorconfig/eol-last](docs/rules/eol-last.md)                     | Enforce EditorConfig rules for the newlines at the end of files | ✅ |
| [editorconfig/indent](docs/rules/indent.md)                         | Enforce EditorConfig rules for indentation                      | ✅ |
| [editorconfig/linebreak-style](docs/rules/linebreak-style.md)       | Enforce EditorConfig rules for linebreak style                  | ✅ |
| [editorconfig/no-trailing-spaces](docs/rules/no-trailing-spaces.md) | Enforce EditorConfig rules for trailing spaces                  | ✅ |

## License

[MIT](https://vjpr.mit-license.org)

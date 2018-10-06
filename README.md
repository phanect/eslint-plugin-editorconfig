# eslint-plugin-editorconfig

ESLint plugin to follow EditorConfig

[![CircleCI](https://circleci.com/gh/phanect/eslint-plugin-editorconfig.svg?style=svg)](https://circleci.com/gh/phanect/eslint-plugin-editorconfig) [![NPM Version](https://img.shields.io/npm/v/eslint-plugin-editorconfig.svg)](https://npmjs.org/package/eslint-plugin-editorconfig)

## Install

```bash
$ yarn add --dev eslint eslint-plugin-editorconfig
```

or

```bash
$ npm install --save-dev eslint eslint-plugin-editorconfig
```

## Usage

Like other ESLint plugins,

- add `editorconfig` in the `rules`.
- add `"editorconfig"` in the `plugins`.

```json
{
  // ...
  "rules": {
    "editorconfig/editorconfig": "error"
  },
  "plugins": [ "editorconfig" ]
}
```

## Conflicting ESLint rules

Following rules may conflicts `editorconfig` rule.
It is recommended to disable them.

- eol-last
- indent
- linebreak-style
- no-trailing-spaces
- unicode-bom

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
## Unsupported Parameters

Some of the EditorConfig parameters are unsupported.

### end_of_line
When `end_of_line = cr` is specified in .editorconfig, ESLint does nothing.

### charset
This plugin works only when `utf-8` or `utf-8-bom` is specified.
ESLint only verifies if BOM is specified or not.


## License

[MIT](http://vjpr.mit-license.org)

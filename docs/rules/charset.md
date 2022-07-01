# Enforce EditorConfig rules for charset (`editorconfig/charset`)

The corresponding EditorCongig property is `charset`.
The backend ESLint rule is [`unicode-bom`](https://eslint.org/docs/rules/unicode-bom)

This plugin works only when `utf-8` or `utf-8-bom` is specified. If other value is specified in .editorconfig, ESLint does not verify charset.
ESLint only verifies if BOM is specified or not.

## Options

None

## When Not To Use It

> If you use some UTF-16 or UTF-32 files and you want to allow a file to optionally begin with a Unicode BOM, you should turn this rule off.

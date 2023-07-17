# Enforce EditorConfig rules for charset (`editorconfig/charset`)

The corresponding EditorCongig property is `charset`.
The backend ESLint rule is [`unicode-bom`](https://eslint.org/docs/rules/unicode-bom)

Unlike other rules, this plugin works only when `utf-8` or `utf-8-bom` is specified. If other value is specified in .editorconfig, ESLint does not verify charset. ESLint only verifies if BOM is specified or not.

If you set `charset = utf-8` in .editorconfig, the files **cannot** include a BOM.  
If you set `charset = utf-8-bom` in .editorconfig, the files **must** include a BOM.  
If you don't set `charset` in .editorconfig or set `charset = unset`, this rule is disabled.

## Options

None

## When Not To Use It

> If you use some UTF-16 or UTF-32 files and you want to allow a file to optionally begin with a Unicode BOM, you should turn this rule off.

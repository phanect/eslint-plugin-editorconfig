# Enforce EditorConfig rules for trailing spaces (`editorconfig/no-trailing-spaces`)

The corresponding EditorCongig property is `trim_trailing_whitespace`.
The backend ESLint rule is [`no-trailing-spaces`](https://eslint.org/docs/rules/no-trailing-spaces)

If you set `trim_trailing_whitespace = true` in .editorconfig, the trailing spaces **must** be removed.  
If you set `trim_trailing_whitespace = false` or `trim_trailing_whitespace = unset`, or you don't set `trim_trailing_whitespace` in .editorconfig, this rule is disabled.

## Options

> * `"skipBlankLines": false` (default) disallows trailing whitespace on empty lines
> * `"skipBlankLines": true` allows trailing whitespace on empty lines
> * `"ignoreComments": false` (default) disallows trailing whitespace in comment blocks
> * `"ignoreComments": true` allows trailing whitespace in comment blocks

Example (based on the code in the [document for the backend rule `no-trailing-spaces`](https://eslint.org/docs/rules/no-trailing-spaces)):

```javascript
/*eslint editorconfig/no-trailing-spaces: ["error", { "skipBlankLines": true }]*/

var foo = 0;
var baz = 5;
//•••••
```

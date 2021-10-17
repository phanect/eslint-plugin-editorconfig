# eslint-plugin-editorconfig

An ESLint plugin to enforce EditorConfig rules

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

All citation in this section is from the backend ESLint rule document otherwise noted.
#### Enforce EditorConfig rules for charset (`editorconfig/charset`)

The corresponding EditorCongig property is `charset`.
The backend ESLint rule is [`unicode-bom`](https://eslint.org/docs/rules/unicode-bom)

This plugin works only when `utf-8` or `utf-8-bom` is specified. If other value is specified in .editorconfig, ESLint does not verify charset.
ESLint only verifies if BOM is specified or not.

##### Options

None

##### When Not To Use It

> If you use some UTF-16 or UTF-32 files and you want to allow a file to optionally begin with a Unicode BOM, you should turn this rule off.

#### Enforce EditorConfig rules for the newlines at the end of files (`editorconfig/eol-last`)

The corresponding EditorCongig property is `insert_final_newline`.
The backend ESLint rule is [`eol-last`](https://eslint.org/docs/rules/eol-last)

##### Options

None

#### Enforce EditorConfig rules for indentation (`editorconfig/indent`)

The corresponding EditorCongig property is `indent_style` and `indent_size`.
The backend ESLint rule is [`indent`](https://eslint.org/docs/rules/indent) and [`@typescript-eslint/indent`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md).

As documented, `@typescript-eslint/indent` is unstable currently. Please read typescript-eslint#1824 before using this rule for TypeScript.

##### Options

> * `"SwitchCase"` (default: 0) enforces indentation level for `case` clauses in `switch` statements
> * `"VariableDeclarator"` (default: 1) enforces indentation level for `var` declarators; can also take an object to define separate rules for `var`, `let` and `const` declarations. It can also be `"first"`, indicating all the declarators should be aligned with the first declarator.
> * `"outerIIFEBody"` (default: 1) enforces indentation level for file-level IIFEs. This can also be set to `"off"` to disable checking for file-level IIFEs.
> * `"MemberExpression"` (default: 1) enforces indentation level for multi-line property chains. This can also be set to `"off"` to disable checking for MemberExpression indentation.
> * `"FunctionDeclaration"` takes an object to define rules for function declarations.
>     * `parameters` (default: 1) enforces indentation level for parameters in a function declaration. This can either be a number indicating indentation level, or the string `"first"` indicating that all parameters of the declaration must be aligned with the first parameter. This can also be set to `"off"` to disable checking for FunctionDeclaration parameters.
>     * `body` (default: 1) enforces indentation level for the body of a function declaration.
> * `"FunctionExpression"` takes an object to define rules for function expressions.
>     * `parameters` (default: 1) enforces indentation level for parameters in a function expression. This can either be a number indicating indentation level, or the string `"first"` indicating that all parameters of the expression must be aligned with the first parameter. This can also be set to `"off"` to disable checking for FunctionExpression parameters.
>     * `body` (default: 1) enforces indentation level for the body of a function expression.
> * `"CallExpression"` takes an object to define rules for function call expressions.
>     * `arguments` (default: 1) enforces indentation level for arguments in a call expression. This can either be a number indicating indentation level, or the string `"first"` indicating that all arguments of the expression must be aligned with the first argument. This can also be set to `"off"` to disable checking for CallExpression arguments.
> * `"ArrayExpression"` (default: 1) enforces indentation level for elements in arrays. It can also be set to the string `"first"`, indicating that all the elements in the array should be aligned with the first element. This can also be set to `"off"` to disable checking for array elements.
> * `"ObjectExpression"` (default: 1) enforces indentation level for properties in objects. It can be set to the string `"first"`, indicating that all properties in the object should be aligned with the first property. This can also be set to `"off"` to disable checking for object properties.
> * `"ImportDeclaration"` (default: 1) enforces indentation level for import statements. It can be set to the string `"first"`, indicating that all imported members from a module should be aligned with the first member in the list. This can also be set to `"off"` to disable checking for imported module members.
> * `"flatTernaryExpressions": true` (`false` by default) requires no indentation for ternary expressions which are nested in other ternary expressions.
> * `"offsetTernaryExpressions": true` (`false` by default) requires indentation for values of ternary expressions.
> * `"ignoredNodes"` accepts an array of [selectors](/docs/developer-guide/selectors.md). If an AST node is matched by any of the selectors, the indentation of tokens which are direct children of that node will be ignored. This can be used as an escape hatch to relax the rule if you disagree with the indentation that it enforces for a particular syntactic pattern.
> * `"ignoreComments"` (default: false) can be used when comments do not need to be aligned with nodes on the previous or next line.

Example (based on the code in the [document for the backend rule `indent`](https://eslint.org/docs/rules/indent)):

```javascript
/*eslint editorconfig/indent: ["error", { "SwitchCase": 1 }]*/

switch(a){
case "a":
    break;
case "b":
    break;
}
```

Note: The third option parameter of the original backend `indent` rule should be passed as the second option parameter to this `editorconfig/indent` rule.

#### Enforce EditorConfig rules for linebreak style (`editorconfig/linebreak-style`)

The corresponding EditorCongig property is `end_of_line`.
The backend ESLint rule is [`linebreak-style`](https://eslint.org/docs/rules/linebreak-style)

`end_of_line = cr` is not supported. When `end_of_line = cr` is specified in .editorconfig, This plugin does nothing.

##### Options

None

#### Enforce EditorConfig rules for trailing spaces (`editorconfig/no-trailing-spaces`)

The corresponding EditorCongig property is `trim_trailing_whitespace`.
The backend ESLint rule is [`no-trailing-spaces`](https://eslint.org/docs/rules/no-trailing-spaces)

##### Options

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

## License

[MIT](https://vjpr.mit-license.org)

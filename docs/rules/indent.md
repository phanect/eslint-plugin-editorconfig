# Enforce EditorConfig rules for indentation (`editorconfig/indent`)

The corresponding EditorCongig property is `indent_style` and `indent_size`.
The backend ESLint rule is [`indent`](https://eslint.org/docs/rules/indent) and [`@typescript-eslint/indent`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md).

As documented, `@typescript-eslint/indent` is unstable currently. Please read typescript-eslint/typescript-eslint#1824 before using this rule for TypeScript.

## Options

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

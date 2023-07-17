# Enforce EditorConfig rules for the newlines at the end of files (`editorconfig/eol-last`)

The corresponding EditorCongig property is `insert_final_newline`.
The backend ESLint rule is [`eol-last`](https://eslint.org/docs/rules/eol-last)

If you set `insert_final_newline = true` in .editorconfig, the files **must** ends with a new line.  
If you set `insert_final_newline = false` in .editorconfig, the files **must not** ends with a new line.  
If you don't set `insert_final_newline` in .editorconfig or set `insert_final_newline = unset`, this rule is disabled.

## Options

None

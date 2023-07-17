# Enforce EditorConfig rules for linebreak style (`editorconfig/linebreak-style`)

The corresponding EditorCongig property is `end_of_line`.
The backend ESLint rule is [`linebreak-style`](https://eslint.org/docs/rules/linebreak-style)

If you set `end_of_line = lf` in .editorconfig, the linebreak code **must** be LF.  
If you set `end_of_line = crlf` in .editorconfig, the linebreak code **must** be CRLF.  
If you don't set `end_of_line` in .editorconfig or set `end_of_line = unset`, this rule is disabled.

`end_of_line = cr` is not supported. When `end_of_line = cr` is specified in .editorconfig, This plugin does nothing.

## Options

None

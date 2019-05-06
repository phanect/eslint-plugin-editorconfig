/**
 * @fileoverview Report and fix EditorConfig rule violation
 * @author Jumpei Ogawa
 */
"use strict";

const editorconfig = require("editorconfig");
const eslint = require("eslint");

module.exports = {
  meta: {
    docs: {
      description: "Report and fix EditorConfig rule violation",
      category: "Stylistic Issues",
      recommended: false,
    },
    fixable: "code",
    schema: [{
      type: "object",
      additionalProperties: false,
      properties: {
        indent: {
          type: "object",
        },
        "no-trailing-spaces": {
          type: "object",
        },
      },
    }],
  },

  create: function(context) {
    const src = context.getSourceCode();
    const ecParams = editorconfig.parseSync(context.getFilename());

    return {
      Program: () => {
        const code = src.getText();
        const linter = new eslint.Linter();
        const options = Object.assign({}, ...context.options);
        const config = {
          parserOptions: context.parserOptions,
          rules: {},
        };

        if (ecParams.indent_style === "space") {
          config.rules.indent = [
            "error",
            ecParams.indent_size,
            (options && options.indent) ? options.indent : null,
          ];
        } else if (ecParams.indent_style === "tab") {
          config.rules.indent = [
            "error",
            "tab",
            (options && options.indent) ? options.indent : null,
          ];
        }

        if (ecParams.end_of_line === "lf") {
          config.rules["linebreak-style"] = [ "error", "unix" ];
        } else if (ecParams.end_of_line === "crlf") {
          config.rules["linebreak-style"] = [ "error", "windows" ];
        }

        if (ecParams.charset === "utf-8") {
          config.rules["unicode-bom"] = [ "error", "never" ];
        } else if (ecParams.charset === "utf-8-bom") {
          config.rules["unicode-bom"] = [ "error", "always" ];
        }

        if (ecParams.trim_trailing_whitespace) {
          config.rules["no-trailing-spaces"] = [
            "error",
            (options && options["no-trailing-spaces"]) ? options["no-trailing-spaces"] : null,
          ];
        }

        if (ecParams.insert_final_newline === true) {
          config.rules["eol-last"] = [ "error", "always" ];
        } else if (ecParams.insert_final_newline === false) {
          // If "false" is specified, remove last line
          config.rules["eol-last"] = [ "error", "never" ];
        } // If nothing specified, keep as-is

        const messages = linter.verify(code, config);

        if (messages.length > 0) {
          for (const message of messages) {
            context.report({
              message: `EditorConfig: ${message.message}`,
              loc: {
                start: {
                  line: message.line,
                  column: message.column,
                },
              },
              fix: function(fixer) {
                return fixer.replaceTextRange(
                  [ 0, code.length ], // replace all the text
                  linter.verifyAndFix(code, config).output
                );
              },
            });
          }
        }
      },
    };
  },
};

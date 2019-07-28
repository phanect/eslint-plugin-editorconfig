/**
 * @fileoverview Report and fix EditorConfig rule violation
 * @author Jumpei Ogawa
 */
"use strict";

const editorconfig = require("editorconfig");
const eslint = require("eslint");

const CLIEngine = eslint.CLIEngine;
const linter = new eslint.Linter();
const rules = linter.getRules();

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
        indent: rules.get("indent").meta.schema[1],
        "no-trailing-spaces": rules.get("no-trailing-spaces").meta.schema[0],
      },
    }],
  },

  create: function(context) {
    const src = context.getSourceCode();
    const ecParams = editorconfig.parseSync(context.getFilename());

    return {
      Program: () => {
        const code = src.getText();
        const options = Object.assign({}, ...context.options);
        const config = {
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

        //
        // Lint
        //
        const cli = new CLIEngine({
          allowInlineConfig: false,
          parser: context.parserPath,
          parserOptions: context.parserOptions,
          rules: config.rules,
          useEslintrc: false,
        });
        const { results } = cli.executeOnText(code);

        if (results.length > 0) {
          for (const result of results) {
            for (const message of result.messages) {
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
                    message.fix.range,
                    message.fix.text,
                  );
                },
              });
            }
          }
        }
      },
    };
  },
};

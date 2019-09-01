/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
"use strict";

const editorconfig = require("editorconfig");
const eslint = require("eslint");

const CLIEngine = eslint.CLIEngine;
const linter = new eslint.Linter();
const ruleDefinitions = linter.getRules();

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
        indent: ruleDefinitions.get("indent").meta.schema[1],
        "no-trailing-spaces": ruleDefinitions.get("no-trailing-spaces").meta.schema[0],
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
        const rules = {};

        if (ecParams.indent_style === "space") {
          rules.indent = [
            "error",
            ecParams.indent_size,
          ];

          if (options && options.indent) {
            rules.indent.push(options.indent);
          }
        } else if (ecParams.indent_style === "tab") {
          rules.indent = [
            "error",
            "tab",
          ];

          if (options && options.indent) {
            rules.indent.push(options.indent);
          }
        }

        if (ecParams.end_of_line === "lf") {
          rules["linebreak-style"] = [ "error", "unix" ];
        } else if (ecParams.end_of_line === "crlf") {
          rules["linebreak-style"] = [ "error", "windows" ];
        }

        if (ecParams.charset === "utf-8") {
          rules["unicode-bom"] = [ "error", "never" ];
        } else if (ecParams.charset === "utf-8-bom") {
          rules["unicode-bom"] = [ "error", "always" ];
        }

        if (ecParams.trim_trailing_whitespace) {
          rules["no-trailing-spaces"] = [ "error" ];

          if (options && options["no-trailing-spaces"]) {
            rules["no-trailing-spaces"].push(options["no-trailing-spaces"]);
          }
        }

        if (ecParams.insert_final_newline === true) {
          rules["eol-last"] = [ "error", "always" ];
        } else if (ecParams.insert_final_newline === false) {
          // If "false" is specified, remove last line
          rules["eol-last"] = [ "error", "never" ];
        } // If nothing specified, keep as-is

        //
        // Lint
        //
        const cli = new CLIEngine({
          allowInlineConfig: false,
          parser: context.parserPath,
          parserOptions: context.parserOptions,
          rules: rules,
          useEslintrc: false,
        });
        const { results } = cli.executeOnText(code);

        if (results.length > 0) {
          for (const result of results) {
            for (const message of result.messages) {
              if (message.ruleId === null) {
                continue;
              }

              const descriptor = {
                message: `EditorConfig: ${message.message}`,
                loc: {
                  start: {
                    line: message.line,
                    column: message.column,
                  },
                },
              };

              if (message.fix) {
                descriptor.fix = (fixer) => fixer.replaceTextRange(
                  message.fix.range,
                  message.fix.text,
                );
              }

              context.report(descriptor);
            }
          }
        }
      },
    };
  },
};

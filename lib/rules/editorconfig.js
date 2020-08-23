/**
 * @file Report and fix EditorConfig rule violation.
 * @author Jumpei Ogawa
 */
"use strict";

const { deepMerge } = require("@phanect/utils");
const editorconfig = require("editorconfig");
const { ESLint, Linter } = require("eslint");

const linter = new Linter();
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
    const options = Object.assign({}, ...context.options);

    const indent = ruleDefinitions.get("indent");
    const indentContext = context; // TODO clone
    indentContext.options = [];

    if (ecParams.indent_style === "space") {
      indentContext.options.push(ecParams.indent_size);
    } else if (ecParams.indent_style === "tab") {
      indentContext.options.push("tab");
    }

    if (options && options.indent) {
      indentContext.options.push(options.indent);
    }
    const indentEvents = indent.create(indentContext);

    return indentEvents;

    return {
      Program: () => {
        const code = src.getText();
        const options = Object.assign({}, ...context.options);
        const rules = {};

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
        const eslint = new ESLint({
          allowInlineConfig: false,
          overrideConfig: {
            parser: context.parserPath,
            parserOptions: context.parserOptions,
            rules,
          },
        });

        (async () => {
          const results = await eslint.lintText(code);

          if (results.length > 0) {
            for (const result of results) {
              for (const message of result.messages) {
  console.log(JSON.stringify(message, null, 2))
                if (message.ruleId === null) {
                  continue;
                }

                context.report({
                  message: `EditorConfig: ${message.message}`,
                  loc: {
                    start: {
                      line: message.line,
                      column: message.column,
                    },
                    end: {
                      line: message.endLine,
                      column: message.endColumn,
                    },
                  },
                  fix: message.fix,
                });
              }
            }
          }
        })();
      },
    };
  },
};

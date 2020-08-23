"use strict";

const ecParams = editorconfig.parseSync(context.getFilename());


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



module.exports = {
  rules: {
    editorconfig: require("./lib/rules/editorconfig"),
  },
  configs: {
    noconflict: {
      rules: {
        "eol-last": "off",
        indent: "off",
        "linebreak-style": "off",
        "no-trailing-spaces": "off",
        "unicode-bom": "off",
      },
    },
  },
};

import { dirname } from "node:path"
import { lstatSync as lstat } from "node:fs"
import { type Props as EditorConfigProps, parseSync as parseEditorConfig } from "editorconfig"
import type { UnprefixedRuleOptions } from "@stylistic/eslint-plugin/rule-options"

type ESLintRuleName = "eol-last" | "indent" | "jsx-indent-props" | "linebreak-style" | "no-trailing-spaces"

type ESLintConfig = {
  "eol-last"?: Exclude<UnprefixedRuleOptions["eol-last"][0], 'unix' | 'windows'>;
  "indent"?: UnprefixedRuleOptions["indent"][0];
  "jsx-indent-props"?: Exclude<UnprefixedRuleOptions["jsx-indent-props"][0], object>
  "linebreak-style"?: UnprefixedRuleOptions["linebreak-style"][0];
  "no-trailing-spaces"?: true;
}

interface RedirectDirPath {
  redirectTo: string
}
type CacheValue = ESLintConfig | RedirectDirPath
interface Cache {
  [fileOrDirPath: string]: CacheValue | undefined
}

interface LoadCacheParams {
  targetDirName: string
}

interface GetOptionsOptions<RuleName extends ESLintRuleName> {
  lintTargetPath: string
  fallback?: ESLintConfig[RuleName]
}

const rulesVsProps = {
  "eol-last": "insert_final_newline",
  "indent": ["indent_style", "indent_size"],
  "jsx-indent-props": ["indent_style", "indent_size"],
  "linebreak-style": "end_of_line",
  "no-trailing-spaces": "trim_trailing_whitespace",
};

class OptionsLoader {
  #cache: Cache = {}

  getOptions<RuleName extends ESLintRuleName>(
    ruleName: RuleName, {
      lintTargetPath,
      fallback
    }: GetOptionsOptions<RuleName>
  ): NonNullable<ESLintConfig[RuleName]> {
    const eslintOption = (this.#getCache(lintTargetPath))[ruleName]

    if (eslintOption) {
      return eslintOption
    }
    else if (fallback) {
      return fallback
    }
    else {
      throw new Error(
        `Set ${rulesVsProps[ruleName]} in .editorconfig or \`fallback\` option for ${ruleName} of ESLint rule. You have to set one of them. If you want to disable the rule when ${rulesVsProps[ruleName]} is not set in .editorconfig, set \`fallback: "off"\`.`,
        { cause: "NO_FALLBACK_AND_EDITORCONFIG" },
      )
    }
  }

  #getCache(lintTargetPath: string): ESLintConfig {
    const cachedESLintConfig = this.#cache[lintTargetPath]

    if (cachedESLintConfig === undefined) {
      const eslintConfigs = this.#loadConfigs({ targetDirName: lintTargetPath })
      this.#setCache(lintTargetPath, eslintConfigs)
      return eslintConfigs
    }
    else if (this.#isRedirectDirPath(cachedESLintConfig)) {
      return this.#getCache(cachedESLintConfig.redirectTo)
    }
    else {
      return cachedESLintConfig
    }
  }

  #setCache(lintTargetPath: string, eslintConfigOrTargetDirPath: CacheValue) {
    if (lstat(lintTargetPath).isDirectory()) {
      this.#cache[lintTargetPath] = eslintConfigOrTargetDirPath
    }
    else {
      const lintTargetDirName = dirname(lintTargetPath)
      this.#cache[lintTargetPath] = { redirectTo: lintTargetDirName }
    }
  }

  #isRedirectDirPath(cacheValue: CacheValue): cacheValue is RedirectDirPath {
    return "redirectTo" in cacheValue && typeof cacheValue.redirectTo === "string"
  }

  #convertToESLintRules(ecParams: EditorConfigProps): ESLintConfig {
    let eolLast: ESLintConfig["eol-last"]
    let indent: ESLintConfig["indent"]
    let lineBreakStyle: ESLintConfig["linebreak-style"]
    let noTrailingSpaces: ESLintConfig["no-trailing-spaces"]

    //
    // insert_final_newline -> eol-last
    //
    if (ecParams.insert_final_newline === true)
      eolLast = "always"
    else if (ecParams.insert_final_newline === false)
      eolLast = "never"

    //
    // indent_style & indent_size -> indent
    //
    if (ecParams.indent_style === "space") {
      if (typeof ecParams.indent_size !== "number") {
        if (ecParams.indent_size === undefined || ecParams.indent_size === null) {
          throw new Error(`indent_size is required but not set. Please set any number to indent_size in your .editorconfig.`)
        }
        else { // if (ecParams.indent_size === "tab" || ecParams.indent_size === "unset")
          throw new Error(`You cannot set indent_style = "space" and indent_size = "${ecParams.indent_size}" at the same time. Please set any number to indent_size in your .editorconfig.`)
        }
      }

      indent = typeof ecParams.indent_size === "number"
        ? ecParams.indent_size
        : undefined
    }
    else if (ecParams.indent_style === "tab") {
      indent = "tab"
    }

    //
    // end_of_line -> linebreak-style
    //
    if (ecParams.end_of_line === "lf")
      lineBreakStyle = "unix"
    else if (ecParams.end_of_line === "crlf")
      lineBreakStyle = "windows"

    //
    // trim_trailing_whitespace -> no-trailing-spaces
    //
    if (ecParams.trim_trailing_whitespace === true) {
      noTrailingSpaces = ecParams.trim_trailing_whitespace
    }
    else { // if ecParams.trim_trailing_whitespace === (false || "unset" || undefined)
      noTrailingSpaces = undefined
    }

    return {
      "eol-last": eolLast,
      indent,
      "linebreak-style": lineBreakStyle,
      "no-trailing-spaces": noTrailingSpaces,
    }
  }

  #loadConfigs({ targetDirName }: LoadCacheParams): ESLintConfig {
    const ecParams = parseEditorConfig(targetDirName)
    return this.#convertToESLintRules(ecParams)
  }
}

// export as singleton to avoid loading the same .editorconfig twice or more.
const optionsLoader = new OptionsLoader()

export { optionsLoader }

export function message(ruleName: ESLintRuleName): string {
  const editorConfigPropNames: string | string[] = rulesVsProps[ruleName]
  const editorConfigPropName: string = Array.isArray(editorConfigPropNames) ? editorConfigPropNames.join("` and `") : editorConfigPropNames

  return `\`${editorConfigPropName}\` is not set in .editorconfig and \`fallback\` option is not given either. Set one of them.`
}

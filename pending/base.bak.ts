// type Fallback = "useFirstOption" | [ "on", "off" ];
// type BuildFallbackSchemaOptions = { baseRuleName: BaseRuleName, fallback: Fallback };

// const buildFallbackSchema = (
//   originalSchema: JSONSchema4[],
//   { baseRuleName, fallback }: BuildFallbackSchemaOptions
// ): JSONSchema4 => {
//   if (fallback === "useFirstOption") {
//     if (originalSchema[0] === undefined) {
//       throw new Error(`Could not retrieve the first option from meta.schema of ${baseRuleName}. Sorry, this is probably a bug of eslint-plugin-editorconfig.`);
//     }

//     return {
//       ...originalSchema[0],
//       enum: [
//         ...(originalSchema[0].enum ?? []),
//         "off",
//       ],
//     };
//   } else if (originalSchema.length === 1 && originalSchema[0].type === "object" && originalSchema[0]?.properties?.fallback) {
//     return {
//       ...originalSchema[0],
//       enum: [
//         ...(fallbackSchema.enum ?? []),
//         "off",
//       ],
//     }
//   } else {
//     {}
//   }
// };






  try {
    if (useTsRule === true) {
      tsBaseRule = (await import(`@stylistic/eslint-plugin-ts/rules/${baseRuleName}`)).default;

      if (!tsBaseRule) {
        const err: NodeJS.ErrnoException = new Error(undefined, { cause: "ERR_INVALID_RULE_NAME" });
        throw err;
      }
    }
  } catch (err) {
    if (
      isNodeJsError(err) && (
        err.code === "MODULE_NOT_FOUND" ||
        err.code === "ERR_PACKAGE_PATH_NOT_EXPORTED" ||
        err.cause === "ERR_INVALID_RULE_NAME"
      )
    ) {
      throw new Error(`Could not import rule "${baseRuleName}" from @stylistic/eslint-plugin-ts. This may be a bug of eslint-plugin-editorconfig. Sorry for the inconvenience.`);
    } else {
      throw err;
    }
  }

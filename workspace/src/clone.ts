/* eslint no-use-before-define: "off" */
/*
 * This file is a modified version of klona/full (https://github.com/lukeed/klona).
 * Licensed under MIT.
 */

import type { Rule } from "eslint";

function set(
  obj: Record<string | number | symbol, unknown>,
  key: string | number | symbol,
  overwrite: Record<string | number | symbol, unknown> = {},
) {
  const val = Object.getOwnPropertyDescriptor(obj, key);

  if (Object.keys(overwrite).includes(key as string)) {
    obj[key] = overwrite[key];
    return;
  }

  if (typeof val?.value === "object") {
    val.value = klona(val.value);
  }
  if (!val?.enumerable || val.get || val.set || !val.configurable || !val.writable || key === "__proto__") {
    Object.defineProperty(obj, key, val);
  } else {
    obj[key] = val.value;
  }
}

function klona(x: Rule.RuleContext | Record<string | number | symbol, unknown>, overwrite = {}) {
  if (typeof x !== "object") {
    return x;
  }

  const tmp = Object.create(
    (x as Rule.RuleContext & { __proto__: unknown; }).__proto__ ?? null
  ) as Record<string | number | symbol, unknown>;

  if (tmp) {
    for (let i = 0, list = Object.getOwnPropertySymbols(x); i < list.length; i++) {
      set(tmp, list[i]);
    }

    for (let i = 0, list = Object.getOwnPropertyNames(x), k = list[i]; i < list.length; i++) {
      if (Object.hasOwnProperty.call(tmp, k) && tmp[k] === ((x as unknown as Record<string, unknown>)[k])) {
        continue;
      }
      set(tmp, k, overwrite);
    }
  }

  return tmp || x;
}

export const clone = klona;

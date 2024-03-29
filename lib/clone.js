/* eslint no-use-before-define: "off" */
/*
 * This file is a modified version of klona/full (https://github.com/lukeed/klona).
 * Licensed under MIT.
 */
"use strict";

function set(obj, key, val, overwrite) {
  const overwriteKeys = Object.keys(overwrite);
  if (overwriteKeys.includes(key)) {
    obj[key] = overwrite[key];
    return;
  }

  if (typeof val.value === "object") {
    val.value = klona(val.value);
  }
  if (!val.enumerable || val.get || val.set || !val.configurable || !val.writable || key === "__proto__") {
    Object.defineProperty(obj, key, val);
  } else {
    obj[key] = val.value;
  }
}

function klona(x, overwrite = {}) {
  if (typeof x !== "object") {
    return x;
  }

  const str = Object.prototype.toString.call(x);
  let i = 0;
  let k;
  let list;
  let tmp;

  if (str === "[object Object]") {
    tmp = Object.create(x.__proto__ || null);
  } else if (str === "[object Array]") {
    tmp = Array(x.length);
  } else if (str === "[object Set]") {
    tmp = new Set;
    x.forEach((val) => {
      tmp.add(klona(val));
    });
  } else if (str === "[object Map]") {
    tmp = new Map;
    x.forEach((val, key) => {
      tmp.set(klona(key), klona(val));
    });
  } else if (str === "[object Date]") {
    tmp = new Date(+x);
  } else if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
  } else if (str === "[object DataView]") {
    tmp = new x.constructor(klona(x.buffer));
  } else if (str === "[object ArrayBuffer]") {
    tmp = x.slice(0);
  } else if (str.slice(-6) === "Array]") {
    // ArrayBuffer.isView(x)
    // ~> `new` bcuz `Buffer.slice` => ref
    tmp = new x.constructor(x);
  }

  if (tmp) {
    for (list=Object.getOwnPropertySymbols(x); i < list.length; i++) {
      set(tmp, list[i], Object.getOwnPropertyDescriptor(x, list[i]));
    }

    for (i=0, list=Object.getOwnPropertyNames(x); i < list.length; i++) {
      if (Object.hasOwnProperty.call(tmp, k=list[i]) && tmp[k] === x[k]) {
        continue;
      }
      set(tmp, k, Object.getOwnPropertyDescriptor(x, k), overwrite);
    }
  }

  return tmp || x;
}

module.exports = { clone: klona };

import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    main: "src/main.ts",
  },
  target: "node18",
  format: "esm",

  dts: true,
  sourcemap: false,

  treeshake: true,
  minify: false,
  splitting: false,
  clean: true,
});

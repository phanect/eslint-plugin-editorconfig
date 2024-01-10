import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [ "./src/main" ],
  declaration: true,
  rollup: {
    esbuild: {
      target: [
        "es2022",
        "node18",
      ],
    },
  },
});

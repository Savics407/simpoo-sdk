import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import strip from "@rollup/plugin-strip";
import typescript from "@rollup/plugin-typescript";
import { dts } from "rollup-plugin-dts";
import packageJson from "./package.json";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import url from "@rollup/plugin-url";
import copy from "rollup-plugin-copy";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "es",
        sourcemap: true,
      },
    ],
    external: ["fs", "path"],
    plugins: [
      peerDepsExternal(),
      strip({
        include: ["**/*.ts", "**/*.tsx"],
        functions: [
          "console.error",
          "console.warn",
          "console.info",
          "console.debug",
        ],
      }),
      resolve({
        browser: true, // ✅ Prefer browser-compatible code
      }),
      commonjs(),
      json(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      postcss({
        extract: true,
        minimize: true,
      }),
      url({
        include: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.jpeg"],
        limit: 8192, // Files under 8kb inlined as Base64
        emitFiles: true, // Output larger files to dist
        fileName: "assets/[name][hash][extname]", // Store in dist/assets
      }),
      copy({
        targets: [{ src: "src/assets/images/*", dest: "dist/assets/images" }],
      }),
    ],
  },
  {
    input: "dist/index.d.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "es",
      },
    ],
    plugins: [dts()],
    external: [/\.css$/], // ✅ Ignore CSS
  },
];

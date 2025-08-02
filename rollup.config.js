import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/embed.tsx",
  output: {
    file: "dist/simpoo-sdk.js",
    format: "umd",
    name: "SimpooSDK",
    sourcemap: true,
  },
  plugins: [
    resolve({ browser: true, extensions: [".js", ".jsx", ".ts", ".tsx"] }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    postcss({
      extract: "simpoo-sdk.css",
      minimize: true,
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    terser(),
  ],
};

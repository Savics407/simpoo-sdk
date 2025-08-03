import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import url from "@rollup/plugin-url";

const isProd = process.env.NODE_ENV === "production";
export default {
  input: "src/embed.tsx",
  output: {
    file: "dist/simpoo-sdk.js",
    format: "umd",
    name: "SimpooSDK",
    sourcemap: isProd,
  },
  plugins: [
    resolve({ browser: true, extensions: [".js", ".jsx", ".ts", ".tsx"] }),
    commonjs(),
    esbuild({
      target: "es2018", // Or ESNext
      jsx: "automatic", // For React JSX transform
    }),
    postcss({
      extract: "simpoo-sdk.css",
      minimize: true,
    }),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify(
        isProd ? "production" : "development"
      ),
    }),
    url({
      include: ["**/*.svg", "**/*.png", "**/*.jpg", "**/*.jpeg"],
      limit: 0, // don't inline, emit as file
      emitFiles: true,
      fileName: "assets/[name][hash][extname]",
      destDir: "dist",
      publicPath: isProd
        ? "https://unpkg.com/@simpoobusiness/sdk/dist/"
        : "./assets/",
    }),
    isProd && terser(),
  ],
};

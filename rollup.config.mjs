import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import filesize from "rollup-plugin-filesize";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        dir: "dist",
        format: "esm",
        sourcemap: true,
        preserveModules: true,
      },
    ],
    plugins: [peerDepsExternal(), resolve(), typescript(), filesize()],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.umd.js",
      format: "umd",
      name: "ReactAuthTool",
      sourcemap: true,
      globals: {
        react: "React",
        "react-router-dom": "ReactRouterDOM",
      },
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "tsconfig.json",
      }),
      terser(),
      filesize(),
    ],
    external: ["react", "react-router-dom"],
  },
];

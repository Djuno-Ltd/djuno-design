import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import filesize from 'rollup-plugin-filesize'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
// import css from 'rollup-plugin-import-css'

const makeSourcemap = false
const minimizeCss = true

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: makeSourcemap,
        preserveModules: false,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript(),
      postcss({
        extract: true,
        minimize: minimizeCss,
      }),
      terser({
        compress: {
          passes: 20,
          drop_console: true,
          ecma: 2018,
        },
        output: {
          ecma: 5,
          comments: false,
        },
      }),
      filesize(),
      // css({ inject: true }),
    ],
    external: ['react', 'react-dom'],
  },
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'DjunoDesign',
      sourcemap: makeSourcemap,
      globals: {
        react: 'React',
        'react-router-dom': 'ReactRouterDOM',
      },
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.json',
      }),
      postcss({
        extract: true,
        minimize: minimizeCss,
      }),
      terser({
        compress: {
          passes: 20,
          drop_console: true,
          ecma: 2018,
        },
        output: {
          ecma: 5,
          comments: false,
        },
      }),
      filesize(),
      // css({ inject: true }),
    ],
    external: ['react', 'react-dom'],
  },
]

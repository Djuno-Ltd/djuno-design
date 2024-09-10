import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import filesize from 'rollup-plugin-filesize'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
// import css from 'rollup-plugin-import-css'
import svgr from '@svgr/rollup'
import url from '@rollup/plugin-url'

const makeSourcemap = false
const minimizeCss = true
const drop_console = true

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
    onwarn(warning, warn) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        return
      }
      warn(warning)
    },
    plugins: [
      url(),
      svgr({ icon: true, dimensions: false }),
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
          drop_console,
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
    onwarn(warning, warn) {
      if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
        return
      }
      warn(warning)
    },
    plugins: [
      url(),
      svgr({ icon: true, dimensions: false }),
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
          drop_console,
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

import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import filesize from 'rollup-plugin-filesize'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        dir: 'dist',
        format: 'esm',
        sourcemap: true,
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
        minimize: true,
      }),
      filesize(),
    ],
  },
  {
    input: 'src/index.tsx',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'DjunoDesign',
      sourcemap: true,
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
        minimize: true,
      }),
      terser(),
      filesize(),
    ],
    external: ['react', 'react-router-dom'],
  },
]

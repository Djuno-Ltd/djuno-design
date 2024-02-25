module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    // 'prettier/@typescript-eslint',
    // 'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {},
  ignorePatterns: ['demo', 'dist', 'rollup.config.js', 'rollup.config.mjs'],
  plugins: ['@typescript-eslint', 'import'],
}

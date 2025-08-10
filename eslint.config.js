const js = require('@eslint/js');
const ts = require('typescript-eslint');
const prettier = require('eslint-config-prettier');

module.exports = [
  { ignores: ['eslint.config.js'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  prettier,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },
];

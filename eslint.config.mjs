import globals from 'globals'
import { defineConfig } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import stylistic from '@stylistic/eslint-plugin'

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node, ...globals.es2021 },
      ecmaVersion: 'latest',
    },
    plugins: {
      import: importPlugin,
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/indent': ['error', 2],
      '@stylistic/linebreak-style': ['error', 'unix'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/semi': ['error', 'never'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
  },
  prettierConfig,
])

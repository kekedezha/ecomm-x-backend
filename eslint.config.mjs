import js from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  // Ignore dist and node_modules
  {
    ignores: ['dist/**', 'node_modules/**'],
  },

  // Base JS files config
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    languageOptions: {
      sourceType: 'module',
      globals: globals.node,
    },
    extends: ['js/recommended', prettier],
  },

  // Jest test files config
  {
    files: ['**/*.test.js', '**/__tests__/**/*.js'],
    plugins: { jest },
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
    },
  },
]);

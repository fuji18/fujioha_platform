import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import astroPlugin from 'eslint-plugin-astro';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  prettierConfig,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '**/node_modules/**',
      'dist/**',
      '**/dist/**',
      '.astro/**',
      '**/.astro/**',
      '.steering/**',
      'docs/ideas/**',
    ],
  }
);

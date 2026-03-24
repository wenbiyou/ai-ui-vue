import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginTypeScript from '@typescript-eslint/eslint-plugin'
import parserVue from 'vue-eslint-parser'
import parserTypeScript from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '**/dist/**',
      'docs/.vitepress/**',
      'docs/.vitepress/cache/**',
      'docs/.vitepress/dist/**',
      '**/*.d.ts',
      '**/*.example.vue',
      'examples/**',
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLCanvasElement: 'readonly',
        requestAnimationFrame: 'readonly',
        cancelAnimationFrame: 'readonly',
        console: 'readonly',
      },
    },
  },
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: parserTypeScript,
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: parserTypeScript,
    },
    plugins: {
      '@typescript-eslint': pluginTypeScript,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
  eslintConfigPrettier,
]

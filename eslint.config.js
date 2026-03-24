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
        HTMLDivElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        CanvasRenderingContext2D: 'readonly',
        KeyboardEvent: 'readonly',
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
    plugins: {
      '@typescript-eslint': pluginTypeScript,
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-unused-vars': 'off', // 禁用默认的 no-unused-vars，使用 @typescript-eslint/no-unused-vars
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
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
      'no-unused-vars': 'off', // 禁用默认的 no-unused-vars，使用 @typescript-eslint/no-unused-vars
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  eslintConfigPrettier,
]

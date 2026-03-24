import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  root: './',
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'AiUiVue',
      fileName: (format) => `ai-ui-vue.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      'ai-ui-vue': resolve(__dirname, 'packages'),
      '@': resolve(__dirname, 'packages'),
      '@examples': resolve(__dirname, 'examples')
    }
  },
  server: {
    port: 5173,
    open: false
  }
})

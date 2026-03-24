import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve('./', 'packages/index.ts'),
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
      'ai-ui-vue': resolve('./', 'packages'),
      '@': resolve('./', 'packages'),
      '@examples': resolve('./', 'examples')
    }
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: false
  }
})

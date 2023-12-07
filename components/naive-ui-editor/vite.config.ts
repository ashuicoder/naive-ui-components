import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), dts()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  esbuild: {
    drop: ['console', 'debugger']
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      formats: ['es'],
      fileName: (format, entryName) => {
        return `${entryName}.js`
      }
    },
    rollupOptions: {
      external: ['vue', 'naive-ui']
    }
  }
})

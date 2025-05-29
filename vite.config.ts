import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      copyDtsFiles: false
    })
  ],
  build: process.env.NODE_ENV === 'production' ? {
    lib: {
      entry: './src/index.ts',
      name: 'jelly-flex',
      fileName: 'jelly-flex',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue']
    }
  } : {}
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      // 包含 src 目录
      include: ['src/**/*.ts', 'src/**/*.d.ts', 'src/**/*.vue'],
      // 复制 .d.ts 文件
      copyDtsFiles: true,
      // 入口根目录
      entryRoot: 'src',
      // 输出目录
      outDir: 'dist',
      // 在输出中插入类型入口
      insertTypesEntry: true,
      // 使用 tsconfig.app.json
      tsconfigPath: './tsconfig.app.json',
    })
  ],
  build: process.env.NODE_ENV === 'production' ? {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'JellyUI',
      fileName: 'jelly-flex',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['vue']
    }
  } : {}
})

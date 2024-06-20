import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(),react()],
  resolve: {
    alias: {
      events: 'events', // 使用 events 模块的 polyfill
    },
  },
})


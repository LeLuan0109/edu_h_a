import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import 'dotenv/config'
// https://vitejs.dev/config/
export default defineConfig({
  // cho phep vite su dung process.env
  // https://github.com/vitejs/vite/issues/1973
  plugins: [
    react()
  ],
  define: {
    'process.env': process.env
  },
  base: './',
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 3030,
    hmr: {
      host: 'localhost',
      port: 3030,
    }
  },
  build: {
    outDir: 'build',
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
      include: '**/*.(tsx|jsx|ts|js|css|scss)'
    }),
  ],
})
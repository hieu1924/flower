import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/flower/', // GitHub Pages base path - change 'flower' to your repo name
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})

import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 项目站子路径：https://<username>.github.io/my-website/
  base: '/my-website/',
  plugins: [react(), tailwindcss()],
})

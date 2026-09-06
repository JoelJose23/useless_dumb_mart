import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { copyFileSync, existsSync, writeFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'github-pages-spa',
      closeBundle() {
        const distIndex = resolve('dist/index.html')
        const dist404 = resolve('dist/404.html')
        const distNoJekyll = resolve('dist/.nojekyll')
        if (existsSync(distIndex)) {
          copyFileSync(distIndex, dist404)
        }
        writeFileSync(distNoJekyll, '')
      },
    },
  ],
  base: process.env.BASE_URL || '/useless_dumb_mart/',
})

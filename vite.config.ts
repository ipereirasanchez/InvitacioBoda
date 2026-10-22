import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  // Nom del repositori de GitHub Pages: https://<usuari>.github.io/InvitacioBoda/
  base: '/InvitacioBoda/',
  // SVG com a component React: import Logo from './logo.svg?react'
  plugins: [react(), tailwindcss(), svgr()],
})

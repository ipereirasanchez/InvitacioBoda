import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Nom del repositori de GitHub Pages: https://<usuari>.github.io/InvitacioBoda/
  base: '/InvitacioBoda/',
  plugins: [react(), tailwindcss()],
})

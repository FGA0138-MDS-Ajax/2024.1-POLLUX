import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // endereço, por exemplo, '0.0.0.0' para aceitar conexões externas
    port: 80 // porta desejada
  }
})

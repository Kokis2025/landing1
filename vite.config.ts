import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Vercel y otros entornos de despliegue inyectan variables de entorno en process.env
    // Esta línea hace que 'process.env' esté disponible en tu código de cliente.
    'process.env': process.env
  }
})

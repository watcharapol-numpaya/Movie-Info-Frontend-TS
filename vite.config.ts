import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allows the server to listen on all available network interfaces
    port: 5173,      // Make sure this port matches the one you want to use (e.g., 5173)
  },
})
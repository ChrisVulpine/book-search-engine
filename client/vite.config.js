import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {

    // For Local Work
    // port: 3000,
    // open: true,
    proxy: {
      '/graphql': {
        target: 'book-search-engine-v6z4.onrender.com',
        // For local work >> target: 'http://localhost:3000',

        secure: false,
        changeOrigin: true
      }
    }
  }
});
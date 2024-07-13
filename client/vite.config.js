import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // port: 3000,
    // open: true,
    proxy: {
      '/graphql': {
        target: 'book-search-engine-v6z4.onrender.com', // Correct target URL
        // target: 'http://localhost:3000', // Correct target URL

        secure: false,
        changeOrigin: true
      }
    }
  }
});


// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 3000,
//     open: true,
//     proxy: {
//       '/graphql': {
//         target: 'http://localhost:3001',
//         secure: false,
//         changeOrigin: true,
//       }
//     }
//   }
// })

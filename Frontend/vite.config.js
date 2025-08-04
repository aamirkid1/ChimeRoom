// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     // host: '0.0.0.0',
//     port: 3001,
//     proxy: {
//       "/api": {

//         target: "http://localhost:5002",
//         // target: "http://10.71.17.41:5002",

//         changeOrigin: true,
        
//       },
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:5002', // your backend port
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

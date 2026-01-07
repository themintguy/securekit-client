import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from "fs";


export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    https: {
      key: fs.readFileSync("./cert/localhost-key.pem"),
      cert: fs.readFileSync("./cert/localhost-cert.pem"),
    },
    host: '0.0.0.0',
    port: 5173,
    // proxy: {
    //   '/api': {
    //     target: 'https://api1.k31.tech',
    //     changeOrigin: true,
    //     secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //     configure: (proxy) => {
    //       proxy.on('proxyReq', (proxyReq) => {
    //         console.log('Proxying request:', proxyReq.method, proxyReq.path);
    //       });
    //     }
    //   }
    // }
  },
});

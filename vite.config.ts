import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  console.log('Current Mode:', mode);  // Logs the mode
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '')};
  console.log('Current Target:', process.env.VITE_API_URL);  // Logs the mode

  return defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_API_URL,
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          configure: (proxy, _options) => {
            // Log errors with the proxy
            proxy.on('error', (err, _req, _res) => {
              console.error('Proxy Error:', err);
            });

            // Log requests being sent to the target
            proxy.on('proxyReq', (_proxyReq, req, _res) => {
              console.log(`Sending Request to Target: ${req.method} ${req.url}`);
              console.log('Request Headers:', req.headers);
            });

            // Log responses received from the target
            proxy.on('proxyRes', (proxyRes, req, _res) => {
              console.log(`Received Response from Target: ${proxyRes.statusCode} ${req.url}`);
              // Optionally log the response body or headers
              console.log('Response Headers:', proxyRes.headers);
            });
          },
        },
      },
    }
  })
}


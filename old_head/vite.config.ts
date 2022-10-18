import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [
    react(),
    federation({
      name: "@rom/Head",
      filename: "remoteEntry.js",
      exposes: {
        "./ToolBar": "./src/App.tsx"
      }
    })
  ]
})

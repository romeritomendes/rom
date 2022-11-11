import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";
import path from 'path';

const deps = require("./package.json").dependencies;

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
      exclude: ['mono'],
    },
    plugins: [
      react(),
      federation({
        name: 'rom',
        filename: 'remoteEntry.js',
        exposes: {
          './TimeSheet': './src/components/TimeSheet/index.tsx',
          // './Calendar': './src/components/Calendar/index.tsx',
          // './ProjectForm': './src/components/ProjectForm/index.tsx'
        },
        shared: {
          ...deps,
          react: {
            eager: true,
            // singleton: true, //Adicionado 
            requiredVersion: deps.react,
          },
          'react-dom': {
            eager: true,
            // singleton: true, //Adicionado
            import: false, //Diferente
            requiredVersion: deps['react-dom'],
          },
        }
      }),
    ],
    build: {
      outDir: path.join(__dirname, 'build'),
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    }
  })
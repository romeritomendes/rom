import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from "@originjs/vite-plugin-federation";
import path from 'path';

const deps = require("./package.json").dependencies;

const outputDir = () => {

  const basename = path.basename(__dirname);
  const sufix = `nginx/www/${basename}.mycompany.com/public_html`;

  const dirname = __dirname.replace(basename, sufix);

  return dirname;
}

// https://vitejs.dev/config/ 
export default defineConfig({
    optimizeDeps: {
      exclude: ['mono'],
    },
    plugins: [
      react(),
      federation({
        name: 'rom-project',
        filename: 'remoteEntry.js',
        exposes: {
          './Project': './src/components/Project/index.tsx'
        },
        shared: {
          ...deps,
          react: {
            eager: true,
            // singleton: true,
            requiredVersion: deps.react
          },
          'react-dom': {
            eager: true,
            // singleton: true,
            import: false, //Diferente
            requiredVersion: deps['react-dom']
          },
        }
      }),
    ],
    build: {
      outDir: outputDir(),
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    }
  })
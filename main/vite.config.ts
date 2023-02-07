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
  server: {
    hmr: false,
  },
  optimizeDeps: {
    exclude: ['mono'],
  },
  plugins: [
    react(),
    federation({
      name: 'rom',
      // filename: 'remoteEntry.js',
      remotes: {
        rom_timesheet:    'http://timesheet.mycompany.com:6100/assets/remoteEntry.js',
        rom_project:      'http://project.mycompany.com:6100//assets/remoteEntry.js',
      },
      shared: {
        ...deps,
        react: {
          // eager: true,
          singleton: true,
          requiredVersion: deps.react
        },
        'react-dom': {
          // eager: true,
          singleton: true,
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

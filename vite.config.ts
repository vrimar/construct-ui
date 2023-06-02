import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CUI',
      formats: ['umd'],
      fileName: () => 'construct-ui.min.js'
    },
    outDir: 'lib',
    rollupOptions: {
      external: ['mithril'],
      output: {
        globals: {
          mithril: 'm'
        }
      }
    }
  }
});

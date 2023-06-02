import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    checker({
      typescript: true
    })
  ],
  test: {
    include: ['../src/**/*.spec.ts'],
    environment: 'jsdom',
    globals: true,
    setupFiles: [resolve(__dirname, 'setup.ts')],
    reporters: 'dot'
  }
});

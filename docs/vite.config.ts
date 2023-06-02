import { defineConfig, PluginOption } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';
import packageJson from '../package.json';

const transformHtmlPlugin = (data: any) => ({
  name: 'transform-html',
  transformIndexHtml: {
    enforce: 'pre',
    transform: html => html.replace(
      /<%=\s*(\w+)\s*%>/gi,
      (_, p1) => data[p1] || ''
    )
  }
}) as PluginOption;

export default defineConfig({
  define: {
    VERSION: JSON.stringify(packageJson.version)
  },
  plugins: [
    transformHtmlPlugin({
      APP_TITLE: `Construct-ui: ${packageJson.description} - v${packageJson.version}`
    }),
    tsconfigPaths(),
    checker({
      typescript: true
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    })
  ]
});

//build用設定ファイル
import { defineConfig } from 'astro/config';
import path from 'path';

const __dirname = decodeURI(
  path
    .dirname(new URL(import.meta.url).pathname)
    .replace(/^\/([a-zA-Z]:)/, '$1')
);

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'js/main.js',
          assetFileNames: 'css/style.css',
        },
      },
    },
  },
  base: 'dist', //ルート変更
});

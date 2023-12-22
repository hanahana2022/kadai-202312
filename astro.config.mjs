import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'js/main.js',
      },
    },
  },
});

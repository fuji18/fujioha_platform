import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hokkaido.fujioha.com',
  output: 'static',
  server: {
    host: true,
    port: 4322,
  },
});

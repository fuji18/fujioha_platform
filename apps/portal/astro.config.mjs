import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fujioha.com',
  output: 'static',
  server: {
    host: true,
    port: 4321,
  },
});

import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  appType: 'mpa',
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    rolldownOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        app1: resolve(import.meta.dirname, 'apps/test_app/index.html'),
      }
    }
  }
});
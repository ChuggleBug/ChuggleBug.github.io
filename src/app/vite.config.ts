import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { githubPagesSpa } from "@sctg/vite-plugin-github-pages-spa";
import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    githubPagesSpa(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})

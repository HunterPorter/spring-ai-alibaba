/*
 * Copyright 2025 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import checker from 'vite-plugin-checker'

export default defineConfig({
  base: '/ui',
  build: {
    outDir: './ui',
  },
  server: {
    open: true, // Automatically open browser on startup
    host: true, // Allow external access
    proxy: {
      '/api': {
        target: 'http://localhost:18080',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    vue(), 
    vueJsx(),
    checker({
      // Enable TypeScript checking in development
      typescript: true,
      // Temporarily disable Vue template type checking due to @volar/typescript compatibility issue
      // vueTsc: true,
      // Enable ESLint checking
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx,vue}"'
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
})

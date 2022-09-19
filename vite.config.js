import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
      external: {
        caller: resolve(__dirname, 'src/js/caller.js'),
        callee: resolve(__dirname, 'src/js/callee.js')
        
      }
    }
  }
})
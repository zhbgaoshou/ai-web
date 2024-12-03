import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import svgLoader from 'vite-svg-loader'

const svgLoaderConfig = {
  svgoConfig: {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false, // 保留 viewBox 属性，确保 SVG 可以自适应大小
          },
        },
      },
    ],
  },
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(svgLoaderConfig as any)],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/steam.api': {
        target: 'http://localhost:8000/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/steam.api/, '')
      },
      '/api': {
        target: 'http://112.74.75.211:8000/',
        changeOrigin: true,
        // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})

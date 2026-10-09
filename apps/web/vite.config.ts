import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/192x192.png', 'icons/512x512.png'],
      manifest: {
        name: 'ORBIT',
        short_name: 'ORBIT',
        description: 'Two worlds. One orbit.',
        theme_color: '#7c6af7',
        background_color: '#0f0f1a',
        display: 'standalone',
        icons: [
          {
            src: '/icons/192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  define: {
    'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
      process.env.VITE_API_BASE_URL || 'http://localhost:4000'
    ),
    'import.meta.env.VITE_WS_URL': JSON.stringify(
      process.env.VITE_WS_URL || 'ws://localhost:4000'
    ),
    'import.meta.env.VITE_APP_NAME': JSON.stringify(
      process.env.VITE_APP_NAME || 'ORBIT'
    ),
  },
});

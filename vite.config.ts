import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: '/',

    plugins: [
        react(),
        tailwindcss(),

        VitePWA({
            registerType: 'autoUpdate',
            strategies: 'generateSW',

            manifest: {
                name: 'SPACE ATLAS',
                short_name: 'SPACE ATLAS',
                description: 'A 3D interactive web experience showing space.',

                start_url: '/',
                scope: '/',

                display: 'standalone',
                background_color: '#000000',
                theme_color: '#8a2be2',

                icons: [
                    {
                        src: '/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },

            workbox: {
                runtimeCaching: [
                    {
                        urlPattern: ({ request }) => request.destination === 'video',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'videos-cache',
                            expiration: {
                                maxEntries: 20,
                                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                            }
                        }
                    }
                ],
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,webp,glb,json}'],
		maximumFileSizeToCacheInBytes: 100 * 1024 * 1024,
            }
        })
    ],

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },

    build: {
        target: 'esnext',
        outDir: 'build',
        emptyOutDir: true
    },

    server: {
        port: 9991,
        open: true
    }
})

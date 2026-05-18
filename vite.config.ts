import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    base: '/Space-Atlas/',

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

                start_url: '/Space-Atlas/',
                scope: '/Space-Atlas/',

                display: 'standalone',
                background_color: '#000000',
                theme_color: '#8a2be2',

                icons: [
                    {
                        src: '/Space-Atlas/android-chrome-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/Space-Atlas/android-chrome-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            },

            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,webp,glb,json}']
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
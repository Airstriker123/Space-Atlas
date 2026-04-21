import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
    base: '/Space-Atlas/',
    plugins: [
        VitePWA({
            //pwa config
            manifest: {
                "name": "SPACE ATLAS",
                "short_name": "SPACE ATLAS",
                "description": "A 3D interactive web experience showing space.",
                "start_url": "./",
                "display": "standalone",
                "background_color": "#000000",
                "theme_color": "#8a2be2",
                "orientation": "portrait-primary",
                "icons": [
                    {
                        "src": "android-chrome-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png"
                    },
                    {
                        "src": "android-chrome-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png"
                    }
                ],
                "categories": ["fun", "space", "educational"],
                "screenshots": [
                    {
                        "src": "about.jpg",
                        "sizes": "1280x720",
                        "type": "image/png"
                    }
                ]
            },
            useCredentials: true,
            // switch to "true" to enable sw on development
            devOptions: { enabled: false }, //allow pwa features on development server
            registerType: 'autoUpdate',
            mode: 'production',
            minify: true,
            includeAssets: [
                '**/*.mp4',
                '**/*.mp3',
                '**/*.wav',
                '**/*.webp',
                '**/*.png',
                '**/*.jpg',
                '**/*.glb',
                '**/*.json',
                'favicon.ico',
                'apple-touch-icon.png'
            ],
            selfDestroying: false,
            injectRegister: 'auto',
            strategies: 'generateSW',
            manifestFilename: 'manifest.webmanifest',
            workbox: {
                // Remove images and models from globPatterns so they aren't prefetched all at once
                globPatterns: ['**/*.{js,css,html,mp4,mp3,svg,wav,webp,png,jpg,glb,json}'],
                maximumFileSizeToCacheInBytes: 100 * 1024 * 1024 // 100 MB
            },

        }),
        react(),
        tailwindcss(),
    ],
    resolve:
        {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: {
                'vaul@1.1.2': 'vaul',
                'sonner@2.0.3': 'sonner',
                'recharts@2.15.2': 'recharts',
                'react-resizable-panels@2.1.7': 'react-resizable-panels',
                'react-hook-form@7.55.0': 'react-hook-form',
                'react-day-picker@8.10.1': 'react-day-picker',
                'next-themes@0.4.6': 'next-themes',
                'lucide-react@0.487.0': 'lucide-react',
                'input-otp@1.4.2': 'input-otp',
                'embla-carousel-react@8.6.0': 'embla-carousel-react',
                'cmdk@1.1.1': 'cmdk',
                'class-variance-authority@0.7.1': 'class-variance-authority',
                '@': path.resolve(__dirname, './src'),
            },
        },
    build: {
        target: 'esnext',
        outDir: 'build',
        manifest: "manifest.webmanifest",
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                },
            },
        },
    },
    server: {
        port: 9990,
        open: true,
    },
})
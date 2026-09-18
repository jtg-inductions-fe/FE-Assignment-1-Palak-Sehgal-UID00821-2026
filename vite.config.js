import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig(() => {
    return {
        plugins: [
            createHtmlPlugin({
                minify: true,
            }),
            ViteImageOptimizer({
                test: /\.(jpg|png|svg|webp)$/i,
                includePublic: true,
                logStats: true,
                png: {
                    quality: 90,
                },
                jpg: {
                    quality: 90,
                },
                svg: {
                    quality: 90,
                },
                webp: {
                    quality: 90,
                },
            }),
        ],
        build: {
            emptyOutDir: true,
            rollupOptions: {
                output: {
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                    assetFileNames: ({ name }) => {
                        if (/\.(jpg|png)$/.test(name ?? '')) {
                            return 'images/[name]-[hash][extname]';
                        }
                        if (/\.css$/.test(name ?? '')) {
                            return 'css/[name]-[hash][extname]';
                        }
                        if (/\.(woff2?|ttf|eot)$/.test(name ?? '')) {
                            return 'fonts/[name]-[hash][extname]';
                        }
                        return '[name]-[hash][extname]';
                    },
                },
            },
        },
        css: {
            devSourcemap: true,
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
                '@assets': fileURLToPath(
                    new URL('./public/assets', import.meta.url),
                ),
            },
        },
        server: {
            port: 3000,
            open: true,
            host: true,
        },
    };
});

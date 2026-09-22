import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    // eslint-disable-next-line no-undef
    const env = loadEnv(mode, process.cwd(), '');

    const PORT = Number(env.VITE_PORT) || 8080;

    return {
        plugins: [
            createHtmlPlugin({
                minify: true,
            }),
            ViteImageOptimizer({
                test: /\.(png|svg)$/i,
                includePublic: true,
                logStats: true,
                png: {
                    quality: 80,
                    compressionLevel: 9,
                },
                svg: {
                    multipass: true,
                },
            }),
        ],
        preview: {
            port: PORT,
            strictPort: false,
        },
        build: {
            rollupOptions: {
                output: {
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',
                    assetFileNames: ({ name }) => {
                        if (
                            /\.svg$/i.test(name ?? '') &&
                            name?.includes('icons')
                        ) {
                            return 'icons/[name]-[hash][extname]';
                        }
                        if (/\.(png)$/.test(name ?? '')) {
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
    };
});

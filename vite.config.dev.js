import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    // eslint-disable-next-line no-undef
    const env = loadEnv(mode, process.cwd(), '');

    const PORT = Number(env.VITE_PORT) || 3000;

    return {
        server: {
            port: PORT,
            strictPort: false,
            open: true,
            host: true,
        },
        css: {
            devSourcemap: true,
        },
    };
});

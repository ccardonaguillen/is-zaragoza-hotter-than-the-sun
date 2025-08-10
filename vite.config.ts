import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { ghPages } from 'vite-plugin-gh-pages';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
        define: {
            'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
            'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        },
        plugins: [ghPages()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            },
        },
    };
});

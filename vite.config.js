import { svelte } from '@sveltejs/vite-plugin-svelte'
import preprocess from 'svelte-preprocess'
import { defineConfig } from 'vite'
import { resolve } from 'path'

const production = process.env.NODE_ENV === 'production'

export default defineConfig({
    clearScreen: false,
    resolve: { 
        alias: { 
            '@': resolve('src'),
            '$lib': resolve('src/lib')
        } 
    },
    plugins: [
        svelte({
            compilerOptions: {
                dev: !production,
            },
            extensions: ['.svelte'],
            preprocess: [
                preprocess({
                    postcss: true,
                    typescript: true,
                })
            ],
        }),
    ],
    optimizeDeps: {
        exclude: ['lucide-svelte'],
    },
    build: {
        target: 'esnext',
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['svelte'],
                    prism: ['prismjs'],
                }
            }
        }
    },
    preview: {
        // Configure preview server for SPA routing
        historyApiFallback: true
    },
    server: { 
        port: 1337,
        host: true,
        // Configure for SPA routing
        historyApiFallback: true
    },
})

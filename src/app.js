import path from 'node:path'
import { fileURLToPath } from 'node:url'
import AutoLoad from '@fastify/autoload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Fastify Application Factory
 * Production readiness: centralize plugin and route registration.
 */
export default async function (fastify, opts) {
    // 1. Register Plugins
    await fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    })

    // 2. Register Routes
    await fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: Object.assign({}, opts)
    })

    // Global Health check (not in the routes folder for simplicity)
    fastify.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }))
}

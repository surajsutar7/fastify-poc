import Fastify from 'fastify'
import app from './app.js'

/**
 * Server startup script
 */
const start = async () => {
    // Initialize Fastify with logger based on environment
    const fastify = Fastify({
        logger: {
            level: process.env.LOG_LEVEL || 'info',
            transport: process.env.NODE_ENV === 'development'
                ? {
                    target: 'pino-pretty',
                    options: {
                        translateTime: 'HH:MM:ss Z',
                        ignore: 'pid,hostname'
                    }
                }
                : undefined
        },
        // Production readiness: disable detailed error responses in production
        disableRequestLogging: false
    })

    try {
        // Register application (plugins + routes)
        await fastify.register(app)

        // Wait for environment to be loaded by @fastify/env plugin (registered in app via autoload)
        await fastify.ready()

        const port = fastify.config.PORT || 3000
        const host = '0.0.0.0'

        await fastify.listen({ port, host })

        fastify.log.info(`Server listening on http://${host}:${port}`)
        fastify.log.info(`Documentation available at http://localhost:${port}/documentation`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

// Graceful shutdown handling
process.on('SIGINT', async () => {
    console.log('\nGracefully shutting down...')
    // Add cleanup logic here if needed (e.g. DB disconnect)
    process.exit(0)
})

start()

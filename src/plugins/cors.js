import fp from 'fastify-plugin'
import cors from '@fastify/cors'

/**
 * CORS handling.
 */
export default fp(async (fastify) => {
    fastify.register(cors, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
})

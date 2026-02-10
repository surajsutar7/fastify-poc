import fp from 'fastify-plugin'
import sensible from '@fastify/sensible'

/**
 * Validates dependencies and adds httpErrors under fastify.httpErrors
 */
export default fp(async (fastify) => {
    fastify.register(sensible)
})

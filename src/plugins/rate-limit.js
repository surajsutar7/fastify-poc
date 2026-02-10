import fp from 'fastify-plugin'
import rateLimit from '@fastify/rate-limit'

/**
 * Rate limiting plugin to prevent brute-force and DDoS attacks.
 * Production readiness: Add basic rate protection for all routes.
 */
export default fp(async (fastify) => {
    await fastify.register(rateLimit, {
        max: 100, // Max 100 requests
        timeWindow: '1 minute', // per minute
        errorResponseBuilder: (request, _context) => {
            return {
                statusCode: 429,
                error: 'Too Many Requests',
                message: `I don't think so. Try again in ${request.rateLimit.after}.`,
                date: new Date(),
                expiresIn: request.rateLimit.after
            }
        }
    })
})

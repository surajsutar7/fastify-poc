import fp from 'fastify-plugin'

/**
 * Global Error Handler plugin.
 * Production readiness: standardize error responses.
 */
export default fp(async (fastify) => {
    fastify.setErrorHandler((error, request, reply) => {
        // Log the error
        request.log.error(error)

        // Check for validation errors
        if (error.validation) {
            return reply.status(400).send({
                error: 'Bad Request',
                message: 'Validation failed',
                details: error.validation.map(err => ({
                    path: err.instancePath,
                    message: err.message
                }))
            })
        }

        // Default error response
        const statusCode = error.statusCode || 500
        const isProduction = fastify.config.NODE_ENV === 'production'

        reply.status(statusCode).send({
            error: statusCode >= 500 ? 'Internal Server Error' : error.name,
            message: statusCode >= 500 && isProduction
                ? 'Something went wrong on our end'
                : error.message,
            ...(isProduction ? {} : { stack: error.stack }) // Only show stack in dev
        })
    })

    // Handle 404
    fastify.setNotFoundHandler((request, reply) => {
        reply.status(404).send({
            error: 'Not Found',
            message: `Route ${request.method} ${request.url} not found`
        })
    })
})

import fp from 'fastify-plugin'
import { userSchema, userCreateSchema, userParamsSchema } from '../schemas/user-schema.js'

/**
 * Registers validation schemas globally.
 * These schemas can be referenced by $id in any route.
 */
export default fp(async (fastify) => {
    fastify.addSchema(userSchema)
    fastify.addSchema(userCreateSchema)
    fastify.addSchema(userParamsSchema)
})

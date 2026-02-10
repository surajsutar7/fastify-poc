import { randomUUID } from 'node:crypto'

/**
 * Demo Route handler for User management.
 * Demonstrates:
 * - Route-level hooks
 * - Validation & Serialization (referencing shared schemas)
 * - Error handling using @fastify/sensible
 * - Auto-documentation via Swagger
 */
export default async function (fastify, _opts) {
    // In-memory data store for demonstration
    const users = new Map()

    // Add a route-specific hook for demo
    fastify.addHook('onRequest', async (request, _reply) => {
        fastify.log.info({ url: request.url }, 'Users route requested')
    })

    // GET / - List all users
    fastify.get('/', {
        schema: {
            description: 'Get all users',
            tags: ['Users'],
            response: {
                200: {
                    type: 'array',
                    items: { $ref: 'userSchema#' }
                }
            }
        }
    }, async (_request, _reply) => {
        return Array.from(users.values())
    })

    // GET /:id - Get user by ID
    fastify.get('/:id', {
        schema: {
            description: 'Get user by ID',
            tags: ['Users'],
            params: { $ref: 'userParamsSchema#' },
            response: {
                200: { $ref: 'userSchema#' },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' }
                    }
                }
            }
        }
    }, async (request, reply) => {
        const { id } = request.params
        const user = users.get(id)

        if (!user) {
            return reply.notFound(`User with id ${id} not found`)
        }

        return user
    })

    // POST / - Create user
    fastify.post('/', {
        schema: {
            description: 'Create a new user',
            tags: ['Users'],
            body: { $ref: 'userCreateSchema#' },
            response: {
                201: { $ref: 'userSchema#' }
            }
        }
    }, async (request, reply) => {
        const id = randomUUID()
        const newUser = {
            ...request.body,
            id,
            createdAt: new Date().toISOString()
        }

        users.set(id, newUser)

        reply.code(201)
        return newUser
    })

    // DELETE /:id - Delete user
    fastify.delete('/:id', {
        schema: {
            description: 'Delete user by ID',
            tags: ['Users'],
            params: { $ref: 'userParamsSchema#' },
            response: {
                204: { type: 'null' }
            }
        }
    }, async (request, reply) => {
        const { id } = request.params
        if (!users.has(id)) {
            return reply.notFound(`User with id ${id} not found`)
        }

        users.delete(id)
        reply.code(204)
    })
}

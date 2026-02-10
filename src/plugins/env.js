import fp from 'fastify-plugin'
import fastifyEnv from '@fastify/env'

/**
 * This plugin validates the environment variables.
 * Production readiness: strictly validate env vars on startup.
 */
export default fp(async (fastify, opts) => {
  const schema = {
    type: 'object',
    required: ['PORT', 'NODE_ENV'],
    properties: {
      PORT: {
        type: 'string',
        default: '3000'
      },
      NODE_ENV: {
        type: 'string',
        default: 'development'
      },
      LOG_LEVEL: {
        type: 'string',
        default: 'info'
      }
    }
  }

  const options = {
    confKey: 'config', // fastify.config will contain the env vars
    schema: schema,
    dotenv: true // Load .env file
  }

  await fastify.register(fastifyEnv, options)
})

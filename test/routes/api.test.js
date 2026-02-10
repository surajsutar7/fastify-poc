import { test } from 'tap'
import Fastify from 'fastify'
import app from '../../src/app.js'

test('Health check route', async (t) => {
    const fastify = Fastify()
    await fastify.register(app)

    const response = await fastify.inject({
        method: 'GET',
        url: '/health'
    })

    t.equal(response.statusCode, 200)
    const payload = JSON.parse(response.payload)
    t.equal(payload.status, 'ok')
})

test('User Creation and Retrieval flow', async (t) => {
    const fastify = Fastify()
    await fastify.register(app)

    // 1. Create a user
    const createRes = await fastify.inject({
        method: 'POST',
        url: '/users',
        payload: {
            name: 'John Doe',
            email: 'john@example.com'
        }
    })

    t.equal(createRes.statusCode, 201)
    const createdUser = JSON.parse(createRes.payload)
    t.ok(createdUser.id)
    t.equal(createdUser.name, 'John Doe')

    // 2. Get the user
    const getRes = await fastify.inject({
        method: 'GET',
        url: `/users/${createdUser.id}`
    })

    t.equal(getRes.statusCode, 200)
    t.equal(JSON.parse(getRes.payload).name, 'John Doe')

    // 3. Validation error (invalid email)
    const invalidRes = await fastify.inject({
        method: 'POST',
        url: '/users',
        payload: {
            name: 'Bad User',
            email: 'not-an-email'
        }
    })

    t.equal(invalidRes.statusCode, 400)
})

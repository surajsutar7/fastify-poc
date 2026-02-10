import Fastify from 'fastify'
import app from '../../src/app.js'

describe('User API (Jest Integration)', () => {
    let server

    beforeAll(async () => {
        server = Fastify()
        await server.register(app)
        await server.ready()
    })

    afterAll(async () => {
        await server.close()
    })

    test('GET /health returns ok', async () => {
        const response = await server.inject({
            method: 'GET',
            url: '/health'
        })

        expect(response.statusCode).toBe(200)
        expect(JSON.parse(response.payload)).toEqual(expect.objectContaining({
            status: 'ok'
        }))
    })

    test('Full User Workflow (Create -> Get -> Delete)', async () => {
        // 1. Create User
        const createRes = await server.inject({
            method: 'POST',
            url: '/users',
            payload: {
                name: 'Jane Doe',
                email: 'jane@example.com'
            }
        })

        expect(createRes.statusCode).toBe(201)
        const user = JSON.parse(createRes.payload)
        expect(user.id).toBeDefined()
        expect(user.name).toBe('Jane Doe')

        // 2. Get User
        const getRes = await server.inject({
            method: 'GET',
            url: `/users/${user.id}`
        })

        expect(getRes.statusCode).toBe(200)
        expect(JSON.parse(getRes.payload).name).toBe('Jane Doe')

        // 3. Delete User
        const delRes = await server.inject({
            method: 'DELETE',
            url: `/users/${user.id}`
        })
        expect(delRes.statusCode).toBe(204)

        // 4. Verify Not Found
        const verifyRes = await server.inject({
            method: 'GET',
            url: `/users/${user.id}`
        })
        expect(verifyRes.statusCode).toBe(404)
    })

    test('POST /users should fail with invalid data', async () => {
        const response = await server.inject({
            method: 'POST',
            url: '/users',
            payload: {
                name: 'J', // too short
                email: 'invalid-email'
            }
        })

        expect(response.statusCode).toBe(400)
    })
})

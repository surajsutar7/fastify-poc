import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import { userSchema, userCreateSchema } from '../../src/schemas/user-schema.js'

describe('User Schemas Unit Tests', () => {
    let ajv

    beforeAll(() => {
        ajv = new Ajv({ allErrors: true, strict: false })
        addFormats(ajv)
    })

    describe('userCreateSchema', () => {
        const validate = (data) => {
            const v = ajv.compile(userCreateSchema)
            return v(data)
        }

        test('should validate a valid user creation object', () => {
            const validUser = {
                name: 'John Doe',
                email: 'john@example.com',
                role: 'user'
            }
            expect(validate(validUser)).toBe(true)
        })

        test('should fail if name is too short', () => {
            const invalidUser = {
                name: 'J',
                email: 'john@example.com'
            }
            expect(validate(invalidUser)).toBe(false)
        })

        test('should fail if email is invalid', () => {
            const invalidUser = {
                name: 'John Doe',
                email: 'not-an-email'
            }
            expect(validate(invalidUser)).toBe(false)
        })
    })

    describe('userSchema (serialization)', () => {
        const validate = (data) => {
            const v = ajv.compile(userSchema)
            return v(data)
        }

        test('should validate a full user object', () => {
            const fullUser = {
                id: '550e8400-e29b-41d4-a716-446655440000',
                name: 'John Doe',
                email: 'john@example.com',
                role: 'admin',
                createdAt: new Date().toISOString()
            }
            expect(validate(fullUser)).toBe(true)
        })
    })
})

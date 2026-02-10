
const userSchema = {
    $id: 'userSchema',
    type: 'object',
    required: ['name', 'email', 'role'],
    properties: {
        id: { type: 'string', format: 'uuid' },
        name: { type: 'string', minLength: 2 },
        email: { type: 'string', format: 'email' },
        role: { type: 'string', enum: ['admin', 'user'], default: 'user' },
        createdAt: { type: 'string', format: 'date-time' }
    }
}

const userCreateSchema = {
    $id: 'userCreateSchema',
    type: 'object',
    required: ['name', 'email'],
    properties: {
        name: { type: 'string', minLength: 2 },
        email: { type: 'string', format: 'email' },
        role: { type: 'string', enum: ['admin', 'user'], default: 'user' }
    },
    additionalProperties: false
}

const userParamsSchema = {
    $id: 'userParamsSchema',
    type: 'object',
    properties: {
        id: { type: 'string', format: 'uuid' }
    },
    required: ['id']
}

export { userSchema, userCreateSchema, userParamsSchema }

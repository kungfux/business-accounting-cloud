'use strict'

const findOne = {
    response: {
        200: {
            type: 'array',
            properties: {
                id: { type: 'number' },
                userId: { type: 'number' },
                companyId: { type: 'number' },
                created: { type: 'string' }
            }
        }
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer' }
        },
        required: ['id']
    }
}

const insertOne = {
    body: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
            companyId: { type: 'array', minLength: 1 },
        },
        required: ['id', 'companyId']
    }
}

module.exports = { findOne, insertOne }

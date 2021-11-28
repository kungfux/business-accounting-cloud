'use strict'

const total = {
    response: {
        200: {
            type: 'object',
            properties: {
                total: { type: 'number' },
            }
        }
    },
    querystring: {
        type: 'object',
        properties: {
            companyId: { type: 'integer' },
            from: { type: 'string' },
            to: { type: 'string' }
        },
        required: ['companyId']
    },
}

module.exports = { total }

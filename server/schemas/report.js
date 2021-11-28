'use strict'

const total = {
    response: {
        200: {
            type: 'array',
            properties: {
                total: { type: 'number' },
                year: { type: 'number' },
                month: { type: 'number' },
                week: { type: 'number' },
                day: { type: 'number' },
            }
        }
    },
    querystring: {
        type: 'object',
        properties: {
            companyId: { type: 'integer' },
            from: { type: 'string' },
            to: { type: 'string' },
            detalization: { type: 'string' }
        },
        required: ['companyId']
    },
}

module.exports = { total }

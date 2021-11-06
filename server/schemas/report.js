'use strict'

const saldo = {
    response: {
        200: {
            type: 'object',
            properties: {
                saldo: { type: 'number' },
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

module.exports = { saldo }

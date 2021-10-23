'use strict'

const findAll = {
    response: {
        200: {
            type: 'array',
            items: {
                properties: {
                    id: { type: 'integer' },
                    title: { type: 'string' },
                    rate: { type: 'number' },
                    comment: { type: 'string' },
                    enabled: { type: 'boolean' },
                    created: { type: 'string' }
                }
            }
        }
    },
    querystring: {
        type: 'object',
        properties: {
            companyId: { type: 'integer' },
            limit: { type: 'integer' },
            offset: { type: 'integer' },
        },
        required: ['companyId']
    },
}

const findOne = {
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                title: { type: 'string' },
                rate: { type: 'number' },
                comment: { type: 'string' },
                enabled: { type: 'boolean' },
                created: { type: 'string' }
            }
        },
        404: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        }
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer' },
        },
        required: ['id']
    }
}

const insertOne = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string', minLength: 1 },
            rate: { type: 'number' },
            comment: { type: 'string' },
            enabled: { type: 'boolean' },
            company_id: { type: 'integer' }
        },
        required: ['title', 'rate', 'comment', 'enabled', 'companyId']
    }
}

const updateOne = {
    body: {
        type: 'object',
        properties: {
            title: { type: 'string', minLength: 1 },
            rate: { type: 'number' },
            comment: { type: 'string' },
            enabled: { type: 'boolean' },
        },
        required: ['title', 'rate', 'comment', 'enabled']
    },
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer' }
        }
    }
}

const deleteOne = {
    params: {
        type: 'object',
        properties: {
            id: { type: 'integer' }
        }
    }
}

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }

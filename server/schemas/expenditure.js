'use strict'

const BaseSchema = require('./schema.base')

var schema = new BaseSchema({
    id: { type: 'integer' },
    created: { type: 'string' }
},
    {
        title: { type: 'string', minLength: 1 },
        rate: { type: 'number' },
        comment: { type: 'string' },
        enabled: { type: 'boolean' },
        companyId: { type: 'integer', minLength: 1 }
    },
    {
        title: { type: 'string', minLength: 1 },
        rate: { type: 'number' },
        comment: { type: 'string' },
        enabled: { type: 'boolean' },
    })

const findAll = schema.findAll
const findOne = schema.findOne
const insertOne = schema.insertOne
const updateOne = schema.updateOne
const deleteOne = schema.deleteOne

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }

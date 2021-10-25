'use strict'

const BaseSchema = require('../common/baseSchema')

var schema = new BaseSchema({
    id: { type: 'integer' },
    created: { type: 'string' }
},
    {
        name: { type: 'string', minLength: 1 },
        rate: { type: 'number' },
        enabled: { type: 'boolean' },
        companyId: { type: 'integer', minLength: 1 }
    },
    {
        name: { type: 'string', minLength: 1 },
        rate: { type: 'number' },
        enabled: { type: 'boolean' }
    })

const findAll = schema.findAll
const findOne = schema.findOne
const insertOne = schema.insertOne
const updateOne = schema.updateOne
const deleteOne = schema.deleteOne

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }
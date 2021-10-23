'use strict'

const BaseSchema = require('./baseSchema')

var schema = new BaseSchema({
    id: { type: 'integer' },
    created: { type: 'string' }
},
    {
        title: { type: 'string' },
        inventory_number: { type: 'string' },
        cost: { type: 'number' },
        comment: { type: 'string' },
        enabled: { type: 'boolean' },
        companyId: { type: 'integer' }
    },
    {
        title: { type: 'string' },
        inventory_number: { type: 'string' },
        cost: { type: 'number' },
        comment: { type: 'string' },
        enabled: { type: 'boolean' },
    })

const findAll = schema.findAll
const findOne = schema.findOne
const insertOne = schema.insertOne
const updateOne = schema.updateOne
const deleteOne = schema.deleteOne

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }

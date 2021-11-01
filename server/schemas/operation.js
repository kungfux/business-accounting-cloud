'use strict'

const BaseSchema = require('./schema.base')

var schema = new BaseSchema({
    id: { type: 'integer' },
    created: { type: 'string' }
},
    {
        operationDate: { type: 'string' },
        amount: { type: 'number', minLength: 1 },
        comment: { type: 'string' },
        contactId: { type: 'integer' },
        propertyId: { type: 'integer' },
        expenditureId: { type: 'integer' },
        companyId: { type: 'integer', minLength: 1 }
    },
    {
        operationDate: { type: 'string' },
        amount: { type: 'number', minLength: 1 },
        comment: { type: 'string' },
        contactId: { type: 'integer' },
        propertyId: { type: 'integer' },
        expenditureId: { type: 'integer' }
    },
    {
        from: { type: 'string' },
        to: { type: 'string' }
    })

const findAll = schema.findAll
const findOne = schema.findOne
const insertOne = schema.insertOne
const updateOne = schema.updateOne
const deleteOne = schema.deleteOne

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }

'use strict'

const BaseSchema = require('./schema.base')

var schema = new BaseSchema({
    id: { type: 'integer' },
    created: { type: 'string' }
},
    {
        name: { type: 'string', minLength: 1 },
        phone: { type: 'string' },
        cellphone: { type: 'string' },
        email: { type: 'string' },
        address: { type: 'string' },
        passport: { type: 'string' },
        dob: { type: 'string' },
        note: { type: 'string' },
        hired: { type: 'string' },
        fired: { type: 'string' },
        firedNote: { type: 'string' },
        photo: { type: 'string' },
        titleId: { type: 'integer' },
        companyId: { type: 'integer', minLength: 1 }
    },
    {
        name: { type: 'string', minLength: 1 },
        phone: { type: 'string' },
        cellphone: { type: 'string' },
        email: { type: 'string' },
        address: { type: 'string' },
        passport: { type: 'string' },
        dob: { type: 'string' },
        note: { type: 'string' },
        hired: { type: 'string' },
        fired: { type: 'string' },
        firedNote: { type: 'string' },
        photo: { type: 'string' },
        titleId: { type: 'integer' },
    },
    {
        enabled: { type: 'boolean' },
        list: { type: 'string' }
    })

const findAll = schema.findAll
const findOne = schema.findOne
const insertOne = schema.insertOne
const updateOne = schema.updateOne
const deleteOne = schema.deleteOne

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }

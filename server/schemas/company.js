'use strict'

const BaseSchema = require('./schema.base')

var schema = new BaseSchema({
  id: { type: 'integer' },
  created: { type: 'string' }
},
  {
    name: { type: 'string', minLength: 1 },
    logo: { type: 'string' },
    enabled: { type: 'boolean' }
  },
  {
    name: { type: 'string', minLength: 1 },
    logo: { type: 'string' },
    enabled: { type: 'boolean' }
  },
  {
    userId: { type: 'number' },
    enabled: { type: 'boolean' },
  }
)

const findAll = schema.findAll
const findOne = schema.findOne
const insertOne = schema.insertOne
const updateOne = schema.updateOne
const deleteOne = schema.deleteOne

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }

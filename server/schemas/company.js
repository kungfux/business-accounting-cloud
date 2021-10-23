'use strict'

const BaseSchema = require('./baseSchema')

var schema = new BaseSchema({
  id: { type: 'integer' },
  created: { type: 'string' }
},
  {
    name: { type: 'string' },
    logo: { type: 'string' },
    enabled: { type: 'boolean' }
  },
  {
    name: { type: 'string' },
    logo: { type: 'string' },
    enabled: { type: 'boolean' }
  })

const findAll = schema.findAll
const findOne = schema.findOne
const insertOne = schema.insertOne
const updateOne = schema.updateOne
const deleteOne = schema.deleteOne

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }

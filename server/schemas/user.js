'use strict'

const BaseSchema = require('../common/baseSchema')

var schema = new BaseSchema({
  id: { type: 'integer' },
  created: { type: 'string' }
},
  {
    login: { type: 'string', minLength: 1 },
    name: { type: 'string', minLength: 1 },
    avatar: { type: 'string' },
    admin: { type: 'boolean' },
    enabled: { type: 'boolean' }
  },
  {
    login: { type: 'string', minLength: 1 },
    name: { type: 'string', minLength: 1 },
    avatar: { type: 'string' },
    admin: { type: 'boolean' },
    enabled: { type: 'boolean' }
  })

const findAll = schema.findAll
const findOne = schema.findOne

const insertOne = {
  body: {
    type: 'object',
    properties: {
      login: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 8 },
      name: { type: 'string', minLength: 1 },
      avatar: { type: 'string' },
      admin: { type: 'boolean' },
      enabled: { type: 'boolean' }
    },
    required: ['login', 'password', 'name', 'avatar', 'admin', 'enabled']
  }
}

const updateOne = {
  body: {
    type: 'object',
    properties: {
      login: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 8 },
      name: { type: 'string', minLength: 1 },
      avatar: { type: 'string' },
      admin: { type: 'boolean' },
      enabled: { type: 'boolean' }
    },
    required: ['login', 'password', 'name', 'avatar', 'admin', 'enabled']
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    }
  }
}

const deleteOne = schema.deleteOne

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }

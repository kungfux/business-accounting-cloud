'use strict'

const BaseSchema = require('./schema.base')

const editableParams = {
  login: { type: 'string', minLength: 1 },
  name: { type: 'string', minLength: 1 },
  avatar: { type: 'string' },
  admin: { type: 'boolean' },
  enabled: { type: 'boolean' }
}

var schema = new BaseSchema({
  id: { type: 'integer' },
  created: { type: 'string' }
},
  editableParams,
  editableParams)

const findAll = schema.findAll
const findOne = schema.findOne

const insertOne = {
  body: {
    type: 'object',
    properties: {
      password: { type: 'string', minLength: 8 },
      ...(editableParams)
    },
    required: ['login', 'password', 'name', 'avatar', 'admin', 'enabled']
  }
}

const updateOne = {
  body: {
    type: 'object',
    properties: {
      ...(editableParams)
    },
    required: ['login', 'name', 'avatar', 'admin', 'enabled']
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    }
  }
}

const updatePart = {
  body: {
    type: 'object',
    properties: {
      password: { type: 'string', minLength: 8 },
      newPassword: { type: 'string', minLength: 8 }
    },
    required: ['password', 'newPassword']
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    }
  }
}

const deleteOne = schema.deleteOne

module.exports = { findAll, findOne, insertOne, updateOne, updatePart, deleteOne }

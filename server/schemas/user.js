'use strict'

const findAll = {
  response: {
    200: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'integer' },
          login: { type: 'string' },
          admin: { type: 'boolean' },
          enabled: { type: 'boolean' },
          created: { type: 'string' }
        }
      }
    }
  },
  querystring: {
    limit: { type: 'integer' },
    offset: { type: 'integer' }
  }
}

const findOne = {
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        login: { type: 'string' },
        admin: { type: 'boolean' },
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
      id: { type: 'integer' }
    }
  }
}

const insertOne = {
  body: {
    type: 'object',
    properties: {
      login: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 8 },
      admin: { type: 'boolean' },
      enabled: { type: 'boolean' }
    },
    required: ['login', 'password', 'admin', 'enabled']
  }
}

const updateOne = {
  body: {
    type: 'object',
    properties: {
      login: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 8 },
      admin: { type: 'boolean' },
      enabled: { type: 'boolean' }
    },
    required: ['login', 'password', 'admin', 'enabled']
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

'use strict'

const token = {
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' }
      }
    }
  },
  body: {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 1 },
      password: { type: 'string', minLength: 1 }
    },
    required: ['username', 'password']
  }
}

module.exports = { token }

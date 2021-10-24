'use strict'

const login = {
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        token: { type: 'string' },
        expiration: { type: 'string' }
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

module.exports = { token: login }

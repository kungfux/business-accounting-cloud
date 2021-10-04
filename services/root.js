'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    return {
      api: 'Business Accounting Cloud',
      version: '1.0.0'
    }
  })
}

'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
  fastify.decorate('timestamp', function () {
    return new Date(Date.now()).toISOString()
  })
})

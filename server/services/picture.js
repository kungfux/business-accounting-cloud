'use strict'

const schemas = require('../schemas/picture')
const { QueryTypes } = require('sequelize')
const base64 = require('js-base64')

module.exports = async function (fastify, opts) {
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  fastify.setNotFoundHandler(function (request, reply) {
    reply
      .code(404)
      .type('application/json')
      .send({ message: 'Requested picture does not exist' })
  })

  fastify.get(
    '/',
    { schema: schemas.findAll },
    async function (request, reply) {
      const limit = parseInt(request.query.limit) || 10
      const offset = parseInt(request.query.offset) || 0
      const items = await this.db.query('select * from pictures limit ? offset ?',
        {
          replacements: [limit, offset],
          type: QueryTypes.SELECT
        }
      )

      return items
    }
  )

  fastify.get(
    '/:id',
    { schema: schemas.findOne },
    async function (request, reply) {
      const item = await this.db.query('select id, picture, created from pictures where id = ? limit 1',
        {
          replacements: [request.params.id],
          type: QueryTypes.SELECT
        }
      )

      if (item.length === 0) {
        return reply.callNotFound()
      }

      return { id: item[0].id, picture: base64.encode(item[0].picture), created: item[0].created }
    }
  )

  fastify.post(
    '/',
    { schema: schemas.insertOne },
    async function (request, reply) {
      const data = await request.file()
      const buffer = await data.toBuffer()
      const [result] = await this.db.query('insert into pictures (picture) values(?)',
        {
          replacements: [buffer],
          type: QueryTypes.INSERT
        }
      )

      return {
        id: result
      }
    }
  )

  fastify.put(
    '/:id',
    { schema: schemas.updateOne },
    async function (request, reply) {
      const data = await request.file()
      const buffer = await data.toBuffer()
      const [, metadata] = await this.db.query('update pictures set picture=? where id=?',
        {
          replacements: [buffer, request.params.id],
          type: QueryTypes.UPDATE
        }
      )

      if (metadata === 0) {
        reply.callNotFound()
      }

      return {
        id: request.params.id
      }
    }
  )

  fastify.delete(
    '/:id',
    { schema: schemas.deleteOne },
    async function (request, reply) {
      await this.db.query('delete from pictures where id=?',
        {
          replacements: [request.params.id],
          type: QueryTypes.DELETE
        }
      )

      return {
        id: request.params.id
      }
    }
  )
}

module.exports.autoPrefix = '/pictures'

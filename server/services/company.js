'use strict'

const schemas = require('../schemas/company')
const { QueryTypes } = require('sequelize')

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
      .send({ message: 'Requested company does not exist' })
  })

  fastify.get(
    '/',
    { schema: schemas.findAll },
    async function (request, reply) {
      const enabled = request.query.enabled || false;
      const limit = parseInt(request.query.limit) || 10
      const offset = parseInt(request.query.offset) || 0

      if (request.query.enabled) {
        return await this.db.query('select * from companies where enabled=? order by name asc limit ? offset ?',
          {
            replacements: [enabled, limit, offset],
            type: QueryTypes.SELECT
          }
        )
      }

      return await this.db.query('select * from companies order by name asc limit ? offset ?',
        {
          replacements: [limit, offset],
          type: QueryTypes.SELECT
        }
      )
    }
  )

  fastify.get(
    '/:id',
    { schema: schemas.findOne },
    async function (request, reply) {
      const item = await this.db.query('select * from companies where id = ? limit 1',
        {
          replacements: [request.params.id],
          type: QueryTypes.SELECT
        }
      )

      if (item.length === 0) {
        return reply.callNotFound()
      }

      return item[0]
    }
  )

  fastify.post(
    '/',
    { schema: schemas.insertOne },
    async function (request, reply) {
      const [result] = await this.db.query('insert into companies (name,logo,enabled) values(?,?,?)',
        {
          replacements: [
            request.body.name || null,
            request.body.logo || null,
            request.body.enabled || false
          ],
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
      const [, metadata] = await this.db.query('update companies set name=?,logo=?,enabled=? where id=?',
        {
          replacements: [
            request.body.name || null,
            request.body.logo || null,
            request.body.enabled || false,
            request.params.id || null,
          ],
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
      await this.db.query('delete from companies where id=?',
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

module.exports.autoPrefix = '/companies'

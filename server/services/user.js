'use strict'

const schemas = require('../schemas/user')
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
      .send({ message: 'Requested user does not exist' })
  })

  fastify.get(
    '/',
    { schema: schemas.findAll },
    async function (request, reply) {
      const limit = parseInt(request.query.limit) || 10
      const offset = parseInt(request.query.offset) || 0
      const items = await this.db.query('select * from users limit ? offset ?',
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
      const item = await this.db.query('select * from users where id = ? limit 1',
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
      const password = request.body.password
      const { hash, salt } = this.createNewHashSalt(password)

      const [result] = await this.db.query('insert into users (login,password,salt,name,avatar,admin,enabled) values(?,?,?,?,?,?,?)',
        {
          replacements: [request.body.login, hash, salt, request.body.name, request.body.avatar, request.body.admin, request.body.enabled],
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
      const [, metadata] = await this.db.query('update users set login=?,name=?,avatar=?,admin=?,enabled=? where id=?',
        {
          replacements: [request.body.login, request.body.name, request.body.avatar, request.body.admin, request.body.enabled, request.params.id],
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

  fastify.patch(
    '/:id',
    { schema: schemas.updatePart },
    async function (request, reply) {
      const id = request.params.id
      const { password, newPassword } = request.body

      const credentials = await this.db.query('select password,salt from users where id = ?',
        {
          replacements: [id],
          type: QueryTypes.SELECT
        }
      )

      if (credentials.length !== 1) {
        reply.callNotFound()
        return
      }

      const hash = credentials[0].password
      const salt = credentials[0].salt
      const calculatedHash = this.calculateHash(password, salt)

      if (hash !== calculatedHash) {
        reply
          .code(422)
          .type('application/json')
          .send({ message: 'Unexceptable request' })
        return
      }

      const newHashSalt = this.createNewHashSalt(newPassword)
      const newHash = newHashSalt.hash
      const newSalt = newHashSalt.salt
      const [, metadata] = await this.db.query('update users set password=?,salt=? where id=?',
        {
          replacements: [newHash, newSalt, id],
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
      await this.db.query('delete from users where id=?',
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

module.exports.autoPrefix = '/users'

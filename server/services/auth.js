'use strict'

const schemas = require('../schemas/auth')
const { QueryTypes } = require('sequelize')

module.exports = async function (fastify, opts) {
  fastify.post('/', { schema: schemas.token }, async function (request, reply) {
    const { username, password } = request.body

    const credentials = await this.db.query('select password, salt from users where login = ?',
      {
        replacements: [username],
        type: QueryTypes.SELECT
      }
    )

    if (credentials.length !== 1) {
      rejectAuthorization()
      return
    }

    const hash = credentials[0].password
    const salt = credentials[0].salt

    const comparativeHash = this.getHash(password, salt)

    if (hash !== comparativeHash) {
      rejectAuthorization()
    } else {
      const token = fastify.jwt.sign(
        { sub: username },
        { expiresIn: '12h' }
      )
      reply.send({ token })
    }

    function rejectAuthorization () {
      reply.status(401).send({ message: 'Invalid username or password' })
    }
  })
}

module.exports.autoPrefix = '/auth'
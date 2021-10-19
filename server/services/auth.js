'use strict'

const schemas = require('../schemas/auth')
const { QueryTypes } = require('sequelize')

module.exports = async function (fastify, opts) {
  fastify.post('/', { schema: schemas.token }, async function (request, reply) {
    const tokenHoursToLive = 12;
    const { username, password } = request.body

    const credentials = await this.db.query('select id, password, salt from users where login = ? and enabled = 1',
      {
        replacements: [username],
        type: QueryTypes.SELECT
      }
    )

    if (credentials.length !== 1) {
      rejectAuthorization()
      return
    }

    const id = credentials[0].id
    const hash = credentials[0].password
    const salt = credentials[0].salt

    const comparativeHash = this.getHash(password, salt)

    if (hash !== comparativeHash) {
      rejectAuthorization()
    } else {
      const token = fastify.jwt.sign(
        { sub: username },
        { expiresIn: `${tokenHoursToLive}h` }
      )
      let expiration = new Date();
      expiration.setHours(new Date().getHours() + tokenHoursToLive);
      reply.send({ id, token, expiration: expiration.toUTCString() })
    }

    function rejectAuthorization() {
      reply.status(401).send({ message: 'Invalid username or password' })
    }
  })
}

module.exports.autoPrefix = '/auth'

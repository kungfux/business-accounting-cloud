'use strict'

const schemas = require('../schemas/login')
const { QueryTypes } = require('sequelize')

module.exports = async function (fastify, opts) {
  fastify.post('/', { schema: schemas.login }, async function (request, reply) {
    const tokenHoursToLive = 12;
    const { username: login, password } = request.body

    if (!this.canLogin(login)) {
      rejectAuthorization()
      return
    }

    const credentials = await this.db.query('select id,password,salt from users where login = ? and enabled = 1',
      {
        replacements: [login],
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

    const calculatedHash = this.calculateHash(password, salt)

    if (hash !== calculatedHash) {
      rejectAuthorization()
      return
    } else {
      const token = fastify.jwt.sign(
        { sub: login },
        { expiresIn: `${tokenHoursToLive}h` }
      )

      const expiration = new Date();
      expiration.setHours(new Date().getHours() + tokenHoursToLive);
      reply.send({ id, token, expiration: expiration.toUTCString() })
    }

    function rejectAuthorization() {
      reply.status(401).send({ message: 'Invalid username or password' })
    }
  })
}

module.exports.autoPrefix = '/login'

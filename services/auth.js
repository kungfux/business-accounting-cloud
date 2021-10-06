'use strict'

const sha512 = require('js-sha512')
const schemas = require('../schemas/auth')
const { QueryTypes } = require('sequelize');

module.exports = async function (fastify, opts) {
    fastify.post('/', { schema: schemas.token }, async function (request, reply) {
        const { username, password } = request.body

        const sha512password = sha512(password)
        const [result, metadata] = await this.db.query('select * from user where login = ? and password = ?',
            {
                replacements: [username, sha512password],
                type: QueryTypes.SELECT
            }
        )

        if (
            result == null || result == 0
        ) {
            reply.status(401).send({ message: 'Invalid username or password' })
        } else {
            const token = fastify.jwt.sign(
                { sub: username },
                { expiresIn: '1h' }
            )
            reply.send({ token })
        }
    })
}

module.exports.autoPrefix = '/auth'

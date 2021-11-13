'use strict'

const schemas = require('../schemas/access')
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
            .send({ message: 'Requested access does not exist' })
    })

    fastify.get(
        '/:id',
        { schema: schemas.findOne },
        async function (request, reply) {
            const userId = request.params.id;
            const items = await this.db.query('select * from users_companies where userId = ?',
                {
                    replacements: [userId],
                    type: QueryTypes.SELECT
                }
            )

            if (items.length === 0) {
                return []
            }

            return items
        }
    )

    fastify.post(
        '/',
        { schema: schemas.insertOne },
        async function (request, reply) {
            const userId = request.body.id;
            const companyIds = request.body.companyId;

            await this.db.query('delete from users_companies where userId=?',
                {
                    replacements: [userId],
                    type: QueryTypes.DELETE
                }
            )

            for (var i = 0; i < companyIds.length; i++) {
                const [recordId] = await this.db.query('insert into users_companies (userId,companyId) values(?,?)',
                    {
                        replacements: [
                            userId,
                            companyIds[i]
                        ],
                        type: QueryTypes.INSERT
                    }
                )

                if (!recordId) {
                    reply.code(500).send()
                }
            }

            reply.code(200).send()
        }
    )
}

module.exports.autoPrefix = '/access'

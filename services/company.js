'use strict'

const schemas = require('../schemas/company')
const { QueryTypes } = require('sequelize');

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
            const limit = parseInt(request.query.limit) || 10
            const offset = parseInt(request.query.offset) || 0
            const items = await this.db.query('select * from company limit ? offset ?',
                {
                    replacements: [limit, offset],
                    type: QueryTypes.SELECT
                }
            )
            return JSON.stringify(items);
        }
    )

    fastify.get(
        '/:id',
        { schema: schemas.findOne },
        async function (request, reply) {
            const item = await this.db.query('select * from company where id = ? limit 1',
                {
                    replacements: [request.params.id],
                    type: QueryTypes.SELECT
                }
            )

            if (item.length == 0) {
                return reply.callNotFound()
            }

            return JSON.stringify(item)
        }
    )

    fastify.post(
        '/',
        { schema: schemas.insertOne },
        async function (request, reply) {
            const [result, metadata] = await this.db.query('insert into company (name) values(?)',
                {
                    replacements: [request.body.name],
                    type: QueryTypes.INSERT
                }
            )
            return {
                message: 'OK',
                id: result
            }
        }
    )

    fastify.put(
        '/:id',
        { schema: schemas.updateOne },
        async function (request, reply) {
            const [result, metadata] = await this.db.query('update company set name=? where id=?',
                {
                    replacements: [request.body.name, request.params.id],
                    type: QueryTypes.UPDATE
                }
            )

            if (metadata == 0) {
                reply.callNotFound()
            }

            return {
                message: 'OK',
                name: request.body.name
            }
        }
    )

    fastify.delete(
        '/:id',
        { schema: schemas.deleteOne },
        async function (request, reply) {
            await this.db.query('delete from company where id=?',
                {
                    replacements: [request.params.id],
                    type: QueryTypes.DELETE
                }
            )
            return { message: "OK" }
        }
    )
}

module.exports.autoPrefix = '/companies'

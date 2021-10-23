'use strict'

const schemas = require('../schemas/property')
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
            .send({ message: 'Requested property does not exist' })
    })

    fastify.get(
        '/',
        { schema: schemas.findAll },
        async function (request, reply) {
            const companyId = parseInt(request.query.companyId)
            const limit = parseInt(request.query.limit) || 10
            const offset = parseInt(request.query.offset) || 0
            const items = await this.db.query('select * from properties where company_id = ? limit ? offset ?',
                {
                    replacements: [companyId, limit, offset],
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
            const item = await this.db.query('select * from properties where id = ? limit 1',
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
            const [result] = await this.db.query('insert into properties (title,inventory_number,cost,comment,enabled,company_id) values(?,?,?,?,?,?)',
                {
                    replacements: [request.body.title, request.body.inventory_number, request.body.cost, request.body.comment, request.body.enabled, request.body.companyId],
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
            const [, metadata] = await this.db.query('update properties set title=?,inventory_number=?,cost=?,comment=?,enabled=? where id=?',
                {
                    replacements: [request.body.title, request.body.inventory_number, request.body.cost, request.body.comment, request.body.enabled, request.params.id],
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
            await this.db.query('delete from properties where id=?',
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

module.exports.autoPrefix = '/properties'

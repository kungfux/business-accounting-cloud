'use strict'

const schemas = require('../schemas/operation')
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
            .send({ message: 'Requested operation does not exist' })
    })

    fastify.get(
        '/',
        { schema: schemas.findAll },
        async function (request, reply) {
            const companyId = parseInt(request.query.companyId)
            const from = request.query.from || undefined;
            const to = request.query.to || undefined;
            const limit = parseInt(request.query.limit) || 10
            const offset = parseInt(request.query.offset) || 0
            if (from === undefined && to === undefined) {
                return await this.db.query('select * from operations where companyId = ? ' +
                    'order by operationDate desc,created desc limit ? offset ?',
                    {
                        replacements: [companyId, limit, offset],
                        type: QueryTypes.SELECT
                    }
                )
            } else {
                return await this.db.query('select * from operations where companyId = ? and operationDate >= ? and operationDate <= ? ' +
                    'order by operationDate desc,created desc limit ? offset ?',
                    {
                        replacements: [companyId, from, to, limit, offset],
                        type: QueryTypes.SELECT
                    }
                )
            }
        }
    )

    fastify.get(
        '/:id',
        { schema: schemas.findOne },
        async function (request, reply) {
            const item = await this.db.query('select * from operations where id = ? limit 1',
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
            const [result] = await this.db.query(
                'insert into operations (operationDate,amount,comment,contactId,propertyId,incomeId,expenditureId,companyId) ' +
                'values(?,?,?,?,?,?,?,?)',
                {
                    replacements: [
                        request.body.operationDate || null,
                        request.body.amount || null,
                        request.body.comment || null,
                        request.body.contactId || null,
                        request.body.propertyId || null,
                        request.body.incomeId || null,
                        request.body.expenditureId || null,
                        request.body.companyId || null,
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
            const [, metadata] = await this.db.query(
                'update operations set operationDate=?,amount=?,comment=?,contactId=?,propertyId=?,' +
                'incomeId=?,expenditureId=? where id=?',
                {
                    replacements: [
                        request.body.operationDate || null,
                        request.body.amount || null,
                        request.body.comment || null,
                        request.body.contactId || null,
                        request.body.propertyId || null,
                        request.body.incomeId || null,
                        request.body.expenditureId || null,
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
            await this.db.query('delete from operations where id=?',
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

module.exports.autoPrefix = '/operations'

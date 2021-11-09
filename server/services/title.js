'use strict'

const schemas = require('../schemas/title')
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
            .send({ message: 'Requested title does not exist' })
    })

    fastify.get(
        '/',
        { schema: schemas.findAll },
        async function (request, reply) {
            const companyId = parseInt(request.query.companyId)
            const enabled = request.query.enabled || false
            const list = request.query.list || undefined
            const limit = parseInt(request.query.limit) || 10
            const offset = parseInt(request.query.offset) || 0

            if (companyId && !enabled) {
                return await this.db.query('select * from titles where companyId=? order by name asc limit ? offset ?',
                    {
                        replacements: [companyId, limit, offset],
                        type: QueryTypes.SELECT
                    }
                )
            }

            if (companyId && enabled) {
                return await this.db.query('select * from titles where companyId=? and enabled=true ' +
                    'order by name asc limit ? offset ?',
                    {
                        replacements: [companyId, limit, offset],
                        type: QueryTypes.SELECT
                    }
                )
            }

            if (list) {
                const ids = list.split(',');
                for (var i = 0; i < ids.length; i++) {
                    ids[i] = +ids[i];
                }
                return await this.db.query('select * from titles where id in (?) order by name asc',
                    {
                        replacements: [ids],
                        type: QueryTypes.SELECT
                    }
                )
            }

            return reply.code(400)
        }
    )

    fastify.get(
        '/:id',
        { schema: schemas.findOne },
        async function (request, reply) {
            const item = await this.db.query('select * from titles where id = ? limit 1',
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
            const [result] = await this.db.query('insert into titles (name,rate,enabled,companyId) ' +
                'values(?,?,?,?)',
                {
                    replacements: [
                        request.body.name || null,
                        request.body.rate || null,
                        request.body.enabled || false,
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
            const [, metadata] = await this.db.query('update titles set name=?,rate=?,enabled=? where id=?',
                {
                    replacements: [
                        request.body.name || null,
                        request.body.rate || null,
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
            await this.db.query('delete from titles where id=?',
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

module.exports.autoPrefix = '/titles'

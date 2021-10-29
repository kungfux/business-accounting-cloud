'use strict'

const schemas = require('../schemas/contact')
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
            .send({ message: 'Requested contact does not exist' })
    })

    fastify.get(
        '/',
        { schema: schemas.findAll },
        async function (request, reply) {
            const companyId = parseInt(request.query.companyId)
            const limit = parseInt(request.query.limit) || 10
            const offset = parseInt(request.query.offset) || 0
            const items = await this.db.query(
                'select contacts.*, titles.name as title from contacts left join titles on contacts.title_id = titles.id ' +
                'where contacts.company_id = ? limit ? offset ?',
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
            const item = await this.db.query(
                'select contacts.*, titles.name as title from contacts left join titles on contacts.title_id = titles.id ' +
                'where contacts.id = ? limit 1',
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
                'insert into contacts (name,phone,cellphone,email,address,passport,dob,note,hired,fired,photo,avatar,title_id,company_id) ' +
                'values(?,?,?,?,?,?,?,?,?,?,?,(select id from titles where name = ?),?)',
                {
                    replacements: [
                        request.body.name,
                        request.body.phone,
                        request.body.cellphone,
                        request.body.email,
                        request.body.address,
                        request.body.passport,
                        request.body.dob,
                        request.body.note,
                        request.body.hired,
                        request.body.fired,
                        request.body.photo,
                        request.body.avatar,
                        request.body.title,
                        request.body.companyId],
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
                'update contacts set name=?,phone=?,cellphone=?,email=?,address=?,passport=?,dob=?,note=?,hired=?,fired=?,' +
                'photo=?,avatar=?,title_id=(select titles.id from titles where titles.name=?) where id=?',
                {
                    replacements: [
                        request.body.name,
                        request.body.phone,
                        request.body.cellphone,
                        request.body.email,
                        request.body.address,
                        request.body.passport,
                        request.body.dob,
                        request.body.note,
                        request.body.hired,
                        request.body.fired,
                        request.body.photo,
                        request.body.avatar,
                        request.body.title,
                        request.params.id],
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
            await this.db.query('delete from contacts where id=?',
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

module.exports.autoPrefix = '/contacts'

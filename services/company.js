'use strict'

const schemas = require('../schemas/company')

module.exports = async function (fastify, opts) {
    // fastify.addHook('onRequest', async (request, reply) => {
    //     try {
    //         await request.jwtVerify()
    //     } catch (err) {
    //         reply.send(err)
    //     }
    // })

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
            const limit = parseInt(request.query.limit) || 0
            const offset = parseInt(request.query.offset) || 0
            var res = await this.db.query('select * from company')
            return JSON.stringify(res[0])
        }
    )

    fastify.get(
        '/:name',
        { schema: schemas.findOne },
        async function (request, reply) {
            const item = await this.mongo.db
                .collection('todo')
                .findOne({ name: request.params.name })

            if (item == null) {
                return reply.callNotFound()
            }

            return item
        }
    )

    fastify.post(
        '/',
        { schema: schemas.insertOne },
        async function (request, reply) {
            return this.mongo.db.collection('todo').insertOne(
                Object.assign(request.body, {
                    timestamp: this.timestamp(),
                    done: false
                })
            )
        }
    )

    fastify.put(
        '/:name',
        { schema: schemas.updateOne },
        async function (request, reply) {
            return this.mongo.db
                .collection('todo')
                .findOneAndUpdate(
                    { name: request.params.name },
                    { $set: { done: request.body.done } }
                )
        }
    )

    fastify.delete(
        '/:name',
        { schema: schemas.deleteOne },
        async function (request, reply) {
            return this.mongo.db
                .collection('todo')
                .deleteOne({ name: request.params.name })
        }
    )
}

module.exports.autoPrefix = '/company'

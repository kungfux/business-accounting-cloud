'use strict'

const schemas = require('../schemas/report')
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
            .send({ message: 'Requested report does not exist' })
    })

    fastify.get(
        '/',
        { schema: schemas.saldo },
        async function (request, reply) {
            const companyId = parseInt(request.query.companyId)
            const from = request.query.from || undefined;
            const to = request.query.to || undefined;
            var result = 0;
            if (from === undefined && to === undefined) {
                result = await this.db.query('select sum(amount) as saldo from operations where companyId = ?',
                    {
                        replacements: [companyId],
                        type: QueryTypes.SELECT
                    }
                )
            } else {
                result = await this.db.query('select sum(amount) as saldo from operations where companyId = ? and ' +
                    'operationDate >= ? and operationDate <= ?',
                    {
                        replacements: [companyId, from, to],
                        type: QueryTypes.SELECT
                    }
                )
            }

            if (result.length > 0) {
                reply.code(200).send({
                    saldo: result[0].saldo
                })
            }

            reply.callNotFound()
        }
    )
}

module.exports.autoPrefix = '/reports'

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
        { schema: schemas.total },
        async function (request, reply) {
            const companyId = parseInt(request.query.companyId)
            const detalization = request.query.detalization || undefined;
            const from = request.query.from || undefined;
            const to = request.query.to || undefined;

            switch (detalization) {
                default:
                    if (from === undefined && to === undefined) {
                        return await this.db.query('select sum(amount) as total from operations where companyId = ?',
                            {
                                replacements: [companyId],
                                type: QueryTypes.SELECT
                            }
                        )
                    } else {
                        return await this.db.query('select sum(amount) as total from operations where companyId = ? and ' +
                            'operationDate >= ? and operationDate <= ?',
                            {
                                replacements: [companyId, from, to],
                                type: QueryTypes.SELECT
                            }
                        )
                    }
                case 'year':
                    return await this.db.query('select sum(amount) as total, strftime("%Y",operationDate) as year ' +
                        'from operations where companyId = ? and operationDate >= ? and operationDate <= ? ' +
                        'group by year order by year',
                        {
                            replacements: [companyId, from, to],
                            type: QueryTypes.SELECT
                        })
                case 'month':
                    return await this.db.query('select sum(amount) as total, strftime("%m",operationDate) as month, ' +
                        'strftime("%Y",operationDate) as year from operations where companyId = ? ' +
                        'and operationDate >= ? and operationDate <= ? group by month, year order by year, month',
                        {
                            replacements: [companyId, from, to],
                            type: QueryTypes.SELECT
                        })
                case 'week':
                    return await this.db.query('select sum(amount) as total, strftime("%W",operationDate) as week, ' +
                        'strftime("%Y",operationDate) as year from operations where companyId = ? ' +
                        'and operationDate >= ? and operationDate <= ? group by week, year order by year, week',
                        {
                            replacements: [companyId, from, to],
                            type: QueryTypes.SELECT
                        })
                case 'day':
                    return await this.db.query('select sum(amount) as total, strftime("%j",operationDate) as day, ' +
                        'strftime("%Y",operationDate) as year from operations where companyId = ? ' +
                        'and operationDate >= ? and operationDate <= ? group by day, year order by year, day',
                        {
                            replacements: [companyId, from, to],
                            type: QueryTypes.SELECT
                        })
            }
        }
    )
}

module.exports.autoPrefix = '/reports/pureIncome'

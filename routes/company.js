async function routeCompany(fastify, options) {
    const path = '/company'

    const opts = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        name: { type: 'string' }
                    }
                },
                404: {}
            }
        }
    }

    fastify.get(path, opts, (request, reply) => {
        reply.send({ name: 'My company' })
    })

    fastify.post()
}

module.exports = routeCompany;
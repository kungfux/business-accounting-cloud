const fastify = require('fastify')({ logger: true })

fastify.route({
    method: 'GET',
    url: '/',
    schema: {
        querystring: {
            name: { type: 'string' }
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    server: { type: 'string' }
                }
            }
        }
    },
    preHandler: async (request, reply) => {
        // TODO: Add authentication
    },
    handler: async (request, reply) => {
        return { server: 'Business Accounting Cloud 1.0.0' }
    }
})

const start = async () => {
    try {
        await fastify.listen(80);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();

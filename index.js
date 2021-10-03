const fastify = require('fastify')({ logger: true })

fastify.get('/', async (request, reply) => {
    return { welcome: 'Business Accounting Cloud 1.0.0' }
});

const start = async () => {
    try {
        await fastify.listen(80)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start();

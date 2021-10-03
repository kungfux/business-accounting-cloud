const fastify = require('fastify')({
    logger: true
});

fastify.register(require('./routes/root'));

const start = async () => {
    try {
        await fastify.listen(80)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()

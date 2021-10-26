'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {

    const banTime = 3000;

    {
        let collection = {}
        var lastAttempt = function (login) {
            if (collection[login] === undefined) {
                collection[login] = new Date(Date.now() - banTime - 1000)
                return collection[login]
            }
            var last = collection[login]
            collection[login] = new Date(Date.now())
            return last
        };
    }

    fastify.decorate('canLogin', function (login) {
        var last = lastAttempt(login)
        var allowed = last < new Date(Date.now() - banTime)
        return allowed
    })
})
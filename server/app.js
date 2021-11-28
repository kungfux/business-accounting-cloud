'use strict'

const path = require('path')
const chalk = require('chalk')
const autoLoad = require('fastify-autoload')
const { v4: uuidv4 } = require('uuid')

module.exports = function (fastify, opts, next) {
  async function executeSqlFile(filename) {
    const fs = require('fs')
    const queries = fs.readFileSync(`./storage/${filename}.sql`, 'utf8').toString()
      .replace(/(\r\n|\n|\r)/gm, ' ')
      .replace(/\s+/g, ' ')
      .split(';')
      .map(Function.prototype.call, String.prototype.trim)
      .filter(function (el) { return el.length !== 0 })
    await queries.forEach(async function (query) {
      await fastify.db.query(query)
    })
  }

  fastify
    .register(require('fastify-cors'), {
      strictPreflight: false
    })
    .register(require('fastify-helmet'))
    .register(require('fastify-jwt'), {
      secret: opts.auth ? opts.auth.secret : uuidv4()
    })
    .register(require('fastify-formbody'))
    .register(require('fastify-multipart'))
    .register(require('sequelize-fastify'),
      {
        instance: 'db',
        sequelizeOptions: {
          dialect: 'sqlite',
          storage: './storage/bac.sqlite'
        }
      }
    )
    .ready(async () => {
      try {
        await fastify.db.authenticate()

        console.log(
          chalk.green('Database connection is successfully established')
        )

        executeSqlFile('database-schema')
        executeSqlFile('database-sample')
      } catch (err) {
        console.log(
          chalk.red(`Connection could not established: ${err}`)
        )
        fastify.close()
      }
    })

  fastify.register(autoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(autoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({ prefix: '/api' }, opts)
  })

  // TODO: Remove to host web app at the same address
  fastify.get('/', async function (request, reply) {
    reply.code(303).redirect('/api')
  })

  next()
}

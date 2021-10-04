'use strict'

const path = require('path')
const chalk = require('chalk')
const AutoLoad = require('fastify-autoload')

module.exports = function (fastify, opts, next) {
  fastify
    .register(require('fastify-cors'))
    .register(require('fastify-helmet'))
    .register(require('fastify-jwt'), {
      secret: opts.auth ? opts.auth.secret : process.env.SECRET || '9005890b-1fcd-41d4-a58f-23bd4ca19750'
    })
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

        await fastify.db.query('CREATE TABLE IF NOT EXISTS company (id INTEGER PRIMARY KEY AUTOINCREMENT, name NVARCHAR(45) NOT NULL UNIQUE)');

        // const fs = require('fs')
        // fs.readFile('./storage/database-schema.sql', 'utf8', async function (err, data) {
        //   if (err) {
        //     console.error(
        //       chalk.red('database-schema.sql not found')
        //     )
        //     throw err
        //   }

        //   await fastify.db.createSchema(data)
        // })

      } catch (err) {
        console.log(
          chalk.red(`Connection could not established: ${err}`)
        )
      } finally {
        // fastify.close()
      }
    })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({ prefix: '/api' }, opts)
  })

  // TODO: Remove to host web app at the same address
  fastify.get('/', async function (request, reply) {
    reply.code(303).redirect('/api')
  })

  next()
}

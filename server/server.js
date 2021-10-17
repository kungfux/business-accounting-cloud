'use strict'

const path = require('path')
require('dotenv').config()

const fastify = require('fastify')
const closeWithGrace = require('close-with-grace')

const app = fastify({
  logger: true
})

const appService = require('./app.js')
app.register(appService)

const closeListeners = closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {
  if (err) {
    app.log.error(err)
  }
  await app.close()
})

app.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall()
  done()
})

app.listen(process.env.BAC_PORT || 3000, '0.0.0.0', (err) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})

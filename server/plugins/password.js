'use strict'

// TODO: Replace by bcrypt
const sha512 = require('js-sha512')
const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
  fastify.decorate('createNewHashSalt', function (password) {
    const salt = getNewSalt();
    const hash = getHash(password, salt);
    return { hash, salt }
  })

  fastify.decorate('calculateHash', function (password, salt) {
    return getHash(password, salt)
  })

  function getNewSalt() {
    function createSalt(length) {
      let result = ''
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      const charactersLength = characters.length
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
          charactersLength))
      }
      return result
    }

    return createSalt(10)
  }

  function getHash(password, salt) {
    return sha512(password + salt + '6510225325')
  }
})

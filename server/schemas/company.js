'use strict'

const findAll = {
  response: {
    200: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          logo: { type: 'string' },
          enabled: { type: 'boolean' },
          created: { type: 'string' }
        }
      }
    }
  },
  querystring: {
    limit: { type: 'integer' },
    offset: { type: 'integer' }
  }
}

const findOne = {
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        logo: { type: 'string' },
        enabled: { type: 'boolean' },
        created: { type: 'string' }
      }
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    }
  }
}

const insertOne = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1 },
      logo: { type: 'string' },
      enabled: { type: 'boolean' }
    },
    required: ['name', 'logo', 'enabled']
  }
}

const updateOne = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1 },
      logo: { type: 'string' },
      enabled: { type: 'boolean' }
    },
    required: ['name', 'logo', 'enabled']
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    }
  }
}

const deleteOne = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    }
  }
}

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }

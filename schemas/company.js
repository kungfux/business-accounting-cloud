'use strict'

const findAll = {
  response: {
    200: {
      type: 'array',
      items: {
        properties: {
          name: { type: 'string' }
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
        name: { type: 'string' }
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
      id: { type: 'string' }
    }
  }
}

const insertOne = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1 }
    },
    required: ['name']
  }
}

const updateOne = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1 }
    },
    required: ['name']
  },
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    }
  }
}

const deleteOne = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    }
  }
}

module.exports = { findAll, findOne, insertOne, updateOne, deleteOne }

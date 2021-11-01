'use strict'

class BaseSchema {

    constructor(getOnlyProperties, getAndPostProperties, putOnlyProperties, querystring) {
        this.getProperties = {
            id: { type: 'integer' },
            ...(getAndPostProperties),
            ...(getOnlyProperties),
            ...(putOnlyProperties)
        };
        this.postProperties = getAndPostProperties;
        this.putProperties = putOnlyProperties;
        this.querystring = querystring;
    }

    get findAll() {
        return {
            response: {
                200: {
                    type: 'array',
                    items: {
                        properties: this.getProperties
                    }
                }
            },
            querystring: {
                limit: { type: 'integer' },
                offset: { type: 'integer' },
                ...(this.querystring)
            }
        }
    }

    get findOne() {
        return {
            response: {
                200: {
                    type: 'object',
                    properties: this.getProperties
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
    }

    get insertOne() {
        return {
            body: {
                type: 'object',
                properties: this.postProperties,
                required: Object.getOwnPropertyNames(this.postProperties)
            }
        }
    }

    get updateOne() {
        return {
            body: {
                type: 'object',
                properties: this.putProperties,
                required: Object.getOwnPropertyNames(this.putProperties)
            },
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                }
            }
        }
    }

    get deleteOne() {
        return {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'integer' }
                }
            }
        }
    }
}

module.exports = BaseSchema
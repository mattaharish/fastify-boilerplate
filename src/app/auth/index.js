'use strict';

const { register: registerSchema } = require('./schema/register');
const { handler: registerHandler } = require('./handlers/register');

module.exports = async fastify => {
  fastify.route({
    method: 'POST',
    url: '/register',
    schema: registerSchema,
    handler: registerHandler
  });
};

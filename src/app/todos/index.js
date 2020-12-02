'use strict';

const { createTodoSchema } = require('./schemas/createTodo');

const { handler: createTodoHandler } = require('./handlers/createTodo');

module.exports = async fastify => {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: createTodoSchema,
    handler: createTodoHandler
  });
};

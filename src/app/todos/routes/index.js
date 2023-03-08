'use strict';

const { createTodoSchema } = require('../schemas');

const { createTodo } = require('../handlers');

module.exports = async fastify => {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: createTodoSchema,
    handler: createTodo(fastify)
  });
};

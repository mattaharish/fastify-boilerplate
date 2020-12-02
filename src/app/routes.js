'use strict';

const todoRoutes = require('./todos');

module.exports = async fastify => {
  fastify.register(todoRoutes, { prefix: '/v1/todos' });
};

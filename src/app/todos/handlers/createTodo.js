'use strict';
const { CREATED } = require('http-status-codes').StatusCodes;

const { createTodo: createTodoService } = require('../services');

const createTodo = fastify => async (request, reply) => {
  const { body, logTrace } = request;
  const createdTodo = await createTodoService({
    fastify,
    logTrace,
    todo: body
  });
  return reply.code(CREATED).send(createdTodo);
};

module.exports = createTodo;

'use strict';

const { uuidV4 } = require('../../../lib');
const { TodoRepository } = require('../repository');

const createTodo = async ({ fastify, logTrace, todo }) => {
  const { TodoRepo } = TodoRepository;
  const { createTodo: createTodoRepo } = TodoRepo(fastify);
  const createdTodo = createTodoRepo(
    fastify.knex,
    logTrace
  )({
    data: { ...todo, todo_id: uuidV4(), user_id: 'u_001', created_at: new Date().toISOString() }
  });
  return createdTodo;
};

module.exports = createTodo;

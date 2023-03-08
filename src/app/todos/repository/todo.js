'use strict';

const TODO = {
  NAME: 'todo',
  COLUMNS: {
    id: 'id',
    todo_id: 'todo_id',
    user_id: 'user_id',
    name: 'name',
    description: 'description',
    label: 'label',
    due_date: 'due_date',
    priority: 'priority',
    created_at: 'created_at',
    updated_at: 'updated_at',
    created_by: 'created_by',
    updated_by: 'updated_by'
  }
};

function TodoRepo(fastify) {
  const createTodo =
    (knex, logTrace) =>
    async ({ data }) => {
      const query = knex(TODO.NAME).returning('*').insert(data);
      const [response] = await query;
      return response;
    };

  return { createTodo };
}

module.exports = { TodoRepo, TODO };

/* eslint-disable unicorn/filename-case */
'use strict';

exports.up = async knex => {
  const tableExists = await knex.schema.hasTable('todo');
  if (tableExists) return;
  await knex.schema.createTable('todo', table => {
    table.increments('id');
    table.uuid('todo_id').notNullable().unique().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('user_id').notNullable();
    table.string('name').notNullable();
    table.string('description');
    table.string('label');
    table.string('due_date');
    table.boolean('priority');
    table.timestamp('created_at');
    table.timestamp('updated_at');
    table.string('created_by');
    table.string('updated_by');
  });
};

exports.down = async knex => {
  return knex.schema.dropTable('todo');
};

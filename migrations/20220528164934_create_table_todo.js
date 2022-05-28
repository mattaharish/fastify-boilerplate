/* eslint-disable unicorn/filename-case */
'use strict';

exports.up = async knex => {
  await knex.schema.createTable('todo', table => {
    table.increments('id');
    table.uuid('todo_id').notNullable().unique().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('user_id').notNullable();
    table.string('name').notNullable();
    table.string('description');
    table.string('label');
    table.string('due_date');
    table.boolean('priority');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
    table.string('createdBy').notNullable();
    table.string('updatedBy').notNullable();
  });
};

exports.down = async knex => {
  return knex.schema.dropTable('todo');
};

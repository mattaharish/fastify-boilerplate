/* eslint-disable unicorn/filename-case */
'use strict';

exports.up = async knex => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  const tableExists = await knex.schema.hasTable('user');
  if (tableExists) return;
  await knex.schema.createTable('user', table => {
    table.increments('id');
    table.uuid('user_id').notNullable().unique().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('first_name').notNullable();
    table.string('middle_name');
    table.string('last_name').notNullable();
    table.string('email_id').notNullable();
    table.boolean('email_verified').notNullable().defaultTo(false);
    table.string('phone_number').notNullable();
    table.string('country_code').notNullable();
    table.boolean('phone_number_verified').notNullable().defaultTo(false);
    table.string('status').notNullable();
    table.string('user_type').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt');
    table.string('createdBy').defaultTo('ADMIN').notNullable();
    table.string('updatedBy');
  });
};

exports.down = async knex => {
  return knex.schema.dropTable('user');
};

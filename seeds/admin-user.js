/* eslint-disable unicorn/filename-case */
'use strict';

exports.seed = async knex => {
  await knex('user').del();
  await knex('user').insert([
    {
      first_name: 'super',
      last_name: 'admin',
      email_id: 'admin@xyz.com',
      country_code: '+91',
      phone_number: '999999999',
      status: 'ACTIVE',
      user_type: 'SYSTEM'
    }
  ]);
};

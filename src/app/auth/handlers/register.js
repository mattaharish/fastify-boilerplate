/* eslint-disable no-console */
'use strict';

const { createUser } = require('../services/register');
exports.registerHandler = async function (request, reply) {
  /**
   * * 1. Check for any extra validations
   * * 2. Format the data that is to be passed to services
   * * 3. Receive the response and make any changes if required.
   */
  const { data } = await createUser(this, { request });
  reply.code(201).send({ data });
};

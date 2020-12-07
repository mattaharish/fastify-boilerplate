'use strict';
const { uuid } = require('../../../lib');

exports.handler = async function handler(request, reply) {
  reply.code(201).send({
    todoId: uuid()
  });
};

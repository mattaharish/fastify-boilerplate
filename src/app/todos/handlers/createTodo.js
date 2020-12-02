'use strict';
const { uuid } = require('../../../utils/');

exports.handler = async function handler(request, reply) {
  this.log.info({
    message: 'Invoking Request for creating a todo'
  });
  reply.code(201).send({
    todoId: uuid()
  });
};

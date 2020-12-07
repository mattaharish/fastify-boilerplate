'use strict';

exports.handler = async function (request, reply) {
  reply.code(201).send({ uuid: '123' });
};

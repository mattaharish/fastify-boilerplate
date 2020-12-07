'use strict';

const fp = require('fastify-plugin');
const Ajv = require('ajv');
const AjvErrors = require('ajv-errors');

async function ajvCompiler(fastify, options) {
  const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    nullable: true,
    allErrors: true,
    jsonPointers: true
  });
  fastify.setValidatorCompiler(({ schema }) => {
    return ajv.compile(schema);
  });
  AjvErrors(ajv);
}

module.exports = fp(ajvCompiler, {
  fastify: '>=3.0.0',
  name: 'ajv-compiler'
});

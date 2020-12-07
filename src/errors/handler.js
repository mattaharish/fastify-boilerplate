'use strict';

function validationErrorMessage(error, context) {
  const { dataPath, message, params } = error;
  const prefix = `${context || ''}${dataPath || ''}`;
  const paddedPrefix = prefix ? `${prefix} ` : '';
  const allowedValues =
    params && Array.isArray(params.allowedValues)
      ? `: ${params.allowedValues.map(v => `'${v}'`).join(', ')}`
      : '';
  return `${paddedPrefix}${message}${allowedValues}`;
}

const errorHandler = (error, request, reply) => {
  if (Array.isArray(error.validation)) {
    const body = {
      errors: error.validation.map(err => ({
        code: 'REQUEST_VALIDATION_ERROR',
        message: validationErrorMessage(err, error.validationContext)
      }))
    };
    reply.code(400);
    reply.type('application/json');
    reply.send(body);
    return;
  }
};

module.exports = {
  errorHandler
};

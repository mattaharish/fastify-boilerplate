'use strict';

const util = require('util');

exports.formatDetail = detail => {
  if (typeof detail === 'string' || detail instanceof String) {
    return detail;
  }
  return util.inspect(detail);
};

exports.getPropertyPath = val => {
  const path =
    val.params.missingProperty ||
    val.dataPath ||
    val.instancePath ||
    val.params.propertyName ||
    val.propertyName ||
    'empty_property_key';

  return path.replace('.', '').replace('/', '');
};

exports.getRequest = request => {
  return {
    url: request?.raw?.url || 'NO_URL_FOUND',
    headers: request.headers || 'NO_HEADERS_FOUND',
    body: request.body || 'NO_BODY_FOUND',
    method: request?.raw?.method || 'NO_METHOD_FOUND'
  };
};

// eslint-disable-next-line complexity
exports.getError = error => {
  return {
    data: {
      message: error.message || error?._errors?.[0]?.code || 'NO_MESSAGE_FOUND',
      validationContext: error.validationContext || 'NO_CONTEXT',
      errors: error.validation || error._errors || 'NOT_FOUND',
      code: error.code || 'NO_CODE_FOUND',
      constraint: error.constraint || 'NO_CONSTRAINT_FOUND',
      detail: error.detail || 'NO_DETAIL_FOUND'
    },
    innerError: {
      stack: error.stack || 'NO_STACK_FOUND'
    }
  };
};

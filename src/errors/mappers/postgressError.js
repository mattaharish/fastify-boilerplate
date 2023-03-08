'use strict';

const CustomError = require('../CustomError');
const { POSTGRES_DB_ERRORS } = require('../constants');

module.exports = error => {
  if (error.code && POSTGRES_DB_ERRORS[error.code]) {
    const { statusCode, errorCode } = POSTGRES_DB_ERRORS[error.code];
    const detail = error.detail || error.stack;
    const fieldName = error.column;
    return CustomError.create({
      httpCode: statusCode,
      message: detail,
      property: fieldName,
      code: errorCode
    });
  }
  return undefined;
};

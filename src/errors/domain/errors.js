'use strict';

const ErrorCodes = require('./errorCodes');
const CustomError = require('../CustomError');

module.exports = {
  TodoNotFound: error =>
    CustomError.create({
      httpCode: ErrorCodes.TODO_NOT_FOUND.httpStatusCode,
      message: ErrorCodes.TODO_NOT_FOUND.message,
      code: ErrorCodes.TODO_NOT_FOUND.name,
      error
    })
};

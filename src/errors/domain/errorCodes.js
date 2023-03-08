'use strict';

const HttpStatus = require('http-status-codes').StatusCodes;

module.exports = {
  TODO_NOT_FOUND: {
    name: 'TODO_NOT_FOUND',
    message: "TODO Doesn't Exists IN System",
    explanation: '',
    httpStatusCode: HttpStatus.NOT_FOUND
  }
};

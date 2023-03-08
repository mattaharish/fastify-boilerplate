'use strict';

const CustomError = require('../CustomError');

module.exports = error => {
  if (error instanceof CustomError) {
    return error;
  }
  return undefined;
};

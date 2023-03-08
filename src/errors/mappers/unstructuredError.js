'use strict';

const CustomError = require('../CustomError');

module.exports = error => {
  if (error.fieldName && (error.message || error.detail)) {
    return CustomError.create({
      httpCode: error.code || 400,
      message: error.message || error.detail,
      property: error.fieldName
    });
  }
  return undefined;
};

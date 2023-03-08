'use strict';

const basic = require('./basic');
const paramsValidation = require('./paramsValidation');
const unstructuredError = require('./unstructuredError');
const postgressError = require('./postgressError');

module.exports = {
  paramsValidation,
  unstructuredError,
  postgressError,
  DEFAULT_MAPPERS: [basic, paramsValidation, postgressError, unstructuredError]
};

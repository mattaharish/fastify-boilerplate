'use strict';
const { v4: uuid } = require('uuid');
const logger = require('./logger');
const formatError = require('./format-error');

module.exports = {
  logger: logger(),
  uuid,
  formatError
};

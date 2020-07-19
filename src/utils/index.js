'use strict';
const { v4: uuid } = require('uuid');
const logger = require('./logger');

module.exports = {
  logger: logger(),
  uuid
};

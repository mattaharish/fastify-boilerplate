'use strict';
const { v4: uuid } = require('uuid');
const { logger } = require('./logger');
const serializers = require('./serializers');

module.exports = {
  logger,
  uuid,
  ...serializers
};

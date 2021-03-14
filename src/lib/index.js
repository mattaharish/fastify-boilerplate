'use strict';
const { v4: uuid } = require('uuid');
const logger = require('./logger');
const serializers = require('./serializers');
const redactor = require('./redactor');

module.exports = {
  uuid,
  ...logger,
  ...redactor,
  ...serializers
};

'use strict';
const { v4: uuidV4, v5: uuiV5 } = require('uuid');
const logger = require('./logger');
const serializers = require('./serializers');
const redactor = require('./redactor');

module.exports = {
  uuidV4,
  uuiV5,
  ...logger,
  ...redactor,
  ...serializers
};

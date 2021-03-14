'use strict';

const { requestContext } = require('./requestContext');
const { onResponse } = require('./onResponse');
const { appendPayloadToResponse } = require('./preSerialization');

module.exports = { requestContext, onResponse, appendPayloadToResponse };

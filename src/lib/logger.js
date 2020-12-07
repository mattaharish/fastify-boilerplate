'use strict';

const fs = require('fs');
const path = require('path');
const pino = require('pino');
const multistream = require('pino-multi-stream').multistream;

const {
  errorSerializer,
  redactedHttpRequest,
  redactedHttpResponse,
  requestSerializer,
  responseSerializer
} = require('./serializers');

const streams = [
  { stream: process.stdout },
  { level: 'debug', stream: fs.createWriteStream(path.join(path.resolve(), '/logs/debug.log')) },
  { level: 'fatal', stream: fs.createWriteStream(path.join(path.resolve(), '/logs/fatal.log')) }
];

const logger = pino(
  {
    name: 'fastify-boilerplate',
    level: 'info',
    messageKey: 'message',
    redact: {
      paths: ['password', 'data.password'],
      censor: '***REDACTED***'
    },
    formatters: {
      level(label) {
        return { severity: label.toUpperCase() };
      },
      log(params) {
        return params;
      }
    },
    serializers: {
      req: requestSerializer(pino.stdSerializers.req),
      res: responseSerializer(pino.stdSerializers.res),
      err: errorSerializer,
      request: redactedHttpRequest,
      response: redactedHttpResponse
    }
  },
  multistream(streams)
);

module.exports = { logger };

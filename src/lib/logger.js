'use strict';

const fs = require('fs');
const path = require('path');
const pino = require('pino');
const rTracer = require('cls-rtracer');
const multistream = require('pino-multi-stream').multistream;

const {
  errorSerializer,
  httpRequestSerializer,
  httpResponseSerializer,
  requestSerializer,
  responseSerializer
} = require('./serializers');
const redactor = require('./redactor');

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
      request: httpRequestSerializer,
      response: httpResponseSerializer
    }
  },
  multistream(streams)
);

const customLogger = (log, severity) => ({
  module,
  functionName,
  data,
  metadata,
  message,
  error
}) => {
  log({
    severity,
    requestId: rTracer.id(),
    module,
    functionName,
    error,
    data: redactor(data),
    metadata,
    message
  });
};

const INFO = (...params) => logger.info(...params);
const ERROR = (...params) => logger.error(...params);

module.exports = {
  logger,
  INFO,
  ERROR,
  logInfo: customLogger(logger.info, 'INFO'),
  logError: customLogger(logger.error, 'ERROR')
};

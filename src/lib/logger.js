'use strict';

const fs = require('fs');
const path = require('path');
const pino = require('pino');
const multistream = require('pino-multi-stream').multistream;
const context = require('./asyncContext.js');

const {
  errorSerializer,
  httpRequestSerializer,
  httpResponseSerializer,
  requestSerializer,
  responseSerializer
} = require('./serializers');

const streams = [
  { stream: process.stdout },
  { level: 'debug', stream: fs.createWriteStream(path.join(path.resolve(), '/logs/debug.log')) },
  { level: 'fatal', stream: fs.createWriteStream(path.join(path.resolve(), '/logs/fatal.log')) }
];

const pinoLogger = pino(
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

const logger = new Proxy(pinoLogger, {
  get(target, property) {
    const log = context.getStore()?.get('logger') || target;
    return log[property];
  }
});

module.exports = { pinoLogger, logger };

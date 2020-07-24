'use strict';

const fs = require('fs');
const path = require('path');
const pino = require('pino');
const multistream = require('pino-multi-stream').multistream;

const formatError = require('./format-error');

const streams = [
  { stream: process.stdout },
  { level: 'debug', stream: fs.createWriteStream(path.join(path.resolve(), '/logs/debug.log')) },
  { level: 'fatal', stream: fs.createWriteStream(path.join(path.resolve(), '/logs/fatal.log')) }
];

const pinoLogger = pino(
  {
    name: 'fastify-boilerplate',
    level: 'info',
    redact: {
      paths: ['password', 'data.password'],
      censor: '***REDACTED***'
    }
  },
  multistream(streams)
);

function LogService(logger = pinoLogger) {
  const logWarnData = ({ module, functionName, metadata, data }) =>
    logger.warn({ severity: 'WARNING', module, functionName, metadata, data });
  const logInfoData = ({ module, functionName, metadata, data }) =>
    logger.info({ severity: 'INFO', module, functionName, metadata, data });
  const logDebugData = ({ module, functionName, metadata, data }) =>
    logger.debug({ severity: 'DEBUG', module, functionName, metadata, data });
  const logErrorData = ({ module, functionName, error, message, metadata }) =>
    logger.error({
      severity: 'ERROR',
      module,
      functionName,
      message,
      error: formatError(error),
      metadata
    });

  return {
    pinoLogger,
    logInfoData,
    logDebugData,
    logErrorData,
    logWarnData,
    INFO: (...params) => logger.info(...params),
    TRACE: (...params) => logger.trace(...params),
    WARN: (...params) => logger.warn(...params),
    ERROR: (...params) => logger.error(...params)
  };
}
module.exports = LogService;

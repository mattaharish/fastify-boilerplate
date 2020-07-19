'use strict';

const pino = require('pino');

const pinoLogger = pino({
  name: 'fastify-boilerplate',
  level: 'info',
  redact: {
    paths: ['password', 'data.password'],
    censor: '***REDACTED***'
  }
});

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
      error,
      metadata
    });

  return {
    pinoLogger,
    logInfoData,
    logDebugData,
    logErrorData,
    logWarnData,
    INFO: (...params) => logger.info(...params),
    VERBOSE: (...params) => logger.verbose(...params),
    TRACE: (...params) => logger.trace(...params),
    WARN: (...params) => logger.warn(...params),
    ERROR: (...params) => logger.error(...params)
  };
}
module.exports = LogService;

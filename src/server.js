'use strict';

/**
 * * load all plugins
 * * Initiate the roues
 * * Hooks if any
 */
require('make-promises-safe');
const fastify = require('fastify');
const cors = require('fastify-cors');
const helmet = require('fastify-helmet');
const healthCheck = require('under-pressure');

const init = async ({ utils, config }) => {
  const { logger, uuid } = utils;
  const app = fastify({
    logger: logger.pinoLogger,
    genReqId: () => uuid()
  });
  app.decorate('config', config);
  app.register(cors);
  app.register(helmet, { noCache: true, policy: 'same-origin' });
  app.register(healthCheck, {
    healthCheck: async function () {
      return true;
    },
    message: 'Under Pressure 😯',
    exposeStatusRoute: '/liveness'
  });
  app.register(require('fastify-formbody'));
  app.post('/', async (request, reply) => {
    logger.logDebugData({ data: request.body });
    reply.send(app.memoryUsage());
  });
  await app.ready();
  app.log.info('Everything is Loaded..');
  return app;
};

const run = app => app.listen(app.config.port, app.config.host);

module.exports = {
  init,
  run
};

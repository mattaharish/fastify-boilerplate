'use strict';

require('make-promises-safe');
const fastify = require('fastify');
const cors = require('fastify-cors');
const helmet = require('fastify-helmet');
const oas = require('fastify-oas');
const healthCheck = require('under-pressure');

const routes = require('./app/routes');

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
    exposeStatusRoute: '/live'
  });
  app.register(require('fastify-formbody'));
  app.register(oas, {
    routePrefix: '/documentation',
    swagger: {
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      consumes: ['application/json'],
      produces: ['application/json']
    },
    exposeRoute: true
  });
  app.register(routes);
  await app.ready();
  app.log.info('Everything is Loaded..');
  return app;
};

const run = app => app.listen(app.config.port, app.config.host);

module.exports = { init, run };

'use strict';

require('make-promises-safe');
const path = require('path');
const fastify = require('fastify');
const cors = require('fastify-cors');
const helmet = require('fastify-helmet');
const oas = require('fastify-oas');
const healthCheck = require('under-pressure');
const autoload = require('fastify-autoload');
const rTracer = require('cls-rtracer');
const utils = require('./lib');
const routes = require('./app/routes');

const healthCheckConfig = () => {
  return {
    healthCheck: async function () {
      return true;
    },
    message: 'Under Pressure 😯',
    exposeStatusRoute: '/live'
  };
};

const swaggerDocConfig = () => {
  return {
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
  };
};

const init = async ({ config }) => {
  const { logger, uuid, onRequestLog, appendPayloadToResponse, onResponseLog } = utils;
  const app = fastify({
    logger,
    genReqId: req => req.headers['x-request-id'] || uuid(),
    disableRequestLogging: true
  });
  app.decorate('config', config);
  app.register(cors);
  app.register(helmet, { noCache: true, policy: 'same-origin' });
  app.register(healthCheck, healthCheckConfig);
  app.register(require('fastify-formbody'));
  app.register(oas, swaggerDocConfig(config));
  app.register(autoload, {
    dir: path.join(__dirname, 'plugins'),
    ignorePattern: /^(__tests__)/
  });
  app.register(rTracer.fastifyPlugin, {
    useHeader: true,
    headerName: 'x-request-id',
    useFastifyRequestId: true
  });
  app.register(routes);
  app.addHook('onRequest', onRequestLog);
  app.addHook('preSerialization', appendPayloadToResponse);
  app.addHook('onResponse', onResponseLog);
  await app.ready();
  app.log.info('Everything is Loaded..!');
  return app;
};

const run = app => app.listen(app.config.PORT, app.config.HOST);

module.exports = { init, run };

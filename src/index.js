'use strict';
const envSchema = require('env-schema');

const { init, run } = require('./server');
const { config: envConfig } = require('../config/environmentVariables');
const utils = require('./lib');

(async () => {
  const { logger } = utils;
  const config = envSchema(envConfig);

  try {
    const server = await init({ config });
    await run(server);
  } catch (error) {
    logger.error(error, 'Error While Starting the Server');
  }
})();

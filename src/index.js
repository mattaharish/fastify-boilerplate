'use strict';
const envSchema = require('env-schema');

const { init, run } = require('./server');
const { config: envConfig } = require('../config/environment-variables');
const utils = require('./utils');

(async () => {
  const { logger } = utils;
  const config = envSchema(envConfig);
  try {
    const server = await init({ utils, config });
    await run(server);
  } catch (error) {
    logger.logErrorData({ message: 'Error While Starting the Server', error });
  }
})();

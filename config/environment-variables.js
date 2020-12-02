'use strict';

const serverConfig = {
  host: {
    type: 'string',
    default: '0.0.0.0'
  },
  port: {
    type: 'string',
    default: 3000
  }
};

const dbConfig = {};

const emailConfig = {};

const featureToggles = {};

const configSchema = {
  type: 'object',
  required: ['port'],
  properties: {
    ...serverConfig,
    ...dbConfig,
    ...emailConfig,
    ...featureToggles
  }
};

exports.config = {
  dotenv: true,
  schema: configSchema
};

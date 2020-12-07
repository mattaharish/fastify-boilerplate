'use strict';

const schema = {
  type: 'object',
  properties: {
    HOST: {
      type: 'string',
      default: '0.0.0.0'
    },
    PORT: {
      type: 'number',
      default: 3000
    },
    DB_HOST: {
      type: 'string'
    },
    DB_PORT: {
      type: 'string'
    },
    DB_USER: {
      type: 'string'
    },
    DB_PASSWORD: {
      type: 'string'
    },
    DB_NAME: {
      type: 'string'
    },
    DB_MIN_CONNECTIONS: {
      type: 'number',
      default: 5
    },
    DB_MAX_CONNECTIONS: {
      type: 'number',
      default: 30
    },
    GOOGLE_APPLICATION_CREDENTIALS: {
      type: 'string'
    }
  }
};

exports.config = { dotenv: true, schema };

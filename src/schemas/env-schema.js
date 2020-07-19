'use strict';

const schema = {
  type: 'object',
  required: ['port'],
  properties: {
    host: {
      type: 'string',
      default: '0.0.0.0'
    },
    port: {
      type: 'string',
      default: 3000
    }
  }
};

exports.config = {
  dotenv: true,
  schema
};

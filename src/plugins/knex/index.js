'use strict';

const fp = require('fastify-plugin');
const getKnexClient = require('./setup');
const dbConfig = require('../../../config/knexConfig');

const knexPlugin = async (fastify, options) => {
  try {
    const db = await getKnexClient({ options: dbConfig });
    fastify.decorate('knex', db);
  } catch (e) {
    fastify.log.error(`DB connection failed`);
    throw Error(`Connection Failed ${e}`);
  }
};

module.exports = fp(knexPlugin);

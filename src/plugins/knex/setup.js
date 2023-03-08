'use strict';

const knex = require('knex');
const setupPaginator = require('./paginator');
const { logger } = require('../../lib/logger');

const connectionCheck = db => db.raw('select 1+1 as result');

const getKnexClient = async ({ options }) => {
  try {
    const db = knex({ ...options });
    await connectionCheck(db);
    setupPaginator(db);
    return db;
  } catch (e) {
    logger.error({ message: `DB connection failed`, err: e });
    throw Error(`Connection Failed ${e}`);
  }
};

module.exports = getKnexClient;

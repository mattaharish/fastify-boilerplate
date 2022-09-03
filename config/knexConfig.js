'use strict';

const path = require('path');
const envSchema = require('env-schema');
const { config: envConfig } = require('./environmentVariables');
const config = envSchema(envConfig);

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, DB_MIN_CONNECTIONS, DB_MAX_CONNECTIONS } =
  config;

const databaseConfiguration = {
  client: 'postgres',
  pool: {
    min: parseInt(DB_MIN_CONNECTIONS),
    max: parseInt(DB_MAX_CONNECTIONS)
  },
  acquireConnectionTimeout: 10000,
  migrations: {
    tableName: 'knex_migrations',
    directory: path.resolve(__dirname, '../migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, '../seeds')
  },
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT
  },
  asyncStackTraces: true,
  debug: false
};

module.exports = databaseConfiguration;

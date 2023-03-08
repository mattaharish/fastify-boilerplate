'use strict';

const { logger } = require('../lib/');

const onResponse = async (req, res) => {
  const { method, url } = req.raw;
  const msg = `Response ${res.statusCode} sent for ${method} ${url}`;
  const responseLog = { req, res, responseTime: res.getResponseTime() };
  logger.info(responseLog, msg);
};

module.exports = { onResponse };

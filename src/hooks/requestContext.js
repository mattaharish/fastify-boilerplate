'use strict';

const { pinoLogger, redactor, checkIsEmpty } = require('../lib/');
const context = require('../lib/asyncContext');

const requestContext = (req, _rep, done) => {
  const { url, method } = req.raw;
  const childLogger = pinoLogger.child({ req });
  const store = new Map();
  store.set('logger', childLogger);
  childLogger.info(
    {
      body: redactor(checkIsEmpty(req.body))
    },
    `Incoming request for ${method} ${url}`
  );
  context.run(store, done);
};

module.exports = { requestContext };

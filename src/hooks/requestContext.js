'use strict';

const { pinoLogger, redactor, checkIsEmpty } = require('../lib/');
const context = require('../lib/asyncContext');

const traceHeaders = ['x-request-id', 'x-trace-id'];

function getLogTrace({ req }) {
  const { headers } = req;
  return traceHeaders.reduce(
    (logTrace, headerKey) =>
      Object.assign(
        logTrace,
        headers[headerKey] && {
          [headerKey]: req.headers[headerKey]
        }
      ),
    {}
  );
}

const requestContext = (req, _rep, done) => {
  const { url, method } = req.raw;
  // eslint-disable-next-line no-param-reassign
  req.logTrace = getLogTrace({ req });
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

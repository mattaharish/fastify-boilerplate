'use strict';

const { isEmpty } = require('lodash');
const { redactor } = require('./redactor');
const asyncHooks = require('async_hooks');

const checkIsEmpty = data => (isEmpty(data) ? undefined : data);

const requestSerializer = reqSerializer => req => {
  const { ip, headers, params, query } = req.raw;

  return {
    ...reqSerializer(req),
    ip,
    headers: redactor(headers),
    params: checkIsEmpty(params),
    query: checkIsEmpty(query),
    aid: asyncHooks.executionAsyncId()
  };
};

const responseSerializer = resSerializer => res => {
  return { ...resSerializer(res), body: redactor(res.raw.payload), statusCode: res.statusCode };
};

const errorSerializer = error => {
  if (!error || (!error.message && !error.stack)) return {};
  return {
    message: error.message,
    name: error.name,
    description: error.description,
    number: error.number,
    fileName: error.fileName,
    lineNumber: error.lineNumber,
    columnNumber: error.columnNumber,
    statusCode: error.statusCode,
    options: error.options,
    stack: error.stack,
    errorType: error.errorType,
    code: error.code,
    errorData: error.errorData
  };
};

const httpRequestSerializer = options => {
  return {
    body: redactor(options.json || options.form || options.body),
    method: options.method,
    headers: redactor(options.headers),
    url: options.url
  };
};

const httpResponseSerializer = response => {
  return {
    response: {
      statusCode: response.statusCode,
      message: response.statusMessage,
      body: redactor(response.body),
      headers: response.headers,
      timings: response.timings,
      timeTaken: response?.timings?.phases?.total
    },
    request: {
      body: redactor(
        response?.request?.options?.json || redactor(response?.request?.options?.form)
      ),
      method: response.request.options.method,
      headers: redactor(response.request.options.headers),
      url: response.url,
      ip: response.ip
    }
  };
};

const enrichHttpError = error => {
  const errorResponseBody = error?.response?.body;

  /* eslint-disable no-param-reassign */
  error.statusCode = error?.response?.statusCode || error?.code;
  error.name = 'HTTP_STATUS_CODE_ERROR';
  error.responseBody = errorResponseBody;
  error.context = {
    method: error?.options?.method,
    headers: redactor(error?.options?.headers),
    url: error?.request?.requestUrl,
    stack: error?.stack,
    timings: error?.timings,
    timeTaken: error?.timings?.phases?.total
  };
  /* eslint-disable no-param-reassign */

  return error;
};

module.exports = {
  requestSerializer,
  responseSerializer,
  errorSerializer,
  httpRequestSerializer,
  httpResponseSerializer,
  enrichHttpError,
  checkIsEmpty
};

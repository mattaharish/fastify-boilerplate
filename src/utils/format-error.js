'use strict';

const formatError = error => {
  if (!error || (!error.message && !error.stack)) return {};

  const errorObject = {
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
  return errorObject;
};

module.exports = formatError;

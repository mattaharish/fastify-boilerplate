'use strict';

const CustomError = require('../CustomError');
const { getPropertyPath } = require('../helpers');

const DEFAULT_OPTIONS = {
  showAllowedValues: true
};

module.exports = (error, options = DEFAULT_OPTIONS) => {
  if (error.validation) {
    const errorPath = error.message.split(' ')[0].split('/')[0];
    const errors = error.validation.map(val => {
      const property = getPropertyPath(val);
      let message = `${errorPath} ${val.message}`;
      if (val.params && val.params.additionalProperty) {
        message = `${message} '${val.params.additionalProperty}'`;
      }
      if (options.showAllowedValues && val.params && val.params.allowedValues) {
        message = `${message}. Allowed values: '${val.params.allowedValues.join("', '")}'`;
      }
      return { property, message, code: 'REQUEST_VALIDATION_ERROR' };
    });
    return new CustomError({ httpCode: 400, errors });
  }
  return undefined;
};

/* eslint-disable unicorn/filename-case */

'use strict';

const { formatDetail } = require('./helpers');
const { STATUS_CODES, STATUS_TEXTS } = require('./constants');

module.exports = class CustomError extends Error {
  constructor({ httpCode, errors, innerError }) {
    super();
    this._code = httpCode;
    this._errors = this.getErrorArr(errors);
    this.innerError = innerError;
  }

  getErrorArr(errors) {
    if (!errors || !errors?.length) {
      return [
        {
          message: STATUS_TEXTS[this._code],
          code: STATUS_CODES[this._code]
        }
      ];
    }
    return errors;
  }

  get code() {
    return this._code;
  }

  get response() {
    return {
      errors: this._errors
    };
  }

  static create({ httpCode, message, property, code, error }) {
    const errors = [this.parse({ message, property, code })];
    return new CustomError({ httpCode, errors, innerError: error });
  }

  static parse({ message, property, code }) {
    return {
      message: formatDetail(message),
      ...(property && { property }),
      code
    };
  }
};

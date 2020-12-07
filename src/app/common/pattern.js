'use strict';

const PASSWORD = '/^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@])(?!.*[iIoO])S{6,12}$/';
const PHONE_NUMBER = '^[6-9]d{9}$';

module.exports = {
  PASSWORD,
  PHONE_NUMBER
};

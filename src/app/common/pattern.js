'use strict';

const PASSWORD =
  '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!@#$%^&?*])[a-zA-Z0-9!@#$%^&?*]{8,20}$';
const PHONE_NUMBER = '^\\+91[6789][0-9]{9}$';

module.exports = {
  PASSWORD,
  PHONE_NUMBER
};

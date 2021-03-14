'use strict';

const appendPayloadToResponse = async (_req, res, payload) => {
  Object.assign(res.raw, { payload });
};

module.exports = { appendPayloadToResponse };

'use strict';

const Parameter = require('parameter');

module.exports = app => {
  const opts = app.config.validate;
  app.validator = new Parameter(opts);
};

'use strict';

const is = require('@killara/is');

module.exports = field => () => params => {
  const value = params[field];
  return is.validPhoneNumber(value);
};

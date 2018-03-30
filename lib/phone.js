'use strict';

const is = require('@killara/is');

module.exports = {
  name: 'phone',
  validate: is.validPhoneNumber,
  message: '该手机号不合法',
  code: 'invalid',
};

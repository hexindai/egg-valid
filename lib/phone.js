'use strict';

const is = require('@killara/is');

module.exports = () => {
  return {
    name: 'phone',
    validate: is.validPhoneNumber,
    message: '该手机号不合法',
    code: 'invalid',
  };
};

'use strict';

module.exports = {
  name: 'captcha',
  validate: value => /^[0-9]{6}$/i.test(value),
  message: '手机验证码为6位数字',
  code: 'invalid',
};

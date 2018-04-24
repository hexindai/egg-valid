'use strict';

const rules = require('../lib');

/**
 * egg-valid default config
 * @member Config#valid
 * @property {String} SOME_KEY - some description
 */
exports.valid = {
  rules,
  messages: {
    captcha: '手机验证码为6位数字',
    phone: '该手机号不合法',
    password: '密码包含非法字符',
  },
};

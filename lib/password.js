'use strict';
// &*;+$,?#[]%
module.exports = {
  name: 'password',
  validate: value => /^[0-9a-z&*;+$,?#[\]%]{8,18}$/i.test(value),
  message: '该手机号不合法',
  code: 'invalid',
};

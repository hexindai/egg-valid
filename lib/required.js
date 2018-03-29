'use strict';

module.exports = {
  name: 'required',
  validate: value => typeof value !== 'undefined',
  message: 'required',
  code: 'missing_field',
};

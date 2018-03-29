'use strict';

module.exports = {
  name: 'alpha',
  validate: value => /^[a-z]+$/i.test(value),
  message: 'The field must be entirely alphabetic characters.',
  code: 'invalid',
};

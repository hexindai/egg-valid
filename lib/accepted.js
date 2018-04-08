'use strict';

module.exports = {
  name: 'accepted',
  validate: value => {
    return [ 'yes', 'on', '1', 1, true, 'true' ].includes(value);
  },
  message: 'Please accepted it',
  code: 'invalid',
};
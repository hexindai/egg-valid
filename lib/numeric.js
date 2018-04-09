'use strict';

module.exports = options => {
  let len = 0;
  if (Array.isArray(options)) {
    [ len ] = options;
  }
  return {
    name: 'numeric',
    validate: value => {
      if (parseInt(len) > 0) {
        const regexp = new RegExp(`^[0-9]{${len}}$`);
        return regexp.test(value);
      }
      return /^[0-9]+$/.test(value);
    },
    message: 'all chars should be numeric',
    code: 'invalid',
  };
};

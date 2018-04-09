'use strict';

module.exports = () => {
  return {
    name: 'required',
    validate: value => {
      if (typeof value === 'undefined') {
        return false;
      } else if (value === null) {
        return false;
      } else if (typeof value === 'string' && value.trim().length === 0) {
        return false;
      } else if (Array.isArray(value) && value.length === 0) {
        return false;
      } else if (typeof value === 'object' && JSON.stringify({}) === '{}') {
        return false;
      }
      return true;
    },
    message: 'required',
    code: 'missing_field',
  };
};

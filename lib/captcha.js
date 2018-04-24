'use strict';

module.exports = field => options => params => {
  if (typeof options === 'number') {
    options = { len: ~~options };
  } else {
    options = Object.assign({ len: 6 }, options);
  }
  const value = params[field];
  const { len } = options;
  if (len) {
    const regexp = new RegExp(`^[0-9]{${len}}$`);
    return regexp.test(value);
  }
  return /^[0-9]+$/.test(value);
};

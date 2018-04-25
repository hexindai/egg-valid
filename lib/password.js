'use strict';

module.exports = field => options => params => {
  const value = params[field];
  if (typeof options === 'string') {
    return new RegExp(options).test(value);
  }
  const { min, max } = Object.assign({ min: 8, max: 18 }, options);
  if (min && max && min <= max) {
    const regexp = new RegExp(`^[0-9a-z&*;+$,?#[\\]%]{${min},${max}}$`, 'i');
    return regexp.test(value);
  }
  throw new RangeError('min and max shoud be in the valid range');
};

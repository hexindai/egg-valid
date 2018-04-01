'use strict';

const required = require('./lib/required');
const alpha = require('./lib/alpha');
const phone = require('./lib/phone');
const password = require('./lib/password');

const VERIFIERS = {
  required,
  alpha,
  phone,
  password,
};

/**
 * Validation class
 * @class Validation
 */
class Validation {
  /**
   * parseVerifiers
   * @param {String} ruleString rule string
   * @return {Array} verifiers rule functions
   * @api public
   */
  static parseVerifiers(ruleString) {
    const verifierNames = ruleString.split('|');
    const verifiers = [];
    for (const verifierName of verifierNames) {
      const verifier = VERIFIERS[verifierName];
      if (!verifier) throw new TypeError(`Rule ${verifierName} is not builtin, check your type or you should add custom rule`);
      if (verifierName === 'required') {
        verifiers.unshift(verifier);
      } else {
        verifiers.push(verifier);
      }
    }
    return verifiers;
  }

  /**
   * validate
   * @param {Object} data will be validated
   * @param {Object} rules validation rules
   * @param {Array} messages custom messages
   * @return {Array|undefined} errors
   * @api public
   */
  validate(data, rules, messages = {}) {
    if (!rules || typeof rules !== 'object') {
      throw new TypeError('rules should be non-null object');
    }

    const errors = [];

    for (const field in rules) {
      const verifiers = Validation.parseVerifiers(rules[field]);
      for (const i in verifiers) {
        const verifier = verifiers[i];
        if (!verifier.validate(data[field])) {
          errors.push({
            message: messages[`${field}.${verifier.name}`] || verifier.message,
            field,
            code: verifier.code,
          });
          break;
        }
      }
    }

    if (errors.length) {
      return errors;
    }
  }
}

/**
 * Module exports
 * @type {Class}
 */
module.exports = Validation;

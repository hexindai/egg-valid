'use strict';

/**
 * all verifiers
 */
const VERIFIERS = require('./lib');

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
      const [ verifierRuleName, verifierOptStr ] = verifierName.split(':', 2);
      const verifier = VERIFIERS[verifierRuleName];
      if (!verifier) throw new TypeError(`Rule ${verifierRuleName} is not builtin, check your type or you should add custom rule`);
      let options = null;
      if (typeof verifierOptStr === 'string' && verifierOptStr.trim()) {
        options = verifierOptStr.trim().split(',');
      }
      if (verifierRuleName === 'required') {
        verifiers.unshift(verifier(options));
      } else {
        verifiers.push(verifier(options));
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
    rules = Object.assign({}, rules);
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

'use strict';

module.exports = {
  /**
   * validate data with rules
   *
   * @param  {Object} rules  - validate rule object
   * @param  {Array} [messages] - validate body
   */
  async validate(rules, messages) {
    const errors = await this.app.validator.validate(this.request.body, rules, messages);
    if (errors) {
      this.throw(422, 'Validation Failed', {
        code: 'invalid_param',
        errors,
      });
    }
  },
};

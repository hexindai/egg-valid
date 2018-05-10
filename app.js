'use strict';

const Validation = require('@killara/validation');

const pkg = require('./package.json');

module.exports = app => {

  const validation = new Validation({ app });

  const pluginName = pkg.eggPlugin.name;
  const { rules, messages } = app.config[pluginName];
  const ruleKeys = Object.keys(rules);
  for (const ruleKey of ruleKeys) {
    validation.addRule(ruleKey, rules[ruleKey]);
  }
  const messageKeys = Object.keys(messages);
  for (const messageKey of messageKeys) {
    validation.addMessage(messageKey, messages[messageKey]);
  }
  app.validator = validation;
};

'use strict';

const Validation = require('./validation');
const pkg = require('./package.json');

module.exports = app => {

  const pluginName = pkg.eggPlugin.name;
  const opts = app.config[pluginName];

  app.validator = new Validation(opts);
};

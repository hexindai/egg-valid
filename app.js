'use strict';

const Parameter = require('./parameter');
const pkg = require('./package.json');

module.exports = app => {
  const pluginName = pkg.eggPlugin.name;
  const opts = app.config[pluginName];
  app.validator = new Parameter(opts);
};

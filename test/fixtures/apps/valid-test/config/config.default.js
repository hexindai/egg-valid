'use strict';

exports.keys = '123456';

exports.security = {
  ctoken: false,
  csrf: false,
};

exports.valid = {
  rules: {
    custom: field => context => params => {
      const { app } = context;
      const value = params[field];
      return app.config.keys === value;
    },
  },
  messages: {
    custom: '自定义规则未通过',
  },
};

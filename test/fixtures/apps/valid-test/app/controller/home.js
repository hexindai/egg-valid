'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async index() {
    this.ctx.body = 'hi, ' + this.app.plugins.valid.name;
  }

  async form() {
    const { ctx } = this;
    const rule = {
      username: 'required|alpha',
      password: 'required|password',
      captcha: 'required|captcha',
      phone: 'required|phone',
      requiredapp: 'required|custom',
    };
    await ctx.validate(rule);
    ctx.body = ctx.request.body;
  }
}

module.exports = HomeController;

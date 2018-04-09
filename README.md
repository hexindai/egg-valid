# egg-valid

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-valid.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-valid
[travis-image]: https://img.shields.io/travis/Runrioter/egg-valid.svg?style=flat-square
[travis-url]: https://travis-ci.org/Runrioter/egg-valid
[codecov-image]: https://img.shields.io/codecov/c/github/Runrioter/egg-valid.svg?style=flat-square
[codecov-url]: https://codecov.io/github/Runrioter/egg-valid?branch=master
[david-image]: https://img.shields.io/david/Runrioter/egg-valid.svg?style=flat-square
[david-url]: https://david-dm.org/Runrioter/egg-valid
[snyk-image]: https://snyk.io/test/npm/egg-valid/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-valid
[download-image]: https://img.shields.io/npm/dm/egg-valid.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-valid

A better Validation plugin inspired by Laravel

**[WIP]**

## Install

```bash
$ npm i egg-valid -S
```

## Usage

```js
// {app_root}/config/plugin.js
exports.valid = {
  enable: true,
  package: 'egg-valid',
};

// {app_root}/controller/home.js
class HomeController extends Controller {
  async index() {
    const { app, ctx } = this;
    const rule = { username: 'required|alpha' };
    const value = { username: 'runrioter2' };
    const errors = app.validator.validate(value, rule)
    // ...
  }
}
```

## Rule

* required
* alpha
* phone (Chinese Phone Number)
* password (length: 8-18, alphanumeric and &*;+$,?#[]%)
* captcha
* accepted
* email
* numeric
  - options
    * len
      * example: `numeric:6`

## Messages

We can customize validation messages

```js
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const rule = { username: 'required|alpha' };
    const messages = { 'username.alpha': '该字段应该为字母串' };
    ctx.validate(rule, messages);
    // ...
  }
}
```

## License

[MIT](LICENSE)

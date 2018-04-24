# egg-valid

A better Validation egg plugin based on [@killara/validation](https://github.com/killara/validation)

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-valid.svg
[npm-url]: https://npmjs.org/package/egg-valid
[travis-image]: https://img.shields.io/travis/hexindai/egg-valid.svg
[travis-url]: https://travis-ci.org/hexindai/egg-valid
[codecov-image]: https://img.shields.io/codecov/c/github/hexindai/egg-valid.svg
[codecov-url]: https://codecov.io/github/hexindai/egg-valid?branch=master
[david-image]: https://img.shields.io/david/hexindai/egg-valid.svg
[david-url]: https://david-dm.org/hexindai/egg-valid
[snyk-image]: https://snyk.io/test/npm/egg-valid/badge.svg
[snyk-url]: https://snyk.io/test/npm/egg-valid
[download-image]: https://img.shields.io/npm/dm/egg-valid.svg
[download-url]: https://npmjs.org/package/egg-valid

## Install

```bash
$ npm i egg-valid -S
```

## Usage

```js
// config
exports.valid = {
  enable: true,
  package: 'egg-valid',
};
// controller
class HomeController extends Controller {
  async index() {
    const { app, ctx } = this;
    const rule = { username: 'required|alpha' };
    const value = { username: 'runrioter2' };
    const errors = await app.validator.validate(value, rule)
    // ...
  }
}
```

## Rule

### Derived from [@killara/validation](https://github.com/killara/validation)

* accepted
* alpha
* email
* in
* numeric
* regexp
* required

**[More](https://github.com/killara/validation)**

### Custom rules

* phone (Chinese Phone Number)
* password (length: 8-18, alphanumeric and &*;+$,?#[]%)
* captcha (phone auth code)

## Messages

We can customize validation messages

```js
class HomeController extends Controller {
  async index() {
    const { app } = this;
    const rule = { username: 'required|alpha' };
    const messages = { 'username.alpha': '该字段应该为字母串' };
    const errors = await app.validation.validate(rule, messages);
    if (errors) {
      // ...
    } else {
      // ...
    }
  }
}
```

## License

[MIT](LICENSE)

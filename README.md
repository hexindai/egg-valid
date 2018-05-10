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
  * string style: `field: 'accepted'`
  * object style: `field: { accepted: true }`
* alpha
  * string style: `field: 'alpha:6'` or `field: 'alpha:len=6'`
  * object style: `field: { alpha: { len: 6 } }`
* date
  * string style: `field: 'date'`
  * object style: `field: { date: true }`
* datetime
  * string style: `field: 'datetime'`
  * object style: `field: { datetime: true }`
* time
  * string style: `field: 'time'`
  * object style: `field: { time: true }`
* email
  * string style: `field: 'email:true'`
  * object style: `field: { email: true }`
* in
  * `array` style: `field: [ 'basketball', 'football' ]`
  * object style: `field: { in: [ 'basketball', 'football' ] }`
* money
  * string style: `field: 'money'` or `field: 'money:0'` `field: 'money:2'` (default)
  * object style: `field: { money: { decimal: true } }` or `field: { money: { decimal: 0 } }` or `field: { money: { decimal: 2 } }`
* numeric
  * string style: `field: 'numeric:6'` or `field: 'numeric:len=6'`
  * object style: `field: { numeric: { len: 6 } }`
* regexp
  * string style: `field: 'regexp:"^123456$"'`
  * object style: `field: { regexp: new RegExp(/abc/, 'i') }` or `field: { regexp: /^[0-9a-zA-z]{8,16}$/ }`
* required
  * string style: `field: 'required'` or `field: 'required:true'`
  * object style: `field: { required: true }`

**[More rules](https://github.com/killara/validation)**

### Custom rules

* phone (currently support China phone number only)
  * string style: `field: 'required|phone'`
* password (length: 8-18, alphanumeric and &*;+$,?#[]%)
  * string style:`field: 'password'` or `field: 'password:min=8,max=18'` or `field: 'password:"^[a-z0-9!()-._@#]{8,18}$"'`
* captcha (phone auth code)
  * string style:`field: 'captcha'` or `field: 'captcha:6'`
  * object style: `field: { captcha: { len: 6} }`

## Messages

Customize validation messages

### via API

```js
class HomeController extends Controller {
  async index() {
    const { app } = this;
    const rule = { username: 'required|alpha:6' };
    const messages = { 'username.alpha': '该字段应该为长度为6的字母串' };
    const errors = await app.validation.validate(rule, messages);
    if (errors) {
      // ...
    } else {
      // ...
    }
  }
}
```

### via config

```js
exports.valid = {
  rules: {
    custom: field => context => params => {
      const { app } = context; // app comes from egg
      //... return a boolean
    }
  },
  messages: {
    custom: 'a custom message...',
  },
};
```

### API

### validation.addRule(name: string, ruleFunc: (field: string) => (context: object) => (params: object) => bool)
* Add custom rule
### validation.addMessage(name: string, message: string)
* Add custom message

## License

[MIT](LICENSE)

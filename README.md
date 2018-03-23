# egg-valid

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-valid.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-valid
[travis-image]: https://img.shields.io/travis/eggjs/egg-valid.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-valid
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-valid.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-valid?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-valid.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-valid
[snyk-image]: https://snyk.io/test/npm/egg-valid/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-valid
[download-image]: https://img.shields.io/npm/dm/egg-valid.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-valid
[joi]: https://github.com/hapijs/joi

A Validation plugin based on [Joi][joi] for egg [WIP: current based on Parameter]

## Install

```bash
$ npm i egg-valid --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.valid = {
  enable: true,
  package: 'egg-valid',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.valid = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## License

[MIT](LICENSE)

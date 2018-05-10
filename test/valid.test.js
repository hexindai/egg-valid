'use strict';

const mock = require('egg-mock');

describe('test/valid.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/valid-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should throw 422 response if rule validated falied', () => {
    return app.httpRequest()
      .post('/form')
      .set('Accept', 'application/json')
      .send({
        username: 'Runrioter1',
        password: '',
        requiredapp: 123456,
      })
      .expect(422)
      .expect({
        code: 'invalid_param',
        message: 'Validation Failed',
        errors: [
          { code: 'invalid', message: 'The field only contains letters.', field: 'username' },
          { code: 'missing_field', message: 'The field is a must', field: 'password' },
          { code: 'missing_field', message: 'The field is a must', field: 'captcha' },
          { code: 'missing_field', message: 'The field is a must', field: 'phone' },
          { code: 'invalid', message: '自定义规则未通过', field: 'requiredapp' },
        ],
      });
  });
  it('should ok response if all rules passed', () => {
    return app.httpRequest()
      .post('/form')
      .set('Accept', 'application/json')
      .send({
        username: 'Runrioter',
        password: '12345678[',
        captcha: '123456',
        phone: '15210001000',
        requiredapp: '123456',
      })
      .expect(200)
      .expect({
        username: 'Runrioter',
        password: '12345678[',
        captcha: '123456',
        phone: '15210001000',
        requiredapp: '123456',
      });
  });
});

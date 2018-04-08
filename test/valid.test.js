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
      })
      .expect(422)
      .expect({
        code: 'invalid_param',
        message: 'Validation Failed',
        errors: [
          { code: 'invalid', message: 'The field must be entirely alphabetic characters.', field: 'username' },
          { code: 'missing_field', message: 'required', field: 'password' },
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
      })
      .expect(200)
      .expect({
        username: 'Runrioter',
        password: '12345678[',
      });
  });
});

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

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, valid')
      .expect(200);
  });
});

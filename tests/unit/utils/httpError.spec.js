const { resolve } = require('path');
const HTTPError = require(resolve(__dirname, '../../..', 'src/utils/httpError'));

describe('Test HTTPError class', () => {
  it('should be an error', () => {
    const httpError = new HTTPError();

    expect(httpError).toEqual(expect.any(Error));
  });

  it('should have a message attribute', () => {
    const httpError = new HTTPError();

    expect(httpError).toHaveProperty('message');
  });

  it('should have a status attribute', () => {
    const httpError = new HTTPError();

    expect(httpError).toHaveProperty('status');
  });

  it('should be able to set custom message and status values', () => {
    const httpError = new HTTPError(400, 'Invalid fields');

    expect(httpError).toHaveProperty('status', 400);
    expect(httpError).toHaveProperty('message', 'Invalid fields');
  });
});

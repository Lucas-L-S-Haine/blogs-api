const middleware = require('../../../src/middlewares/errorHandler')
const HTTPError = require('../../../src/utils/httpError');
const MockResponse = require('../../mocks/mockResponse');

describe('Test error handler', () => {
  it('should return an object with status and message', () => {
    const res = new MockResponse();
    const error = new HTTPError(409, 'User already registered');

    const { statusCode, serverResponse } = middleware(error, null, res, null);

    expect(statusCode).toBe(409);
    expect(serverResponse).toEqual({ message: 'User already registered' });
  });

  it('should return status 500 and message "Internal Error" as default', () => {
    const res = new MockResponse();
    const error = {};

    const { statusCode, serverResponse } = middleware(error, null, res, null);

    expect(statusCode).toBe(500);
    expect(serverResponse).toEqual({ message: 'Internal Error' });
  });
});

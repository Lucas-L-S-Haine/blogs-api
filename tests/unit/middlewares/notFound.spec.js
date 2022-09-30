const middleware = require('../../../src/middlewares/notFoundHandler')
const MockResponse = require('../../mocks/mockResponse');

describe('Test error handler', () => {
  it('should return status 404 and message "Path not found"', () => {
    const res = new MockResponse();

    const { statusCode, serverResponse } = middleware(null, res, null);

    expect(statusCode).toBe(404);
    expect(serverResponse).toEqual({ error: 'Path not found' });
  });
});

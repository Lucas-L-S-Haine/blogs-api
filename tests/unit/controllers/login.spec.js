const fs = require('fs');
const controller = require('../../../src/controllers/loginController');
const service = require('../../../src/services/loginService');
const errorHandler = require('../../../src/middlewares/errorHandler');
const HTTPError = require('../../../src/utils/httpError');
const MockResponse = require('../../mocks/mockResponse');
const MockNextFunction = require('../../mocks/mockNextFunction');

jest.mock('../../../src/services/loginService');

const token = fs.readFileSync('tests/mocks/expiredToken.txt', { encoding: 'utf-8' });

describe('Test login controller', () => {
  beforeAll(() => {
    service.login.mockResolvedValue(token);
  });

  it('should return request status and authorization token', async () => {
    const request = {
      body: {
        email: 'lewishamilton@gmail.com',
        password: '123456'
      }
    };
    const response = new MockResponse();

    const { statusCode, serverResponse } = await controller.login(request, response, null);

    expect(statusCode).toBe(200);
    expect(serverResponse).toEqual({ token });
  });

  it('should return status and error message in case of failure', async () => {
    service.login.mockRejectedValueOnce(new HTTPError(400, 'Invalid Fields'));

    const request = {
      body: {
        email: 'lewishamilton@gmail.com',
        password: '433442'
      }
    };
    const response = new MockResponse();
    const next = new MockNextFunction(400, 'Invalid Fields');

    const { statusCode, serverResponse } = await controller.login(request, response, next);

    expect(statusCode).toBe(400);
    expect(serverResponse).toEqual({ message: 'Invalid Fields' });
  });
});

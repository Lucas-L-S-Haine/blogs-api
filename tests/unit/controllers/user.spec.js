const fs = require('fs');
const jwt = require('jsonwebtoken');
const controller = require('../../../src/controllers/userController');
const service = require('../../../src/services/userService');
const errorHandler = require('../../../src/middlewares/errorHandler');
const HTTPError = require('../../../src/utils/httpError');
const MockResponse = require('../../mocks/mockResponse');
const MockNextFunction = require('../../mocks/mockNextFunction');
const MockDataValues = require('../../mocks/mockDataValues');

jest.mock('jsonwebtoken');
jest.mock('../../../src/services/userService');

const token = fs.readFileSync('tests/mocks/expiredToken.txt', { encoding: 'utf-8' });
const newToken = fs.readFileSync('tests/mocks/newUserToken.txt', { encoding: 'utf-8' });

const hamilton = {
  id: 2,
  displayName: 'Lewis Hamilton',
  email: 'lewishamilton@gmail.com',
  image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
};

const schumacher = {
  id: 3,
  displayName: 'Michael Schumacher',
  email: 'MichaelSchumacher@gmail.com',
  image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg'
};

const vettel = {
  id: 4,
  displayName: 'Sebastian Vettel',
  email: 'sebastianvettel@gmail.com',
  image: 'https://www.soumilarora.com/wp-content/uploads/2020/05/sebastian-vettel-champions-crossroads-soumilarora-4.jpg'
}

describe('Test user controllers', () => {
  beforeAll(() => {
    service.readOne.mockResolvedValue(hamilton);
    service.readAll.mockResolvedValue([hamilton, schumacher]);
    service.createOne.mockResolvedValue(newToken);
    service.deleteOne.mockResolvedValue(undefined);
    jwt.decode.mockReturnValue({ email: 'lewishamilton@gmail.com' });
  });

  describe('readOne', () => {
    it('should return data on selected user', async () => {
      const req = { params: { id: '2' } };
      const res = new MockResponse();

      const { statusCode, serverResponse } = await controller.readOne(req, res, null);

      expect(statusCode).toBe(200);
      expect(serverResponse).toEqual(hamilton);
    });

    it('should return status and error message in case of failure', async () => {
      service.readOne.mockRejectedValueOnce(new HTTPError(404, 'User does not exist'));

      const req = { params: { id: '5000' } };
      const res = new MockResponse();
      const next = new MockNextFunction(404, 'User does not exist');

      const { statusCode, serverResponse } = await controller.readOne(req, res, next);

      expect(statusCode).toBe(404);
      expect(serverResponse).toEqual({ message: 'User does not exist' });
    });
  });

  describe('readAll', () => {
    it('should return data on all users', async () => {
      const req = {};
      const res = new MockResponse();

      const { statusCode, serverResponse } = await controller.readAll(req, res, null);

      expect(statusCode).toBe(200);
      expect(serverResponse).toEqual([hamilton, schumacher]);
    });
  });

  describe('createOne', () => {
    it('should return data on registered user', async () => {
      const user = {
        displayName: 'Sebastian Vettel',
        email: 'sebastianvettel@gmail.com',
        image: 'https://www.soumilarora.com/wp-content/uploads/2020/05/sebastian-vettel-champions-crossroads-soumilarora-4.jpg'
      }
      const req = { body: user };
      const res = new MockResponse();

      const { statusCode, serverResponse } = await controller.createOne(req, res, null);

      expect(statusCode).toBe(201);
      expect(serverResponse).toEqual({ token: newToken });
    });

    it('should return status and error message in case of failure', async () => {
      service.createOne.mockRejectedValueOnce(new HTTPError(409, 'User already registered'));

      const user = {
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
      };
      const req = { body: user };
      const res = new MockResponse();
      const next = new MockNextFunction(409, 'User already registered');

      const { statusCode, serverResponse } = await controller.createOne(req, res, next);

      expect(statusCode).toBe(409);
      expect(serverResponse).toEqual({ message: 'User already registered' });
    });
  });

  describe('deleteOne', () => {
    it('should return status 204 and no message', async () => {
      const req = { headers: { authorization: token } };
      const res = new MockResponse();

      const { statusCode, serverResponse } = await controller.deleteOne(req, res, null);

      expect(statusCode).toBe(204);
      expect(serverResponse).toBeUndefined();
    });

    it('should return status and error message in case of failure', async () => {
      service.deleteOne.mockRejectedValueOnce(new HTTPError(401, 'Expired or invalid token'));

      const req = { headers: { authorization: token } };
      const res = new MockResponse();
      const next = new MockNextFunction(401, 'Expired or invalid token');

      const { statusCode, serverResponse } = await controller.deleteOne(req, res, next);

      expect(statusCode).toBe(401);
      expect(serverResponse).toEqual({ message: 'Expired or invalid token' });
    });
  });
});

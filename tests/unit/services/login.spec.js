const { fail } = require('assert/strict');
const { hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../../../src/models');
jest.mock('../../../src/models');
const service = require('../../../src/services/loginService');
const HTTPError = require('../../../src/utils/httpError');
const MockDataValues = require('../../mocks/mockDataValues');

const { User } = models;

User.findOne = jest.fn();

describe('Test login service', () => {
  beforeAll(async () => {
    const password = await hash('123456', 8);
    const hamilton = {
      id: 2,
      displayName: 'Lewis Hamilton',
      email: 'lewishamilton@gmail.com',
      password,
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
    };

    const response = new MockDataValues(hamilton);

    User.findOne.mockReturnValue(Promise.resolve(response));
  });

  it('should throw an error when email is not found in the database', async () => {
    User.findOne.mockReturnValueOnce(Promise.resolve(null));

    const loginData = {
      email: 'lewishamilton@gmail.com',
      password: '123456',
    };

    try {
      await service.login(loginData);
      fail('function did not throw exception');
    } catch (error) {
      expect(error).toHaveProperty('message', 'Invalid fields');
      expect(error).toBeInstanceOf(HTTPError);
      expect(error).toHaveProperty('status', 400);
    }
  });

  it('should throw an error when password is incorrect', async () => {
    const loginData = {
      email: 'lewishamilton@gmail.com',
      password: '123123',
    };

    try {
      await service.login(loginData);
    } catch (error) {
      expect(error).toHaveProperty('message', 'Invalid fields');
      expect(error).toBeInstanceOf(HTTPError);
      expect(error).toHaveProperty('status', 400);
    }
  });

  it('should return a token after user logs in', async () => {
    const secret = process.env.JWT_SECRET;
    expect(secret).toBeTruthy();

    const loginData = {
      email: 'lewishamilton@gmail.com',
      password: '123456',
    };

    const token = await service.login(loginData);
    expect(token).toEqual(expect.any(String));

    const payload = await jwt.verify(token, secret);
    expect(payload).toHaveProperty('id', 2);
    expect(payload).toHaveProperty('displayName', 'Lewis Hamilton');
    expect(payload).toHaveProperty('email', 'lewishamilton@gmail.com');
    expect(payload).toHaveProperty('image');
    expect(payload).not.toHaveProperty('password');
  });
});

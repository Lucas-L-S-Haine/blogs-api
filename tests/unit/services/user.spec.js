const { fail } = require('assert/strict');
const jwt = require('jsonwebtoken');
const models = require('../../../src/models');

jest.mock('../../../src/models');
const service = require('../../../src/services/userService');
const HTTPError = require('../../../src/utils/httpError');
const MockDataValues = require('../../mocks/mockDataValues');
require('../../../tasks/extendJest');

const { User } = models;

User.findByPk = jest.fn();
User.findOne = jest.fn();
User.findAll = jest.fn();
User.destroy = jest.fn();

describe('Test user services', () => {
  beforeAll(() => {
    const hamilton = {
      id: 2,
      displayName: 'Lewis Hamilton',
      email: 'lewishamilton@gmail.com',
      image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
    };
    const schumacher = {
      id: 3,
      displayName: 'Michael Schumacher',
      email: 'MichaelSchumacher@gmail.com',
      image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
    };

    User.findByPk.mockReturnValue(new MockDataValues(schumacher));
    User.findOne.mockReturnValue(new MockDataValues(hamilton));
    User.findAll.mockReturnValue(new MockDataValues([hamilton, schumacher]));
    User.destroy.mockReturnValue(1);
  });

  describe('readOne', () => {
    it('should throw error when user id is not in the database', async () => {
      User.findByPk.mockReturnValueOnce(null);

      try {
        await service.readOne(8000);
        fail('function did not throw exception');
      } catch (error) {
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('status', 404);
        expect(error).toHaveProperty('message', 'User does not exist');
      }
    });

    it('should return user data when they are found in the database', async () => {
      const schumacher = {
        id: 3,
        displayName: 'Michael Schumacher',
        email: 'MichaelSchumacher@gmail.com',
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
      };

      const user = await service.readOne(3);

      expect(user).toMatchDataValues(schumacher);
    });
  });

  describe('createOne', () => {
    it('should throw error when email is already in use', async () => {
      const hamilton = {
        id: 2,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: '123456',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      };

      const dbUser = new MockDataValues(hamilton);

      User.findOne.mockReturnValueOnce(Promise.resolve(dbUser));

      try {
        await service.createOne(hamilton);
        fail('function did not throw exception');
      } catch (error) {
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('status', 409);
        expect(error).toHaveProperty('message', 'User already registered');
      }
    });

    it('should return a token after user is successfully registered', async () => {
      const secret = process.env.JWT_SECRET;
      expect(secret).toBeTruthy();

      User.findOne.mockReturnValueOnce(Promise.resolve(null));

      const hamilton = {
        id: 2,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: '123456',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      };

      const token = await service.createOne(hamilton);
      expect(token).toEqual(expect.any(String));

      const payload = await jwt.verify(token, secret);
      expect(payload).toHaveProperty('id', 2);
      expect(payload).toHaveProperty('displayName', 'Lewis Hamilton');
      expect(payload).toHaveProperty('email', 'lewishamilton@gmail.com');
      expect(payload).toHaveProperty('image');
      expect(payload).not.toHaveProperty('password');
    });
  });

  describe('readAll', () => {
    it('should return a list of all users', async () => {
      const hamilton = {
        id: 2,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      };

      const schumacher = {
        id: 3,
        displayName: 'Michael Schumacher',
        email: 'MichaelSchumacher@gmail.com',
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
      };

      const result = await service.readAll();

      expect(result).toMatchDataValues([hamilton, schumacher]);
      result.forEach((entry) => {
        expect(entry).not.toHaveProperty('password');
        expect(entry).not.toHaveProperty('dataValues.password');
      });
    });
  });

  describe('deleteOne', () => {
    it('should not return anything', async () => {
      const email = 'lewishamilton@gmail.com';

      const result = await service.deleteOne('lewishamilton@gmail.com');

      expect(result).toBeUndefined();
    });
  });
});

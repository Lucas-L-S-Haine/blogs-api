const { fail } = require('assert/strict');
const models = require('../../../src/models');
jest.mock('../../../src/models');
const service = require('../../../src/services/userService');
const HTTPError = require('../../../src/utils/httpError');

const { User } = models;

User.findByPk = jest.fn();

describe('Test user services', () => {
  beforeAll(() => {
    User.findByPk.mockReturnValue({
      id: 3,
      displayName: 'Michael Schumacher',
      email: 'MichaelSchumacher@gmail.com',
      image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
    });

  });

  describe('readOne', () => {
    it('should throw error when user id is not in the database', async () => {
      User.findByPk.mockReturnValueOnce(null);

      try {
        await service.readOne(8000);
        fail('function did not throw exception');
      } catch(error) {
        expect(error).toHaveProperty('message', 'User does not exist');
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('status', 404);
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

      expect(user).toEqual(schumacher);
    });
  });
});

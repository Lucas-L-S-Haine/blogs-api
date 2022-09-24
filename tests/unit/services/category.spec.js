const { fail } = require('assert/strict');
const models = require('../../../src/models');

jest.mock('../../../src/models');
const service = require('../../../src/services/categoryService');
const HTTPError = require('../../../src/utils/httpError');
const MockDataValues = require('../../mocks/mockDataValues');
require('../../../tasks/extendJest');

const { Categories: Category } = models;

Category.create = jest.fn();
Category.findOne = jest.fn();
Category.findAll = jest.fn();

describe('Test category services', () => {
  beforeAll(() => {
    const categoriesList = new MockDataValues([
      { id: 1, name: 'Inovação' },
      { id: 2, name: 'Escola' },
    ]);

    Category.create.mockReturnValue(null);
    Category.findOne.mockReturnValue(Promise.resolve({ name: 'Node.js' }));
    Category.findAll.mockReturnValue(Promise.resolve(categoriesList));
  });

  describe('createOne', () => {
    it('should throw error when name is not provided', async () => {
      const category = {};

      try {
        await service.createOne(category);
        fail('function did not throw exception');
      } catch (error) {
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('status', 400);
        expect(error).toHaveProperty('message', '"name" is required');
      }
    });

    it('should create a new category and return an object with its name', async () => {
      const category = { name: 'Node.js' };
      const result = await service.createOne(category);

      expect(result).toEqual(category);
    });
  });

  describe('readAll', () => {
    it('should return a list of all categories', async () => {
      const categoriesList = [
        { id: 1, name: 'Inovação' },
        { id: 2, name: 'Escola' },
      ];

      const categories = await service.readAll();

      expect(categories).toMatchDataValues(categoriesList);
    });
  });
});

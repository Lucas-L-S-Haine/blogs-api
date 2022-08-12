const { fail } = require('assert/strict');
const jwt = require('jsonwebtoken');
const models = require('../../../src/models');
jest.mock('../../../src/models');
const service = require('../../../src/services/categoryService');
const HTTPError = require('../../../src/utils/httpError');

const { Categories: Category } = models;

Category.create = jest.fn();
Category.findOne = jest.fn();
Category.findAll = jest.fn();

describe('Test category services', () => {
  beforeAll(() => {
    const categoriesList = [
      {
        dataValues: { id: 1, name: 'Inovação' },
        get: () => ({ id: 1, name: 'Inovação' }),
      },
      {
        dataValues: { id: 2, name: 'Escola' },
        get: () => ({ id: 2, name: 'Escola' }),
      },
    ];

    Category.create.mockReturnValue(null);
    Category.findOne.mockReturnValue(Promise.resolve({ name: 'Node.js' }));
    Category.findAll.mockReturnValue(Promise.resolve(categoriesList));
  });

  describe('createOne', () => {
    it('should throw error when name is not provided', async () => {
      category = {};

      try {
        await service.createOne(category);
        fail('function did not throw exception');
      } catch(error) {
        expect(error).toHaveProperty('message', '"name" is required');
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('status', 400);
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
      const categoriesDataValues = [
        { dataValues: { id: 1, name: 'Inovação' } },
        { dataValues: { id: 2, name: 'Escola' } },
      ];
      const categories = await service.readAll();

      expect(categories).toEqual(expect.any(Array));

      try {
        expect(categories).toMatchObject(categoriesList);
      } catch(error) {
        expect(categories).toMatchObject(categoriesDataValues);
      }
    });
  });
});

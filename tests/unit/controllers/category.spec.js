const controller = require('../../../src/controllers/categoryController')
const service = require('../../../src/services/categoryService');
const errorHandler = require('../../../src/middlewares/errorHandler');
const HTTPError = require('../../../src/utils/httpError');
const MockResponse = require('../../mocks/mockResponse');
const MockNextFunction = require('../../mocks/mockNextFunction');
const MockDataValues = require('../../mocks/mockDataValues');

jest.mock('../../../src/services/categoryService');

describe('Test category controllers', () => {
  beforeAll(() => {
    const categories = new MockDataValues([
      { id: 1, name: 'Unit Test' },
      { id: 2, name: 'NodeJS' },
      { id: 3, name: 'Blogs API' },
    ]);
    const newCategory = new MockDataValues({ id: 4, name: 'Arch Linux' });

    service.readAll.mockResolvedValue(categories);
    service.createOne.mockResolvedValue(newCategory);
  });

  describe('readAll', () => {
    it('should return a list of all categories', async () => {
      const res = new MockResponse();
      const categories = [
        { id: 1, name: 'Unit Test' },
        { id: 2, name: 'NodeJS' },
        { id: 3, name: 'Blogs API' },
      ];

      const { statusCode, serverResponse } = await controller.readAll(null, res, null);

      expect(statusCode).toBe(200);
      expect(serverResponse).toEqual(categories);
    });
  });

  describe('createOne', () => {
    it('should return the newly created category', async () => {
      const req = {
        body: { name: 'Arch Linux' },
      };
      const res = new MockResponse();

      const { statusCode, serverResponse } = await controller.createOne(req, res, null);

      const expectedValue = expect
        .objectContaining({ id: 4, name: 'Arch Linux' });

      expect(statusCode).toBe(201);
      expect(serverResponse).toEqual({ id: 4, name: 'Arch Linux' });
    });

    it('should return status and error message in case of failure', async () => {
      service.createOne.mockRejectedValueOnce(new HTTPError(400, '"name" is required'));

      const req = { body: {} };
      const res = new MockResponse();
      const next = new MockNextFunction(400, '"name" is required');

      const { statusCode, serverResponse } = await controller.createOne(req, res, next);

      expect(statusCode).toBe(400);
      expect(serverResponse).toEqual({ message: '"name" is required' });
    });
  });
});

const fs = require('fs');
const jwt = require('jsonwebtoken');
const controller = require('../../../src/controllers/postController');
const service = require('../../../src/services/postService');
const errorHandler = require('../../../src/middlewares/errorHandler');
const HTTPError = require('../../../src/utils/httpError');
const MockResponse = require('../../mocks/mockResponse');
const MockNextFunction = require('../../mocks/mockNextFunction');
const MockDataValues = require('../../mocks/mockDataValues');

jest.mock('jsonwebtoken');
jest.mock('../../../src/services/postService');

const token = fs.readFileSync('tests/mocks/expiredToken.txt', { encoding: 'utf-8' });

const post = {
  id: 1,
  title: 'Post do Ano',
  content: 'Melhor post do ano',
  userId: 2,
  published: '2011-08-01T19:58:00.000Z',
  updated: '2011-08-01T19:58:51.000Z',
  user: {
    id: 2,
    displayName: 'Lewis Hamilton',
    email: 'lewishamilton@gmail.com',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
  },
  categories: []
};

describe('Test post controllers', () => {
  beforeAll(() => {
    service.readOne.mockResolvedValue(post);
  });

  describe('readOne', () => {
    it('should return data on selected post', async () => {
      const req = { params: { id: '1' } };
      const res = new MockResponse();

      const { statusCode, serverResponse } = await controller.readOne(req, res, null);

      expect(statusCode).toBe(200);
      expect(serverResponse).toEqual(post);
    });

    it.skip('should return status and error message in case of failure', async () => {
    });
  });

  describe('readMany', () => {
    it.skip('should return data on queried posts', async () => {
    });

    it.skip('should return status and error message in case of failure', async () => {
    });
 });

  describe('readAll', () => {
    it.skip('should return data on all posts', async () => {
    });

    it.skip('should return status and error message in case of failure', async () => {
    });
  });

  describe('createOne', () => {
    it.skip('should return created post', async () => {
    });

    it.skip('should return status and error message in case of failure', async () => {
    });
  });

  describe('updateOne', () => {
    it.skip('should return updated post', async () => {
    });

    it.skip('should return status and error message in case of failure', async () => {
    });
  });

  describe('deleteOne', () => {
    it.skip('should return status 204 and no message', async () => {
    });

    it.skip('should return status and error message in case of failure', async () => {
    });
  });
});

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

describe('Test post controllers', () => {
  describe('readOne', () => {
    it('should return data on selected post', async () => {
    });

    it('should return status and error message in case of failure', async () => {
    });
  });

  describe('readMany', () => {
    it('should return data on queried posts', async () => {
    });

    it('should return status and error message in case of failure', async () => {
    });
 });

  describe('readAll', () => {
    it('should return data on all posts', async () => {
    });

    it('should return status and error message in case of failure', async () => {
    });
  });

  describe('createOne', () => {
    it('should return created post', async () => {
    });

    it('should return status and error message in case of failure', async () => {
    });
  });

  describe('updateOne', () => {
    it('should return updated post', async () => {
    });

    it('should return status and error message in case of failure', async () => {
    });
  });

  describe('deleteOne', () => {
    it('should return status 204 and no message', async () => {
    });

    it('should return status and error message in case of failure', async () => {
    });
  });
});

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

const post2 = {
  id: 2,
  title: 'Vamos que vamos',
  content: 'Foguete não tem ré',
  userId: 3,
  published: '2011-08-01T19:58:00.000Z',
  updated: '2011-08-01T19:58:51.000Z',
  user: {
    id: 3,
    displayName: 'Michael Schumacher',
    email: 'MichaelSchumacher@gmail.com',
    image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg'
  },
  categories: []
};

const newPost = {
  title: 'Back to unit tests',
  content: 'Let’s inovate!',
  categoryIds: [1]
};

const createPostResponse = {
  id: 3,
  title: 'Back to unit tests',
  content: 'Let’s inovate!',
  userId: 2,
};

const payload = {
  id: 2,
  displayName: 'Lewis Hamilton',
  email: 'lewishamilton@gmail.com',
  image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
  iat: 1664750052,
  exp: 1664753652
}

describe('Test post controllers', () => {
  beforeAll(() => {
    service.readOne.mockResolvedValue(post);
    service.readMany.mockResolvedValue([post]);
    service.readAll.mockResolvedValue([post, post2]);
    service.createOne.mockResolvedValue(createPostResponse);

    jwt.decode.mockReturnValue(payload);
  });

  describe('readOne', () => {
    it('should return data on selected post', async () => {
      const req = { params: { id: '1' } };
      const res = new MockResponse();

      const { statusCode, serverResponse } = await controller.readOne(req, res, null);

      expect(statusCode).toBe(200);
      expect(serverResponse).toEqual(post);
    });

    it('should return status and error message in case of failure', async () => {
      service.readOne.mockRejectedValueOnce(new HTTPError(404, 'Post does not exist'));

      const req = { params: { id: '5000' } };
      const res = new MockResponse();
      const next = new MockNextFunction(404, 'Post does not exist');

      const { statusCode, serverResponse } = await controller.readOne(req, res, next);

      expect(statusCode).toBe(404);
      expect(serverResponse).toEqual({ message: 'Post does not exist' });
    });
  });

  describe('readMany', () => {
    it('should return data on queried posts', async () => {
      const req = { query: { q: 'post do ano' } };
      const res = new MockResponse();

      const { statusCode, serverResponse } = await controller.readMany(req, res, null);

      expect(statusCode).toBe(200);
      expect(serverResponse).toEqual([post]);
    });
 });

  describe('readAll', () => {
    it('should return data on all posts', async () => {
      const res = new MockResponse();

      const { statusCode, serverResponse } = await controller.readAll(null, res, null);

      expect(statusCode).toBe(200);
      expect(serverResponse).toEqual([post, post2]);
    });
  });

  describe('createOne', () => {
    it('should return created post', async () => {
      const req = {
        body: newPost,
        headers: { authorization: token },
      };
      const res = new MockResponse();

      const { statusCode, serverResponse } = await controller.createOne(req, res, null);

      expect(statusCode).toBe(201);
      expect(serverResponse).toHaveProperty('id', 3);
      expect(serverResponse).toHaveProperty('title', newPost.title);
      expect(serverResponse).toHaveProperty('content', newPost.content);
      expect(serverResponse).toHaveProperty('userId', 2);
    });

    it('should return status and error message in case of failure', async () => {
      service.createOne.mockRejectedValueOnce(new HTTPError(400, '"categoryIds" not found'));

      const req = {
        body: newPost,
        headers: { authorization: token },
      };
      const res = new MockResponse();
      const next = new MockNextFunction(400, '"categoryIds" not found');

      const { statusCode, serverResponse } = await controller.createOne(req, res, next);

      expect(statusCode).toBe(400);
      expect(serverResponse).toEqual({ message: '"categoryIds" not found' });
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

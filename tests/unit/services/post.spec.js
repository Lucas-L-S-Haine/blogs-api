const { fail } = require('assert/strict');
const models = require('../../../src/models');
jest.mock('../../../src/models');
const service = require('../../../src/services/postService');
const HTTPError = require('../../../src/utils/httpError');
const MockTransaction = require('../../mocks/mockTransaction');
const MockDataValues = require('../../mocks/mockDataValues');

const {
  sequelize,
  User,
  Categories: Category,
  BlogPosts: BlogPost,
  PostsCategories: PostCategory,
} = models;

sequelize.transaction = jest.fn();
Category.findAll = jest.fn();
BlogPost.create = jest.fn();
PostCategory.bulkCreate = jest.fn();

BlogPost.findAll = jest.fn();
BlogPost.findByPk = jest.fn();
BlogPost.update = jest.fn();
BlogPost.destroy = jest.fn();

describe('Test post services', () => {
  beforeAll(() => {
    const post1 = {
      id: 1,
      title: 'Brand New Post',
      content: 'I’m adding a new post to the blog!',
      userId: 1,
    };
    const post2 = {
        id: 2,
        title: 'Another Brand New Post',
        content: 'This one should throw an error',
        categoryIds: [5000],
    };

    const mockTransaction = new MockTransaction();
    const mockCategories = new MockDataValues([{ id: 1 }]);
    const mockPost = new MockDataValues(post1);
    const mockPostsCategories = new MockDataValues([
      { postId: 1, categoryId: 1 },
    ]);
    const mockPostList = new MockDataValues([post1, post2]);

    sequelize.transaction.mockReturnValue(mockTransaction);
    Category.findAll.mockReturnValue(mockCategories);
    BlogPost.create.mockReturnValue(mockPost);
    PostCategory.bulkCreate.mockReturnValue(mockPostsCategories);

    BlogPost.findAll.mockReturnValue(mockPostList);
    BlogPost.findByPk.mockReturnValue(mockPost);
    BlogPost.update.mockReturnValue(Promise.resolve(1));
    BlogPost.destroy.mockReturnValue(Promise.resolve(1));
  });

  describe('createOne', () => {
    it('should throw error when it receives any invalid category ids', async () => {
      const input = {
        id: 2,
        title: 'Another Brand New Post',
        content: 'This one should throw an error',
        categoryIds: [5000],
      };
      const userId = 1;

      try {
        await service.createOne(input, userId);
        fail('function did not throw exception');
      } catch (error) {
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('message', '"categoryIds" not found');
        expect(error).toHaveProperty('status', 400);
      }
    });

    it('should return a new post when it is created', async () => {
      const input = {
        id: 1,
        title: 'Brand New Post',
        content: 'I’m adding a new post to the blog!',
        categoryIds: [1],
      };
      const userId = 1;
      const result = await service.createOne(input, userId);

      const expectedResult = {
        id: 1,
        title: 'Brand New Post',
        content: 'I’m adding a new post to the blog!',
        userId: 1,
      };

      try {
        expect(result).toEqual(expectedResult);
      } catch {
        expect(result.dataValues).toEqual(expectedResult);
      }
    });
  });

  describe('readAll', () => {
    it('should return a list of all posts', async () => {
      const post1 = {
        id: 1,
        title: 'Brand New Post',
        content: 'I’m adding a new post to the blog!',
        userId: 1,
      };
      const post2 = {
          id: 2,
          title: 'Another Brand New Post',
          content: 'This one should throw an error',
          categoryIds: [5000],
      };
      const posts = [post1, post2];

      const result = await service.readAll();

      try {
        expect(result).toEqual(posts);
      } catch {
        expect(result.map((post) => post.get())).toEqual(posts);
      }
    });
  });

  describe('readOne', () => {
    it('should throw error when it doesn’t find the requested post', async () => {
      BlogPost.findByPk.mockReturnValueOnce(null);

      try {
        await service.readOne(5000);
        fail('function did not throw exception');
      } catch (error) {
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('message', 'Post does not exist');
        expect(error).toHaveProperty('status', 404);
      }
    });

    it('should return data on a single post', async () => {
      const post = {
        id: 1,
        title: 'Brand New Post',
        content: 'I’m adding a new post to the blog!',
        userId: 1,
      };

      const result = await service.readOne(1);

      try {
        expect(result).toEqual(post);
      } catch {
        expect(result.dataValues).toEqual(post);
      }
    });
  });

  describe('updateOne', () => {
    it('should return data on the newly updated post', async () => {
      const input = {
        id: 1,
        userId: 1,
        title: 'Edited Post',
        content: 'I’m editing a post for a unit test',
      };
      const originalPost = {
        id: 1,
        userId: 1,
        title: 'Brand New Post',
        content: 'I’m adding a new post to the blog!',
      };

      const mockOriginalPost = new MockDataValues(originalPost);
      const mockNewPost = new MockDataValues(input);

      BlogPost.findByPk.mockReturnValueOnce(mockOriginalPost);
      BlogPost.findByPk.mockReturnValueOnce(mockNewPost);

      const result = await service.updateOne(input);

      try {
        expect(result).toEqual(input);
      } catch {
        expect(result.dataValues).toEqual(input);
      }
    });
  });

  describe('deleteOne', () => {
    it('should throw error when it doesn’t find the requested post', async () => {
      BlogPost.findByPk.mockReturnValueOnce(null);

      try {
        await service.deleteOne(5000);
        fail('function did not throw exception');
      } catch (error) {
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('message', 'Post does not exist');
        expect(error).toHaveProperty('status', 404);
      }
    });

    it('should not return anything', async () => {
      const input = { id: 1, userId: 1 };

      const result = await service.deleteOne(input);

      expect(result).toBeUndefined();
    });
  });

  describe('readMany', () => {
    it.todo('should return a list of filtered posts');
  });
});

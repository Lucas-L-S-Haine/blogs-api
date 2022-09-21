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

describe('Test post services', () => {
  beforeAll(() => {
    const mockTransaction = new MockTransaction();
    const mockCategories = new MockDataValues([{ id: 1 }]);
    const mockPost = new MockDataValues({
      id: 1,
      title: 'Brand New Post',
      content: 'I’m adding a new post to the blog!',
      userId: 1,
    });
    const mockPostsCategories = new MockDataValues([
      { postId: 1, categoryId: 1 },
    ]);

    sequelize.transaction.mockReturnValue(mockTransaction);
    Category.findAll.mockReturnValue(mockCategories);
    BlogPost.create.mockReturnValue(mockPost);
    PostCategory.bulkCreate.mockReturnValue(mockPostsCategories);
  });

  describe('createOne', () => {
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
    it.todo('should return a list of all posts');
  });
  describe('readOne', () => {
    it.todo('should return data on a single post');
  });
  describe('updateOne', () => {
    it.todo('should return data on the newly updated post');
  });
  describe('deleteOne', () => {
    it.todo('should not return anything');
  });
  describe('readMany', () => {
    it.todo('should return a list of filtered posts');
  });
});

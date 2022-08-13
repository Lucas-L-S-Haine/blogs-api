const { fail } = require('assert/strict');
const models = require('../../../src/models');
jest.mock('../../../src/models');
const service = require('../../../src/services/postService');
const HTTPError = require('../../../src/utils/httpError');

const {
  sequelize,
  User,
  Categories: Category,
  BlogPosts: BlogPost,
  PostsCategories: PostCategory,
} = models;

describe('Test post services', () => {
  describe('createOne', () => {
    it.todo('should return a new post when it is created');
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

const { resolve } = require('path');
const validatePost = require(
  resolve(__dirname, '../..', 'src/validations/postValidate.js'));
const validateCreatePost = require(
  resolve(__dirname, '../..', 'src/validations/createPostValidate.js'));
const validateUpdatePost = require(
  resolve(__dirname, '../..', 'src/validations/updatePostValidate.js'));
const validateDeletePost = require(
  resolve(__dirname, '../..', 'src/validations/deletePostValidate.js'));

describe('Test post validation', () => {
  it('doesn’t allow posts without title', () => {
    const post = { content: 'I am writing a unit test', categoryIds: [1, 2] };
    const error = new Error();
    error.message = '"title" is required';
    expect(() => validatePost(post)).toThrow(error);
  });

  it('doesn’t allow posts without content', () => {
    const post = { title: 'Post Validation Unit Test', categoryIds: [1, 2] };
    const error = new Error();
    error.message = '"content" is required';
    expect(() => validatePost(post)).toThrow(error);
  });

  it('doesn’t throw exception for valid post', () => {
    const post = {
      title: 'Post Validation Unit Test',
      content: 'I am writing a unit test',
      categoryIds: [1, 2],
    };
    expect(() => validatePost(post)).not.toThrow();
  });
});

describe('Test validation for new posts', () => {
  it('doesn’t allow posts without category ids', () => {
    const post = {
      title: 'Post Validation Unit Test',
      content: 'I am writing a unit test',
    };
    const error = new Error();
    error.message = '"categoryIds" is required';
    expect(() => validateCreatePost(post)).toThrow(error);
  });

  it('doesn’t throw exception for valid post', () => {
    const post = {
      title: 'Post Validation Unit Test',
      content: 'I am writing a unit test',
      categoryIds: [1, 2],
    };
    expect(() => validateCreatePost(post)).not.toThrow();
  });
});

describe('Test validation for updated posts', () => {
  it('doesn’t allow any user to edit another user’s post', () => {
    const post = {
      title: 'Testing The API',
      content: 'User Schumacher is editing posts',
      id: 3,
      userId: 4,
    };
    const error = new Error();
    error.message = 'Unauthorized user';
    expect(() => validateUpdatePost(post)).toThrow(error);
  });

  it('doesn’t allow changing categories', () => {
    const post = {
      title: 'Testing The API',
      content: 'User Schumacher is editing posts',
      id: 3,
      userId: 3,
      categoryIds: [1, 2, 3],
    };
    const error = new Error();
    error.message = 'Categories cannot be edited';
    expect(() => validateUpdatePost(post)).toThrow(error);
  });

  it('doesn’t throw exception for valid post', () => {
    const post = {
      title: 'Testing The API',
      content: 'User Admin is editing posts from the database',
      id: 3,
      userId: 3,
    };
    expect(() => validateUpdatePost(post)).not.toThrow();
  });
});

describe('Test validation for deleted posts', () => {
  it('doesn’t allow any user to delete another user’s post', () => {
    const input = {
      id: 3,
      userId: 4,
    };
    const error = new Error();
    error.message = 'Unauthorized user';
    expect(() => validateDeletePost(input)).toThrow(error);
  });

  it('doesn’t throw exception for valid post', () => {
    const input = {
      id: 3,
      userId: 3,
    };
    expect(() => validateDeletePost(input)).not.toThrow();
  });
});

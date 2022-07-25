const { resolve } = require('path');
const validatePost = require(
  resolve(__dirname, '../..', 'src/validations/postValidate.js'));

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

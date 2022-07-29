const HTTPError = require('../utils/httpError');

const validateTitle = (post) => {
  if (!post.title) throw new HTTPError(400, '"title" is required');
};

const validateContent = (post) => {
  if (!post.content) throw new HTTPError(400, '"content" is required');
};

module.exports = (post) => {
  validateTitle(post);
  validateContent(post);
};

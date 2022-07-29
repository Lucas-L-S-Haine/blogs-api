const HTTPError = require('../utils/httpError');

module.exports = (post) => {
  if (!post.categoryIds) throw new HTTPError(400, '"categoryIds" is required');
};

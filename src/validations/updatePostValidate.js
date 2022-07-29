const HTTPError = require('../utils/httpError');

module.exports = (input) => {
  if (input.id !== input.userId) throw new HTTPError(401, 'Unauthorized user');
  if (input.categoryIds) throw new HTTPError(400, 'Categories cannot be edited');
};

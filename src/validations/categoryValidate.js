const HTTPError = require('../utils/httpError');

const validateName = (category) => {
  if (!category.name) throw new HTTPError(400, '"name" is required');
};

module.exports = (category) => {
  validateName(category);
};

module.exports = (input) => {
  const error = new Error();
  if (input.id !== input.userId) {
    error.status = 401;
    error.message = 'Unauthorized user';
    throw error;
  }
  if (input.categoryIds) {
    error.status = 400;
    error.message = 'Categories cannot be edited';
    throw error;
  }
};

module.exports = (input) => {
  const error = new Error();
  if (input.id !== input.userId) {
    error.status = 401;
    error.message = 'Unauthorized user';
    throw error;
  }
};

const validateName = (category) => {
  const error = new Error();
  if (!category.name) {
    error.status = 400;
    error.message = '"name" is required';
    throw error;
  }
};

module.exports = (category) => {
  validateName(category);
};

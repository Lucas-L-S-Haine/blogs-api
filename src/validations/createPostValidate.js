module.exports = (post) => {
  const error = new Error();
  if (!post.categoryIds) {
    error.status = 400;
    error.message = '"categoryIds" is required';
    throw error;
  }
};

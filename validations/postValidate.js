const validateTitle = (post) => {
  const error = new Error();
  if (!post.title) {
    error.status = 400;
    error.message = '"title" is required';
    throw error;
  }
};

const validateContent = (post) => {
  const error = new Error();
  if (!post.content) {
    error.status = 400;
    error.message = '"content" is required';
    throw error;
  }
};

const validateCategories = (post) => {
  const error = new Error();
  if (!post.categoryIds) {
    error.status = 400;
    error.message = '"categoryId" is required';
    throw error;
  }
};

module.exports = (post) => {
  validateTitle(post);
  validateContent(post);
  validateCategories(post);
};

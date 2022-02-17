const {
  /* User, */
  /* Categories: Category, */
  BlogPosts: BlogPost,
  /* PostCategories: PostCategory, */
} = require('../models');

const createOne = async () => {};

const readAll = async () => {};

const readOne = async () => {};

const updateOne = async () => {};

const deleteOne = async (id) => {
  await BlogPost.destroy({ where: { id } });
};

const readMany = async () => {};

module.exports = {
  createOne,
  readAll,
  readOne,
  updateOne,
  deleteOne,
  readMany,
};

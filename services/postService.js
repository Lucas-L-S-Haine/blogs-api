const {
  /* User, */
  /* Categories: Category, */
  BlogPosts: BlogPost,
  PostsCategories: PostCategory,
} = require('../models');
const { postValidate } = require('../validations');

const insertCategories = (categoryIds, postId) => {
  PostCategory.bulkCreate(
    categoryIds.map((categoryId) => ({ categoryId, postId })),
  );
};

const createOne = async (userInput, userId) => {
  postValidate(userInput);
  const post = { ...userInput, userId };
  const { categoryIds } = userInput;
  const newPost = await BlogPost.create(post);
  const { id: postId } = newPost;
  await insertCategories(categoryIds, postId);
  return true;
};

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

const {
  User,
  Categories: Category,
  BlogPosts: BlogPost,
  // PostsCategories: PostCategory,
} = require('../models');
const { postValidate } = require('../validations');

const newError = (error) => (error);

const createOne = async (userInput, userId) => {
  postValidate(userInput);
  const { categoryIds } = userInput;
  const categories = await Category.findAll({ attributes: ['id'] });
  const categoryList = categories.map((category) => category.dataValues.id);
  const invalidIds = categoryIds
    .filter((id) => categoryList.indexOf(id) === -1);
  if (invalidIds.length > 0) throw newError({ status: 400, message: '"categoryIds" not found' });
  const post = { ...userInput, userId };
  console.log('categories\n', invalidIds);
  const newPost = await BlogPost.create(post);
  return newPost;
};

const readAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
    ],
  });
  return posts;
};

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

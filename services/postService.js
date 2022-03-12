const { Op } = require('sequelize');
const {
  sequelize,
  User,
  Categories: Category,
  BlogPosts: BlogPost,
  PostsCategories: PostCategory,
} = require('../models');
const {
  postValidate,
  createPostValidate,
  updatePostValidate,
  deletePostValidate,
} = require('../validations');

const newError = (error) => (error);

const createOne = async (userInput, userId) => {
  postValidate(userInput);
  createPostValidate(userInput);
  const transaction = await sequelize.transaction();
  const { categoryIds } = userInput;
  const categories = await Category.findAll({ attributes: ['id'] });
  const categoryList = categories.map((category) => category.dataValues.id);
  const invalidIds = categoryIds.filter((id) => categoryList.indexOf(id) === -1);
  if (invalidIds.length > 0) throw newError({ status: 400, message: '"categoryIds" not found' });
  const post = { ...userInput, userId };
  const newPost = await BlogPost.create(post, { transaction });
  const { id: postId } = newPost.dataValues;
  const postsCategories = categoryIds.map((categoryId) => ({ postId, categoryId }));
  await PostCategory.bulkCreate(postsCategories, { transaction });
  await transaction.commit();
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
      {
        model: Category,
        as: 'categories',
        through: {
          model: PostCategory,
          attributes: [],
        },
      },
    ],
  });
  return posts;
};

const readOne = async (id) => {
  const post = await BlogPost.findByPk(id,
    {
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { model: PostCategory, attributes: [] } },
        ],
  });
  if (!post) {
    const error = new Error();
    error.status = 404;
    error.message = 'Post does not exist';
    throw error;
  }
  return post;
};

const updateOne = async (input) => {
  postValidate(input);
  updatePostValidate(input);
  const { id, title, content } = input;
  await BlogPost.update({ title, content }, { where: { id } });
  const newPost = await BlogPost.findByPk(id,
    {
      include: [
        { model: Category, as: 'categories', through: { model: PostCategory, attributes: [] } },
      ],
      attributes: { exclude: ['id', 'published', 'updated'] },
  });
  return newPost;
};

const deleteOne = async (input) => {
  const { id } = input;
  const post = await BlogPost.findByPk(id);
  if (!post) {
    const error = new Error();
    error.status = 404;
    error.message = 'Post does not exist';
    throw error;
  }
  deletePostValidate(input);
  await BlogPost.destroy({ where: { id } });
};

const readMany = async (query) => {
  const postList = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
  });
  return postList;
};

module.exports = {
  createOne,
  readAll,
  readOne,
  updateOne,
  deleteOne,
  readMany,
};

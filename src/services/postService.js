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
const HTTPError = require('../utils/httpError.js');

const createOne = async (input, userId) => {
  postValidate(input);
  createPostValidate(input);
  const transaction = await sequelize.transaction();
  const { categoryIds } = input;
  const categories = await Category.findAll({ attributes: ['id'] });
  const categoryList = categories.map((category) => category.dataValues.id);
  const invalidIds = categoryIds.filter((id) => categoryList.indexOf(id) === -1);
  if (invalidIds.length > 0) throw new HTTPError(400, '"categoryIds" not found');
  const post = { ...input, userId };
  const newPost = await BlogPost.create(post, { transaction });
  const { id: postId } = newPost.dataValues;
  const postsCategories = categoryIds.map((categoryId) => ({ postId, categoryId }));
  await PostCategory.bulkCreate(postsCategories, { transaction });
  // await newPost.addCategories(categoryIds, { transaction });
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
  if (!post) throw new HTTPError(404, 'Post does not exist');
  return post;
};

const updateOne = async (input) => {
  postValidate(input);
  const { id, title, content } = input;
  const { userId: originalPosterId } = await BlogPost.findByPk(id);
  updatePostValidate({ ...input, id: originalPosterId });
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
  if (!post) throw new HTTPError(404, 'Post does not exist');
  const { userId: originalPosterId } = post;
  deletePostValidate({ ...input, id: originalPosterId });
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
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { model: PostCategory, attributes: [] } },
    ],
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

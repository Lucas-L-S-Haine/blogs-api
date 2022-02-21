const {
  sequelize,
  User,
  Categories: Category,
  BlogPosts: BlogPost,
  PostsCategories: PostCategory,
} = require('../models');
const { postValidate } = require('../validations');

const newError = (error) => (error);

const createOne = async (userInput, userId) => {
  postValidate(userInput);
  const transaction = await sequelize.transaction();
  const { categoryIds } = userInput;
  const categories = await Category.findAll({ attributes: ['id'] });
  const categoryList = categories.map((category) => category.dataValues.id);
  const invalidIds = categoryIds.filter((id) => categoryList.indexOf(id) === -1);
  if (invalidIds.length > 0) throw newError({ status: 400, message: '"categoryIds" not found' });
  const post = { ...userInput, userId };
  const newPost = await BlogPost.create(post, { transaction });
  // const { postId } = newPost;
//  categoryIds
//    .map((categoryId) => ({ postId, categoryId }))
//    .then(PostCategory.create);
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
          {
            model: User,
            as: 'user',
            attributes: { exclude: ['password'] },
          },
    //      {
    //        model: Category,
    //        as: 'categories',
    //      },
        ],
  });
  return post;
};

const updateOne = async (input) => {
  const { title, content } = input;
  return { title, content };
};

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

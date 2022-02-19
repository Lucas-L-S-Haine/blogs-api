const { Categories: Category } = require('../models');
const { categoryValidate } = require('../validations');

const readAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const createOne = async (category) => {
  categoryValidate(category);
  await Category.create(category);
  const result = await Category.findOne({ where: { name: category.name } });
  return result;
};

module.exports = { readAll, createOne };

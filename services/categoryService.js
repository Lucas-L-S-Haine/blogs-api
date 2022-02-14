const { Categories: Category } = require('../models');

const readAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const createOne = async () => {
};

module.exports = { readAll, createOne };

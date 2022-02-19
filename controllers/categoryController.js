const service = require('../services/categoryService');

const readAll = async (req, res) => {
  try {
    const categories = await service.readAll();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

const createOne = async (req, res) => {
  try {
    const category = req.body;
    const result = await service.createOne(category);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

module.exports = { readAll, createOne };

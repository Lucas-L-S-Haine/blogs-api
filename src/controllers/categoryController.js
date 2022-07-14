const service = require('../services/categoryService');

const readAll = (req, res, next) => service
  .readAll()
  .then((categories) => res.status(200).json(categories))
  .catch(next);

const createOne = (req, res, next) => service
  .createOne(req.body)
  .then((result) => res.status(201).json(result))
  .catch(next);

module.exports = { readAll, createOne };

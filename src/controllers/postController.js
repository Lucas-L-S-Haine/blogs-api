const service = require('../services/postService');
const { readToken } = require('../auth');

const readOne = (req, res, next) => service
  .readOne(req.params.id)
  .then((post) => res.status(200).json(post))
  .catch(next);

const readMany = (req, res, next) => service
  .readMany(req.query.q)
  .then((posts) => res.status(200).json(posts))
  .catch(next);

const readAll = (_req, res, next) => service
  .readAll()
  .then((posts) => res.status(200).json(posts))
  .catch(next);

const createOne = async (req, res, next) => {
  try {
    const userInput = req.body;
    const { authorization: token } = req.headers;
    const { id: userId } = readToken(token);
    const blogPost = await service.createOne(userInput, userId);
    return res.status(201).json(blogPost);
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, next) => {
  try {
    const userInput = req.body;
    const { authorization: token } = req.headers;
    const { id } = req.params;
    const { id: userId } = readToken(token);
    userInput.id = Number(id);
    userInput.userId = userId;
    const blogPost = await service.updateOne(userInput);
    return res.status(200).json(blogPost);
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const userInput = {};
    const { authorization: token } = req.headers;
    const { id } = req.params;
    const { id: userId } = readToken(token);
    userInput.id = Number(id);
    userInput.userId = userId;
    await service.deleteOne(userInput);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  readOne,
  readMany,
  readAll,
  createOne,
  updateOne,
  deleteOne,
};

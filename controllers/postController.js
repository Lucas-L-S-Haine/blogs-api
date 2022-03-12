const service = require('../services/postService');
const { readToken } = require('../auth');

const createOne = async (req, res) => {
  try {
    const userInput = req.body;
    const { authorization: token } = req.headers;
    const { id: userId } = readToken(token);
    const blogPost = await service.createOne(userInput, userId);
    return res.status(201).json(blogPost);
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

const readAll = (_req, res, next) => service
  .readAll()
  .then((posts) => res.status(200).json(posts))
  .catch(next);

const readOne = async (req, res) => {
  try {
    const { id } = req.params;
    const blogPost = await service.readOne(id);
    return res.status(200).json(blogPost);
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

const updateOne = async (req, res) => {
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
    return res.status(err.status).send({ message: err.message });
  }
};

const deleteOne = async (req, res) => {
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
    return res.status(err.status).send({ message: err.message });
  }
};

const readMany = async (req, res) => {
  try {
    const { q: query } = req.query;
    const postList = await service.readMany(query);
    return res.status(200).json(postList);
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

module.exports = {
  createOne,
  readAll,
  readOne,
  updateOne,
  deleteOne,
  readMany,
};

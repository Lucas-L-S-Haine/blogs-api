const service = require('../services/postService');

const createOne = async (req, res) => {
  try {
    const newPost = req.body;
    const blogPost = await service.createOne(newPost); // aguardando implementação
    return res.status(201).json(blogPost);
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

const readAll = async (_req, res) => {
  try {
    const allPosts = await service.readAll(); // aguardando implementação
    return res.status(200).json(allPosts);
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

const readOne = async (_req, res) => {
  try {
    const blogPost = await service.readOne(); // aguardando implementação
    return res.status(200).json(blogPost);
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

const updateOne = async (_req, res) => {
  try {
    const blogPost = await service.updateOne(); // aguardando implementação
    return res.status(200).json(blogPost);
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    await service.deleteOne(id); // aguardando implementação
    return res.status(204).send();
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

const readMany = async (_req, res) => {
  try {
    const postList = await service.readMany(); // aguardando implementação
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

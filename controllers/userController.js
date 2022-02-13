const service = require('../services/userService');

const readOne = async () => {
};

const readAll = async (req, res) => {
  try {
    const { authorization: token } = req.headers;
    const users = await service.readAll(token);
    return res.status(200).json(users);
  } catch (err) {
    res.status(err.status).json({ message: err.message });
  }
};

const createOne = async (req, res) => {
  try {
    const user = req.body;
    const token = await service.createOne(user);
    return res.status(201).json({ token });
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

const deleteOne = async () => {
};

module.exports = { readOne, readAll, createOne, deleteOne };

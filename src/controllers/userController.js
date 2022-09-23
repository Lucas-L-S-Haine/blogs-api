const jwt = require('jsonwebtoken');
const service = require('../services/userService');

const readOne = (req, res, next) => service
  .readOne(req.params.id)
  .then((user) => res.status(200).json(user))
  .catch(next);

const readAll = (req, res, next) => service
  .readAll()
  .then((users) => res.status(200).json(users))
  .catch(next);

const createOne = (req, res, next) => service
  .createOne(req.body)
  .then((token) => res.status(201).json({ token }))
  .catch(next);

const deleteOne = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const { email } = jwt.decode(token);
    await service.deleteOne(email);
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { readOne, readAll, createOne, deleteOne };

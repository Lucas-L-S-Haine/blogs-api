const { hash } = require('bcryptjs');
const { User } = require('../models');
const { newToken } = require('../auth');
const { userValidate } = require('../validations');

const readOne = async (id) => {
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) {
    const error = new Error();
    error.status = 404;
    error.message = 'User does not exist';
    throw error;
  }
  return user;
};

const readAll = async () => {
  const users = await User
    .findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const createOne = async (user) => {
  userValidate(user);
  const password = await hash(user.password, 8);
  const userData = { ...user, password };
  if (await User.findOne({ where: { email: user.email } })) {
    const error = new Error();
    error.status = 409;
    error.message = 'User already registered';
    throw error;
  }
  const token = newToken(user);
  await User.create(userData);
  return token;
};

const deleteOne = async (email) => {
  await User.destroy({ where: { email } });
};

module.exports = { readOne, readAll, createOne, deleteOne };

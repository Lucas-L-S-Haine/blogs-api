const { User } = require('../models');
const { newToken } = require('../auth');
const { userValidate } = require('../validations');

const readOne = async () => {
//   const users = await User
//     .findOne({ where: { email } });
//   return users;
};

const readAll = async () => {
  const users = await User
    .findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const createOne = async (user) => {
  userValidate(user);
  const token = newToken(user);
  await User.create(user);
  return token;
};

const deleteOne = async () => {
};

module.exports = { readOne, readAll, createOne, deleteOne };

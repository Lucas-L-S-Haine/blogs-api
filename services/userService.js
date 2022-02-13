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
  if (await User.findOne({ where: { email: user.email } })) {
    const error = new Error();
    error.status = 409;
    error.message = 'User already registered';
    throw error;
  }
  const token = newToken(user);
  await User.create(user);
  return token;
};

const deleteOne = async () => {
};

module.exports = { readOne, readAll, createOne, deleteOne };

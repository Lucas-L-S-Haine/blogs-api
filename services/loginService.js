const { User } = require('../models');
const { newToken } = require('../auth');
const { loginValidate } = require('../validations');

const createOne = async (loginData) => {
  loginValidate(loginData);
  const user = await User.findAll({ where: { email: loginData.email } });
  if (user.length === 0) {
    const error = new Error();
    error.status = 400;
    error.message = 'Invalid fields';
    throw error;
  }
  const token = newToken(loginData);
  return token;
};

module.exports = { createOne };

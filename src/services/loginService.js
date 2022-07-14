const { User } = require('../models');
const { newToken } = require('../auth');
const { loginValidate } = require('../validations');

const login = async (loginData) => {
  loginValidate(loginData);
  const user = await User.findAll({ where: { email: loginData.email } });
  if (user.length === 0) {
    const error = new Error();
    error.status = 400;
    error.message = 'Invalid fields';
    throw error;
  }
  const { password: none, ...data } = user[0].dataValues;
  const token = newToken(data);
  return token;
};

module.exports = { login };

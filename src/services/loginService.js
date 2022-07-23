const { compareSync: compare } = require('bcryptjs');
const { User } = require('../models');
const { newToken } = require('../auth');
const { loginValidate } = require('../validations');

const login = async (loginData) => {
  loginValidate(loginData);
  const user = await User.findAll({ where: { email: loginData.email } });
  const error = new Error();
  error.status = 400;
  error.message = 'Invalid fields';
  if (user.length === 0) throw error;
  const dbData = user[0].dataValues;
  if (!compare(loginData.password, dbData.password)) throw error;
  const { password: _, ...data } = dbData;
  const token = newToken(data);
  return token;
};

module.exports = { login };

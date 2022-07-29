const { compare } = require('bcryptjs');
const { User } = require('../models');
const { newToken } = require('../auth');
const { loginValidate } = require('../validations');
const HTTPError = require('../utils/httpError');

const login = async (loginData) => {
  loginValidate(loginData);
  let user;
  await User.findOne({ where: { email: loginData.email } })
    .then((userData) => { user = userData.get(); })
    .catch(() => { user = null; });
  if (!user) throw new HTTPError(400, 'Invalid fields');
  const loginMatches = await compare(loginData.password, user.password);
  if (!loginMatches) throw new HTTPError(400, 'Invalid fields');
  const { password: _, ...data } = user;
  const token = newToken(data);
  return token;
};

module.exports = { login };

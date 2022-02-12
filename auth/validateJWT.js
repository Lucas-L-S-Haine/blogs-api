const jwt = require('jsonwebtoken');

const { JWT_SECRET: secret } = process.env;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const newToken = async (user) => {
  const payload = user;
  delete payload.password;
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
};

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error();
    error.status = 401;
    error.message = 'missing auth token';
    throw error;
  }
  try {
    jwt.verify(token, secret);
  } catch (err) {
    const error = new Error();
    error.status = 401;
    error.message = 'jwt malformed';
    throw error;
  }
  const payload = jwt.verify(token, secret);
  req.user = payload;
  next();
};

module.exports = {
  newToken,
  validateToken,
};

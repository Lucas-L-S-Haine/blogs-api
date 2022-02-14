require('dotenv/config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET: secret } = process.env;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const newToken = (user) => {
  const { email } = user;
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
};

const validateToken = (req, _res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    const error = new Error();
    error.status = 401;
    error.message = 'Token not found';
    throw error;
  }
  try {
    jwt.verify(token, secret);
  } catch (err) {
    const error = new Error();
    error.status = 401;
    error.message = 'Expired or invalid token';
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

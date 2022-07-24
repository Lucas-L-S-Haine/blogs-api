require('dotenv/config');
const jwt = require('jsonwebtoken');

const { JWT_SECRET: secret } = process.env;
const jwtConfig = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const newToken = (user) => {
  const token = jwt.sign(user, secret, jwtConfig);
  return token;
};

const readToken = (token) => jwt.decode(token);

const validateToken = (req, _res, next) => {
  const { authorization: token } = req.headers;
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
  readToken,
  validateToken,
};

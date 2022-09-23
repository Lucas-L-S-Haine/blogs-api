require('dotenv/config');
const jwt = require('jsonwebtoken');
const HTTPError = require('../utils/httpError');

const { JWT_SECRET: secret } = process.env;

const validateToken = (req, _res, next) => {
  const { authorization: token } = req.headers;
  if (!token) throw new HTTPError(401, 'Token not found');
  try {
    jwt.verify(token, secret);
  } catch (err) {
    throw new HTTPError(401, 'Expired or invalid token');
  }
  const payload = jwt.verify(token, secret);
  req.user = payload;
  next();
};

module.exports = {
  validateToken,
};

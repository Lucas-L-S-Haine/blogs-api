const {
  isValidName, isValidEmail, isValidPassword,
} = require('../utils/functions');
const HTTPError = require('../utils/httpError');

const validateName = (user) => {
  if (!isValidName(user.displayName)) {
    throw new HTTPError(400, '"displayName" length must be at least 8 characters long');
  }
};

const validateEmail = (user) => {
  if (!user.email) {
    throw new HTTPError(400, '"email" is required');
  }
  if (!isValidEmail(user.email)) {
    throw new HTTPError(400, '"email" must be a valid email');
  }
};

const validatePassword = (user) => {
  if (!user.password) {
    throw new HTTPError(400, '"password" is required');
  }
  if (!isValidPassword(user.password)) {
    throw new HTTPError(400, '"password" length must be 6 characters long');
  }
};

module.exports = (user) => {
  validatePassword(user);
  validateEmail(user);
  validateName(user);
};

const {
  isValidName, isValidEmail, isValidPassword,
} = require('../utils/functions');

const validateName = (user) => {
  const error = new Error();
  if (!isValidName(user.displayName)) {
    error.status = 400;
    error.message = '"displayName" length must be at least 8 characters long';
    throw error;
  }
};

const validateEmail = (user) => {
  const error = new Error();
  if (!user.email) {
    error.status = 400;
    error.message = '"email" is required';
    throw error;
  }
  if (!isValidEmail(user.email)) {
    error.status = 400;
    error.message = '"email" must be a valid email';
    throw error;
  }
  return true;
};

const validatePassword = (user) => {
  const error = new Error();
  if (!user.password) {
    error.status = 400;
    error.message = '"password" is required';
    throw error;
  }
  if (!isValidPassword(user.password)) {
    error.status = 400;
    error.message = '"password" length must be 6 characters long';
    throw error;
  }
  return true;
};

module.exports = (user) => {
  validatePassword(user);
  validateEmail(user);
  validateName(user);
  return true;
};

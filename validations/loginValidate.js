const { isEmpty } = require('../utils/functions');

const validateEmail = (loginData) => {
  const error = new Error();
  if (isEmpty(loginData.email)) {
    error.status = 400;
    error.message = '"email" is not allowed to be empty';
    throw error;
  }
  if (!loginData.email) {
    error.status = 400;
    error.message = '"email" is required';
    throw error;
  }
  return true;
};

const validatePassword = (loginData) => {
  const error = new Error();
  if (isEmpty(loginData.password)) {
    error.status = 400;
    error.message = '"password" is not allowed to be empty';
    throw error;
  }
  if (!loginData.password) {
    error.status = 400;
    error.message = '"password" is required';
    throw error;
  }
  return true;
};

module.exports = (loginData) => {
  validateEmail(loginData);
  validatePassword(loginData);
  return true;
};

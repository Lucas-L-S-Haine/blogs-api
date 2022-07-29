const { isEmpty } = require('../utils/functions');
const HTTPError = require('../utils/httpError');

const validateEmail = (loginData) => {
  if (isEmpty(loginData.email)) {
    throw new HTTPError(400, '"email" is not allowed to be empty');
  }
  if (!loginData.email) {
    throw new HTTPError(400, '"email" is required');
  }
};

const validatePassword = (loginData) => {
  if (isEmpty(loginData.password)) {
    throw new HTTPError(400, '"password" is not allowed to be empty');
  }
  if (!loginData.password) {
    throw new HTTPError(400, '"password" is required');
  }
};

module.exports = (loginData) => {
  validateEmail(loginData);
  validatePassword(loginData);
};

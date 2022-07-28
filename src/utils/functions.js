const regex = require('./regex');

const isValidName = (displayName) => regex.displayName.test(displayName);

const isValidEmail = (email) => regex.email.test(email);

const isValidPassword = (password) => regex.password.test(password);

const isEmpty = (string) => regex.empty.test(string);

module.exports = {
  isValidName,
  isValidEmail,
  isValidPassword,
  isEmpty,
};

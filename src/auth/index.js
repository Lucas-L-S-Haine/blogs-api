const validateJWT = require('./validateJWT');
const jwtConfig = require('./jwtConfig');

module.exports = {
  ...validateJWT,
  jwtConfig,
};

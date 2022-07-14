const service = require('../services/loginService');

const login = (req, res, next) => service
  .login(req.body)
  .then((token) => res.status(200).json({ token }))
  .catch(next);

module.exports = { login };

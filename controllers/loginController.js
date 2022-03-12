const service = require('../services/loginService');

const login = async (req, res) => {
  try {
    const loginData = req.body;
    const token = await service.login(loginData);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

module.exports = { login };

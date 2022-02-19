const service = require('../services/loginService');

const createOne = async (req, res) => {
  try {
    const loginData = req.body;
    const token = await service.createOne(loginData);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(err.status).send({ message: err.message });
  }
};

module.exports = { createOne };

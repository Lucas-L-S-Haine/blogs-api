const { DataTypes } = require('sequelize');
const { User, sequelize } = require('../models');

const readOne = async () => {
};

const readAll = async (_req, res) => {
  try {
    // const users = await User.findAll();
    console.log(await User.findAll());
    return res.status(200).json({ message: (DataTypes) });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

const createOne = async (req, res) => {
  console.log(req.body);
  try {
    const { displayName, email, password, image } = req.body;
    console.log(displayName);
    await User.create({ displayName, email, password, image });
    return res.status(201).json({ token: 'aslfkjasdf802' });
  } catch (err) {
    err.status = 403;
    err.message = 'Desta vez num foi';
    return res.status(err.status).send({ message: err.message });
  }
};

const deleteOne = async () => {
};

module.exports = { readOne, readAll, createOne, deleteOne };

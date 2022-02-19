const express = require('express');
const { createOne } = require('../controllers/loginController');

const loginRouter = express.Router();

loginRouter
  .route('/')
  .post(createOne);

module.exports = loginRouter;

const express = require('express');
const { createOne } = require('../contollers/loginController');

const loginRouter = express.Router();

loginRouter
  .route('/')
  .post(createOne);

module.exports = loginRouter;

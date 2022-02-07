const express = require('express');

const loginRouter = express.Router();

loginRouter
  .route('/')
  .post();

module.exports = loginRouter;

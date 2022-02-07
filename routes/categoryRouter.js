const express = require('express');

const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get()
  .post();

module.exports = categoryRouter;

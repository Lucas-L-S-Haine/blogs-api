const express = require('express');
const { readAll, createOne } = require('../contollers/categoryController');

const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get(readAll)
  .post(createOne);

module.exports = categoryRouter;

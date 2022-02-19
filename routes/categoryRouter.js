const express = require('express');
const { readAll, createOne } = require('../controllers/categoryController');
const { validateToken } = require('../auth');

const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get(validateToken, readAll)
  .post(validateToken, createOne);

module.exports = categoryRouter;

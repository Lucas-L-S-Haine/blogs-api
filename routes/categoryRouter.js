const express = require('express');
const { readAll, createOne } = require('../controllers/categoryController');
const { validateToken } = require('../auth');

const categoryRouter = express.Router();

categoryRouter.use(validateToken);

categoryRouter
  .route('/')
  .get(readAll)
  .post(createOne);

module.exports = categoryRouter;

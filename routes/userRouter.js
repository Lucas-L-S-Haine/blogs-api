const express = require('express');
const {
  readOne, readAll, createOne, deleteOne,
} = require('../controllers/userController');
const { validateToken } = require('../auth');

const userRouter = express.Router();

userRouter
  .route('/')
  .get(validateToken, readAll)
  .post(createOne);

userRouter
  .route('/:id')
  .get(readOne);

userRouter
  .route('/me')
  .delete(deleteOne);

module.exports = userRouter;

const express = require('express');

const userRouter = express.Router();

userRouter
  .route('/')
  .get()
  .post();

userRouter
  .route('/:id')
  .get();

userRouter
  .route('/me')
  .delete();

module.exports = userRouter;

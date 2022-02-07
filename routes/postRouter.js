const express = require('express');

const postRouter = express.Router();

postRouter
  .route('/')
  .get()
  .post();

postRouter
  .route('/search')
  .get();

postRouter
  .route('/:id')
  .get()
  .put()
  .delete();

module.exports = postRouter;

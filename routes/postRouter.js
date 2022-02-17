const express = require('express');
const {
  readAll, createOne, readMany,
  readOne, updateOne, deleteOne,
} = require('../controllers/postController');
const { validateToken } = require('../auth');

const postRouter = express.Router();

postRouter
  .route('/')
  .get(validateToken, readAll)
  .post(validateToken, createOne);

postRouter
  .route('/search')
  .get(validateToken, readMany);

postRouter
  .route('/:id')
  .get(validateToken, readOne)
  .put(validateToken, updateOne)
  .delete(validateToken, deleteOne);

module.exports = postRouter;

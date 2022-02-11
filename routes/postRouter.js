const express = require('express');
const {
  readAll, createOne, readMany,
  readOne, updateOne, deleteOne,
} = require('../controllers/postController');

const postRouter = express.Router();

postRouter
  .route('/')
  .get(readAll)
  .post(createOne);

postRouter
  .route('/search')
  .get(readMany);

postRouter
  .route('/:id')
  .get(readOne)
  .put(updateOne)
  .delete(deleteOne);

module.exports = postRouter;

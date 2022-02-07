const express = require('express');

const userRouter = require('./userRouter');
const postRouter = require('./postRouter');
const loginRouter = require('./loginRouter');
const categoryRouter = require('./categoryRouter');

const router = express.Router();

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/login', loginRouter);
router.use('/categories', categoryRouter);

module.exports = router;

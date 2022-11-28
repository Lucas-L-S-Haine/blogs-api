const { fail } = require('assert/strict');
const router = require('../../../src/routes/userRouter');

console.log(router);

// userRouter
//   .route('/')
//   .get(validateToken, readAll)
//   .post(createOne);
//
// userRouter.use(validateToken);
//
// userRouter
//   .route('/:id')
//   .get(readOne);
//
// userRouter
//   .route('/me')
//   .delete(deleteOne);
describe('Test user router', () => {
  it('should use "/user" route', () => {
    fail('test has yet to be implemented');
  });
});

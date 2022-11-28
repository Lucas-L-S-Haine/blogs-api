const { fail } = require('assert/strict');
const router = require('../../../src/routes/postRouter');
const controller = require('../../../src/controllers/postController');
const { validateToken } = require('../../../src/auth');

const getRoutesByPath = (path) =>
  router.stack
    .filter((layer) => layer.route?.path === path)
    .map((layer) => layer.route);

// postRouter.use(validateToken);
//
// postRouter
//   .route('/')
//   .get(readAll)
//   .post(createOne);
//
// postRouter
//   .route('/search')
//   .get(readMany);
//
// postRouter
//   .route('/:id')
//   .get(readOne)
//   .put(updateOne)
//   .delete(deleteOne);

// console.log(router.stack);
// console.log(router.stack[0]);
const rootRouter = getRoutesByPath('/');
const idRouter = getRoutesByPath('/:id');
const searchRouter = getRoutesByPath('/search');
console.log(rootRouter[0]);
console.log(rootRouter[0].stack);
// console.log(idRouter[0].stack);
// console.log(searchRouter[0].stack);

// describe('Test post router', () => {
//   it.todo('all endpoints should be validated by an authorization token');
// });
describe('Test post router', () => {
  it('should use "/post" route', () => {
    fail('test has yet to be implemented');
  });
});

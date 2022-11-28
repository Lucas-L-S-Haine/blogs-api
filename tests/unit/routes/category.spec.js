const { fail } = require('assert/strict');
const router = require('../../../src/routes/categoryRouter');
const app = require('../../../src/app');

// categoryRouter.use(validateToken);
//
// categoryRouter
//   .route('/')
//   .get(readAll)
//   .post(createOne);

const myRouter = app._router.stack.find(({ name }) => name === 'router');
const login = myRouter.handle.stack[2];
const categories = myRouter.handle.stack[3];

console.log(router.stack[1]);
console.log(router.stack[1].route.methods);
console.log(router.stack[1].route.stack);
console.warn(login);
console.warn(categories);

describe('Test category router', () => {
  it('should use "/categories" route', () => {
    fail('test has yet to be implemented');
  });
});

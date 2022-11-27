const app = require('../../src/app');

class MockRouter {
  constructor(app) {
    this._router = app._router;
  }

  findRouter(path) {
  }
}

const router = new MockRouter(app);

console.log(router._router);

module.exports = MockRouter;

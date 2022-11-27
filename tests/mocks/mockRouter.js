class MockRouter {
  constructor(app) {
    this._router = app._router;
  }

  findRouter(path) {
  }
}

module.exports = MockRouter;

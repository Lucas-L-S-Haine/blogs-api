const MockResponse = require('./mockResponse');

class MockNextFunction {
  constructor(status = 500, message = 'Internal Error') {
    const res = new MockResponse();
    const errorHandler = (err, _req, res, _next) =>
      res.status(status).send({ message });
    const next = (err) => errorHandler(err, null, res, null);

    return next;
  }
}

module.exports = MockNextFunction;

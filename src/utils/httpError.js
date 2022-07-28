class HTTPError extends Error {
  constructor(status = 500, message = 'internal error') {
    super(message);
    this.status = status;
  }
}

module.exports = HTTPError;

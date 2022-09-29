const express = require('express');

class MockResponse {
  status(statusCode) {
    this.statusCode = statusCode;

    return this;
  }

  send(response) {
    this.serverResponse = response

    return this;
  }

  json(response) {
    return this.send(response);
  }
}

module.exports = MockResponse

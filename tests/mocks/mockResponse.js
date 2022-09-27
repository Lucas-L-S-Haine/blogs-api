const express = require('express');

class MockResponse {
  status(statusCode) {
    this.statusCode = statusCode;

    return this;
  }

  send(response) {
    for (const key in response) {
      this[key] = response[key];
    }

    return this;
  }

  json(response) {
    return this.send(response);
  }
}

module.exports = MockResponse

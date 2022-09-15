class MockTransaction {
  commit() {
    return this;
  }
}

module.exports = MockTransaction;

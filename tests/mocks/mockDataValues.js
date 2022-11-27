const MockDataObject = class MockDataValues {
  constructor(dataValues) {
    Object.defineProperty(this, 'dataValues', {
      value: dataValues,
      writable: false,
      enumerable: false,
      configurable: true,
    });
    for (const key in dataValues) {
      this[key] = dataValues[key];
    }
    return this;
  }

  get(key) {
    return this.dataValues[key] || this.dataValues;
  }
}

const MockDataList = class MockDataValues {
  constructor(dataValues) {
    return dataValues.map((value) => new MockDataObject(value));
  }
}

class MockDataValues {
  constructor(dataValues) {
    if (dataValues instanceof Array) {
      return new MockDataList(dataValues);
    } else {
      return new MockDataObject(dataValues);
    }
  }
}

module.exports = MockDataValues;

const nameDescriptor = {
  value: 'MockDataValues',
  writable: false,
  enumerable: false,
  configurable: true,
};

class MockDataObject {
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

class MockDataList {
  constructor(dataValues) {
    return dataValues.map((value) => new MockDataObject(value));
  }
}

delete MockDataObject.name;
delete MockDataList.name;
Object.defineProperty(MockDataObject, 'name', nameDescriptor);
Object.defineProperty(MockDataList, 'name', nameDescriptor);

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

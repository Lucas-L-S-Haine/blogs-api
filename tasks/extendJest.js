const getDataValues = (entry) => entry.dataValues;

function getArraySuccessMessage(received, expected) {
  this.message = '';
  try {
    const haveDataValues = received.every(getDataValues);
    const values = haveDataValues ? received.map(getDataValues) : received;
    expect(values).toEqual(expected);
  } catch (err) {
    this.message = err.message;
  }

  return this.message;
}

function getArrayFailMessage(received, expected) {
  this.message = '';
  try {
    const haveDataValues = received.every(getDataValues);
    const values = haveDataValues ? received.map(getDataValues) : received;
    expect(values).not.toEqual(expected);
  } catch (err) {
    this.message = err.message;
  }

  return this.message;
}

function getObjectSuccessMessage(received, expected) {
  this.message = '';
  try {
    const value = received.dataValues ? received.dataValues : received;
    expect(value).toEqual(expected);
  } catch (err) {
    this.message = err.message;
  }

  return this.message;
}

function getObjectFailMessage(received, expected) {
  this.message = '';
  try {
    const value = received.dataValues ? received.dataValues : received;
    expect(value).not.toEqual(expected);
  } catch (err) {
    this.message = err.message;
  }

  return this.message;
}

function getSuccessMessage(received, expected) {
  if (received instanceof Array) {
    return getArraySuccessMessage(received, expected);
  }
  return getObjectSuccessMessage(received, expected);
}

function getFailMessage(received, expected) {
  if (received instanceof Array) {
    return getArrayFailMessage(received, expected);
  }
  return getObjectFailMessage(received, expected);
}

expect.extend({
  toMatchDataValues(received, expected) {
    const successMessage = getSuccessMessage(received, expected);
    const failMessage = getFailMessage(received, expected);
    const pass = !successMessage;
    this.message = successMessage || failMessage;

    if (pass) {
      return {
        message: () => this.message,
        pass: true,
      };
    }
    return {
      message: () => this.message,
      pass: false,
    };
  },
});

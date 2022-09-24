const getDataValues = (entry) => entry.dataValues;

function getArrayFailToMatchMessage(received, expected) {
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

function getArrayFailToNotMatchMessage(received, expected) {
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

function getObjectFailToMatchMessage(received, expected) {
  this.message = '';
  try {
    const value = received.dataValues ? received.dataValues : received;
    expect(value).toEqual(expected);
  } catch (err) {
    this.message = err.message;
  }

  return this.message;
}

function getObjectFailToNotMatchMessage(received, expected) {
  this.message = '';
  try {
    const value = received.dataValues ? received.dataValues : received;
    expect(value).not.toEqual(expected);
  } catch (err) {
    this.message = err.message;
  }

  return this.message;
}

function getFailToMatchMessage(received, expected) {
  if (received instanceof Array) {
    return getArrayFailToMatchMessage(received, expected);
  }
  return getObjectFailToMatchMessage(received, expected);
}

function getFailToNotMatchMessage(received, expected) {
  if (received instanceof Array) {
    return getArrayFailToNotMatchMessage(received, expected);
  }
  return getObjectFailToNotMatchMessage(received, expected);
}

function toMatchDataValues(received, expected) {
  const failToMatchMessage = getFailToMatchMessage(received, expected);
  const failToNotMatchMessage = getFailToNotMatchMessage(received, expected);
  const pass = !failToMatchMessage;
  this.message = failToMatchMessage || failToNotMatchMessage;

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
}

module.exports = toMatchDataValues;

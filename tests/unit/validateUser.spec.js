const { resolve } = require('path');
const validateUser = require(
  resolve(__dirname, '../..', 'src/validations/userValidate.js'));

describe('Test user validation', () => {
  it('doesn’t allow less than 8 characters for displayName', () => {
    const userData = {
      displayName: 'Kenny',
      email: 'based@security.org',
      password: 'KEkmuU11epB8kZLso8nCuFb6',
    };
    const error = new Error();
    error.message = '"displayName" length must be at least 8 characters long';
    expect(() => validateUser(userData)).toThrow(error);
  });

  it('doesn’t allow registering users without email', () => {
    const userData = {
      displayName: 'MentalOutlaw',
      password: 'KEkmuU11epB8kZLso8nCuFb6',
    };
    const error = new Error();
    error.message = '"email" is required';
    expect(() => validateUser(userData)).toThrow(error);
  });

  it('doesn’t allow invalid emails', () => {
    const userData = {
      displayName: 'MentalOutlaw',
      email: 'mental@outlaw',
      password: 'KEkmuU11epB8kZLso8nCuFb6',
    };
    const error = new Error();
    error.message = '"email" must be a valid email';
    expect(() => validateUser(userData)).toThrow(error);
  });


  it('doesn’t allow registering users without password', () => {
    const userData = {
      displayName: 'MentalOutlaw',
      email: 'based@security.org',
    };
    const error = new Error();
    error.message = '"password" is required';
    expect(() => validateUser(userData)).toThrow(error);
  });


  it('doesn’t allow passwords with 5 or less characters', () => {
    const userData = {
      displayName: 'MentalOutlaw',
      email: 'based@security.org',
      password: 'KEkmu',
    };
    const error = new Error();
    error.message = '"password" length must be 6 characters long';
    expect(() => validateUser(userData)).toThrow(error);
  });

  it('doesn’t throw exception for valid data', () => {
    const userData = {
      displayName: 'MentalOutlaw',
      email: 'based@security.org',
      password: 'KEkmuU11epB8kZLso8nCuFb6',
    };
    expect(() => validateUser(userData)).not.toThrow();
  });
});

const { resolve } = require('path');
const validateLogin = require(
  resolve(__dirname, '../../..', 'src/validations/loginValidate.js'));

describe('Test login validation', () => {
  it('doesn’t allow email to be empty', () => {
    const loginData = { email: '', password: '123456' };
    const error = new Error();
    error.message = '"email" is not allowed to be empty';
    expect(() => validateLogin(loginData)).toThrow(error);
  });

  it('doesn’t allow login without email', () => {
    const loginData = { password: '123456' };
    const error = new Error();
    error.message = '"email" is required';
    expect(() => validateLogin(loginData)).toThrow(error);
  });

  it('doesn’t allow password to be empty', () => {
    const loginData = { email: 'lewishamilton@gmail.com', password: '' };
    const error = new Error();
    error.message = '"password" is not allowed to be empty';
    expect(() => validateLogin(loginData)).toThrow(error);
  });

  it('doesn’t allow login without password', () => {
    const loginData = { email: 'lewishamilton@gmail.com' };
    const error = new Error();
    error.message = '"password" is required';
    expect(() => validateLogin(loginData)).toThrow(error);
  });

  it('doesn’t throw exception for valid data', () => {
    const loginData = { email: 'lewishamilton@gmail.com', password: '123456' };
    expect(() => validateLogin(loginData)).not.toThrow();
  });
});

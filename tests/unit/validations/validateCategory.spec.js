const { resolve } = require('path');
const validateCategory = require(
  resolve(__dirname, '../../..', 'src/validations/categoryValidate.js'));

describe('Test category validation', () => {
  it('doesn’t allow categories without name', () => {
    const category = { name: '' };
    const error = new Error();
    error.message = '"name" is required';
    expect(() => validateCategory(category)).toThrow(error);
  });

  it('doesn’t throw exception for valid category', () => {
    const category = { name: 'Unit Tests' };
    expect(() => validateCategory(category)).not.toThrow();
  });
});

const y = require('./dependency');

jest.mock('./dependency');
const f = require('./module');

y.mockImplementation(() => 7);
y.mockReturnValueOnce(5);

describe('Test mocked function', () => {
  describe('Return mocked value for dependency', () => {
    it('mock value 5', () => {
      const sum = f(5);

      expect(sum).toBe(10);
    });
  });

  describe('Return default value', () => {
    it('f(1) = 8', () => {
      const sum = f(1);

      expect(sum).toBe(8);
    });
  });
});

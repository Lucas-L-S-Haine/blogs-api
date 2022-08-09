const models = require('../models');

jest.mock('../models');
const service = require('./userService.js');

const { User } = models;
// User.mockImplementation(() => ({
//  name: 'xablau',
// }));

describe('Test user service', () => {
  beforeAll(() => {
    User.mockReturnValue({
      name: 'xablau',
    });
  });
  it('should return a pre-defined object', async () => {
    User.findByPk = jest.fn();
    User.findByPk.mockReturnValue({ name: 'xablau' });
    const user = await service.readOne(3);

    expect(user).toEqual({ name: 'xablau' });
  });
});

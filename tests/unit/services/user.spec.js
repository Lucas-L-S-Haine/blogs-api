const { resolve } = require('path');
const fs = require('fs/promises');

const modelsDir = resolve(__dirname, '../../..', 'src/models');

const User = {
  findByPk: jest.fn(() => {
    return new Promise((resolve) => {
      resolve({
        id: 3,
        displayName: 'Michael Schumacher',
        email: 'MichaelSchumacher@gmail.com',
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
      })
    })
  })
}

const servicesDir = resolve(__dirname, '../../..', 'src/services');
const service = require(resolve(servicesDir, 'userService'));

describe('Test user services', () => {
  it('should return Schumacher', async () => {
    const schumacher = {
      id: 3,
      displayName: 'Michael Schumacher',
      email: 'MichaelSchumacher@gmail.com',
      image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
    };

    const user = await service.readOne(3);

    expect(user).toEqual(schumacher);
  })
});

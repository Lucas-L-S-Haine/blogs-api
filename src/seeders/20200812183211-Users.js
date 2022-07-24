const { hash } = require('bcryptjs');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    const root = await hash('root', 8);
    const pass1 = await hash('123456', 8);
    const pass2 = await hash('123456', 8);
    await queryInterface.bulkInsert('Users',
      [{
        id: 1,
        displayName: 'SysAdmin',
        email: 'root@blogs.api',
        password: root,
        image: 'https://www.freelancinggig.com/blog/wp-content/uploads/2020/02/future-proof-sys-admin.png',
      },
      {
        id: 2,
        displayName: 'Lewis Hamilton',
        email: 'lewishamilton@gmail.com',
        password: pass1,
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      },
      {
        id: 3,
        displayName: 'Michael Schumacher',
        email: 'MichaelSchumacher@gmail.com',
        password: pass2,
        image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};

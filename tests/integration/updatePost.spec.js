const { resolve } = require('path');

require('dotenv/config');
const axios = require('axios');

const { sequelize } = require(`${__dirname}/../../src/models`);
const seedBlogPosts = require(resolve(__dirname, '../..',
  'src/seeders/20200812194353-BlogPosts.js'));

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
const baseUrl = `http://${host}:${port}`;

describe('Test the PUT /post/:id endpoint', () => {
  afterAll(async () => {
    await seedBlogPosts.down(sequelize.queryInterface);
    await seedBlogPosts.up(sequelize.queryInterface);
    sequelize.close();
  });

  it('user 2 is able to edit his own posts', async () => {
    const userData = { email: 'lewishamilton@gmail.com', password: '123456' };
    const { data: login } = await axios.post(`${baseUrl}/login`, userData);

    const { token: authorization } = login;
    const config = {
      timeout: 1000,
      headers: { authorization },
    };
    const newPost = {
      title: 'Post do Ano',
      content: 'Um post melhor ainda',
    }
    const { data, status } = await axios.put(`${baseUrl}/post/1`, newPost, config);

    const result = {
      title: 'Post do Ano',
      content: 'Um post melhor ainda',
      userId: 2,
      categories: []
    };
    expect(status).toBe(200);
    expect(data).toEqual(result);
  });

  it('user 3 is not allowed to edit user 2’s posts', async () => {
    const userData = { email: 'MichaelSchumacher@gmail.com', password: '123456' };
    const { data: login } = await axios.post(`${baseUrl}/login`, userData);

    const { token: authorization } = login;
    const config = {
      timeout: 1000,
      headers: { authorization },
    };
    const newPost = {
      title: 'Corredor do Ano',
      content: 'Schumacher > Hamilton',
    }
    const { data, status } = await axios.put(`${baseUrl}/post/1`, newPost, config)
      .catch(({ response }) => ({ data: response.data, status: response.status }));

    expect(status).toBe(401);
    expect(data.message).toBe('Unauthorized user');
  });
});

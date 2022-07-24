require('dotenv/config');
const axios = require('axios');

module.exports = async () => {
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 3000;
  const baseUrl = `http://${host}:${port}`;

  const { data } = await axios.post(`${baseUrl}/login`, {
    email: 'root@blogs.api',
    password: 'root',
  });
  const { token } = data;
  process.env.authorization = token;
};

const express = require('express');
const { User } = require('./models');

const app = express();

// const router = require('./routes');

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// app.use(router);
app.post('/user', async (req, res) => {
  console.log(req.body);
  try {
    const { displayName, email, password, image } = req.body;
    console.log(displayName);
    await User.create({ displayName, email, password, image });
    return res.status(201).json({ token: 'aslfkjasdf802' });
  } catch (err) {
    err.status = 403;
    err.message = 'Desta vez num foi';
    return res.status(err.status).send({ message: err.message });
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

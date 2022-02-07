const express = require('express');

const app = express();

const router = require('./routes');

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

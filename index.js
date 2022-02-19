const express = require('express');

const app = express();

const router = require('./routes');
const errorMiddleware = require('./middlewares/errorHandler');

app.listen(3000, () => console.log('ouvindo porta 3000!'));

app.use(express.json());

app.use(router);

app.get('/', (request, response) => {
  response.send();
});

app.use(errorMiddleware);

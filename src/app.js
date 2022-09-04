const express = require('express');
const cors = require('cors');

const app = express();

const router = require('./routes');
const errorMiddleware = require('./middlewares/errorHandler');
const notFoundMiddleware = require('./middlewares/notFoundHandler');

app.use(express.json());
app.use(cors());

app.use(router);

app.get('/', (request, response) => {
  response.send('Online!!!');
});

app.use(errorMiddleware);
app.use(notFoundMiddleware);

module.exports = app;

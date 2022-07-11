const express = require('express');

const app = express();

const router = require('./routes');
const errorMiddleware = require('./middlewares/errorHandler');
const notFoundMiddleware = require('./middlewares/notFoundHandler');

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(router);

app.get('/', (request, response) => {
  response.send('Online!!!');
});

app.use(errorMiddleware);
app.use(notFoundMiddleware);

app.listen(PORT, () => console.log(`Application online on port \x1b[03;94m${PORT}\x1b[00m!`));

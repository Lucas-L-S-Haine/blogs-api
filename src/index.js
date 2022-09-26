const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server listening on port \x1b[03;94m${PORT}\x1b[00m!`));

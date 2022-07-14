module.exports = (_req, res, _next) =>
  res.status(404).send({ error: 'Path not found' });

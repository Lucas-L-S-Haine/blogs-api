module.exports = (err, _req, res, _next) =>
  res.status(err.status).send({ message: err.message });

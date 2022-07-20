module.exports = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Error';
  return res.status(status).send({ message });
};

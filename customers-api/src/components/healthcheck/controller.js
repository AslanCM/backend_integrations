 async function healthcheck(req, res) {
  req.tags = { name: 'health' };
  res.status(200)
    .json({
      message: 'ms_customers running success',
    });
}

module.exports = {
  healthcheck,
};

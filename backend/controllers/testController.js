const getTestMessage = (req, res) => {
  res.json({ message: 'API working' });
};

module.exports = {
  getTestMessage
};

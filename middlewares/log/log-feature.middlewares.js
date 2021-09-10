const logFeature = (message) => (req, res, next) => {
  //Show message
  console.log(message);
  next();
};

module.exports = {
  logFeature,
};

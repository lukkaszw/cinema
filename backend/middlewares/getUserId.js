const jwt = require('jsonwebtoken');

const getUserId = (req, res, next) => {
  const authString = req.header('Authorization');
  if(authString) {
    const token = authString.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const userId = decoded._id;
    req.userId = userId;
  }

  next();
}

module.exports = getUserId;
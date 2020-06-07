const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const _id = decoded._id;
    const user = await User.findOne({ _id, 'tokens.token': token })
      .populate({ path: 'news', options: { sort: { 'updatedAt': -1 }} });

    if(!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please authenticate!' });
  }
 
}

module.exports = auth;
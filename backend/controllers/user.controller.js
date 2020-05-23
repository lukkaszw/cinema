

const getUserData = async (req, res) => {
  res.json(req.user);
}

const postUserData = async (req, res) => {
  res.json({ user: req.user, message: 'post user data' });
}

const updateUserData = async (req, res) => {
  res.json({ user: req.user, message: 'update user data' });
}


module.exports = {
  getUserData,
  postUserData,
  updateUserData,
};
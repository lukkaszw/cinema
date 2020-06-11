const bcrypt = require('bcryptjs');

const getUserData = async (req, res) => {
  res.json(req.user);
}

const updateUserData = async (req, res) => {
  const data = req.body;
  const allowedUpdates = ['email', 'name', 'surname', 'phone', 'getsNewsletter'];

  const sentUpdates = Object.keys(data);
  const isMatch = sentUpdates.every(key => allowedUpdates.includes(key));

  if(!isMatch) {
    res.status(400).json({ isError: true, message: 'Bad request!'});
    return;
  }

  try {
    sentUpdates.forEach(key => {
      if(key === 'email') {
        req.user.login = req.body[key];
      } else {
        req.user[key] = req.body[key];
      }
    });
    await req.user.save();
    res.json({ userData: req.user, message: 'Data has been successfully updated' });
  } catch (error) {
    res.status(500).json(error);
  }
}

const updatePassword = async (req, res) => {
  const { oldPassword, password, confirmPassword } = req.body;
  const isMatch = await bcrypt.compare(oldPassword, req.user.password);
  if(!isMatch) {
    res.status(400).json({
      isError: true,
      message: 'Incorrect old password!',
    });
    return;
  }

  if(password !== confirmPassword || password.length < 8) {
    res.status(400).json({
      isError: true,
      message: 'Please provide correct passwords!',
    });
    return;
  }

  try {
    req.user.password = password;
    await req.user.save();
    res.json({
      message: 'The password has been updated!',
    })
  } catch (error) {
    res.status(500).json(error);
  }
}


module.exports = {
  getUserData,
  updateUserData,
  updatePassword,
};
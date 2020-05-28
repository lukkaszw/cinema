const User = require('../models/user');
const News = require('../models/news');

const signup = async (req, res) => {
  const { login, password, confirmPassword } = req.body;

  try {
    if(password !== confirmPassword) {
      throw new Error('Passwords do not match!');
    }
    const user = new User({ login, password });
    const welcomeNews = await News.createWelcomeNews(user._id);
    welcomeNews.forEach(welcomeNew => {
      user.news.push(welcomeNew);
    });
    await user.save();
    res.status(201).json({
      message: 'Your account has been created! Please sign in.',
    });
  } catch (error) {
    console.log(error);
    User.sendRegistrationErrors(error, res);
  }
};


const signin = async (req, res) => {
  const { login, password } = req.body;

  try {
    const user = await User.findByCredentials(login, password);
    const token = await user.generateAuthToken();
    res.json({token});
  } catch (error) {
    if(error.message === 'Incorrect login or password!') {
      res.json({
        isError: true,
        message: error.message,
      });
      return;
    }
    res.status(500).json(error);

  }    
};


const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
}

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
}



module.exports = {
  signup,
  signin,
  logout,
  logoutAll,
};
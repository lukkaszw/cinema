const Message = require('../models/message');
const validator = require('validator');

const validateMessage = (req, res, next) => {
  const { email, message } = req.body;
  const validation = [];
  if(!validator.isEmail(email)) {
    validation.push({ name: 'email', error: 'Incorrect email address!' });
  }

  if(message.length > 1000) {
    validation.push({ name: 'message', error: 'To long message (1000 characters allowed)!'});
  }

  if(validation.length > 0) {
    return res.json({
      message: 'Incorrect fields values!',
      validation,
    })
  }
  next();
}

const createOne = async (req, res) => {
  const { email, message } = req.body;

  try {
    const newMessage = new Message({ email, message });
    await newMessage.save();
    res.json({
      message: 'Thank you for your message!',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'We are sorry. Internal server error.',
    });
  }
}


module.exports = {
  createOne,
  validateMessage,
};
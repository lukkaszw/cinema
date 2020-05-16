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
    res.json({ 
      isError: true,
      message: 'Incorrect fields values!',      
      validation,
    });
    return;
  }
  next();
}

const createOne = async (req, res) => {
  const { email, message } = req.body;

  try {
    const newMessage = new Message({ email, message });
    await newMessage.save();

    return res.json({
      message: 'Massege has sended correctly!',
    });

  } catch (error) {
    res.status(500).json(error);
  }
}


module.exports = {
  createOne,
  validateMessage,
};
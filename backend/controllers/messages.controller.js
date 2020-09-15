const Message = require('../models/message');

const createOne = async (req, res) => {
  const { email, message } = req.body;
  //RODO !!! - need to change email to fictional email for all messages
  const dummyEmail = 'some213132131email2131231@gmail.com';

  try {
    const newMessage = new Message({ email: dummyEmail, message });
    await newMessage.save();

    return res.json({
      message: 'Massege has sended correctly!',
    });

  } catch (error) {
    if(error.errors) {
      return res.json({
        isError: true,
        userFault: true,
        message: 'Incorrect data. Correct it and try again!',
      });
    }
    res.status(500).json(error);
  }
}


module.exports = {
  createOne,
};
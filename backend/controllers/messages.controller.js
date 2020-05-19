const Message = require('../models/message');

const createOne = async (req, res) => {
  const { email, message } = req.body;

  try {
    const newMessage = new Message({ email, message });
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
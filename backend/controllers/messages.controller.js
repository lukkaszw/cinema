const Message = require('../models/message');
const sendMessage = require('../emails/messages');

const createOne = async (req, res) => {
  const { name, email, message, external } = req.body;
  
  if(!external) {
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
  } else {
    //mails from my portfolio app :D
    const mail = {
      name, 
      email, 
      message, 
      ownEmail: process.env.PORTFOLIO_EMAIL,
    };

    try {
      await sendMessage.sendEmail(mail);
      res.json({
        message: 'Sukces!'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    } 
  }
}


module.exports = {
  createOne,
};
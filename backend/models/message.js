const mongoose = require('mongoose');
const _v = require('validator');

const messageSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      validate: (value) => _v.isEmail(value),
      message: () => 'Invalid email!',
    },
    message: {
      type: String,
      required: true,
      maxlength: 1000,
    }
  }, {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', messageSchema);
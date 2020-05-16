const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    }
  }, {
    timestamps: true,
  }
);

module.exports = mongoose.model('Message', messageSchema);
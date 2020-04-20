const mongoose = require('mongoose');

const detailsSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  direction: {
    type: String,
    requied: true,
  },
  description: {
    type: [String],
    required: true,
  },
  reliseDate: {
    type: String,
  },
  cast: [
    {
      name: {
        type: String,
      },
      link: {
        type: String,
      }
    }
  ],
});

module.exports = mongoose.model('Detail', detailsSchema);
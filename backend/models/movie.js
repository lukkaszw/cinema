const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  categories: {
    type: [String],
    required: true,
  },
  played: {
    type: String,
    required: true,
  },
  filters: {
    type: [String],
  },
  playDate: {
    type: String,
  },
  details: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Detail",
  }
}, 
{
  timestamps: true,
});

module.exports = mongoose.model('Movie', movieSchema);
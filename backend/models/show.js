const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  startAt: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  hall: {
    type: Number,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  }
});

module.exports = mongoose.model('Show', showSchema);
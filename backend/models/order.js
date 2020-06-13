const mongoose = require('mongoose');
const _v = require('validator');

const orderSchema = new mongoose.Schema({
  showId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Show',
    required: true,
  },
  seats: [String],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => _v.isEmail(value),
    message: () => 'Invalid email!',
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/.test(value),
    message: () => 'Invalid phone number!',
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  surname: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['ordered', 'paid', 'cancelled'],
    required: true,
    default: 'ordered',
  }
}, {
  timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
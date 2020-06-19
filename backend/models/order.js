const mongoose = require('mongoose');
const _v = require('validator');

const MS_BEFORE_NOW = 60 * 60 * 1000;

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
  showDate: {
    type: String,
    required: true,
    validate: (value) => new Date(value).getTime() > (new Date().getTime() + MS_BEFORE_NOW),
    message: () => 'Expired show date!',
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
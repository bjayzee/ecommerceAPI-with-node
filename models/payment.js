// src/models/payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  totalAmount: Number,
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
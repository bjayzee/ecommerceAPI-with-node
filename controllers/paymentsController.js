const User = require('../models/user');
const Product = require('../models/product');
const Payment = require('../models/payment');

exports.simulatePayment = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Fetch the user and product details
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    // Calculate total amount based on product price and quantity
    const totalAmount = product.price * product.quantity;

    // Record the payment transaction
    const payment = new Payment({
      user: userId,
      product: productId,
      totalAmount,
    });

    await payment.save();

    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: `Error simulating payment:  ${err}` });
  }
};
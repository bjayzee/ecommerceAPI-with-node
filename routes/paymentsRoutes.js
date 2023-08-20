const router = require('express').Router();

const paymentController = require('../controllers/paymentsController')



router.post('/checkout', paymentController.simulatePayment);


module.exports = router;
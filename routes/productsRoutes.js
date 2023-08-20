const router = require('express').Router();

const productController = require('../controllers/productsContoller')


router.post('/create', productController.createProduct);
router.patch('/update', productController.updateProduct);
router.get('/get', productController.getProduct)
router.delete('/delete', productController.deleteProduct)
router.get('/all', productController.getAllProduct)


module.exports = router;
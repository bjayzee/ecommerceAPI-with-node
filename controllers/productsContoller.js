const Product = require('../models/product')

exports.createProduct = (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity
    });

    product.save().then(data => {
        res.status(201).json(data)
    }).catch(err => res.status(400).json({err: err}))
}

exports.updateProduct = async(req, res) =>{
    const productId = req.query.productId;
    const productUpdate = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, productUpdate, {useFindAndModify: false, new: true});
        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
          }
      
          return res.status(200).json(updatedProduct);
    } catch (err) {
          return res.status(500).json({ error: 'Error updating product' });
    }
}

exports.deleteProduct = async(req, res)=>{
    const productId = req.query.productId;
    Product.findByIdAndRemove(productId).then(
        data => {
            if(!data) {
              res.status(404).send({
                message: `Cannot delete Product with id=${id}. Product not found!`
              });
            } else {
              res.status(200).send({
                message: "Organization was deleted successfully!"
              });
            }
        }
    ).catch(err => res.status(500).send(`Product can not be deleted : ${err}`))

}
exports.getProduct = (req, res) =>{
    const productId = req.query.productId
    Product.findById(productId).then(data => {
        res.status(200).json(data)
    }).catch(err => res.status(500).send("Product not found"))
}
exports.getAllProduct = (req, res) =>{
    Product.find().then(data => res.status(200).json(data))
    .catch(err => res.send(err.message))
}
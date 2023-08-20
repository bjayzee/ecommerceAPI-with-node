const request = require('supertest');
const app = require('../index'); // Your Express app instance
const Product = require('../models/product');

describe('Product API', () => {
  const testProduct = {
    name: 'Trial New Product',
    description: 'This is a test product',
    price: 80,
    quantity: 10,
  };

  let productId;

  afterAll(async () => {
    // Delete the product after each test
    await Product.deleteOne({ _id: productId });
  });

  it('should create a new product', async () => {
    const response = await request(app).post('/product/create').send(testProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(testProduct.name);
    expect(response.body.description).toBe(testProduct.description);
  });

  it('should update an existing product', async () => {
    // Create a product for testing
    const product = new Product(testProduct);
    const savedProduct = await product.save();

    // Update the product
    const updatedData = { name: 'Updated Product Name' };
    const response = await request(app).patch(`/product/update?productId=${savedProduct._id}`).send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
  });

  it('should delete an existing product', async () => {
    // Create a product for testing
    const product = new Product(testProduct);
    const savedProduct = await product.save();
    productId = savedProduct._id; // Store the product ID for cleanup

    // Delete the product
    const response = await request(app).delete(`/product/delete?productId=${productId}`);
    expect(response.statusCode).toBe(200);

    // Check if the product was deleted from the database
    const deletedProduct = await Product.findById(productId);
    expect(deletedProduct).toBeNull();
  });

  it('should get a single product', async () => {
    // Create a product for testing
    const product = new Product(testProduct);
    const savedProduct = await product.save();
    productId = savedProduct._id;

    // Get the product
    const response = await request(app).get(`/product/get?productId=${productId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(testProduct.name);
    expect(response.body.description).toBe(testProduct.description);
  });

  it('should get all products', async () => {
    // Create products for testing
    const product1 = new Product(testProduct);
    const product2 = new Product({ ...testProduct, name: 'Another Product' });
    await Promise.all([product1.save(), product2.save()]);

    // Get all products
    const response = await request(app).get('/product/all');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBeTruthy(); // Assuming 2 products were created
  });
});
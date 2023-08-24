const request = require('supertest');
const app = require('../index'); // Your Express app instance
const Product = require('../models/product');
const User = require('../models/user');
const Payment = require('../models/payment');

describe('Product API', () => {
  let testProduct;
  let productId;
  let response;

  testProduct = {
    name: 'New Product',
    description: 'This is a test product',
    price: 80,
    quantity: 10,
  };

  it('should create a new product', async () => {
   
    response = await request(app).post('/product/create').send(testProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(testProduct.name);
    expect(response.body.description).toBe(testProduct.description);
  });

  it('should update an existing product', async () => {
    // const testProduct = {
    //   name: 'Trial New Product',
    //   description: 'This is a test product',
    //   price: 80,
    //   quantity: 10,
    // };
    // // Create a product for testing
    // const product = new Product(testProduct);
    // const savedProduct = await product.save();

    productId = response.body._id;
    // Update the product
    const updatedData = { name: 'Updated Product Name' };
    response = await request(app).patch(`/product/update?productId=${productId}`).send(updatedData);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(updatedData.name);
  });

  it('should delete an existing product', async () => {
    // Create a product for testing
    // const product = new Product(testProduct);
    // const savedProduct = await product.save();
    // productId = savedProduct._id; // Store the product ID for cleanup

    // Delete the product
    response = await request(app).delete(`/product/delete?productId=${productId}`);
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
    response = await request(app).get(`/product/get?productId=${productId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(testProduct.name);
    expect(response.body.description).toBe(testProduct.description);
  });

  it('should get all products', async () => {
    // Create products for testing
    // const product1 = new Product(testProduct);
    const product2 = new Product({ ...testProduct, name: 'Another Product' });
    await product2.save();

    // Get all products
    const response = await request(app).get('/product/all');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeTruthy(); // Assuming 2 products were created
  });
  afterAll(async () => {
    // Delete the product after each test
    await Product.deleteOne({ _id: productId });
  });
});

describe('User API', () => {

  const testUser = {
    name: 'Adams Cory',
    email: 'smithcory@example.com',
    password: 'password123',
  };

  let response; 

  it('should register a new user', async () => {
    response = await request(app).post('/user/registration').send(testUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(testUser.name);
    expect(response.body.email).toBe(testUser.email);
  }, 5000);

  it('should not register a user with the same email', async () => {
    const respons = await request(app).post('/user/registration').send(testUser);
    expect(respons.statusCode).toBe(400);
  });

  afterAll(async () => {
    // Delete the user after all test
    await User.deleteOne({ _id: response.body._id });
  });
});

describe('Payment API', () =>{

  const testUser = {
    name: 'John Adams',
    email: 'john@example.com',
    password: 'password123',
  };

  const testProduct = {
    name: 'Milo',
    description: 'Milo Product is awesome',
    price: 60,
    quantity: 20,
  };

  let userId;
  let productId;

  // beforeEach(async () => {
  //   // Create a user and a product for testing
  //   const userResponse = await request(app).post('/user/registration').send(testUser);
  //   userId = userResponse.body._id;

  //   const productResponse = await request(app).post('/product/create').send(testProduct);
  //   productId = productResponse.body._id;
  // });

  afterAll(async () => {
    // Delete the user, product, and payment after each test
    await User.deleteOne({ _id: userId });
    await Product.deleteOne({ _id: productId });
    await Payment.deleteMany({ user: userId, product: productId });
  });

  it('should simulate a payment', async () => {
    const userResponse = await request(app).post('/user/registration').send(testUser);
    userId = userResponse.body._id;

    // console.log(userId)

    const productResponse = await request(app).post('/product/create').send(testProduct);
    productId = productResponse.body._id;
    // console.log(productId)

    const response = await request(app).post('/payment/checkout').send({ userId, productId });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.user).toBe(userId.toString());
    expect(response.body.product).toBe(productId.toString());
  });
})
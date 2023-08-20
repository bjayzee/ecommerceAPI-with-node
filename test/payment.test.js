const request = require('supertest');
const app = require('../index'); 
const User = require('../models/user');
const Product = require('../models/product');
const Payment = require('../models/payment');

describe('Payment API', () => {
  const testUser = {
    name: 'John Avey',
    email: 'jonahsmith@example.com',
    password: 'password123',
  };

  const testProduct = {
    name: 'Test New Product III',
    description: 'This is a test product',
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
    userId = userResponse;

    // console.log(userId)

    const productResponse = await request(app).post('/product/create').send(testProduct);
    productId = productResponse;
    // console.log(productId)

    const response = await request(app).post('/payment/checkout').send({ userId, productId });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.user).toBe(userId.toString());
    expect(response.body.product).toBe(productId.toString());
  });
});

// test('should first', () => {  })

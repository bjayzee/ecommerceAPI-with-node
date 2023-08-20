
const request = require('supertest');
const app = require('../index'); // Your Express app instance
const User = require('../models/user');


describe('User API', () => {
  // Define a user for testing
  const testUser = {
    name: 'Adams Smith',
    email: 'smith@example.com',
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
// test('should first', () => {  })
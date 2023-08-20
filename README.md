# E-Commerce API

This is a simple RESTful API for a basic e-commerce platform built using Node.js, Express, and MongoDB. The API provides endpoints for user registration, product management, and payment simulation.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/e-commerce-api.git
cd e-commerce-api

```

2. Install Dependencies

```bash
npm install
```
3. Set up your MongoDB connection:

Create a .env file in the project root.
Add the following line, replacing your_mongodb_url with your actual MongoDB URL:

```bash
MONGODB_URI=your_mongodb_url
```

4. Running the Server

To start the server, run:

```bash
npm start
```
The server will be accessible at http://localhost:5000.

5. Running Tests

To run tests, use the following command:

```bash
npm test
```

## Endpoints

# Users

POST /user/registration: Register a new user.

# Products
POST /product/create: Create a new product.
PATCH /product/update?productId: Update a product.
DELETE /product/delete?productId: Delete a product.
GET /product/get?productId: Get details of a product.
GET /products/all: Get a list of all products.

# Payments
POST /payment/checkout: Simulate a payment.

## Data Models

User
name: User's name (string).
email: User's email (string, unique).
password: User's password (string).

Product
name: Product's name (string).
description: Product's description (string).
price: Product's price (number).
quantity: Product's quantity available (number).

Payment
user: User's ID who made the payment (reference to User model).
product: Product's ID for which the payment is made (reference to Product model).
date: Date of the payment (Date).
totalAmount: Total amount paid (number).

## Decisions and Challenges

Database Choice: MongoDB was chosen due to its flexibility and ease of use for this project's scope.

Controllers and Routes: Used a modular approach with separate controllers and routes for each entity.

Testing: Implemented unit and integration tests using Jest and Supertest. Set up a test environment to ensure test data isolation.

Challenges: Handling edge cases and validating user input required careful attention to ensure correct functionality.
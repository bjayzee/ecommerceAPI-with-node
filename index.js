require('dotenv/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const userRoute = require('./routes/usersRoutes');
const productRoute = require('./routes/productsRoutes');
const paymentRoute = require('./routes/paymentsRoutes');



// middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Database connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      // app.listen(5000);
      console.log('Database connected');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
//Server

const port = process.env.PORT;


app.listen(port, () => {

    console.log(`server is running http://localhost:${port}`);
})


// routes

app.use('/user', userRoute)
app.use('/payment', paymentRoute)
app.use('/product', productRoute)


module.exports = app;
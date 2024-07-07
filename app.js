const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5002;

app.use(express.json());

// connect to mongoDB
mongoose.connect(process.env.DB_URL);

mongoose.connection.once('open', () => {
    console.log('connected to MongoDB');
});

// use routes
app.use('/api', productRoutes);
app.use('/api/users', userRoute);

// start the server
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
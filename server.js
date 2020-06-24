const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const app = express();

// load config
dotenv.config({ path: './config/config.env' });

// db connection
connectDb();

app.use(express.json({ extended: false }));

// routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/images', require('./routes/images'));


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`app is listion on port ${PORT}`));

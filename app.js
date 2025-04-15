require('dotenv').config();

const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();
const mongoose = require('mongoose');
const blogRouter = require('./routes/blog'); // Get blog routes


// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
// app.use(express.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.json()); // Enable JSON body parsing for HW5

// Routes
app.use('/', indexRouter);
app.use((req, res, next) => {
  console.log(`🟢 Request received: ${req.method} ${req.url}`);
  next();
});
app.use('/api', blogRouter); // Update blog routes under '/api' for HW5


// Static 
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;

// Connect to MongoDB Atlas
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
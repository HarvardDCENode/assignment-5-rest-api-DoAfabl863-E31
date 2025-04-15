const express = require('express');
const router = express.Router();
const Blog = require('../models/blog'); // Get Blog model

// Redirect the root route to '/blog'

router.get('/', (req, res) => {
  res.redirect('/blog'); // Redirect to the blog list page
});


// Direct render to '/blog'
/*
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find(); // Fetch all blog posts
    res.render('blog/list', { posts }); // Render the 'list' Pug template
  } catch (err) {
    res.status(500).send('Error loading blog posts: ' + err.message);
  }
});
*/

module.exports = router;

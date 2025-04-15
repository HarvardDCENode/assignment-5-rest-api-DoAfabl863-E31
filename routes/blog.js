const express = require('express');
const mongoose = require('mongoose'); // Import the Blog model
const Blog = require('../models/blog'); // Import the Blog model
const router = express.Router();

// Routes start

// Create a new blog post
router.post('/new', async (req, res) => {
    try {
      const { title, content, author, tags } = req.body; // Extract data from the form submission
      const newPost = new Blog({ title, content, author, tags });
      await newPost.save(); // Save the new post to the database
      res.redirect('/blog'); // Redirect to the list of blog posts
    } catch (err) {
      res.status(500).send('Error creating blog post: ' + err.message);
    }
  });
  
// Render the form to create a new blog post
router.get('/new', (req, res) => {
    res.render('blog/form', { post: null }); // Pass null as 'post' ie for creating a new blog post
  });
  
// List all blog posts
router.get('/', async (req, res) => {
    try {
      const posts = await Blog.find(); // Fetch all posts from the database
      res.render('blog/list', { posts }); // Render the 'list' Pug template with the posts
    } catch (err) {
      res.status(500).send('Error fetching blog posts: ' + err.message);
    }
  });

// Show details of a single blog post
/*router.get('/:id', async (req, res) => {
    try {
      const post = await Blog.findById(req.params.id); // Find the post by ID
      res.render('blog/details', { post }); // Render the 'details' Pug template with the post data
    } catch (err) {
      res.status(500).send('Error fetching blog post: ' + err.message);
    }
  });*/

router.get('/:id', async (req, res) => {
  try {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send('Invalid Blog ID');
    }
    
    const post = await Blog.findById(req.params.id); // Fetch the blog post
    if (!post) {
      return res.status(404).send('Blog post not found');
    }
    res.render('blog/details', { post }); // Render the 'details' Pug template with the post data
  } catch (err) {
    res.status(500).send('Error fetching blog post: ' + err.message);
  }
});
  
// Edit a blog post
router.post('/:id/edit', async (req, res) => {
    try {
      const { title, content, author, tags } = req.body; // Extract updated data from the form submission
      await Blog.findByIdAndUpdate(req.params.id, { title, content, author, tags });
      res.redirect('/blog/' + req.params.id); // Redirect to the updated post's details page
    } catch (err) {
      res.status(500).send('Error updating blog post: ' + err.message);
    }
  });
  
// Render the edit form for a blog post
router.get('/:id/edit', async (req, res) => {
    try {
      // Use mongoose.Types.ObjectId.isValid for validation
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Invalid Blog ID');
      }
      const post = await Blog.findById(req.params.id); // Fetch the blog post
      if (!post) {
        return res.status(404).send('Blog post not found');
      }
      res.render('blog/form', { post }); // Render the 'form' template with the post data
    } catch (err) {
      res.status(500).send('Error fetching blog post for editing: ' + err.message);
    }
  });

// Delete a blog post
router.post('/:id/delete', async (req, res) => {
    try {
      await Blog.findByIdAndDelete(req.params.id); // Delete the post by ID
      res.redirect('/blog'); // Redirect to the list of blog posts
    } catch (err) {
      res.status(500).send('Error deleting blog post: ' + err.message);
    }
  });
  
// Routes end  

module.exports = router;
const express = require('express');
const mongoose = require('mongoose'); // Import the Blog model
const Blog = require('../models/blog'); // Import the Blog model
const router = express.Router();

// Routes start

// Create a new blog post
router.post('/blogs', async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const newBlog = new Blog({ title, content, author, tags });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(500).json({ error: 'Error creating blog post: ' + err.message });
  }
});
  
// Render the form to create a new blog post // Keep for now, ie HW5
router.get('/new', (req, res) => {
    res.render('blog/form', { post: null }); // Pass null as 'post' ie for creating a new blog post
  });
  
// List all blog posts
router.get('/blogs', async (req, res) => {
  console.log("🟢 Incoming request to /api/blogs"); // Debugging log
  try {
    const posts = await Blog.find();
    console.log("🟡 Found posts:", posts); // Debugging log
    res.status(200).json(posts);
  } catch (err) {
    console.error("🔴 Error fetching blogs:", err.message); // Debugging log
    res.status(500).json({ error: 'Error fetching blog posts: ' + err.message });
  }
});


// Show details of a single blog post
router.get('/blogs/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid Blog ID' });
    }
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching blog post: ' + err.message });
  }
});
  
// Edit a blog post
router.put('/blogs/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid Blog ID' });
    }
    const { title, content, author, tags } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { title, content, author, tags }, { new: true });
    if (!updatedBlog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: 'Error updating blog post: ' + err.message });
  }
});
  
// Render the edit form for a blog post // Keep for now, ie HW5
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
router.delete('/blogs/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid Blog ID' });
    }
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(200).json({ message: 'Blog post deleted successfully', deletedBlog });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting blog post: ' + err.message });
  }
});
  
// Routes end  

module.exports = router;
const express = require('express');
const router = express.Router();

const items = []; // Temporary data store

router.get('/', (req, res) => {
  res.render('index', { title: 'Student Don Afable\'s App', items });
});

router.get('/form', (req, res) => {
  res.render('form', { title: 'Submit Item' });
});

router.get('/add', (req, res) => {
    const { item, category } = req.query;
    if (item && category) {
      items.push({ item, category }); // Store data as an object
    }
    res.redirect('/');
});  

module.exports = router;

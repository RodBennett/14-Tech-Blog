const router = require('express').Router();
const Posts = require('../models/Posts');
const User = require('../models/User')
//const withAuth = require('../utils/auth')

// GET data for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['name']
        }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/readpost');
    return;
  }
  console.log("login here ++++++++++++++++++++++++++++++++++++++++++")
  // Otherwise, render the 'login' template
  res.render('/login');
});

module.exports = router;

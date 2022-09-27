const router = require('express').Router();
const { Posts, User } = require('../models')
const withAuth = require('../utils/auth')

// GET data for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Posts.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    // creates an array / map of all posts and lists them on homepage 
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
router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const postdata = await Posts.findByPk(req.params.id, {
      include: [
        { 
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const post = postdata.get({ plain: true });
    res.render('readPost', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/homepage', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });

    res.render('homepage', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/homepage');
    return;
  }
  res.render('login');
});

// route for redirecting user to sign up page if no account exists, and then to homepage after creating login

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});


module.exports = router;

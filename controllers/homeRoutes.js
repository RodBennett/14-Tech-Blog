const router = require('express').Router();
const { Post, User } = require('../models')
const withAuth = require('../utils/auth')

// endpoint /login

// route for redirecting user to the homepage after account is created
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// GET data for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: 
      [{ model: User }],
    });

    // after login, this redirects user to homepage
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  console.log("++++++++++++You are Logged in++++++++++++++")
  res.render("login");
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


// This route allows user to get all data after login and to search posts
router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include:
       [{ model: Post, include: { model: User } }, { model: User}],
    });
    const posts = postData.get({ plain: true });
    res.render('readpost', {
      posts,
      logged_in: req.session.logged_in,
      user
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET enitre posts for users who are logged in
router.get('/posts', withAuth, async (req, res) => {
  try {
    const postData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post, include: {model: User } }, { model: User }],
    });

    const posts = postData.get({ plain: true });

    res.render('readpost', {
      ...posts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;


module.exports = router;

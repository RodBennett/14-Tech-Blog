const router = require("express").Router();
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

// GET route to get post data on homepage
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User }, { model: Comment, include: { model: User } }],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET route to redierct user to homepage after signing up
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// GET route for loggin in and redirecting to homepage if logged-in
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// This route allows user to get all data after login and to search posts with comments
router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include:
       [{ model: User }, { model: Comment, include: { model: User } }],
    });

    if (!postData) {
      res.status(400).json({ message: "No post found with this id" });
      return;
    }

    const post = postData.get({ plain: true });
    const comment = post.comment;

    res.render('readpost', {
      post,
      comment,
      logged_in: req.session.logged_in,
      user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

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
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one post by id
router.get("/posts/:id", withAuth, async (req, res) => {

  try {
    const postData = await Post.findByPk(
      req.params.id, {
      include: [User, { model: Comment, include: [User] }]
    }
    );

    // const posts = postData.map((post) => 
    const post = postData.get({ plain: true });
    console.log(post);

    res.render('readpost', {
      logged_in: req.session.logged_in,
      post,
    });
  } catch (err) {
    res.redirect('login');
  }
});
// });

// GET route to redirect user to homepage after signing up
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

// GET route for loggin in and redirecting to homepage if logged-in
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});


router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User }, { model: Comment, include: { model: User } }],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
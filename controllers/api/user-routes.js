const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


// GET route for all users
// router.get("/", async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       attributes: { exclude: ["[password"] },
//     });
//     res.json(userData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// GET route to find one user
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        { model: Post, include: { model: User } }, { model: Post}, { model: Comment }],
    });
    if (!userData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.username = userData.username;
      req.session.logged_in = true;

  });
  res.redirect('/')
  } catch (err) {
    res.status(403).json(err);
  }
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("signup");
});

   // after login, this redirects user to homepage
   router.get("/login", (req, res) => {
 
    if (req.session.loggedIn) {
      res.redirect("/");
      return;
    }
    res.render("login");
  }),

// Login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .redirect('/login')
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    if (!userData && !validPassword) {
      res
        .redirect('/signup')
        .json({ message: "Please create user account"})
      return;
    }
    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' })
        .redirect('/homepage')
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


// DELETE route for user

router.delete("/:id", async (req, res) => {
  try {
    const dbUserData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!dbUserData) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }

    res.json(dbUserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

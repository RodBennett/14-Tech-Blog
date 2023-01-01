const router = require('express').Router();
const { User } = require('../../models');

const colors = require("colors")

// endpoint /api/users

// CREATE new user via signup page
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;

      res.json(newUser)

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log(req.session.bgRed)
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    document.location.redirect('/dashboard')
    if (!user) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }
    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .redirect('/login')
        .json({ message: 'Incorrect password. Please try again!' });
      return;
    }
    // Once the user successfully logs in, set up the sessions variable 'logged_in'
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;

      res
        .status(200)
        .json({ user, message: 'You are now logged in!' })
        .redirect('/homepage')
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "No user found!"});
  }
});

//   // Logout
  router.post('/logout', (req, res) => {
    // When the user logs out, destroy the session
    console.log(req.session)
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

module.exports = router;

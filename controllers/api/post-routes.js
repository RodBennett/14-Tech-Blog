const router = require('express').Router();
const Posts = require('../../models/Posts');
const User = require('../../models/User');
const withAuth = require('../../utils/auth');


// GET all posts
router.get('/', async (req, res) => {
    try {
        const allPostData = await Posts.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        // create a map to serialize each post 
        const posts = allPostData.map((post) => post.get({ plain: true}));
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
      }
});

// GET one post
router.get('/posts/:id', async (req, res) => {
    try {
      const onePostData = await Posts.findByPk(req.params.id, {
        include: [
          {
           model: User,
           attributes: ['name'],
          },
        ],
      });
      const post = onePostData.get({ plain: true });

    res.render('readposts', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/posts/:id',)

router.put()

router.delete()

module.exports = router;
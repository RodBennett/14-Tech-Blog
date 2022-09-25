const router = require('express').Router();
const { Posts, User } = require('../../models')
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
router.get('/posts/:id', withAuth, async (req, res) => {
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

    res.render('homepage', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Posts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/posts/:id', withAuth, async (req, res) => {
  // update a category by its `id` value

    try {
      const updatePost = await Posts.update(
    {
    ...req.body,
    user_id: req.session.user_id,
  });
  res.status(200).json(updatePost)
} catch (err) {
  res.status(400).json(err)
}
 

});

module.exports = router;
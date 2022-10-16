const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// endpoint api/posts

// GET route for all posts
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User,}, { model: Comment, include: { model: User, } }],
    });
    res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET route for one post by ID
router.get("/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: User}, { model: Comment, include: {model: User } }],
    });
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    const post = dbPostData.get({ plain: true });
    const comment = post.comment;
    res.render('readpost', {
            post,
            comment,
            logged_in: req.session.logged_in,
          });
   res.status(200).json(dbPostData);
  } catch (err) {
    console.log(err);
    res.status(501).json(err);
  }
});

// POST route for creating a post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.post_title,
      content: req.body.post_content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT route for updating/editing a post
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update({
      title: req.body.post_title,
      content: req.body.post_content,
    },
    { 
      where: {
        id: req.params.id
    }, 
  });
  if (!updatePost) {
    res.status(404).json({ message: "No post found with this id" });
    return;
  }
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!deletePost) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

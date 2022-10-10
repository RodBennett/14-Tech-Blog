const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// endpoint api/comments

// GET route for all comments
router.get("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({});

    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET route for one single comment
router.get("/:id", async (req, res) => {
  try {
    const dbCommentData = await Comment.findByPk({
      where: {
        id: req.params.id,
      },
    });
    res.json(dbCommentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST route to create a new comment
router.post("/", withAuth, async (req, res) => {
  if (req.session) {
    try {
      const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
      res.json(newComment);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// PUT route to edit a comment
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateComment = await Comment.update(
      {
        comment_text: req.body.comment_text,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!updateComment) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    res.json(updateComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE route to delete comment
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteComment) {
      res.status(404).json({ message: "No comment found with this id" });
      return;
    }
    res.json(deleteComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
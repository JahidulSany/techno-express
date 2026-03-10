// create a new router
const router = require('express').Router();

// import the models
const { Post } = require('../models/index');
const { authMiddleware } = require('../utils/auth');

// Route to add a new post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;

    const post = await Post.create({
      title,
      content,
      categoryId: parseInt(categoryId),
      userId: req.user.id,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error adding post' });
  }
});

// Route to get all posts and Filter posts by categoryId
router.get('/', async (req, res) => {
  const categoryId = req.query.categoryId;

  try {
    let posts;

    if (categoryId) {
      posts = await Post.findAll({
        where: { categoryId: categoryId },
      });
    } else {
      posts = await Post.findAll();
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
});

// Route to get a specific post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving post' });
  }
});

// Route to update a post
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;

    // Only update if ID matches AND userId matches the logged-in user
    const post = await Post.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!post) {
      return res.status(403).json({ error: 'Unauthorized or Post not found' });
    }

    await post.update({
      title,
      content,
      categoryId: parseInt(categoryId),
    });
    res.json(post);

  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
});

// Route to delete a post
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Post.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (deleted) {
      res.json({ message: 'Post deleted' });
    } else {
      res.status(403).json({ error: 'Unauthorized to delete this post' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
});

// export the router
module.exports = router;

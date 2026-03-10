const router = require('express').Router();
const { User } = require('../models');
const { signToken, authMiddleware } = require('../utils/auth');

// Get current authenticated user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ user });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const token = signToken(userData);
    res.status(200).json({ token, userData });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.status(204).end();
});

// GET the User record
router.get('/:id', async (req, res) => {
  console.log('looking for user', req.params.id);
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });

    if (!userData) {
      return res.status(404).json({ message: 'No User found with this id' });
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    const token = signToken(userData);
    res.status(200).json({ token, userData });
  } catch (err) {
    res.status(400).json(err);
  }
});

// UDPATE the User record
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: 'No User found with this id' });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

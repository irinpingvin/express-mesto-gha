const router = require('express').Router();
const {
  getUsers, getUserById, updateUserProfile, updateUserAvatar,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users', auth, getUsers);

router.get('/users/:userId', auth, getUserById);

router.patch('/users/me', auth, updateUserProfile);

router.patch('/users/me/avatar', auth, updateUserAvatar);

module.exports = router;

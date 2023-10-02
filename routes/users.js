const router = require('express').Router();
const {
  addUser, getUsers, getUserById, editUserProfile, editUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.post('/', addUser);
router.get('/:userId', getUserById);
router.patch('/me', editUserProfile);
router.patch('/me/avatar', editUserAvatar);

module.exports = router;

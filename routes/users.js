const router = require('express').Router();
const {
  validateGetUserById, validateEditUserProfile, validateEditUserAvatar,
} = require('../middlewares/validation');
const {
  getUsers, getUserById, editUserProfile, getUserInfo, editUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', validateGetUserById, getUserById);
router.patch('/me', validateEditUserProfile, editUserProfile);
router.patch('/me/avatar', validateEditUserAvatar, editUserAvatar);

module.exports = router;

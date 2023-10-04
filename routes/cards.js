const router = require('express').Router();
const { validateAddCard, validateModifyCard } = require('../middlewares/validation');
const {
  addCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validateAddCard, addCard);
router.delete('/:cardId', validateModifyCard, deleteCard);
router.put('/:cardId/likes', validateModifyCard, likeCard);
router.delete('/:cardId/likes', validateModifyCard, dislikeCard);

module.exports = router;

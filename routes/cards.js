const router = require('express').Router();
const {
  getCards, createCard, deleteCard, addCardLike, removeCardLike,
} = require('../controllers/cards');
const auth = require("../middlewares/auth");

router.get('/cards', auth, getCards);

router.post('/cards', auth, createCard);

router.delete('/cards/:cardId', auth, deleteCard);

router.put('/cards/:cardId/likes', auth, addCardLike);

router.delete('/cards/:cardId/likes', auth, removeCardLike);

module.exports = router;

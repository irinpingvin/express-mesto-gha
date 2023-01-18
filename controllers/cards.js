const Card = require('../models/card');
const { VALIDATION_ERROR, NOT_FOUND_ERROR, DEFAULT_ERROR } = require('../utils/constants');

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' }));
}

function createCard(req, res) {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в запросе' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' });
      }
    });
}

function deleteCard(req, res) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемая карточка не найдена' });
      }
      if (String(card.owner) === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => res.send(card));
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Запрещено удалять карточки других пользователей' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в запросе' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' });
      }
    });
}

function addCardLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в запросе' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' });
      }
    });
}

function removeCardLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемая карточка не найдена' });
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в запросе' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' });
      }
    });
}

module.exports = {
  getCards, createCard, deleteCard, addCardLike, removeCardLike,
};

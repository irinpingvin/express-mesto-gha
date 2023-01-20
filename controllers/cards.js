const Card = require('../models/card');
const ValidationError = require("../errors/ValidationError");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;

  if (!name || !link) {
    throw new ValidationError('Переданы некорректные данные в запросе');
  }

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch(next);
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      }
      if (String(card.owner) === req.user._id) {
        Card.findByIdAndRemove(req.params.cardId)
          .then((card) => res.send(card));
      } else {
        throw new ForbiddenError('Запрещено удалять карточки других пользователей');
      }
    })
    .catch(next);
}

function addCardLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch(next);
}

function removeCardLike(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемая карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch(next);
}

module.exports = {
  getCards, createCard, deleteCard, addCardLike, removeCardLike,
};

const Card = require('../models/card');

function getCards(req, res) {
  Card.find({})
    .then(cards => res.send({data: cards}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
}

function createCard(req, res) {
  const {name, link} = req.body;
  Card.create({name, link, owner: req.user._id})
    .then(card => res.send({data: card}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({data: card}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
}

function addCardLike(req, res) {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .then(card => res.send({data: card}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
}

function removeCardLike(req, res) {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true })
    .then(card => res.send({data: card}))
    .catch(() => res.status(500).send({message: 'Произошла ошибка'}))
}

module.exports = {getCards, createCard, deleteCard, addCardLike, removeCardLike};
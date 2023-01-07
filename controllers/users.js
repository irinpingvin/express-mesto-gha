const User = require('../models/user');
const { VALIDATION_ERROR, DEFAULT_ERROR, NOT_FOUND_ERROR } = require('../utils/constants');

function getUsers(req, res) {
  User.find({})
    .then((users) => {
      if (!users) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Пользователи не найдены' });
      } else {
        res.send(users);
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

function getUserById(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.send(user);
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

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в запросе' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' });
      }
    });
}

function updateUserProfile(req, res) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в запросе' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' });
      }
    });
}

function updateUserAvatar(req, res) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND_ERROR).send({ message: 'Запрашиваемый пользователь не найден' });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR).send({ message: 'Переданы некорректные данные в запросе' });
      } else {
        res.status(DEFAULT_ERROR).send({ message: 'Произошла ошибка при отправке запроса' });
      }
    });
}

module.exports = {
  getUsers, getUserById, createUser, updateUserProfile, updateUserAvatar,
};
